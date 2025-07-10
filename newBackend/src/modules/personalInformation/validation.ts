import { z } from "zod";

export const personalInformationSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  sex: z.string().min(1, "Sex is required"),
  civilStatus: z.string().min(1, "Civil status is required"),
  citizenship: z.string().min(1, "Citizenship is required"),
  height: z.number().min(1, "Height is required"),
  weight: z.number().min(1, "Weight is required"),
  bloodType: z.string().min(1, "Blood type is required"),
  gsisIdNo: z.string(),
  pagIbigNo: z.string().min(1, "Pag-IBIG number is required"),
  philHealthNo: z.string().min(1, "PhilHealth number is required"),
  sssNo: z.string(),
  tinNo: z.string().min(1, "TIN number is required"),
  religion: z.string().min(1, "Religion is required"),
  telephoneNo: z.string(),
  mobileNo: z.string(),
  residentialAddress: z.object({
    houseBlockLotNo: z.string().min(1, "hosue/lot number is required"),
    street: z.string().min(1, "Street is required"),
    subdivisionVillage: z.string().optional(),
    barangay: z.string().min(1, "Barangay is required"),
    cityMunicipality: z.string().min(1, "City/Municipality is required"),
    province: z.string().min(1, "Province is required"),
    zipcode: z.string().min(1, "Zip is required"),
  }),
  permanentAddress: z.object({
    houseBlockLotNo: z.string().min(1, "hosue/lot number is required"),
    street: z.string().min(1, "Street is required"),
    subdivisionVillage: z.string().optional(),
    barangay: z.string().min(1, "Barangay is required"),
    cityMunicipality: z.string().min(1, "City/Municipality is required"),
    province: z.string().min(1, "Province is required"),
    zipcode: z.string().min(1, "Zip is required"),
  }),
});

export type PersonalInformationType = z.infer<typeof personalInformationSchema>;

export const getPersonalInfoSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid user ID");
export type GetPersonalInfoType = z.infer<typeof getPersonalInfoSchema>;
