import express from "express";
import userController from "../controller/userController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const userControllerRouter = express.Router();

userControllerRouter.get(
  "/getpersonnel",
  authenticateToken,
  userController.getAllPersonnel
);
userControllerRouter.post("/addPersonnel", userController.addPersonnel);
userControllerRouter.post("/login", userController.login);
userControllerRouter.post(
  "/generateRefreshToken",
  userController.generateRefreshToken
);

export default userControllerRouter;
