import { Request, Response, NextFunction } from "express";
import service from "./service";

const addBfpInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const newAddBfpInfo = await service.addBfpInformationService(body);
    res.status(201).json(newAddBfpInfo);
    return;
  } catch (error) {
    next(error);
  }
};

const getBfpInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const bfpInfo = await service.getBfpInformationSevice(id);
    res.status(200).json(bfpInfo);
    return;
  } catch (error) {
    next(error);
  }
};

const updateBfpInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const uppdatedBfpInfo = await service.updateBfpInformationService(body);
    res.status(200).json(uppdatedBfpInfo);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addBfpInformation,
  getBfpInformation,
  updateBfpInformation,
};
