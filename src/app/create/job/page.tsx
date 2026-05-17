"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, JobFormValues } from "@/lib/jobSchema";
import { JobMultiStepForm } from "@/features/job/JobMultiStepForm";
import { JobLivePreview } from "@/features/job/JobLivePreview";
import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { saveJobBiodata, loadJobBiodata } from "@/lib/storage";
import { ArrowLeft } from "lucide-react";

export default function CreateJobBiodataPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={<div className="flex items-center justify-center p-24 text-slate-500">Loading form...</div>}>
          <CreateJobContent />
        </Suspense>
      </main>
    </div>
  );
}

function CreateJobContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateQuery = searchParams.get("template");
  const template = ["professional", "modern", "classic-professional", "elegant-saffron", "executive-premium"].includes(templateQuery || "")
    ? (templateQuery as string)
    : "professional";

  const savedData = loadJobBiodata();

  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      fullName: savedData?.fullName ?? "",
      jobTitle: savedData?.jobTitle ?? "",
      phone: savedData?.phone ?? "",
      email: savedData?.email ?? "",
      location: savedData?.location ?? "",
      linkedIn: savedData?.linkedIn ?? "",
      portfolio: savedData?.portfolio ?? "",
      professionalSummary: savedData?.professionalSummary ?? "",
      experience: savedData?.experience ?? [],
      education: savedData?.education ?? [],
      skills: savedData?.skills ?? "",
      languages: savedData?.languages ?? "",
      customFields: savedData?.customFields ?? [],
      photo: savedData?.photo ?? "",
    },
    mode: "onChange",
  });

  // Auto-save draft to localStorage (debounced 800ms)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const subscription = methods.watch((values) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        saveJobBiodata(values as Partial<JobFormValues>);
      }, 800);
    });
    return () => {
      subscription.unsubscribe();
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [methods]);

  return (
    <FormProvider {...methods}>
      {/* Back navigation bar */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          Job / Resume Biodata
        </span>
        <span className="text-xs text-slate-400 capitalize">— {template} template</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
          <JobMultiStepForm />
        </div>
        <div className="lg:sticky lg:top-24">
          <JobLivePreview />
        </div>
      </div>
    </FormProvider>
  );
}
