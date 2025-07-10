import { z } from "zod";

export const addCityFireStationSchema = z.object({
  fireDistrict: z.string().min(1, "Fire District is required"),
  name: z.string().min(1, { message: "City Fire Station name is required" }),
});

export type AddCityFireStationType = z.infer<typeof addCityFireStationSchema>;
