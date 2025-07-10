import Office from "./model";
import CityFireStation from "../cityFireStation/model";
import FireDistrict from "../fireDistrict/model";
import {
  addOffceSchema,
  AddOffceType,
  updateOfficeDetailSchema,
  UpdateOfficeType,
} from "./validation";

const addOfficeService = async (body: AddOffceType) => {
  if (!body || !addOffceSchema.safeParse(body).success) {
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
    const error: any = new Error("No Station found");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const savedCityOffice = await Office.create({
    fireDistrictId: fireDistrict.id,
    cityFireStationId: cityFireStation.id,
    officeName: body.officeName,
  });

  const cityFireStationToUpdate = await CityFireStation.findByIdAndUpdate(
    cityFireStation.id,
    { $push: { offices: savedCityOffice.id } },
    { new: true, upsert: false }
  );

  if (!cityFireStationToUpdate) {
    const error: any = new Error("City fire station not found");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  await cityFireStationToUpdate.save();
  return savedCityOffice;
};

const getCityOfficeService = async (city: string) => {
  if (!city) {
    const error: any = new Error("No inputed city found");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

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

  const returnedOffice = await Office.find({
    cityFireStationId: cityId,
  });

  return returnedOffice;
};

const getOfficeDetailsService = async (id: string) => {
  const office = await Office.findById(id)
    .populate("fireDistrictId", {
      name: 1,
    })
    .populate("cityFireStationId", {
      name: 1,
    })
    .populate("personnel", {
      rank: 1,
      firstName: 1,
      middleName: 1,
      lastName: 1,
      accountNumber: 1,
    });

  return office;
};

const getAllOfficesService = async () => {
  const offices = await Office.find({})
    .populate("fireDistrictId", {
      name: 1,
    })
    .populate("cityFireStationId", {
      name: 1,
    });

  return offices;
};

const updateOfficeDetailService = async (
  id: string,
  body: UpdateOfficeType
) => {
  if (!body || !updateOfficeDetailSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  const updatedOffice = await Office.findByIdAndUpdate(
    id,
    {
      officeName: body.officeName,
    },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  return updatedOffice;
};

export default {
  addOfficeService,
  getCityOfficeService,
  getOfficeDetailsService,
  getAllOfficesService,
  updateOfficeDetailService,
};
