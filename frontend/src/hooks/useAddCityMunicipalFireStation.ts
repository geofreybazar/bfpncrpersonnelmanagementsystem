import { useMutation } from "@tanstack/react-query";
import cityFireStationService from "../services/cityMunicipalFireStation/cityFireStationService";

const useAddCityMunicipalFireStation = () => {
  const {
    mutateAsync: addCityMunicipalFIreStation,
    isPending: isPendingAddCityMunicipalFIreStation,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: cityFireStationService.addCityMunicipalFireStation,
  });
  return {
    addCityMunicipalFIreStation,
    isPendingAddCityMunicipalFIreStation,
    isSuccess,
    error,
    isError,
    status,
  };
};

export default useAddCityMunicipalFireStation;
