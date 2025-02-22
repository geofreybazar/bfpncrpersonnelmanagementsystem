import { useSuspenseQuery } from "@tanstack/react-query";
import cityFireStationService from "../services/cityMunicipalFireStation/cityFireStationService";

const useGetAllCityFireStations = () => {
  const {
    data: cityMunicipalFireStations,
    isLoading: isLoadingCityMunicipalFireStations,
  } = useSuspenseQuery({
    queryKey: ["CityMunicipalFireStations"],
    queryFn: () => cityFireStationService.getAllCityMunicipalFireStations(),
  });

  return { cityMunicipalFireStations, isLoadingCityMunicipalFireStations };
};

export default useGetAllCityFireStations;
