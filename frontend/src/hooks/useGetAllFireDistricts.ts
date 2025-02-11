import { useQuery } from "@tanstack/react-query";
import fireDistrictService from "../services/fireDistrict/fireDistrictService";

const useGetAllFireDistricts = () => {
  const { data: fireDistricts, isLoading: isLoadingGetFireDistricts } =
    useQuery({
      queryKey: ["getAllFireDistricts"],
      queryFn: () => fireDistrictService.getAllFireDistrict(),
    });
  return { fireDistricts, isLoadingGetFireDistricts };
};

export default useGetAllFireDistricts;
