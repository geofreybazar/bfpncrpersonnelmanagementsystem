import { useSuspenseQuery } from "@tanstack/react-query";
import OfficesService from "../services/offices/OfficesService";

const useGetCityOfficeDetails = (id: string) => {
  const { data: officeDetail, isLoading: isLoadingOfficeDetail } =
    useSuspenseQuery({
      queryKey: ["officeDetail", id],
      queryFn: () => OfficesService.getCityOfficeDetails(id),
    });

  return { officeDetail, isLoadingOfficeDetail };
};

export default useGetCityOfficeDetails;
