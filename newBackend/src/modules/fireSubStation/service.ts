import FireSubStation from "./model";
import FireDistrict from "../fireDistrict/model";
import CityFireStation from "../cityFireStation/model";
import FireTruck from "../fireTruck/model";
import {
  addFireSubStationSchema,
  AddFireSubStationType,
  addFireTruckSchema,
  AddFireTruckType,
  addAmbulanceSchema,
  AddAmbulanceType,
  fireSubStationSchema,
  FireSubStationType,
} from "./validation";
import Ambulance from "../ambukance/model";

const addFireSubStationService = async (body: AddFireSubStationType) => {
  if (!body || !addFireSubStationSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const fireDistrict = await FireDistrict.findOne({ name: body.fireDistrict });
  const cityFireStation = await CityFireStation.findOne({
    name: body.cityFireStation,
  });

  if (!fireDistrict || !cityFireStation) {
    const error: any = new Error(
      "Fire District of City Fire Station not Found!"
    );
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const savedFireSubStation = await FireSubStation.create({
    fireDistrictId: fireDistrict.id,
    cityFireStationId: cityFireStation.id,
    name: body.name,
    location: {
      lat: body.lat,
      long: body.long,
    },
  });

  const cityFireStationToUpdate = await CityFireStation.findByIdAndUpdate(
    cityFireStation.id,
    { $push: { fireSubStations: savedFireSubStation.id } },
    { new: true, upsert: false }
  );

  if (!cityFireStationToUpdate) {
    const error: any = new Error("City Fire Station not Found!");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  await cityFireStationToUpdate.save();

  return savedFireSubStation;
};

const getCityFireSubStationService = async (city: string) => {
  const cityFireStation = await CityFireStation.findOne({
    name: city,
  });

  if (!cityFireStation) {
    const error: any = new Error("No City Fire Station Found!");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const cityId = cityFireStation.id;
  const fireSubStation = await FireSubStation.find({
    cityFireStationId: cityId,
  });

  return fireSubStation;
};

const getAllFireSubStationService = async () => {
  const fireSubStations = await FireSubStation.find({})
    .populate("fireDistrictId", {
      name: 1,
    })
    .populate("cityFireStationId", {
      name: 1,
    });

  return fireSubStations;
};

const getFireSubStationDetailService = async (id: string) => {
  const fireSubStation = await FireSubStation.findById(id)
    .populate("fireDistrictId", {
      name: 1,
    })
    .populate("cityFireStationId", {
      name: 1,
    })
    .populate("fireTrucks", {
      engineType: 1,
      brand: 1,
      waterCapacity: 1,
      yearAcquired: 1,
      callsign: 1,
    })
    .populate("ambulances", {
      brand: 1,
      yearAcquired: 1,
      callsign: 1,
    });

  return fireSubStation;
};

const addFireTruckService = async (id: string, body: AddFireTruckType) => {
  if (!body || !addFireTruckSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const savedFireTruck = await FireTruck.create({
    subStationId: id,
    engineType: body.engineType,
    brand: body.brand,
    waterCapacity: body.waterCapacity,
    yearAcquired: body.yearAcquired,
    callsign: body.callsign,
    cityStationId: body.cityFireStationId,
    districtStationId: body.fireDistrictId,
  });

  await FireSubStation.findByIdAndUpdate(
    id,
    { $push: { fireTrucks: savedFireTruck.id } },
    { new: true, upsert: false }
  );

  return savedFireTruck;
};

const addAmbulanceService = async (id: string, body: AddAmbulanceType) => {
  if (!body || !addAmbulanceSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const savedAmbulance = await Ambulance.create({
    subStationId: id,
    brand: body.brand,
    yearAcquired: body.yearAcquired,
    callsign: body.callsign,
    cityStationId: body.cityFireStationId,
    districtStationId: body.fireDistrictId,
  });

  await FireSubStation.findByIdAndUpdate(
    id,
    { $push: { ambulances: savedAmbulance.id } },
    { new: true, upsert: false }
  );

  return savedAmbulance;
};

const updateFireSubStationDetailService = async (
  id: string,
  body: FireSubStationType
) => {
  if (!body || !fireSubStationSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const newFireSubStation = {
    name: body.name,
    location: {
      lat: body.lat,
      long: body.long,
    },
  };

  const updateFireSubStation = await FireSubStation.findByIdAndUpdate(
    id,
    newFireSubStation,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  if (!updateFireSubStation) {
    const error: any = new Error("Fire sub-station not found!");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  return updateFireSubStation;
};

export default {
  addFireSubStationService,
  getCityFireSubStationService,
  getAllFireSubStationService,
  getFireSubStationDetailService,
  addFireTruckService,
  addAmbulanceService,
  updateFireSubStationDetailService,
};
