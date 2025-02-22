import CityFireSation from "../models/CityFIreStation.js";
import FireDistrict from "../models/FireDistrict.js";

const addCityFireStation = async (req, res, next) => {
  const body = req.body;

  const name = body.name;
  const fireDistrict = body.fireDistrict;

  const newCityFireStation = new CityFireSation({
    fireDistrict,
    name,
  });

  try {
    const savednewCityFireStation = await newCityFireStation.save();
    const selectedFireDistrict = await FireDistrict.findOneAndUpdate(
      { name: fireDistrict },
      { $push: { cities: name } },
      { new: true, upsert: false }
    );

    console.log(selectedFireDistrict);
    return res.status(201).json(savednewCityFireStation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllCityFireStations = async (req, res, next) => {
  const cityMunicipalFireStations = await CityFireSation.find({});
  if (!cityMunicipalFireStations) {
    return res
      .status(400)
      .json({ message: "No City/ Municipal Fire Stations registered" });
  }

  return res.status(200).json(cityMunicipalFireStations);
};

export default {
  addCityFireStation,
  getAllCityFireStations,
};
