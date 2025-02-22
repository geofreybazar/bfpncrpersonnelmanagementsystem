import { axiosJWT } from "./cityFireStationAxiosCreate.ts";

import { CityMunicipalFireStations } from "../../utilities/models.ts";

const addCityMunicipalFireStation = async (
  data: Partial<CityMunicipalFireStations>
): Promise<CityMunicipalFireStations> => {
  console.log("HERE");
  console.log(data);
  const response = await axiosJWT.post("/addcityfirestation", data);
  return response.data;
};

const getAllCityMunicipalFireStations = async (): Promise<
  CityMunicipalFireStations[]
> => {
  const response = await axiosJWT.get("/getallcityfirestation");
  return response.data;
};

export default {
  addCityMunicipalFireStation,
  getAllCityMunicipalFireStations,
};
