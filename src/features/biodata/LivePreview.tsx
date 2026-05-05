"use client";

import { useFormContext } from "react-hook-form";
import { BiodataFormValues } from "@/lib/schema";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { RoyalTemplate } from "@/components/templates/RoyalTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { generatePdf } from "@/lib/generatePdf";
import { supabase } from "@/lib/supabase";
import { markAsDownloaded, checkPaymentStatus } from "@/lib/supabase-service";

export function LivePreview({ template }: { template: string }) {
  // useFormContext().watch() subscribes to every form value change reactively.
  // This is the correct pattern — useWatch with a `control` ref can miss updates.
  const { watch, trigger, formState } = useFormContext<BiodataFormValues>();
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
        .eq('category', 'Matrimonial')
        .single();
      
      if (data) {
        setTemplatePrice({ price: data.price, discount_price: data.discount_price });
      }
    };
    fetchPrice();
  }, [template]);

  const renderTemplate = (data: Partial<BiodataFormValues>) => {
    switch (template) {
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

      return new Promise((resolve, reject) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
          amount: order.amount,
          currency: order.currency,
          name: "BioDataEarth",
          description: "Download Matrimonial Biodata PDF",
          order_id: order.id,
          handler: async (response: any) => {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
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
            email: "", // Not in schema, but can be added if needed
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

  const handleDownload = async () => {
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
      // 1. Check if already paid
      const { paid } = await checkPaymentStatus(formValues.recordId);
      
      if (!paid) {
        // 2. Trigger Razorpay if not paid
        await initiatePayment(formValues.recordId);
      }

      // 3. Proceed to Generate PDF
      await generatePdf(
        pdfTargetRef.current,
        `biodata-${formValues.fullName?.replace(/\s+/g, "_") || "download"}.pdf`
      );

      // 4. Update download flag in database
      await markAsDownloaded(formValues.recordId);
      
    } catch (err: any) {
      console.error("PDF download/payment error:", err);
      setValidationError(err.message || "Payment failed or download interrupted.");
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
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className={`flex items-center gap-1.5 ${isGenerating ? '' : 'hidden'}`}>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </div>
            <div className={`flex items-center gap-1.5 ${!isGenerating ? '' : 'hidden'}`}>
              <Download className="w-4 h-4" />
              <span>Download PDF (₹{templatePrice.discount_price || templatePrice.price})</span>
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
