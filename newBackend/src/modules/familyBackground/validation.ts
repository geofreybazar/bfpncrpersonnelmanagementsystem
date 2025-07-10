import { z } from "zod";

export const familyBackgroundSchema = z.object({
  userId: z.string().optional(),
  spouse: z.object({
    surname: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    suffix: z.string().optional(),
    employerName: z.string().optional(),
    businessAddress: z.string().optional(),
    telephoneNumber: z.string().optional(),
  }),
  father: z.object({
    surname: z.string().min(1, "Surname is required"),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    suffix: z.string().optional(),
  }),
  mother: z.object({
    surname: z.string().min(1, "Surname is required"),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    suffix: z.string().optional(),
  }),
  children: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      dateOfBirth: z.string().min(1, "Date of birth is required"),
    })
  ),
});

export type FamilyBackgroundType = z.infer<typeof familyBackgroundSchema>;
