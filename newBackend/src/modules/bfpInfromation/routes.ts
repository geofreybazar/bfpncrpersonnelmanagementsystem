import express from "express";
import controller from "./controller";
import authenticateToken from "../../middlewares/authenticateToken";

const BfpInformationRouter = express.Router();

BfpInformationRouter.post(
  "/addbfpinformation",
  authenticateToken,
  controller.addBfpInformation
);
BfpInformationRouter.get(
  "/:id",
  authenticateToken,
  controller.getBfpInformation
);
BfpInformationRouter.put(
  "/updatebfpinfo/",
  authenticateToken,
  controller.updateBfpInformation
);

export default BfpInformationRouter;
