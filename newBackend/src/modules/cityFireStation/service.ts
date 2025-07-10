import CityFireSation from "./model";
import FireDistrict from "../fireDistrict/model";
import { addCityFireStationSchema, AddCityFireStationType } from "./validation";

const addCityFireStationService = async (body: AddCityFireStationType) => {
  if (!body || !addCityFireStationSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const { name, fireDistrict } = body;

  const savednewCityFireStation = await CityFireSation.create({
    fireDistrict,
    name,
  });
  const selectedFireDistrict = await FireDistrict.findOneAndUpdate(
    { name: fireDistrict },
    { $push: { cities: name } },
    { new: true, upsert: false }
  );
  if (!selectedFireDistrict) {
    const error: any = new Error("Fire District is not found!");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  await selectedFireDistrict.save();
  return savednewCityFireStation;
};

const getAllCityFireStations = async () => {
  const cityMunicipalFireStations = await CityFireSation.find({});
  if (!cityMunicipalFireStations) {
    const error: any = new Error("No City/ Municipal Fire Stations registered");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  return cityMunicipalFireStations;
};

export default {
  addCityFireStationService,
  getAllCityFireStations,
};
