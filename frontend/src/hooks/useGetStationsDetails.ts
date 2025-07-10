import { useSuspenseQueries } from "@tanstack/react-query";
import fireDistrictService from "../services/fireDistrict/fireDistrictService";
import cityFireStationService from "../services/cityMunicipalFireStation/cityFireStationService";
import FireSubStationService from "../services/fireSubStation/FireSubStationService";

const useGetStaionsDetails = () => {
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: ["getAllFireDistricts"],
        queryFn: () => fireDistrictService.getAllFireDistrict(),
      },
      {
        queryKey: ["CityMunicipalFireStations"],
        queryFn: () => cityFireStationService.getAllCityMunicipalFireStations(),
      },
      {
        queryKey: ["getAllFireSubStations"],
        queryFn: () => FireSubStationService.getAllFireSubStations(),
      },
    ],
  });

  return {
    fireDistricts: results[0].data,
    cityMunicipalFireStations: results[1].data,
    fireSubStations: results[2].data,
  };
};

export default useGetStaionsDetails;
