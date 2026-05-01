"use client";

import { useFormContext } from "react-hook-form";
import { JobFormValues } from "@/lib/jobSchema";
import { JobProfessionalTemplate } from "@/components/templates/job/JobProfessionalTemplate";
import { JobModernTemplate } from "@/components/templates/job/JobModernTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { generatePdf } from "@/lib/generatePdf";

export function JobLivePreview({ template }: { template: string }) {
  const { watch, trigger } = useFormContext<JobFormValues>();
  const formValues = watch();
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationError, setValidationError] = useState("");
  const pdfTargetRef = useRef<HTMLDivElement>(null);

  const renderTemplate = (data: Partial<JobFormValues>) => {
    switch (template) {
      case "modern": return <JobModernTemplate data={data} />;
      default: return <JobProfessionalTemplate data={data} />;
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
    setIsGenerating(true);
    try {
      await generatePdf(
        pdfTargetRef.current,
        `resume-${formValues.fullName?.replace(/\s+/g, "_") || "download"}.pdf`
      );
    } catch {
      setValidationError("Could not open print dialog. Please allow popups for this site.");
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
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className={`flex items-center gap-1.5 ${isGenerating ? "" : "hidden"}`}>
              <Loader2 className="w-4 h-4 animate-spin" /><span>Generating...</span>
            </div>
            <div className={`flex items-center gap-1.5 ${!isGenerating ? "" : "hidden"}`}>
              <Download className="w-4 h-4" /><span>Download PDF</span>
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
