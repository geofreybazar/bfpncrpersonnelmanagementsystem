import { useSuspenseQuery } from "@tanstack/react-query";
import FireSubStationService from "../services/fireSubStation/FireSubStationService";

const useGetAllFireSubStations = () => {
  const { data: fireSubStations, isLoading: isLoadingGetfireSubStations } =
    useSuspenseQuery({
      queryKey: ["getAllFireSubStations"],
      queryFn: () => FireSubStationService.getAllFireSubStations(),
    });
  return { fireSubStations, isLoadingGetfireSubStations };
};

export default useGetAllFireSubStations;
