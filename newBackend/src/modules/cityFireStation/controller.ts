import { Request, Response, NextFunction } from "express";
import service from "./service";

const addCityFireStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  try {
    const savednewCityFireStation = await service.addCityFireStationService(
      body
    );
    res.status(201).json(savednewCityFireStation);
    return;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllCityFireStations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cityMunicipalFireStations = await service.getAllCityFireStations();
  res.status(200).json(cityMunicipalFireStations);
  return;
};

export default {
  addCityFireStation,
  getAllCityFireStations,
};
