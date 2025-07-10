import { useMutation } from "@tanstack/react-query";
import FireSubStationService from "../services/fireSubStation/FireSubStationService";

const useUpdateFireSubStationDetails = () => {
  const {
    mutateAsync: updateFireSubStation,
    isPending: isPendingUpdateFireSubStation,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: FireSubStationService.updateFireSubStation,
  });

  return {
    updateFireSubStation,
    isPendingUpdateFireSubStation,
    isSuccess,
    error,
    isError,
    status,
  };
};
export default useUpdateFireSubStationDetails;
