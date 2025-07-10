import { z } from "zod";

export const addFireSubStationSchema = z.object({
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
  fireDistrict: z.string().min(1, "Fire District is required"),
  cityFireStation: z.string().min(1, "City Fire Station is required"),
});

export type AddFireSubStationType = z.infer<typeof addFireSubStationSchema>;

export const addFireTruckSchema = z.object({
  engineType: z.string().min(1, { message: "Engine type is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  waterCapacity: z.string(),
  yearAcquired: z.string(),
  callsign: z.string().min(1, { message: "Call sign is required" }),
  fireSubStationId: z
    .string()
    .min(1, { message: "Fire sub-station id is required" }),
  fireDistrictId: z
    .string()
    .min(1, { message: "Fire district id is required" }),
  cityFireStationId: z
    .string()
    .min(1, { message: "City fire station id is required" }),
});

export type AddFireTruckType = z.infer<typeof addFireTruckSchema>;

export const addAmbulanceSchema = z.object({
  brand: z.string().min(1, { message: "Brand is required" }),
  yearAcquired: z.string(),
  callsign: z.string().min(1, { message: "Call sign is required" }),
  fireSubStationId: z
    .string()
    .min(1, { message: "Fire sub-station id is required" }),
  fireDistrictId: z
    .string()
    .min(1, { message: "Fire district id is required" }),
  cityFireStationId: z
    .string()
    .min(1, { message: "City fire station id is required" }),
});

export type AddAmbulanceType = z.infer<typeof addAmbulanceSchema>;

export const fireSubStationSchema = z.object({
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

export type FireSubStationType = z.infer<typeof fireSubStationSchema>;
