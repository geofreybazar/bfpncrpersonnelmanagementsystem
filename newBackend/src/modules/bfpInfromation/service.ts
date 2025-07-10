import BfpInformation from "./model";

import {
  bfpInformationSchema,
  BfpInformationType,
  getBfpInformationSchema,
  GetBfpInformationType,
} from "./validation";
import { updateBfpInformationSchema } from "./interface";

const addBfpInformationService = async (body: BfpInformationType) => {
  if (!body || !bfpInformationSchema.safeParse(body).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  const newAddBfpInfo = await BfpInformation.create(body);
  return newAddBfpInfo;
};

const getBfpInformationSevice = async (id: GetBfpInformationType) => {
  if (!id || !getBfpInformationSchema.safeParse(id).success) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const bfpInfo = await BfpInformation.findOne({ userId: id });

  if (!bfpInfo) {
    const error: any = new Error("No BFP information found!");
    error.name = "AuthenticationError";
    error.status = 500;
  }
  return bfpInfo;
};

const updateBfpInformationService = async (
  body: updateBfpInformationSchema
) => {
  if (!body) {
    const error: any = new Error("Invalid data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  const uppdatedBfpInfo = await BfpInformation.findOneAndUpdate(
    { userId: body.userId },
    body
  );

  if (!uppdatedBfpInfo) {
    const error: any = new Error("BFP Information not found!");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  return uppdatedBfpInfo;
};

export default {
  addBfpInformationService,
  getBfpInformationSevice,
  updateBfpInformationService,
};
