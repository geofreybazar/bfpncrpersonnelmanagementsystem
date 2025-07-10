import express from "express";
import controller from "./controller";
import authenticateToken from "../../middlewares/authenticateToken";

const FamilyBackgroundRouter = express.Router();

FamilyBackgroundRouter.post(
  "/createfamily",
  authenticateToken,
  controller.addFamilyBackground
);
FamilyBackgroundRouter.get(
  "/:id",
  authenticateToken,
  controller.getFamilyBackground
);
FamilyBackgroundRouter.put(
  "/familyupdate",
  authenticateToken,
  controller.updateFamilyBackground
);

export default FamilyBackgroundRouter;
