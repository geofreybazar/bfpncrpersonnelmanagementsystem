import {
  Credential,
  PageAndRows,
  ReturnedGetAllPersonnel,
  ReturnedGetFilteredPersonnel,
  SearchFilter,
} from "../utilities/models.ts";
import { User } from "../utilities/models.ts";
import { createAxiosJWT } from "./axiosJWT.ts";

const axiosJWT = createAxiosJWT("/users");

const login = async (credentials: Credential) => {
  const response = await axiosJWT.post("/login", credentials);
  return response.data;
};

const getAllPersonnel = async (
  data: PageAndRows
): Promise<ReturnedGetAllPersonnel> => {
  const response = await axiosJWT.get(
    `/getallpersonnel?page=${data.page}&rows=${data.rowsPerPage}`
  );
  return response.data;
};

const addPersonnel = async (newPersonnel: Partial<User>): Promise<User[]> => {
  const response = await axiosJWT.post("/addPersonnel", newPersonnel);
  return response.data;
};

const getPersonnel = async (id: string | undefined): Promise<User> => {
  const response = await axiosJWT.get(`/getpersonnel?id=${id}`);
  return response.data;
};

const getAllPersonnelNoPage = async (): Promise<User[]> => {
  const response = await axiosJWT.get("/");
  return response.data;
};

const filterPersonnel = async (
  searchFilter: SearchFilter
): Promise<ReturnedGetFilteredPersonnel> => {
  const response = await axiosJWT.get(
    `/filter?rank=${searchFilter.rank}&fireDistrict=${searchFilter.district}&cityFireStation=${searchFilter.city}&searchTerm=${searchFilter.search}&page=${searchFilter.page}&rows=${searchFilter.rowsPerPage}`
  );
  return response.data;
};

const logout = async () => {
  const response = await axiosJWT.post("logout");
  console.log(response);
  return response.data;
};

export default {
  login,
  getAllPersonnel,
  addPersonnel,
  getPersonnel,
  getAllPersonnelNoPage,
  filterPersonnel,
  logout,
};
