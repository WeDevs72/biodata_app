"use client";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { biodataSchema, BiodataFormValues } from "@/lib/schema";
import { MultiStepForm } from "@/features/biodata/MultiStepForm";
import { LivePreview } from "@/features/biodata/LivePreview";
import { Header } from "@/components/Header";
import { Suspense, useEffect, useRef } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { saveBiodata, loadBiodata } from "@/lib/storage";

export default function CreateBiodataPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
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
  const templateQuery = searchParams.get("template");
  const template = ["classic", "modern", "minimal", "elegant", "royal"].includes(templateQuery || "")
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
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
          <MultiStepForm />
        </div>

        <div className="lg:sticky lg:top-24 max-lg:order-first">
          <LivePreview template={template} />
        </div>
      </div>
    </FormProvider>
  );
}
