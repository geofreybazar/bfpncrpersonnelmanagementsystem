import { z } from "zod";

export const addPersonnelSchema = z
  .object({
    rank: z.string().min(1, "Rank is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    suffix: z.string(),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    office: z.string().min(1, "Office is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    role: z.boolean(),
  })
  .required();
