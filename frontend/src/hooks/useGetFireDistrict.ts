import { useSuspenseQuery } from "@tanstack/react-query";
import fireDistrictService from "../services/fireDistrict/fireDistrictService";

const useGetFireDistrict = (id: string) => {
  const { data: fireDistrict, isLoading: isLoadingGetFireDistrict } =
    useSuspenseQuery({
      queryKey: ["getFireDistricts", id],
      queryFn: () => fireDistrictService.getFireDistrict(id),
    });
  return { fireDistrict, isLoadingGetFireDistrict };
};

export default useGetFireDistrict;
