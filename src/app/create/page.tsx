"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { biodataSchema, BiodataFormValues } from "@/lib/schema";
import { MultiStepForm } from "@/features/biodata/MultiStepForm";
import { LivePreview } from "@/features/biodata/LivePreview";
import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { saveBiodata, loadBiodata } from "@/lib/storage";
import { ArrowLeft } from "lucide-react";

export default function CreateBiodataPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={<div className="flex items-center justify-center p-24 text-slate-500">Loading form...</div>}>
          <CreateBiodataContent />
        </Suspense>
      </main>
    </div>
  );
}

function CreateBiodataContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateQuery = searchParams.get("template");
  const template = ["sikh-floral", "crimson-gold", "classic", "modern", "minimal", "elegant", "royal"].includes(templateQuery || "")
    ? (templateQuery as any)
    : "classic";

  // Load saved draft from localStorage on first render
  const savedData = loadBiodata();

  const methods = useForm<BiodataFormValues>({
    resolver: zodResolver(biodataSchema),
    defaultValues: {
      fullName: savedData?.fullName ?? "",
      dob: savedData?.dob ?? "",
      height: savedData?.height ?? "",
      religion: savedData?.religion ?? "",
      caste: savedData?.caste ?? "",
      location: savedData?.location ?? "",
      education: savedData?.education ?? "",
      occupation: savedData?.occupation ?? "",
      income: savedData?.income ?? "",
      fatherName: savedData?.fatherName ?? "",
      motherName: savedData?.motherName ?? "",
      siblings: savedData?.siblings ?? "",
      preferredAge: savedData?.preferredAge ?? "",
      preferredLocation: savedData?.preferredLocation ?? "",
      preferredEducation: savedData?.preferredEducation ?? "",
      personalCustomFields: savedData?.personalCustomFields ?? [],
      professionalCustomFields: savedData?.professionalCustomFields ?? [],
      familyCustomFields: savedData?.familyCustomFields ?? [],
      partnerCustomFields: savedData?.partnerCustomFields ?? [],
      photo: savedData?.photo ?? "",
    },
    mode: "onChange"
  });

  // Auto-save to localStorage on every change (debounced 800ms)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const subscription = methods.watch((values) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        saveBiodata(values as Partial<BiodataFormValues>);
      }, 800);
    });
    return () => {
      subscription.unsubscribe();
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [methods]);

  return (
    <FormProvider {...methods}>
      {/* Back navigation bar — uses router.back() to preserve the browser history stack */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
          Matrimonial Biodata
        </span>
        <span className="text-xs text-slate-400 capitalize">— {template} template</span>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
          <MultiStepForm />
        </div>

        <div className="lg:sticky lg:top-24">
          <LivePreview template={template} />
        </div>
      </div>
    </FormProvider>
  );
}
