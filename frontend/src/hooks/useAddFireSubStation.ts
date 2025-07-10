import { useMutation } from "@tanstack/react-query";
import FireSubStationService from "../services/fireSubStation/FireSubStationService";

const useAddFireSubStation = () => {
  const {
    mutateAsync: addFireSubStation,
    isPending: isPendingAddFireSubStation,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: FireSubStationService.addFireSubStations,
  });

  return {
    addFireSubStation,
    isPendingAddFireSubStation,
    isSuccess,
    error,
    isError,
    status,
  };
};

export default useAddFireSubStation;
