import {
  FireSubStations,
  AddFireSubStion,
  NewFireTruck,
  NewAmbulance,
  UpdateFireSubStation,
} from "../../utilities/models.ts";

import { createAxiosJWT } from "../axiosJWT.ts";

const axiosJWT = createAxiosJWT("/firesubstation");

const addFireSubStations = async (
  data: AddFireSubStion
): Promise<FireSubStations> => {
  const response = await axiosJWT.post("/addfiresubstation", data);
  return response.data;
};

const getAllFireSubStations = async (): Promise<FireSubStations[]> => {
  const response = await axiosJWT.get("/getallfiresubstation");
  return response.data;
};

const getCityFireSubStation = async (
  city: string
): Promise<FireSubStations[]> => {
  const response = await axiosJWT.get(`/getcityfiresubstation?city=${city}`);
  return response.data;
};

const getFireSubStationDetail = async (
  id: string
): Promise<FireSubStations> => {
  const response = await axiosJWT.get(`/getfiresubstationdetials?id=${id}`);
  return response.data;
};

const addFireTruck = async (data: NewFireTruck) => {
  const response = await axiosJWT.post(
    `/addfiretruck/${data.fireSubStationId}`,
    data
  );
  return response.data;
};

const addAmbulance = async (data: NewAmbulance) => {
  const response = await axiosJWT.post(
    `/addambulance/${data.fireSubStationId}`,
    data
  );
  return response.data;
};

const updateFireSubStation = async (data: Partial<UpdateFireSubStation>) => {
  const response = await axiosJWT.put(`/updatefiresubstaion/${data.id}`, data);
  return response.data;
};

export default {
  addFireSubStations,
  getAllFireSubStations,
  getCityFireSubStation,
  getFireSubStationDetail,
  addFireTruck,
  addAmbulance,
  updateFireSubStation,
};
