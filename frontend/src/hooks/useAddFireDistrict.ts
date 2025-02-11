import { useMutation } from "@tanstack/react-query";
import fireDistrictService from "../services/fireDistrict/fireDistrictService";

function useAddFireDistrict() {
  const {
    mutateAsync: addFireDistrict,
    isPending: isPendingAddFireDistrict,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: fireDistrictService.addFireDistrict,
  });

  return {
    addFireDistrict,
    isPendingAddFireDistrict,
    isSuccess,
    error,
    isError,
    status,
  };
}

export default useAddFireDistrict;
