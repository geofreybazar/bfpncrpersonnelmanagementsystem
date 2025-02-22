import { useSuspenseQuery } from "@tanstack/react-query";
import fireDistrictService from "../services/fireDistrict/fireDistrictService";

const useGetAllFireDistricts = () => {
  const { data: fireDistricts, isLoading: isLoadingGetFireDistricts } =
    useSuspenseQuery({
      queryKey: ["getAllFireDistricts"],
      queryFn: () => fireDistrictService.getAllFireDistrict(),
    });
  return { fireDistricts, isLoadingGetFireDistricts };
};

export default useGetAllFireDistricts;
