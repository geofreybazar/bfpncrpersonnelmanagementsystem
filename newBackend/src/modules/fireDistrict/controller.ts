import { Request, Response, NextFunction } from "express";
import service from "./service";
import { AppError } from "../../middlewares/errorHandler";

const addFireDistrict = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.body.name;
  try {
    const mewFireDistrict = await service.addFireDistrictService(name);
    res.status(201).json(mewFireDistrict);
    return;
  } catch (error) {
    next(error);
  }
};

const getAllFireDistrict = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fireDistricts = await service.getAllFireDistrictService();
    res.status(200).json(fireDistricts);
    return;
  } catch (error) {
    next(error);
  }
};

const getFireDistrict = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.query.id;

  if (!id || typeof id !== "string") {
    const error: AppError = new Error(
      "City query parameter is required and must be a string"
    ) as AppError;
    error.status = 400;
    throw error;
  }
  try {
    const fireDistrict = await service.getFireDistrictService(id);
    res.status(200).json(fireDistrict);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addFireDistrict,
  getAllFireDistrict,
  getFireDistrict,
};
