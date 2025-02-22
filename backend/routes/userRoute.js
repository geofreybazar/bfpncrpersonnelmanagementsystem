import express from "express";
import userController from "../controller/userController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const userControllerRouter = express.Router();

userControllerRouter.get(
  "/getallpersonnel",
  authenticateToken,
  userController.getAllPersonnel
);
userControllerRouter.get(
  "/getpersonnel",
  authenticateToken,
  userController.getPersonnel
);
userControllerRouter.post(
  "/addPersonnel",
  authenticateToken,
  userController.addPersonnel
);
userControllerRouter.post("/login", userController.login);
userControllerRouter.post(
  "/generateRefreshToken",
  userController.generateRefreshToken
);
userControllerRouter.put(
  "/updatepersonnel",
  authenticateToken,
  userController.updatePersonnel
);

export default userControllerRouter;
