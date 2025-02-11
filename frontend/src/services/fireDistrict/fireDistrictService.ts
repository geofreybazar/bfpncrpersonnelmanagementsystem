import { axiosJWT } from "./fireDistrictAxiosCreate.ts";

import { FireDistricts } from "../../utilities/models.ts";

const addFireDistrict = async (name: string): Promise<string> => {
  const response = await axiosJWT.post("/addfiredistrict", { name });
  return response.data;
};

const getAllFireDistrict = async (): Promise<FireDistricts[]> => {
  const response = await axiosJWT.get("/getfiredistrict");
  return response.data;
};

export default {
  addFireDistrict,
  getAllFireDistrict,
};
