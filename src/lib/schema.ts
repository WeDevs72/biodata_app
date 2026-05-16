import { z } from "zod";

export const customFieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required")
});

export const biodataSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  height: z.string().min(1, "Height is required"),
  religion: z.string().min(1, "Religion is required"),
  caste: z.string().optional(),
  location: z.string().min(1, "Location is required"),

  education: z.string().min(1, "Highest education is required"),
  occupation: z.string().min(1, "Occupation is required"),
  income: z.string().optional(),

  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  siblings: z.string().optional(),

  preferredAge: z.string().optional(),
  preferredLocation: z.string().optional(),
  preferredEducation: z.string().optional(),

  photo: z.any().optional(),
  religiousSymbol: z.string().optional(),

  personalCustomFields: z.array(customFieldSchema).optional(),
  professionalCustomFields: z.array(customFieldSchema).optional(),
  familyCustomFields: z.array(customFieldSchema).optional(),
  partnerCustomFields: z.array(customFieldSchema).optional(),
  
  // Internal state
  recordId: z.string().optional(),
});

export type BiodataFormValues = z.infer<typeof biodataSchema>;
export type CustomField = z.infer<typeof customFieldSchema>;
