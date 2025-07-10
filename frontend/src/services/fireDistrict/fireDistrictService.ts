import {
  FireDistricts,
  ReturnedFireDistricts,
} from "../../utilities/models.ts";
import { createAxiosJWT } from "../axiosJWT.ts";

const axiosJWT = createAxiosJWT("/firedistrict");

const addFireDistrict = async (name: string): Promise<string> => {
  const response = await axiosJWT.post("/addfiredistrict", { name });
  return response.data;
};

const getAllFireDistrict = async (): Promise<FireDistricts[]> => {
  const response = await axiosJWT.get("/getallfiredistrict");
  return response.data;
};

const getFireDistrict = async (id: string): Promise<ReturnedFireDistricts> => {
  const response = await axiosJWT.get(`/getfiredistrict?id=${id}`);
  return response.data;
};

export default {
  addFireDistrict,
  getAllFireDistrict,
  getFireDistrict,
};
