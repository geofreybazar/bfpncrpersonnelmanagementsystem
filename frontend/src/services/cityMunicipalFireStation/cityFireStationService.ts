import { CityMunicipalFireStations } from "../../utilities/models.ts";
import { createAxiosJWT } from "../axiosJWT.ts";

const axiosJWT = createAxiosJWT("/cityfirestations");

const addCityMunicipalFireStation = async (
  data: Partial<CityMunicipalFireStations>
): Promise<CityMunicipalFireStations> => {
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
