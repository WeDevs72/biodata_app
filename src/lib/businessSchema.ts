import { z } from "zod";

export const businessOfferingSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Service/product name is required"),
  description: z.string().optional(),
});

export const businessAchievementSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Achievement text is required"),
});

export const businessCustomFieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const businessSchema = z.object({
  // About
  ownerName: z.string().min(2, "Owner/Founder name is required"),
  businessName: z.string().min(1, "Business name is required"),
  tagline: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  website: z.string().optional(),
  location: z.string().min(1, "Business location is required"),
  photo: z.any().optional(),

  // Business Info
  industry: z.string().min(1, "Industry/sector is required"),
  established: z.string().optional(),
  employees: z.string().optional(),
  annualTurnover: z.string().optional(),
  gstNumber: z.string().optional(),

  // Offerings & Achievements
  offerings: z.array(businessOfferingSchema).optional(),
  achievements: z.array(businessAchievementSchema).optional(),

  // Custom
  customFields: z.array(businessCustomFieldSchema).optional(),

  // Internal state
  recordId: z.string().optional(),
});

export type BusinessFormValues = z.infer<typeof businessSchema>;
export type BusinessOffering = z.infer<typeof businessOfferingSchema>;
export type BusinessAchievement = z.infer<typeof businessAchievementSchema>;
export type BusinessCustomField = z.infer<typeof businessCustomFieldSchema>;
