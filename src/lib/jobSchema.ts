import { z } from "zod";

export const jobExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role/Title is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
});

export const jobEducationSchema = z.object({
  id: z.string(),
  institute: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  year: z.string().optional(),
});

export const jobCustomFieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const jobSchema = z.object({
  // Personal
  fullName: z.string().min(2, "Full name is required"),
  jobTitle: z.string().min(1, "Current/target job title is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  location: z.string().min(1, "Location is required"),
  linkedIn: z.string().optional(),
  portfolio: z.string().optional(),
  photo: z.any().optional(),

  // Summary
  professionalSummary: z.string().min(1, "Professional summary is required"),

  // Experience
  experience: z.array(jobExperienceSchema).optional(),

  // Education
  education: z.array(jobEducationSchema).optional(),

  // Skills
  skills: z.string().optional(),
  languages: z.string().optional(),

  // Custom
  customFields: z.array(jobCustomFieldSchema).optional(),
});

export type JobFormValues = z.infer<typeof jobSchema>;
export type JobExperience = z.infer<typeof jobExperienceSchema>;
export type JobEducation = z.infer<typeof jobEducationSchema>;
export type JobCustomField = z.infer<typeof jobCustomFieldSchema>;
