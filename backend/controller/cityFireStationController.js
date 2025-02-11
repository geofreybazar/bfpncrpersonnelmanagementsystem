import CityFireSation from "../models/CityFIreStation.js";

const addCityFireStation = async (req, res, next) => {
  const body = req.body;

  const name = body.name;
  const district = body.district;

  const newCityFireStation = new CityFireSation({
    name,
    district,
  });

  try {
    const savednewCityFireStation = await newCityFireStation.save();
    return res.status(201).json(savednewCityFireStation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default {
  addCityFireStation,
};
