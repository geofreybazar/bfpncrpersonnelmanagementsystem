import express from "express";
import authenticateToken from "../../middlewares/authenticateToken";
import controller from "./controller";

const PersonalInfoRouter = express.Router();

PersonalInfoRouter.get("/:id", authenticateToken, controller.getPersonalInfo);
PersonalInfoRouter.post(
  "/addpersonalinfo",
  authenticateToken,
  controller.addPersonalinfo
);
PersonalInfoRouter.put(
  "/updatepersonalinfo/:id",
  authenticateToken,
  controller.updatePersonalinfo
);

export default PersonalInfoRouter;
