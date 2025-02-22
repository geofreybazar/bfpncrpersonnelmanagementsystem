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
    accountNumber: z.string().min(1, "Account number is required"),
    itAdmin: z.boolean(),
  })
  .required();

export type AddPersonnelSchema = z.infer<typeof addPersonnelSchema>;

export const cityMunicipalFireStation = z.object({
  fireDistrict: z.string().min(1, "Fire District is required"),
  name: z.string().min(1, { message: "City Fire Station name is required" }),
  fireSubStations: z
    .array(
      z.object({
        fireSubStationName: z.string(),
      })
    )
    .optional(),
});

export type CityMunicipalFireStation = z.infer<typeof cityMunicipalFireStation>;
