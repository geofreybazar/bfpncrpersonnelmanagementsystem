import { Credential } from "../utilities/models.ts";
import { User } from "../utilities/models.ts";

import { axiosJWT } from "./userAxiosCreate.ts";

const login = async (credentials: Credential) => {
  const response = await axiosJWT.post("/login", credentials);
  return response.data;
};

const getAllPersonnel = async (): Promise<User[]> => {
  const response = await axiosJWT.get("/getallpersonnel");
  return response.data;
};

const addPersonnel = async (newPersonnel: Partial<User>): Promise<User[]> => {
  const response = await axiosJWT.post("/addPersonnel", newPersonnel);
  return response.data;
};

const getPersonnel = async (id: string | null): Promise<User> => {
  const response = await axiosJWT.get(`/getpersonnel?id=${id}`);
  return response.data;
};

export default {
  login,
  getAllPersonnel,
  addPersonnel,
  getPersonnel,
};
