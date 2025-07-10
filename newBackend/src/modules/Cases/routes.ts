import express from "express";
import controller from "./controller";
import authenticateToken from "../../middlewares/authenticateToken";

const CasesRouter = express.Router();

CasesRouter.delete("/:id", authenticateToken, controller.deleteCase);
CasesRouter.post("/", authenticateToken, controller.addCase);
CasesRouter.post(
  "/generateclearance",
  authenticateToken,
  controller.generateClearance
);
CasesRouter.post(
  "/setapprover/:id",
  authenticateToken,
  controller.setEiasApprover
);
CasesRouter.put("/update/:id", authenticateToken, controller.updateCase);
CasesRouter.get("/filter", authenticateToken, controller.filterCase);
CasesRouter.get("/getallcases", authenticateToken, controller.getAllCases);
CasesRouter.get(
  "/getiasapprover",
  authenticateToken,
  controller.getIasApprover
);
CasesRouter.get("/", authenticateToken, controller.getCases);
CasesRouter.get("/:id", authenticateToken, controller.getCase);

export default CasesRouter;
