"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { BiodataFormValues } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { saveBiodata } from "@/lib/storage";
import { recordSubmission } from "@/lib/supabase-service";
import { useSearchParams } from "next/navigation";

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const searchParams = useSearchParams();
  const templateQuery = searchParams.get("template");
  const template = ["classic", "modern", "minimal", "elegant", "royal"].includes(templateQuery || "")
    ? (templateQuery as string)
    : "classic";

  const { register, control, trigger, setValue, watch, getValues, formState: { errors } } = useFormContext<BiodataFormValues>();
  const totalSteps = 5;

  const photoUrl = watch("photo");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("photo", reader.result as string, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const personalFields = useFieldArray({ control, name: "personalCustomFields" });
  const professionalFields = useFieldArray({ control, name: "professionalCustomFields" });
  const familyFields = useFieldArray({ control, name: "familyCustomFields" });
  const partnerFields = useFieldArray({ control, name: "partnerCustomFields" });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step);
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const getFieldsForStep = (s: number): (keyof BiodataFormValues)[] => {
    switch (s) {
      case 1: return ["fullName", "dob", "height", "religion", "caste", "location", "personalCustomFields"];
      case 2: return ["education", "occupation", "income", "professionalCustomFields"];
      case 3: return ["fatherName", "motherName", "siblings", "familyCustomFields"];
      case 4: return ["preferredAge", "preferredLocation", "preferredEducation", "partnerCustomFields"];
      case 5: return ["photo"];
      default: return [];
    }
  };

  const inputClass = "w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";
  const errorClass = "text-red-500 text-xs mt-1 block";

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Custom Language Selector */}
      <LanguageSelector />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Step {step} of {totalSteps}: {
            step === 1 ? "Personal Details" :
              step === 2 ? "Professional Details" :
                step === 3 ? "Family Details" :
                  step === 4 ? "Partner Preferences" : "Upload Photo"
          }
        </h2>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-6">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
      </div>

      <form className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input {...register("fullName")} className={inputClass} placeholder="e.g. Aman Sharma" />
                  {errors.fullName && <span className={errorClass}>{errors.fullName.message}</span>}
                </div>
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input type="date" {...register("dob")} className={inputClass} />
                  {errors.dob && <span className={errorClass}>{errors.dob.message}</span>}
                </div>
                <div>
                  <label className={labelClass}>Height</label>
                  <input {...register("height")} className={inputClass} placeholder="e.g. 5'8&quot;" />
                  {errors.height && <span className={errorClass}>{errors.height.message}</span>}
                </div>
                <div>
                  <label className={labelClass}>Religion</label>
                  <input {...register("religion")} className={inputClass} placeholder="e.g. Hindu" />
                  {errors.religion && <span className={errorClass}>{errors.religion.message}</span>}
                </div>
                <div>
                  <label className={labelClass}>Caste (Optional)</label>
                  <input {...register("caste")} className={inputClass} placeholder="e.g. Brahmin" />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input {...register("location")} className={inputClass} placeholder="e.g. Mumbai, India" />
                  {errors.location && <span className={errorClass}>{errors.location.message}</span>}
                </div>

                {personalFields.fields.map((field, index) => (
                  <div key={field.id} className="col-span-1 md:col-span-2 flex gap-4 items-start mt-2">
                    <div className="flex-1">
                      <input {...register(`personalCustomFields.${index}.label`)} className={inputClass} placeholder="Field Name (e.g. Hobbies)" />
                    </div>
                    <div className="flex-1">
                      <input {...register(`personalCustomFields.${index}.value`)} className={inputClass} placeholder="Value" />
                    </div>
                    <button type="button" onClick={() => personalFields.remove(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="col-span-1 md:col-span-2 pt-2">
                  <button type="button" onClick={() => personalFields.append({ id: Date.now().toString(), label: "", value: "" })} className="flex items-center text-sm font-medium text-pink-600 hover:text-pink-700">
                    <Plus className="w-4 h-4 mr-1" /> Add Custom Field
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Professional Details */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className={labelClass}>Highest Education</label>
                  <input {...register("education")} className={inputClass} placeholder="e.g. MBA from IIM Ahmedabad" />
                  {errors.education && <span className={errorClass}>{errors.education.message}</span>}
                </div>
                <div>
                  <label className={labelClass}>Occupation</label>
                  <input {...register("occupation")} className={inputClass} placeholder="e.g. Software Engineer" />
                  {errors.occupation && <span className={errorClass}>{errors.occupation.message}</span>}
                </div>
                <div>
                  <label className={labelClass}>Annual Income (Optional)</label>
                  <input {...register("income")} className={inputClass} placeholder="e.g. 15 LPA" />
                </div>

                {professionalFields.fields.map((field, index) => (
                  <div key={field.id} className="col-span-1 md:col-span-2 flex gap-4 items-start mt-2">
                    <div className="flex-1">
                      <input {...register(`professionalCustomFields.${index}.label`)} className={inputClass} placeholder="Field Name" />
                    </div>
                    <div className="flex-1">
                      <input {...register(`professionalCustomFields.${index}.value`)} className={inputClass} placeholder="Value" />
                    </div>
                    <button type="button" onClick={() => professionalFields.remove(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="col-span-1 md:col-span-2 pt-2">
                  <button type="button" onClick={() => professionalFields.append({ id: Date.now().toString(), label: "", value: "" })} className="flex items-center text-sm font-medium text-pink-600 hover:text-pink-700">
                    <Plus className="w-4 h-4 mr-1" /> Add Custom Field
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Family Details */}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Father's Name/Occupation</label>
                  <input {...register("fatherName")} className={inputClass} placeholder="e.g. Mr. Anil Sharma (Business)" />
                  {errors.fatherName && <span className={errorClass}>{errors.fatherName.message}</span>}
                </div>
                <div>
                  <label className={labelClass}>Mother's Name/Occupation</label>
                  <input {...register("motherName")} className={inputClass} placeholder="e.g. Mrs. Sunita Sharma (Homemaker)" />
                  {errors.motherName && <span className={errorClass}>{errors.motherName.message}</span>}
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className={labelClass}>Siblings (Optional)</label>
                  <textarea {...register("siblings")} rows={3} className={inputClass} placeholder="e.g. 1 elder brother (Married)" />
                </div>

                {familyFields.fields.map((field, index) => (
                  <div key={field.id} className="col-span-1 md:col-span-2 flex gap-4 items-start mt-2">
                    <div className="flex-1">
                      <input {...register(`familyCustomFields.${index}.label`)} className={inputClass} placeholder="Field Name" />
                    </div>
                    <div className="flex-1">
                      <input {...register(`familyCustomFields.${index}.value`)} className={inputClass} placeholder="Value" />
                    </div>
                    <button type="button" onClick={() => familyFields.remove(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="col-span-1 md:col-span-2 pt-2">
                  <button type="button" onClick={() => familyFields.append({ id: Date.now().toString(), label: "", value: "" })} className="flex items-center text-sm font-medium text-pink-600 hover:text-pink-700">
                    <Plus className="w-4 h-4 mr-1" /> Add Custom Field
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Partner Preferences */}
            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Preferred Age Range</label>
                  <input {...register("preferredAge")} className={inputClass} placeholder="e.g. 26-30 years" />
                </div>
                <div>
                  <label className={labelClass}>Preferred Location</label>
                  <input {...register("preferredLocation")} className={inputClass} placeholder="e.g. Mumbai or Pune" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className={labelClass}>Education / Occupation</label>
                  <input {...register("preferredEducation")} className={inputClass} placeholder="e.g. Well educated, working professional" />
                </div>

                {partnerFields.fields.map((field, index) => (
                  <div key={field.id} className="col-span-1 md:col-span-2 flex gap-4 items-start mt-2">
                    <div className="flex-1">
                      <input {...register(`partnerCustomFields.${index}.label`)} className={inputClass} placeholder="Field Name" />
                    </div>
                    <div className="flex-1">
                      <input {...register(`partnerCustomFields.${index}.value`)} className={inputClass} placeholder="Value" />
                    </div>
                    <button type="button" onClick={() => partnerFields.remove(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="col-span-1 md:col-span-2 pt-2">
                  <button type="button" onClick={() => partnerFields.append({ id: Date.now().toString(), label: "", value: "" })} className="flex items-center text-sm font-medium text-pink-600 hover:text-pink-700">
                    <Plus className="w-4 h-4 mr-1" /> Add Custom Field
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Upload Photo */}
            {step === 5 && (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                {photoUrl ? (
                  <div className="flex flex-col items-center">
                    <img src={typeof photoUrl === 'string' ? photoUrl : URL.createObjectURL(photoUrl[0])} alt="Preview" className="w-40 h-40 object-cover rounded-md shadow-md border-4 border-white mb-4" />
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
                      <label className="relative cursor-pointer rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                        <span>Upload a file</span>
                        <input id="file-upload" type="file" className="sr-only" onChange={handlePhotoUpload} accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </form>

      <div className="flex justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1}
          className="px-6 py-2 rounded-full border border-slate-300 text-slate-700 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 disabled:hover:bg-transparent"
        >
          Back
        </button>
        {step < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:opacity-90 transition-transform active:scale-95 shadow-sm"
          >
            Next Step
          </button>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const isValid = await trigger();
              if (isValid) {
                const vals = getValues();
                // Save to local storage
                saveBiodata(vals);
                
                // Save to Supabase
                const { success, error, record } = await recordSubmission({
                  name: vals.fullName,
                  category: "Matrimonial",
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
              }
            }}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:opacity-90 transition-transform active:scale-95 shadow-sm"
          >
            Save Biodata
          </button>
        )}
      </div>

      {/* Success banner */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            Biodata saved! Click <span className="font-bold mx-1">Download PDF</span> in the preview panel to download.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
