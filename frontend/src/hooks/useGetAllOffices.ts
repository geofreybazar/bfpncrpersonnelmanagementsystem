import { useSuspenseQuery } from "@tanstack/react-query";
import OfficesService from "../services/offices/OfficesService";

const useGetAllOffices = () => {
  const {
    error,
    isError,
    data: cityOffices,
    isLoading: isLoadingGetAllCityOffices,
  } = useSuspenseQuery({
    queryKey: ["getAllCityOffices"],
    queryFn: () => OfficesService.getAllOffices(),
  });
  return {
    cityOffices,
    isLoadingGetAllCityOffices,
    error,
    isError,
  };
};

export default useGetAllOffices;
