import { useSuspenseQuery } from "@tanstack/react-query";
import FireSubStationService from "../services/fireSubStation/FireSubStationService";

const useGetCityFireSubStations = (city: string) => {
  const {
    error,
    isError,
    data: cityFireSubStations,
    isLoading: isLoadingGetCityFireSubStations,
  } = useSuspenseQuery({
    queryKey: ["getCityFireSubStation", city],
    queryFn: () => FireSubStationService.getCityFireSubStation(city),
  });
  return {
    cityFireSubStations,
    isLoadingGetCityFireSubStations,
    error,
    isError,
  };
};

export default useGetCityFireSubStations;
