import { useMutation } from "@tanstack/react-query";
import FireSubStationService from "../services/fireSubStation/FireSubStationService";

const useAddFireTruck = () => {
  const {
    mutateAsync: addFireTruck,
    isPending: isPendingAddFireTruck,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: FireSubStationService.addFireTruck,
  });

  return {
    addFireTruck,
    isPendingAddFireTruck,
    isSuccess,
    error,
    isError,
    status,
  };
};
export default useAddFireTruck;
