import { ReturnedOffice, NewOffice } from "../../utilities/models.ts";
import { createAxiosJWT } from "../axiosJWT.ts";

const axiosJWT = createAxiosJWT("/backend_office");

interface UpdateOfficeData {
  officeName: string;
  id: string;
}

const addOffice = async (data: NewOffice) => {
  const response = await axiosJWT.post("/", data);
  return response.data;
};

const getCityOffices = async (city: string): Promise<ReturnedOffice[]> => {
  const response = await axiosJWT.get(`/getcityoffices?city=${city}`);
  return response.data;
};

const getCityOfficeDetails = async (id: string): Promise<ReturnedOffice> => {
  const response = await axiosJWT.get(`/getofficedetails?id=${id}`);
  return response.data;
};

const updateOfficeDetail = async (
  data: UpdateOfficeData
): Promise<ReturnedOffice> => {
  const response = await axiosJWT.put(`/${data.id}`, data);
  return response.data;
};

const getAllOffices = async (): Promise<ReturnedOffice[]> => {
  const response = await axiosJWT.get("/");
  return response.data;
};

export default {
  addOffice,
  getCityOffices,
  getCityOfficeDetails,
  updateOfficeDetail,
  getAllOffices,
};
