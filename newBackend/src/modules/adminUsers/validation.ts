import { z } from "zod";

export const personnelSchema = z.object({
  rank: z.string().min(1, "Rank is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().nullable().optional(),
  lastName: z.string().min(1, "Last name is required"),
  suffix: z.string().nullable().optional(),
  accountNumber: z.string().min(1, "Account number is required"),
  role: z.string().min(1, "Role is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  officeOrStation: z.enum(["Office", "Station"]),
  assignment: z.string().min(1, "Assignment is required"),
  email: z.string().email("Invalid email format"),
  itAdmin: z.boolean(),
});

export type PersonnelType = z.infer<typeof personnelSchema>;

export const loginSchema = z.object({
  accountNumber: z.string().min(6, "Invalid Account Number"),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginSchema>;

export const pagesAndRowsSchema = z.object({
  page: z.string(),
  rows: z.string(),
});

export type PagesAndRowsType = z.infer<typeof pagesAndRowsSchema>;

export const filterSchema = z.object({
  rank: z.string().optional(),
  fireDistrict: z.string().optional(),
  cityFireStation: z.string().optional(),
  searchTerm: z.string().optional(),
  page: z.string(),
  rows: z.string(),
});

export type FilterQueryType = z.infer<typeof filterSchema>;

export const logoutSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user ID"),
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type LogoutType = z.infer<typeof logoutSchema>;

export const authencicateUserTokenSchema = z.object({
  token: z.string(),
  refresh: z.string(),
});
export type AuthencicateUserTokenType = z.infer<
  typeof authencicateUserTokenSchema
>;
