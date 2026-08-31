"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { BusinessFormValues } from "@/lib/businessSchema";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2, Loader2 } from "lucide-react";
import { saveBusinessBiodata } from "@/lib/storage";
import { recordSubmission } from "@/lib/supabase-service";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function BusinessMultiStepForm() {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const templateQuery = searchParams.get("template");
  const template = ["classic", "modern", "minimal-elegant", "startup-bold", "royal-indian"].includes(templateQuery || "")
    ? (templateQuery as string)
    : "classic";

  const totalSteps = 4;

  const { register, control, trigger, setValue, watch, getValues, formState: { errors } } = useFormContext<BusinessFormValues>();
  const photoUrl = watch("photo");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setValue("photo", reader.result as string, { shouldDirty: true });
      reader.readAsDataURL(file);
    }
  };

  const offeringFields = useFieldArray({ control, name: "offerings" });
  const achievementFields = useFieldArray({ control, name: "achievements" });
  const customFields = useFieldArray({ control, name: "customFields" });

  const nextStep = async () => {
    const valid = await trigger(getFieldsForStep(step));
    if (valid && step < totalSteps) setStep((p) => p + 1);
  };
  const prevStep = () => { if (step > 1) setStep((p) => p - 1); };

  const getFieldsForStep = (s: number): (keyof BusinessFormValues)[] => {
    switch (s) {
      case 1: return ["ownerName", "businessName", "phone", "email", "location"];
      case 2: return ["industry"];
      case 3: return ["offerings", "achievements"];
      case 4: return ["photo"];
      default: return [];
    }
  };

  const stepNames = ["About Your Business", "Business Details", "Services & Achievements", "Logo & Template"];
  const inp = "w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow text-sm";
  const lbl = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";
  const err = "text-red-500 text-xs mt-1 block";
  const addBtn = "flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400";

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          Step {step} of {totalSteps}: {stepNames[step - 1]}
        </h2>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>

      <form className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">

            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Owner / Founder Name</label>
                  <input {...register("ownerName")} className={inp} placeholder="e.g. Vikram Patel" />
                  {errors.ownerName && <span className={err}>{errors.ownerName.message}</span>}
                </div>
                <div>
                  <label className={lbl}>Business Name</label>
                  <input {...register("businessName")} className={inp} placeholder="e.g. Patel Enterprises" />
                  {errors.businessName && <span className={err}>{errors.businessName.message}</span>}
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className={lbl}>Tagline / Slogan (Optional)</label>
                  <input {...register("tagline")} className={inp} placeholder="e.g. Building Trust, One Deal at a Time" />
                </div>
                <div>
                  <label className={lbl}>Phone Number</label>
                  <input {...register("phone")} className={inp} placeholder="e.g. +91 98765 43210" />
                  {errors.phone && <span className={err}>{errors.phone.message}</span>}
                </div>
                <div>
                  <label className={lbl}>Email Address</label>
                  <input type="email" {...register("email")} className={inp} placeholder="business@example.com" />
                  {errors.email && <span className={err}>{errors.email.message}</span>}
                </div>
                <div>
                  <label className={lbl}>Business Location</label>
                  <input {...register("location")} className={inp} placeholder="e.g. Ahmedabad, Gujarat" />
                  {errors.location && <span className={err}>{errors.location.message}</span>}
                </div>
                <div>
                  <label className={lbl}>Website (Optional)</label>
                  <input {...register("website")} className={inp} placeholder="e.g. patelenterprises.com" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className={lbl}>Industry / Sector</label>
                  <input {...register("industry")} className={inp} placeholder="e.g. Manufacturing, IT Services, Retail, Real Estate" />
                  {errors.industry && <span className={err}>{errors.industry.message}</span>}
                </div>
                <div>
                  <label className={lbl}>Year Established (Optional)</label>
                  <input {...register("established")} className={inp} placeholder="e.g. 2005" />
                </div>
                <div>
                  <label className={lbl}>Number of Employees (Optional)</label>
                  <input {...register("employees")} className={inp} placeholder="e.g. 50-100" />
                </div>
                <div>
                  <label className={lbl}>Annual Turnover (Optional)</label>
                  <input {...register("annualTurnover")} className={inp} placeholder="e.g. ₹5 Crore" />
                </div>
                <div>
                  <label className={lbl}>GST Number (Optional)</label>
                  <input {...register("gstNumber")} className={inp} placeholder="e.g. 24AAACP1234A1Z5" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Products & Services</label>
                    <button type="button" onClick={() => offeringFields.append({ id: Date.now().toString(), name: "", description: "" })} className={addBtn}>
                      <Plus className="w-4 h-4 mr-1" /> Add Offering
                    </button>
                  </div>
                  <div className="space-y-4">
                    {offeringFields.fields.map((field, index) => (
                      <div key={field.id} className="border border-amber-100 dark:border-amber-900/40 rounded-xl p-4 bg-amber-50/30 dark:bg-amber-950/20 relative">
                        <button type="button" onClick={() => offeringFields.remove(index)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div><label className={lbl}>Service / Product Name</label><input {...register(`offerings.${index}.name`)} className={inp} placeholder="e.g. Steel Fabrication" /></div>
                          <div><label className={lbl}>Description (Optional)</label><input {...register(`offerings.${index}.description`)} className={inp} placeholder="Brief description..." /></div>
                        </div>
                      </div>
                    ))}
                    {offeringFields.fields.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No services added yet. Click "Add Offering" to begin.</p>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Milestones & Achievements</label>
                    <button type="button" onClick={() => achievementFields.append({ id: Date.now().toString(), text: "" })} className={addBtn}>
                      <Plus className="w-4 h-4 mr-1" /> Add Achievement
                    </button>
                  </div>
                  <div className="space-y-2">
                    {achievementFields.fields.map((field, index) => (
                      <div key={field.id} className="flex gap-3 items-center">
                        <input {...register(`achievements.${index}.text`)} className={inp} placeholder="e.g. Awarded Best MSME 2022 by CII" />
                        <button type="button" onClick={() => achievementFields.remove(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg shrink-0"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    ))}
                    {achievementFields.fields.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No achievements added yet.</p>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Additional Fields (Optional)</label>
                    <button type="button" onClick={() => customFields.append({ id: Date.now().toString(), label: "", value: "" })} className={addBtn}>
                      <Plus className="w-4 h-4 mr-1" /> Add Field
                    </button>
                  </div>
                  {customFields.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-start mt-2">
                      <div className="flex-1"><input {...register(`customFields.${index}.label`)} className={inp} placeholder="Field Name (e.g. Certifications)" /></div>
                      <div className="flex-1"><input {...register(`customFields.${index}.value`)} className={inp} placeholder="Value" /></div>
                      <button type="button" onClick={() => customFields.remove(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Upload Logo / Photo (Optional)</label>
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                    {photoUrl ? (
                      <div className="flex flex-col items-center">
                        <img src={typeof photoUrl === "string" ? photoUrl : ""} alt="Preview" className="w-36 h-36 object-cover rounded-2xl shadow-md border-4 border-white mb-4" />
                        <button type="button" onClick={() => setValue("photo", "")} className="text-sm px-4 py-2 bg-white text-red-500 shadow-sm border border-slate-200 rounded-full font-medium hover:text-red-700 hover:bg-red-50 transition-colors">Change Photo</button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 text-slate-400">
                          <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex text-sm text-slate-600 dark:text-slate-400">
                          <label className="relative cursor-pointer rounded-md font-medium text-amber-600 hover:text-amber-500">
                            <span>Upload a logo / photo</span>
                            <input id="business-file-upload" type="file" className="sr-only" onChange={handlePhotoUpload} accept="image/*" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Choose a Template</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { name: "Royal Indian", slug: "royal-indian" },
                      { name: "Startup Bold", slug: "startup-bold" },
                      { name: "Minimal Elegant", slug: "minimal-elegant" },
                      { name: "Classic Gold", slug: "classic" },
                      { name: "Modern Teal", slug: "modern" },
                    ].map((t) => (
                      <button
                        key={t.slug}
                        type="button"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams.toString());
                          params.set("template", t.slug);
                          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                        }}
                        className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col justify-between h-24 ${template === t.slug
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10 shadow-sm"
                            : "border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-800 bg-white dark:bg-slate-900"
                          }`}
                      >
                        <span className="font-medium text-sm text-slate-900 dark:text-white leading-tight">{t.name}</span>
                        {template === t.slug && <CheckCircle2 className="w-5 h-5 text-amber-500 self-end mt-2" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </form>

      <div className="flex justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button type="button" onClick={prevStep} disabled={step === 1} className="px-6 py-2 rounded-full border border-slate-300 text-slate-700 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:hover:bg-transparent transition-colors">
          Back
        </button>
        {step < totalSteps ? (
          <button type="button" onClick={nextStep} className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:opacity-90 transition-transform active:scale-95 shadow-sm">
            Next Step
          </button>
        ) : (
          <button
            type="button"
            disabled={isSaving}
            onClick={async () => {
              const v = await trigger();
              if (v) {
                setIsSaving(true);
                const vals = getValues();
                try {
                  saveBusinessBiodata(vals);
                } catch (e) {
                  console.warn("Could not save to localStorage, it might be full", e);
                }

                const { success, error, record } = await recordSubmission({
                  name: vals.ownerName,
                  category: "Business",
                  template: template,
                  city: vals.location,
                  formData: vals
                });

                if (success && record) {
                  setValue("recordId", String(record.id));
                  setSaved(true);
                  setTimeout(() => setSaved(false), 4000);
                } else {
                  console.error("Failed to save to database:", error);
                  alert("Could not save to database. Please try again.");
                }
                setIsSaving(false);
              }
            }}
            className="px-6 py-2 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:opacity-90 transition-transform active:scale-95 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/90 border border-green-200 dark:border-green-800 rounded-xl text-green-800 dark:text-green-100 text-sm font-medium shadow-2xl backdrop-blur max-w-md w-[90%]"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            <span>Business profile saved! Click <span className="font-bold">Download PDF</span> in the preview panel.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
