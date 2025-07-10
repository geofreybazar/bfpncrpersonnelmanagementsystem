import { Request, Response, NextFunction } from "express";
import service from "./service";

const addFamilyBackground = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  try {
    const familyBackground = await service.addFamilyBackgroundService(body);
    res.status(201).json(familyBackground);
    return;
  } catch (error) {
    next(error);
  }
};

const getFamilyBackground = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const familyBackground = await service.getFamilyBackgroundService(id);
    res.status(200).json(familyBackground);
    return;
  } catch (error) {
    next(error);
  }
};

const updateFamilyBackground = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  try {
    const updatedFamilyBackground = await service.updateFamilyBackgroundService(
      body
    );
    res.status(200).json(updatedFamilyBackground);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addFamilyBackground,
  getFamilyBackground,
  updateFamilyBackground,
};
