import { Request, Response, NextFunction } from "express";
import service from "./service";
import { AppError } from "../../middlewares/errorHandler";

const addOffice = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    const savedCityOffice = await service.addOfficeService(body);

    res.status(201).json(savedCityOffice);
    return;
  } catch (error) {
    next(error);
  }
};

const getCityOffices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { city } = req.query;

  if (!city || typeof city !== "string") {
    const error: AppError = new Error(
      "City query parameter is required and must be a string"
    ) as AppError;
    error.status = 400;
    throw error;
  }

  try {
    const returnedOffice = await service.getCityOfficeService(city);
    res.status(200).json(returnedOffice);
    return;
  } catch (error) {
    next(error);
  }
};

const getOfficeDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.query.id;

  if (!id || typeof id !== "string") {
    const error: AppError = new Error(
      "id query parameter is required and must be a string"
    ) as AppError;
    error.status = 400;
    throw error;
  }

  try {
    const office = await service.getOfficeDetailsService(id);
    res.status(200).json(office);
    return;
  } catch (error) {
    next(error);
  }
};

const getAllOffices = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const offices = await service.getAllOfficesService();
    if (!offices) {
      res.status(404).json({ error: "No offices found!" });
    }
    res.status(200).json(offices);
    return;
  } catch (error) {
    next(error);
  }
};

const updateOfficeDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  if (!id || typeof id !== "string") {
    const error: AppError = new Error(
      "id query parameter is required and must be a string"
    ) as AppError;
    error.status = 400;
    throw error;
  }

  const body = req.body;

  try {
    const updatedOffice = await service.updateOfficeDetailService(id, body);
    if (!updatedOffice) {
      res.status(404).send({ error: "Office not found!" });
      return;
    }
    res.status(200).json(updatedOffice);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addOffice,
  getCityOffices,
  getOfficeDetails,
  getAllOffices,
  updateOfficeDetail,
};
