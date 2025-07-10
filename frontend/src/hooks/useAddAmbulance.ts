import { useMutation } from "@tanstack/react-query";
import FireSubStationService from "../services/fireSubStation/FireSubStationService";

const useAddAmbulance = () => {
  const {
    mutateAsync: addAmbulance,
    isPending: isPendingAddAmbulance,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: FireSubStationService.addAmbulance,
  });

  return {
    addAmbulance,
    isPendingAddAmbulance,
    isSuccess,
    error,
    isError,
    status,
  };
};
export default useAddAmbulance;
