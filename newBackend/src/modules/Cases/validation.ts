import { z } from "zod";

export const getCasesSchema = z.object({
  page: z.string(),
  rows: z.string(),
});

export type GetCasesType = z.infer<typeof getCasesSchema>;

export const getCaseSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid user ID");
export type GetCaseType = z.infer<typeof getCaseSchema>;

export const addCaseSchema = z.object({
  caseNumber: z.string().min(1, "Case number is required"),
  complainant: z.string().min(1, "Complainant is required"),
  natureOfOffense: z.string().min(1, "Nature of Offense is required"),
  dateFilled: z.string().min(1, "Date of filling is required"),
  personComplainedUserId: z.string().min(1, "Person complained is required"),
  accountCode: z.string().min(1, "Account code is required"),
  unit: z.string().min(1, "Unit is required"),
  region: z.string().min(1, "Region is required"),
  status: z.string().min(1, "Status is required"),
  actionTaken: z.string().min(1, "Action taken is required"),
  remarks: z.string().min(1, "Remarks is required"),
  investigator: z.string().min(1, "Investigator is required"),
});

export type AddCaseType = z.infer<typeof addCaseSchema>;

export const updateCaseIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid user ID");
export type UpdateCaseIdType = z.infer<typeof updateCaseIdSchema>;

export const deleteCaseSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid user ID");
export type DeleteCaseType = z.infer<typeof deleteCaseSchema>;

export const generateClearanceSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user ID"),
  purpose: z.string().min(1, "Purpose is required"),
});
export type GenerateClearanceType = z.infer<typeof generateClearanceSchema>;

export const filterCaseSchema = z.object({
  status: z.string(),
  fireDistrict: z.string(),
  rank: z.string(),
  cityFireStation: z.string(),
  searchTerm: z.string(),
  page: z.string(),
  rows: z.string(),
});
export type FilterCaseType = z.infer<typeof filterCaseSchema>;
