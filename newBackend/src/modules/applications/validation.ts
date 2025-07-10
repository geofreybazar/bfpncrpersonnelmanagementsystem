import { z } from "zod";

export const getApplicationsSchema = z.object({
  fireDistrict: z.string(),
  rank: z.string(),
  cityFireStation: z.string(),
  searchTerm: z.string(),
  page: z.string(),
  rows: z.string(),
});

export type GetApplicationsType = z.infer<typeof getApplicationsSchema>;

export const getApplicationSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid user ID");
export type GetApplicationType = z.infer<typeof getApplicationSchema>;
