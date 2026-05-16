"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { JobFormValues } from "@/lib/jobSchema";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2, Loader2 } from "lucide-react";
import { saveJobBiodata } from "@/lib/storage";
import { recordSubmission } from "@/lib/supabase-service";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function JobMultiStepForm() {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const templateQuery = searchParams.get("template");
  const template = ["professional", "modern", "classic-professional", "elegant-saffron", "executive-premium"].includes(templateQuery || "")
    ? (templateQuery as string)
    : "professional";

  const totalSteps = 4;

  const { register, control, trigger, setValue, watch, getValues, formState: { errors } } = useFormContext<JobFormValues>();
  const photoUrl = watch("photo");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setValue("photo", reader.result as string, { shouldDirty: true });
      reader.readAsDataURL(file);
    }
  };

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const customFields = useFieldArray({ control, name: "customFields" });

  const nextStep = async () => {
    const valid = await trigger(getFieldsForStep(step));
    if (valid && step < totalSteps) setStep((p) => p + 1);
  };
  const prevStep = () => { if (step > 1) setStep((p) => p - 1); };

  const getFieldsForStep = (s: number): (keyof JobFormValues)[] => {
    switch (s) {
      case 1: return ["fullName", "jobTitle", "phone", "email", "location"];
      case 2: return ["professionalSummary", "experience"];
      case 3: return ["education", "skills"];
      case 4: return ["photo"];
      default: return [];
    }
  };

  const stepNames = ["Personal Info", "Experience & Summary", "Education & Skills", "Photo & Template"];
  const inp = "w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm";
  const lbl = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";
  const err = "text-red-500 text-xs mt-1 block";
  const addBtn = "flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400";

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          Step {step} of {totalSteps}: {stepNames[step - 1]}
        </h2>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>

      <form className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">

            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className={lbl}>Full Name</label>
                  <input {...register("fullName")} className={inp} placeholder="e.g. Rahul Verma" />
                  {errors.fullName && <span className={err}>{errors.fullName.message}</span>}
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className={lbl}>Current / Target Job Title</label>
                  <input {...register("jobTitle")} className={inp} placeholder="e.g. Senior Software Engineer" />
                  {errors.jobTitle && <span className={err}>{errors.jobTitle.message}</span>}
                </div>
                <div>
                  <label className={lbl}>Phone Number</label>
                  <input {...register("phone")} className={inp} placeholder="e.g. +91 98765 43210" />
                  {errors.phone && <span className={err}>{errors.phone.message}</span>}
                </div>
                <div>
                  <label className={lbl}>Email Address</label>
                  <input type="email" {...register("email")} className={inp} placeholder="rahul@example.com" />
                  {errors.email && <span className={err}>{errors.email.message}</span>}
                </div>
                <div>
                  <label className={lbl}>Location</label>
                  <input {...register("location")} className={inp} placeholder="e.g. Bangalore, India" />
                  {errors.location && <span className={err}>{errors.location.message}</span>}
                </div>
                <div>
                  <label className={lbl}>LinkedIn (Optional)</label>
                  <input {...register("linkedIn")} className={inp} placeholder="linkedin.com/in/rahul" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className={lbl}>Portfolio / Website (Optional)</label>
                  <input {...register("portfolio")} className={inp} placeholder="rahul.dev" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className={lbl}>Professional Summary</label>
                  <textarea {...register("professionalSummary")} rows={4} className={inp} placeholder="A brief 2-3 line summary of your professional background and goals..." />
                  {errors.professionalSummary && <span className={err}>{errors.professionalSummary.message}</span>}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Work Experience</label>
                    <button type="button" onClick={() => experienceFields.append({ id: Date.now().toString(), company: "", role: "", duration: "", description: "" })} className={addBtn}>
                      <Plus className="w-4 h-4 mr-1" /> Add Experience
                    </button>
                  </div>
                  <div className="space-y-4">
                    {experienceFields.fields.map((field, index) => (
                      <div key={field.id} className="border border-indigo-100 dark:border-indigo-900/40 rounded-xl p-4 bg-indigo-50/30 dark:bg-indigo-950/20 relative">
                        <button type="button" onClick={() => experienceFields.remove(index)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div><label className={lbl}>Job Title / Role</label><input {...register(`experience.${index}.role`)} className={inp} placeholder="e.g. Software Engineer" /></div>
                          <div><label className={lbl}>Company Name</label><input {...register(`experience.${index}.company`)} className={inp} placeholder="e.g. TCS, Infosys" /></div>
                          <div><label className={lbl}>Duration</label><input {...register(`experience.${index}.duration`)} className={inp} placeholder="e.g. Jan 2020 – Mar 2023" /></div>
                          <div><label className={lbl}>Description (Optional)</label><input {...register(`experience.${index}.description`)} className={inp} placeholder="Key responsibilities..." /></div>
                        </div>
                      </div>
                    ))}
                    {experienceFields.fields.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No experience added yet. Click "Add Experience" to begin.</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Education</label>
                    <button type="button" onClick={() => educationFields.append({ id: Date.now().toString(), institute: "", degree: "", year: "" })} className={addBtn}>
                      <Plus className="w-4 h-4 mr-1" /> Add Education
                    </button>
                  </div>
                  <div className="space-y-4">
                    {educationFields.fields.map((field, index) => (
                      <div key={field.id} className="border border-indigo-100 dark:border-indigo-900/40 rounded-xl p-4 bg-indigo-50/30 dark:bg-indigo-950/20 relative">
                        <button type="button" onClick={() => educationFields.remove(index)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="md:col-span-2"><label className={lbl}>Degree / Certificate</label><input {...register(`education.${index}.degree`)} className={inp} placeholder="e.g. B.Tech in Computer Science" /></div>
                          <div><label className={lbl}>Year</label><input {...register(`education.${index}.year`)} className={inp} placeholder="e.g. 2019" /></div>
                          <div className="md:col-span-3"><label className={lbl}>Institution</label><input {...register(`education.${index}.institute`)} className={inp} placeholder="e.g. IIT Bombay" /></div>
                        </div>
                      </div>
                    ))}
                    {educationFields.fields.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No education added yet. Click "Add Education" to begin.</p>}
                  </div>
                </div>
                <div>
                  <label className={lbl}>Skills (comma-separated)</label>
                  <input {...register("skills")} className={inp} placeholder="e.g. React, Node.js, Python, SQL" />
                </div>
                <div>
                  <label className={lbl}>Languages Known (Optional)</label>
                  <input {...register("languages")} className={inp} placeholder="e.g. English, Hindi, Gujarati" />
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Upload Photo</label>
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                    {photoUrl ? (
                      <div className="flex flex-col items-center">
                        <img src={typeof photoUrl === "string" ? photoUrl : ""} alt="Preview" className="w-36 h-36 object-cover rounded-xl shadow-md border-4 border-white mb-4" />
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
                          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                            <span>Upload a photo</span>
                            <input id="job-file-upload" type="file" className="sr-only" onChange={handlePhotoUpload} accept="image/*" />
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
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "⭐ Executive Premium", slug: "executive-premium" },
                      { name: "Elegant Saffron", slug: "elegant-saffron" },
                      { name: "Classic Professional", slug: "classic-professional" },
                      { name: "Professional", slug: "professional" },
                      { name: "Modern", slug: "modern" },
                    ].map((t) => (
                      <button
                        key={t.slug}
                        type="button"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams.toString());
                          params.set("template", t.slug);
                          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                        }}
                        className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col justify-between h-24 ${
                          template === t.slug
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-sm"
                            : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-800 bg-white dark:bg-slate-900"
                        }`}
                      >
                        <span className="font-medium text-sm text-slate-900 dark:text-white leading-tight">{t.name}</span>
                        {template === t.slug && <CheckCircle2 className="w-5 h-5 text-indigo-500 self-end mt-2" />}
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
          <button type="button" onClick={nextStep} className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium hover:opacity-90 transition-transform active:scale-95 shadow-sm">
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
                  saveJobBiodata(vals);
                } catch (e) {
                  console.warn("Could not save to localStorage, it might be full", e);
                }

                const { success, error, record } = await recordSubmission({
                  name: vals.fullName,
                  category: "Job Resume",
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
            className="px-6 py-2 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium hover:opacity-90 transition-transform active:scale-95 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Resume"
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }} className="flex items-center gap-3 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            Resume saved! Click <span className="font-bold mx-1">Download PDF</span> in the preview panel.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
