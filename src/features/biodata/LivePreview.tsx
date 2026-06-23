"use client";

import { useFormContext } from "react-hook-form";
import { BiodataFormValues } from "@/lib/schema";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { RoyalTemplate } from "@/components/templates/RoyalTemplate";
import { CrimsonGoldTemplate } from "@/components/templates/CrimsonGoldTemplate";
import { SikhFloralTemplate } from "@/components/templates/SikhFloralTemplate";
import { MaroonGoldTemplate } from "@/components/templates/MaroonGoldTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { generatePdf } from "@/lib/generatePdf";
import { supabase } from "@/lib/supabase";
import { markAsDownloaded, checkPaymentStatus } from "@/lib/supabase-service";

export function LivePreview({ template, category = "Matrimonial" }: { template: string; category?: string }) {
  // useFormContext().watch() subscribes to every form value change reactively.
  // This is the correct pattern — useWatch with a `control` ref can miss updates.
  const { watch, trigger, formState } = useFormContext<BiodataFormValues>();
  const formValues = watch();

  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [templatePrice, setTemplatePrice] = useState<{ price: number, discount_price: number | null }>({ price: 99, discount_price: null });
  const pdfTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      // ilike = case-insensitive LIKE so slug "classic" matches DB name "Classic"
      const { data } = await supabase
        .from('templates')
        .select('price, discount_price')
        .ilike('name', template)     // case-insensitive match
        .eq('category', category)
        .single();

      if (data) {
        setTemplatePrice({ price: data.price, discount_price: data.discount_price });
      }
    };
    fetchPrice();
  }, [template, category]);

  const renderTemplate = (data: Partial<BiodataFormValues>) => {
    switch (template) {
      case "maroon-gold": return <MaroonGoldTemplate data={data} />;
      case "sikh-floral": return <SikhFloralTemplate data={data} />;
      case "crimson-gold": return <CrimsonGoldTemplate data={data} />;
      case "classic": return <ClassicTemplate data={data} />;
      case "modern": return <ModernTemplate data={data} />;
      case "minimal": return <MinimalTemplate data={data} />;
      case "elegant": return <ElegantTemplate data={data} />;
      case "royal": return <RoyalTemplate data={data} />;
      default: return <ClassicTemplate data={data} />;
    }
  };

  const initiatePayment = async (recordId: string) => {
    try {
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId, category: "Matrimonial" }),
      });
      const order = await res.json();

      if (order.error) throw new Error(order.error);

      // Capture the order ID here — the Razorpay handler callback does NOT
      // include razorpay_order_id in its response object on all environments.
      const orderId = order.id;

      return new Promise((resolve, reject) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
          amount: order.amount,
          currency: order.currency,
          name: "BioDataEarth",
          description: "Download Matrimonial Biodata PDF",
          order_id: orderId,
          handler: async (response: any) => {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: orderId,                       // ← explicitly pass order ID
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                recordId,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              resolve(true);
            } else {
              reject(new Error("Verification failed"));
            }
          },
          prefill: {
            name: formValues.fullName,
            email: "",
            contact: "",
          },
          theme: { color: "#F43F5E" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", (response: any) => {
          reject(new Error(response.error.description));
        });
        rzp.open();
      });
    } catch (err: any) {
      throw err;
    }
  };

  const handleDownloadClick = async () => {
    setValidationError("");

    // Validate ALL fields before generating PDF
    const isValid = await trigger();
    if (!isValid) {
      setValidationError("Please complete all required fields in the form before downloading.");
      return;
    }

    if (!pdfTargetRef.current) return;

    if (!formValues.recordId) {
      setValidationError("Please save your biodata before downloading.");
      return;
    }

    setIsGenerating(true);
    try {
      const { paid } = await checkPaymentStatus(formValues.recordId);
      setIsGenerating(false);

      if (!paid) {
        setShowConfirmModal(true);
      } else {
        await executeDownloadFlow();
      }
    } catch (err) {
      setIsGenerating(false);
      setValidationError("Failed to check payment status. Please try again.");
    }
  };

  const executeDownloadFlow = async () => {
    setValidationError("");
    setIsGenerating(true);
    setShowConfirmModal(false);

    try {
      // 1. Check if already paid
      const { paid } = await checkPaymentStatus(formValues.recordId!);

      if (!paid) {
        // 2. Trigger Razorpay if not paid
        await initiatePayment(formValues.recordId!);
      }

      // 3. Give the browser a moment to fully close the Razorpay modal before
      //    opening the print dialog. Without this delay, some browsers block the
      //    print() call as an unsolicited popup while the payment overlay is
      //    still animating out.
      await new Promise((res) => setTimeout(res, 800));

      if (!pdfTargetRef.current) return;

      // 4. Proceed to Generate PDF
      await generatePdf(
        pdfTargetRef.current,
        `biodata-${formValues.fullName?.replace(/\s+/g, "_") || "download"}.pdf`
      );

      // 5. Update download flag in database
      await markAsDownloaded(formValues.recordId!);

    } catch (err: any) {
      console.error("PDF download/payment error:", err);
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("cancel") || msg.toLowerCase().includes("dismiss")) {
        setValidationError("Payment was cancelled. Please try again to download your biodata.");
      } else if (msg.toLowerCase().includes("verif")) {
        setValidationError("Payment verification failed. Please contact support with your payment ID.");
      } else {
        setValidationError(msg || "Payment failed or download was interrupted. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sticky top-24 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0 flex-wrap gap-2">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200">Live Preview</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 rounded-full font-medium uppercase tracking-wider">
            {template} Template
          </span>
          <button
            onClick={handleDownloadClick}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-base font-bold hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className={`flex items-center gap-2 ${isGenerating ? '' : 'hidden'}`}>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </div>
            <div className={`flex items-center gap-2 ${!isGenerating ? '' : 'hidden'}`}>
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md text-sm border border-white/10">₹{templatePrice.discount_price || templatePrice.price}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Validation error banner */}
      {validationError && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border-b border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {validationError}
        </div>
      )}

      {/* Scrollable zoomed preview */}
      <div className="overflow-y-auto w-full bg-slate-50 dark:bg-black/30 p-4 md:p-8" style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={template}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[800px] shadow-2xl mx-auto rounded-md overflow-hidden bg-white origin-top"
            style={{ transformOrigin: "top center", zoom: "75%" }}
          >
            {renderTemplate(formValues)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Payment Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready to Download?</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                You are about to download the high-quality PDF of your biodata using the <span className="font-semibold text-slate-900 dark:text-white capitalize">{template}</span> template.
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-8 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="font-medium text-slate-700 dark:text-slate-300">Total Amount</span>
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">₹{templatePrice.discount_price || templatePrice.price}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDownloadFlow}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/30"
                >
                  Proceed to Pay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Hidden full-size PDF render target ─────────────────────────────────
          Must use opacity:0 (NOT visibility:hidden) — html2canvas skips
          visibility:hidden elements. opacity:0 is invisible but still rendered.
          Print approach (window.print) reads element.outerHTML so this works
          for both approaches.                                                  */}
      <div
        ref={pdfTargetRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "794px",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
          backgroundColor: "#ffffff",
        }}
      >
        {renderTemplate(formValues)}
      </div>
    </div>
  );
}
