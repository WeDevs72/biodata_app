"use client";

import { useFormContext } from "react-hook-form";
import { BusinessFormValues } from "@/lib/businessSchema";
import { BusinessClassicTemplate } from "@/components/templates/business/BusinessClassicTemplate";
import { BusinessModernTemplate } from "@/components/templates/business/BusinessModernTemplate";
import { BusinessMinimalElegantTemplate } from "@/components/templates/business/BusinessMinimalElegantTemplate";
import { BusinessStartupBoldTemplate } from "@/components/templates/business/BusinessStartupBoldTemplate";
import { BusinessRoyalIndianTemplate } from "@/components/templates/business/BusinessRoyalIndianTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { generatePdf } from "@/lib/generatePdf";
import { supabase } from "@/lib/supabase";
import { markAsDownloaded, checkPaymentStatus } from "@/lib/supabase-service";

export function BusinessLivePreview({ template }: { template: string }) {
  const { watch, trigger } = useFormContext<BusinessFormValues>();
  const formValues = watch();
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [templatePrice, setTemplatePrice] = useState<{ price: number, discount_price: number | null }>({ price: 99, discount_price: null });
  const pdfTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const { data } = await supabase
        .from('templates')
        .select('price, discount_price')
        .eq('name', template)
        .eq('category', 'Business')
        .single();
      
      if (data) {
        setTemplatePrice({ price: data.price, discount_price: data.discount_price });
      }
    };
    fetchPrice();
  }, [template]);

  const renderTemplate = (data: Partial<BusinessFormValues>) => {
    switch (template) {
      case "royal-indian": return <BusinessRoyalIndianTemplate data={data} />;
      case "startup-bold": return <BusinessStartupBoldTemplate data={data} />;
      case "minimal-elegant": return <BusinessMinimalElegantTemplate data={data} />;
      case "modern": return <BusinessModernTemplate data={data} />;
      default: return <BusinessClassicTemplate data={data} />;
    }
  };

  const initiatePayment = async (recordId: string) => {
    try {
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId, category: "Business" }),
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
          description: "Download Business Profile PDF",
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
            name: formValues.ownerName,
            email: formValues.email,
            contact: formValues.phone,
          },
          theme: { color: "#F59E0B" },
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

  const handleDownload = async () => {
    setValidationError("");
    const isValid = await trigger();
    if (!isValid) {
      setValidationError("Please complete all required fields before downloading.");
      return;
    }
    if (!pdfTargetRef.current) return;
    
    if (!formValues.recordId) {
      setValidationError("Please save your profile before downloading.");
      return;
    }

    setIsGenerating(true);
    try {
      // 1. Check if already paid
      const { paid } = await checkPaymentStatus(formValues.recordId);
      
      if (!paid) {
        // 2. Trigger Razorpay if not paid
        await initiatePayment(formValues.recordId);
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
        `business-profile-${formValues.businessName?.replace(/\s+/g, "_") || "download"}.pdf`
      );

      // 5. Update download flag in database
      await markAsDownloaded(formValues.recordId);
      
    } catch (err: any) {
      console.error("PDF download/payment error:", err);
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("cancel") || msg.toLowerCase().includes("dismiss")) {
        setValidationError("Payment was cancelled. Please try again to download your profile.");
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
      <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0 flex-wrap gap-2">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200">Live Preview</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 rounded-full font-medium uppercase tracking-wider">
            {template} Template
          </span>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-base font-bold hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className={`flex items-center gap-2 ${isGenerating ? "" : "hidden"}`}>
              <Loader2 className="w-5 h-5 animate-spin" /><span>Generating...</span>
            </div>
            <div className={`flex items-center gap-2 ${!isGenerating ? "" : "hidden"}`}>
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md text-sm border border-white/10">₹{templatePrice.discount_price || templatePrice.price}</span>
            </div>
          </button>
        </div>
      </div>

      {validationError && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border-b border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />{validationError}
        </div>
      )}

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

      <div
        ref={pdfTargetRef}
        style={{ position: "fixed", left: "-9999px", top: 0, width: "794px", opacity: 0, pointerEvents: "none", zIndex: -1, backgroundColor: "#ffffff" }}
      >
        {renderTemplate(formValues)}
      </div>
    </div>
  );
}
