import { Request, Response, NextFunction } from "express";
import type { RequestWithUser } from "../../middlewares/authenticateToken";
import service from "./service";
import {
  pagesAndRowsSchema,
  filterSchema,
  authencicateUserTokenSchema,
} from "./validation";

const addPersonnel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const newPersonnel = await service.addPersonnelService(body);
    const savedPersonnel = await newPersonnel.save();
    res.status(201).json(savedPersonnel);
    return;
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  try {
    const { id, accessToken, refreshToken } = await service.loginService(body);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
      id: id,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const generateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Refreshing token");
  const refreshToken = req.cookies.refresh_token;

  try {
    const { newAccessToken, newRefreshToken } =
      await service.generateRefreshTokenService(refreshToken);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed" });
    return;
  } catch (error: any) {
    next(error);
  }
};

const getAllPersonnel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = pagesAndRowsSchema.safeParse(req.query);
  if (!parsed.success) {
    const error: any = new Error("invalid query");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }
  const query = parsed.data;

  try {
    const { personnel, personnelLength } = await service.getAllPersonnelService(
      query
    );
    res.json({ personnel, personnelLength });
    return;
  } catch (error) {
    next(error);
  }
};

const getAllPersonnelNopage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const personnel = await service.getAllPersonnelNopageService();
    res.status(200).json(personnel);
    return;
  } catch (error) {
    next(error);
  }
};

const updatePersonnel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const id = req.query.id;

  if (typeof id !== "string") {
    const error: any = new Error("Invalid or missing 'id' query parameter");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  try {
    const updatedPersonel = await service.updatePersonnelService(body, id);
    res.status(200).json(updatedPersonel);
    return;
  } catch (error) {
    next(error);
  }
};

const getPersonnel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.query.id;

  if (typeof userId !== "string") {
    const error: any = new Error("Invalid or missing 'id' query parameter");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  try {
    const personnel = await service.getPersonnelService(userId);
    res.status(200).json(personnel);
  } catch (error) {
    next(error);
  }
};

const filterPersonnel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = filterSchema.safeParse(req.query);
  if (!parsed.success) {
    const error: any = new Error("invalid query");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }
  const query = parsed.data;

  try {
    const { searchedPersonnel, searchedPersonnelLength } =
      await service.filterPersonnel(query);

    res.status(200).json({ searchedPersonnel, searchedPersonnelLength });
    return;
  } catch (error) {
    next(error);
  }
};

const logout = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || typeof req.user === "string") {
    const error: any = new Error("You are not authenticated");
    error.name = "AuthenticationError";
    error.status = 401;
    throw error;
  }
  const id = req.user.id;
  const refreshToken = req.cookies.refresh_token;

  const body = { id, refreshToken };

  try {
    await service.removeRefreshToken(body);

    res.clearCookie("access_token", {
      httpOnly: true,
      // secure: true, for production
      secure: false, //fordevelopment
      sameSite: "none",
      path: "/",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      // secure: true, for production
      secure: false, //fordevelopment
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

const authenticateUserToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const parsed = authencicateUserTokenSchema.safeParse(req.query);
  if (!parsed.success) {
    const error: any = new Error("invalid query");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }
  const query = parsed.data;

  const { token, refresh } = query;

  try {
    const user = await service.authenticateUserTokenService(query);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
      id: user.id,
      accountNumber: user.accountNumber,
      token,
      refresh,
    });
  } catch (error) {
    next(error);
  }
};

const getUserToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  try {
    await service.getUserTokenService(token);

    const tokens = {
      token,
      refreshToken,
    };

    res.status(200).json(tokens);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addPersonnel,
  login,
  generateRefreshToken,
  getAllPersonnel,
  getAllPersonnelNopage,
  updatePersonnel,
  getPersonnel,
  filterPersonnel,
  logout,
  authenticateUserToken,
  getUserToken,
};
