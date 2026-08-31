"use client";

import { useState, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { JobFormValues } from "@/lib/jobSchema";
import { JobProfessionalTemplate } from "@/components/templates/job/JobProfessionalTemplate";
import { JobModernTemplate } from "@/components/templates/job/JobModernTemplate";
import { JobClassicProfessionalTemplate } from "@/components/templates/job/JobClassicProfessionalTemplate";
import { JobElegantSaffronTemplate } from "@/components/templates/job/JobElegantSaffronTemplate";
import { JobExecutivePremiumTemplate } from "@/components/templates/job/JobExecutivePremiumTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { generatePdf } from "@/lib/generatePdf";
import { supabase } from "@/lib/supabase";
import { markAsDownloaded, checkPaymentStatus } from "@/lib/supabase-service";

export function JobLivePreview() {
  const { watch, trigger } = useFormContext<JobFormValues>();
  const formValues = watch();
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [templatePrice, setTemplatePrice] = useState<{
    price: number;
    discount_price: number | null;
    price_usd?: number | null;
    discount_price_usd?: number | null;
  }>({ price: 99, discount_price: null, price_usd: null, discount_price_usd: null });
  const [isPaid, setIsPaid] = useState(false);
  const [isIndia, setIsIndia] = useState(true);
  const [prices, setPrices] = useState({ inr: 79, usd: 1.50 });
  const [systemSettings, setSystemSettings] = useState<any>({});
  const pdfTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setIsIndia(tz === "Asia/Kolkata" || tz === "Asia/Calcutta");
    } catch (e) {
      setIsIndia(true);
    }
  }, []);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const settings = await res.json();
          setSystemSettings(settings);
          setPrices({
            inr: settings.priceJobINR !== undefined ? settings.priceJobINR : 79,
            usd: settings.priceJobUSD !== undefined ? settings.priceJobUSD : 1.50
          });
        }
      } catch (e) {
        console.error("Failed to fetch settings", e);
      }
    };
    loadPrices();
  }, []);

  useEffect(() => {
    const checkPaid = async () => {
      if (formValues.recordId) {
        const { paid } = await checkPaymentStatus(formValues.recordId);
        setIsPaid(paid);
      } else {
        setIsPaid(false);
      }
    };
    checkPaid();
  }, [formValues.recordId]);

  const searchParams = useSearchParams();
  const templateQuery = searchParams.get("template");
  const template = ["professional", "modern", "classic-professional", "elegant-saffron", "executive-premium"].includes(templateQuery || "")
    ? (templateQuery as string)
    : "professional";

  const resolvedPrice = useMemo(() => {
    if (isIndia) {
      const base = templatePrice.discount_price !== null && templatePrice.discount_price !== undefined
        ? templatePrice.discount_price
        : templatePrice.price;
      return base ? `₹${base}` : `₹${prices.inr}`;
    } else {
      const key = `${template}_Job Resume`;
      const usdPricing = systemSettings?.templatePricesUSD?.[key] || {};
      const base = templatePrice.price_usd !== null && templatePrice.price_usd !== undefined
        ? (templatePrice.discount_price_usd !== null && templatePrice.discount_price_usd !== undefined ? templatePrice.discount_price_usd : templatePrice.price_usd)
        : (usdPricing.discount_price !== null && usdPricing.discount_price !== undefined ? usdPricing.discount_price : usdPricing.price);
      return base ? `$${base}` : `$${prices.usd}`;
    }
  }, [isIndia, template, templatePrice, prices, systemSettings]);

  useEffect(() => {
    const fetchPrice = async () => {
      const { data, error } = await supabase
        .from('templates')
        .select('price, discount_price, price_usd, discount_price_usd')
        .eq('name', template)
        .eq('category', 'Job Resume')
        .single();
      
      if (error) {
        console.error("Error fetching template price:", error.message);
      }
      
      if (data) {
        console.log("Fetched price:", data);
        setTemplatePrice({ 
          price: data.price, 
          discount_price: data.discount_price,
          price_usd: data.price_usd,
          discount_price_usd: data.discount_price_usd
        });
      }
    };
    fetchPrice();
  }, [template]);

  const renderTemplate = (data: Partial<JobFormValues>) => {
    switch (template) {
      case "executive-premium": return <JobExecutivePremiumTemplate data={data} />;
      case "elegant-saffron": return <JobElegantSaffronTemplate data={data} />;
      case "classic-professional": return <JobClassicProfessionalTemplate data={data} />;
      case "modern": return <JobModernTemplate data={data} />;
      default: return <JobProfessionalTemplate data={data} />;
    }
  };

  const initiatePayment = async (recordId: string) => {
    try {
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recordId,
          category: "Job Resume",
          currency: isIndia ? "INR" : "USD"
        }),
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
          description: "Download Job Resume PDF",
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
            email: formValues.email,
            contact: formValues.phone,
          },
          theme: { color: "#6366F1" },
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
      setValidationError("Please save your resume before downloading.");
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
      setIsPaid(true);

      // 3. Give the browser a moment to fully close the Razorpay modal before
      //    opening the print dialog. Without this delay, some browsers block the
      //    print() call as an unsolicited popup while the payment overlay is
      //    still animating out.
      await new Promise((res) => setTimeout(res, 800));

      if (!pdfTargetRef.current) return;

      // 4. Proceed to Generate PDF
      await generatePdf(
        pdfTargetRef.current,
        `resume-${formValues.fullName?.replace(/\s+/g, "_") || "download"}.pdf`
      );
      
      // 5. Update download flag in database
      await markAsDownloaded(formValues.recordId);
      
    } catch (err: any) {
      console.error("PDF download/payment error:", err);
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("cancel") || msg.toLowerCase().includes("dismiss")) {
        setValidationError("Payment was cancelled. Please try again to download your resume.");
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
          <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full font-medium uppercase tracking-wider">
            {template} Template
          </span>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-base font-bold hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className={`flex items-center gap-2 ${isGenerating ? "" : "hidden"}`}>
              <Loader2 className="w-5 h-5 animate-spin" /><span>Generating...</span>
            </div>
            <div className={`flex items-center gap-2 ${!isGenerating ? "" : "hidden"}`}>
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md text-sm border border-white/10">{resolvedPrice}</span>
            </div>
          </button>
        </div>
      </div>

      {validationError && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border-b border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />{validationError}
        </div>
      )}

      <div className="relative overflow-y-auto w-full bg-slate-50 dark:bg-black/30 p-4 md:p-8" style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={template}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[800px] shadow-2xl mx-auto rounded-md overflow-hidden bg-white origin-top relative"
            style={{ transformOrigin: "top center", zoom: "75%" }}
          >
            {renderTemplate(formValues)}

            {/* 70% blur from below for unpaid previews */}
            {!isPaid && (
              <div 
                className="absolute left-0 right-0 bottom-0 pointer-events-none"
                style={{
                  height: "70%",
                  background: "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.4) 15%, rgba(255, 255, 255, 0.9) 70%, white 100%)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  zIndex: 20
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to action overlay message on the preview itself */}
        {!isPaid && (
          <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-none">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-2xl rounded-2xl p-6 max-w-sm border border-slate-200/50 dark:border-slate-800/50 pointer-events-auto transform translate-y-2">
              <h4 className="font-bold text-slate-800 dark:text-white text-base mb-1">Preview Blurred</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                This is a preview. Download the high-quality, watermark-free PDF to unlock and view the complete resume.
              </p>
              <button
                onClick={handleDownload}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-bold shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                Unlock & Download ({resolvedPrice})
              </button>
            </div>
          </div>
        )}
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
