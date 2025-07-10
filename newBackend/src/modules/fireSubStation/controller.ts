import { Request, Response, NextFunction } from "express";
import service from "./service";
import { AppError } from "../../middlewares/errorHandler";

const addFireSubStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  try {
    const savedFireSubStation = await service.addFireSubStationService(body);
    res.status(201).json(savedFireSubStation);
    return;
  } catch (error) {
    next(error);
  }
};

const getCityFireSubStation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const city = req.query.city;

  if (!city || typeof city !== "string") {
    const error: AppError = new Error(
      "City query parameter is required and must be a string"
    ) as AppError;
    error.status = 400;
    throw error;
  }

  try {
    const fireSubStation = await service.getCityFireSubStationService(city);
    res.status(200).json(fireSubStation);
    return;
  } catch (error) {
    next(error);
  }
};

const getAllFireSubStation = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fireSubStations = await service.getAllFireSubStationService();
    res.status(200).json(fireSubStations);
    return;
  } catch (error) {
    next(error);
  }
};

const getFireSubStationDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.query.id;

  if (!id || typeof id !== "string") {
    const error: AppError = new Error(
      "Id query parameter is required and must be a string"
    ) as AppError;
    error.status = 400;
    throw error;
  }

  try {
    const fireSubStation = await service.getFireSubStationDetailService(id);
    res.status(200).json(fireSubStation);
    return;
  } catch (error) {
    next(error);
  }
};

const addFireTruck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const savedFireTruck = await service.addFireTruckService(id, body);
    res.status(201).json(savedFireTruck);
    return;
  } catch (error) {
    next(error);
  }
};

const addAmbulance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const savedAmbulance = await service.addAmbulanceService(id, body);
    res.status(201).json(savedAmbulance);
    return;
  } catch (error) {
    next(error);
  }
};

const updateFireSubStationDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateFireSubStation =
      await service.updateFireSubStationDetailService(id, body);

    res.status(200).json(updateFireSubStation);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addFireSubStation,
  getCityFireSubStation,
  getAllFireSubStation,
  getFireSubStationDetail,
  addFireTruck,
  addAmbulance,
  updateFireSubStationDetail,
};
