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
    assignment: z.string().min(1, "Assignment is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    itAdmin: z.boolean(),
    officeOrStation: z.string().min(1, "Office or station is required"),
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

export const fireSubStationSchema = z.object({
  fireDistrict: z.string().min(1, "Fire District is required"),
  cityFireStation: z.string().min(1, "City Fire Station is required"),
  name: z.string().min(1, { message: "Fire Sub station name is required" }),
  long: z
    .string()
    .regex(
      /^[-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/,
      "Invalid longitude"
    ),
  lat: z
    .string()
    .regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, "Invalid latitude"),
});

export type FireSubStationSchema = z.infer<typeof fireSubStationSchema>;

export const fireSubStationSchemaModal = z.object({
  name: z.string().min(1, { message: "Fire Sub station name is required" }),
  long: z
    .string()
    .regex(
      /^[-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/,
      "Invalid longitude"
    ),
  lat: z
    .string()
    .regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, "Invalid latitude"),
});

export type FireSubStationSchemaModal = z.infer<
  typeof fireSubStationSchemaModal
>;

export const fireTruckSchema = z.object({
  engineType: z.string().min(1, { message: "Engine type is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  waterCapacity: z.string(),
  yearAcquired: z.string(),
  callsign: z.string().min(1, { message: "Call sign is required" }),
});

export type FireTruckSchema = z.infer<typeof fireTruckSchema>;

export const ambulanceSchema = z.object({
  brand: z.string().min(1, { message: "Brand is required" }),
  yearAcquired: z.string(),
  callsign: z.string().min(1, { message: "Call sign is required" }),
});

export type AmbulanceSchema = z.infer<typeof ambulanceSchema>;

export const filterSchema = z
  .object({
    rank: z.string(),
    district: z.string(),
    city: z.string(),
    search: z.string(),
  })
  .required();

export type FilterSchema = z.infer<typeof filterSchema>;

export const cityFireOfficesSchema = z.object({
  officeName: z.string().min(1, { message: "Office name is required" }),
});

export type CityFireOfficesSchema = z.infer<typeof cityFireOfficesSchema>;
