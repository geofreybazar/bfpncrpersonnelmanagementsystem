import { Request, Response, NextFunction } from "express";
import service from "./service";
import { filterCaseSchema, getCasesSchema } from "./validation";

const getCases = async (req: Request, res: Response, next: NextFunction) => {
  const parsed = getCasesSchema.safeParse(req.query);
  if (!parsed.success) {
    const error: any = new Error("invalid query");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }
  const query = parsed.data;

  try {
    const { cases, casesLength } = await service.getCasesService(query);
    res.status(201).json({ cases, casesLength });
    return;
  } catch (error) {
    next(error);
  }
};

const getAllCases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cases = await service.getAllCasesService();
    res.status(200).json(cases);
    return;
  } catch (error) {
    next(error);
  }
};

const getCase = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const caseGet = await service.getCaseService(id);
    res.status(200).json(caseGet);
    return;
  } catch (error) {
    next(error);
  }
};

const addCase = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  try {
    const newCase = await service.addCaseService(body);
    res.status(200).json(newCase);
    return;
  } catch (error) {
    next(error);
  }
};

const updateCase = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const caseData = await service.updateCaseService(id, body);

    res.status(200).json(caseData);
    return;
  } catch (error) {
    next(error);
  }
};

const deleteCase = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await service.deleteCaseService(id);
    res.status(204).end();
    return;
  } catch (error) {
    next(error);
  }
};

const generateClearance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const pdfDoc = await service.generateClearanceService(body);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=generated.pdf");

    pdfDoc.pipe(res);
    pdfDoc.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const setEiasApprover = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const approver = await service.setEiasApproverService(id);
    res.status(200).json(approver);
    return;
  } catch (error) {
    next(error);
  }
};

const getIasApprover = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const iasApprover = await service.getIasApproverService();
    res.status(200).json(iasApprover);
    return;
  } catch (error) {
    next(error);
  }
};

const filterCase = async (req: Request, res: Response, next: NextFunction) => {
  const parsed = filterCaseSchema.safeParse(req.query);
  if (!parsed.success) {
    const error: any = new Error("invalid query");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }
  const query = parsed.data;

  try {
    const { cases, casesLength } = await service.filterCaseService(query);

    res.status(200).json({ cases, casesLength });
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addCase,
  getCases,
  getCase,
  updateCase,
  deleteCase,
  getAllCases,
  generateClearance,
  setEiasApprover,
  getIasApprover,
  filterCase,
};
