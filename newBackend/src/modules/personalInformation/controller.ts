import { Request, Response, NextFunction } from "express";
import service from "./service";

const addPersonalinfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  try {
    const personalinfo = await service.addPersonalinfoService(body);
    res.status(201).json(personalinfo);
    return;
  } catch (error) {
    next(error);
  }
};

const getPersonalInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const personalInfoData = await service.getPersonalInfoService(id);
    res.status(200).json(personalInfoData);
    return;
  } catch (error) {
    next(error);
  }
};

const updatePersonalinfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const uppdatedPersonalInfo = await service.updatePersonalinfoService(body);

    res.status(200).json(uppdatedPersonalInfo);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addPersonalinfo,
  getPersonalInfo,
  updatePersonalinfo,
};
