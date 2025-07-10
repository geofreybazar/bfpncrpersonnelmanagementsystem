import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "./errorHandler";

export interface RequestWithUser extends Request {
  user?: { accountNumber: string; id: string };
}

const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) {
    const error: AppError = new Error("Access token missing or expired");
    error.name = "TokenExpiredError";
    error.status = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    if (typeof decoded === "object" && decoded.accountNumber && decoded.id) {
      req.user = {
        accountNumber: decoded.accountNumber,
        id: decoded.id,
      };
      next();
    } else {
      const error: AppError = new Error("Invalid token payload") as AppError;
      error.status = 403;
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

export default authenticateToken;
