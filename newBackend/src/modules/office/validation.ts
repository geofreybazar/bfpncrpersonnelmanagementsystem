import { z } from "zod";

export const addOffceSchema = z.object({
  officeName: z.string().min(1, { message: "Office name is required" }),
  fireDistrict: z.string().min(1, { message: "Office name is required" }),
  cityFireStation: z.string().min(1, { message: "Office name is required" }),
});

export type AddOffceType = z.infer<typeof addOffceSchema>;

export const updateOfficeDetailSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  officeName: z.string().min(1, { message: "Office name is required" }),
});

export type UpdateOfficeType = z.infer<typeof updateOfficeDetailSchema>;
