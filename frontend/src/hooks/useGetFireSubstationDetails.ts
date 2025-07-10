import { useSuspenseQuery } from "@tanstack/react-query";
import FireSubStationService from "../services/fireSubStation/FireSubStationService";

const useGetFireSubstationDetails = (id: string) => {
  const { data: fireSubStation, isLoading: isLoadingfireSubStation } =
    useSuspenseQuery({
      queryKey: ["firesubstaiondetails", id],
      queryFn: () => FireSubStationService.getFireSubStationDetail(id),
    });

  return { fireSubStation, isLoadingfireSubStation };
};

export default useGetFireSubstationDetails;
