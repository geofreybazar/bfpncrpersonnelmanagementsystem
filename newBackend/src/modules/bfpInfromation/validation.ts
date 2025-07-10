import { z } from "zod";

export const bfpInformationSchema = z.object({
  dateEnteredGovernmentService: z
    .string()
    .min(1, "Date entered government service is required"),
  dateEnteredUniformedServiceToOtherGovernmentAgency: z.string().optional(),
  dateEnteredUniformedFireService: z.string().optional(),
  dateOfLastPromotionTemporary: z.string().optional(),
  dateOfLastPromotionPermanent: z.string().optional(),
  dateAssumedOfficer: z.string().optional(),
  lastTrainingDate: z.string().min(1, "Last training date is required"),
  baseCourse: z.string().min(1, "Base course is required"),
  graduateStudies: z.string().optional(),
  highestEducationalAttainment: z
    .string()
    .min(1, "Highest educational attainment is required"),
  eligibilityType: z.string().min(1, "Eligibility is required"),
  highestEligibility: z.string().min(1, "Highest eligibility is required"),
  highestMandatoryTraining: z
    .string()
    .min(1, "Highest mandatory training is required"),
  itemNumber: z.string().min(1, "Item number is required"),
  appointmentStatus: z.string().min(1, "Appointment Status is required"),
  salaryGrade: z.string().min(1, "Salary grade is required"),
  dutyStatus: z.string().min(1, "Duty status is required"),
  retirementDate: z.string().optional(),
});

export type BfpInformationType = z.infer<typeof bfpInformationSchema>;

export const getBfpInformationSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid user ID");
export type GetBfpInformationType = z.infer<typeof getBfpInformationSchema>;
