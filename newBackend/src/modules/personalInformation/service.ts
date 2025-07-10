import Personalinformation from "./model";
import { UpdatePersonalinfoServiceType } from "./interface";
import {
  personalInformationSchema,
  PersonalInformationType,
  getPersonalInfoSchema,
  GetPersonalInfoType,
} from "./validation";

const addPersonalinfoService = async (body: PersonalInformationType) => {
  if (!body || !personalInformationSchema.safeParse(body).success) {
    const error: any = new Error("Invalid personal information data");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const personalinfo = await Personalinformation.create(body);
  return personalinfo;
};

const getPersonalInfoService = async (id: GetPersonalInfoType) => {
  if (!id || !getPersonalInfoSchema.safeParse(id).success) {
    const error: any = new Error("Invalid user id");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }

  const personalInfoData = await Personalinformation.findOne({ userId: id });
  if (!personalInfoData) {
    const error: any = new Error("Personal data information not found!");
    error.name = "ValidationError";
    error.status = 500;
    throw error;
  }
  return personalInfoData;
};

const updatePersonalinfoService = async (
  body: UpdatePersonalinfoServiceType
) => {
  const uppdatedPersonalInfo = await Personalinformation.findOneAndUpdate(
    { userId: body.userId },
    body
  );

  if (!uppdatedPersonalInfo) {
    const error: any = new Error("Personal Information not found!");
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  return uppdatedPersonalInfo;
};

export default {
  addPersonalinfoService,
  getPersonalInfoService,
  updatePersonalinfoService,
};
