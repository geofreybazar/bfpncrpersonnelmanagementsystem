import { useSuspenseQuery } from "@tanstack/react-query";
import OfficesService from "../services/offices/OfficesService";

const useGetCityOffices = (city: string) => {
  const {
    error,
    isError,
    data: cityOffices,
    isLoading: isLoadingGetCityOffices,
  } = useSuspenseQuery({
    queryKey: ["getCityOffices", city],
    queryFn: () => OfficesService.getCityOffices(city),
  });
  return {
    cityOffices,
    isLoadingGetCityOffices,
    error,
    isError,
  };
};

export default useGetCityOffices;
