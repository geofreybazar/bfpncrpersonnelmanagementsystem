import { Request, Response, NextFunction } from "express";
import Applications from "./model";
import { getApplicationsSchema } from "./validation";
import service from "./service";

const getApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = getApplicationsSchema.safeParse(req.query);
  if (!parsed.success) {
    const error: any = new Error("invalid query");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }
  const query = parsed.data;
  try {
    const { applications, applicationsLength } =
      await service.getApplicationsService(query);
    res.status(201).json({ applications, applicationsLength });
    return;
  } catch (error) {
    next(error);
  }
};

const getApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const application = await service.getApplicationService(id);
    res.status(200).json(application);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  getApplications,
  getApplication,
};
