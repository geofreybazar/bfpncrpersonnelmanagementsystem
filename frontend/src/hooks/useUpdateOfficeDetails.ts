import { useMutation } from "@tanstack/react-query";
import OfficesService from "../services/offices/OfficesService";

const useUpdateOfficeDetails = () => {
  const {
    mutateAsync: updateOfficeDetail,
    isPending: isPendingUpdateOfficeDetail,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: OfficesService.updateOfficeDetail,
  });

  return {
    updateOfficeDetail,
    isPendingUpdateOfficeDetail,
    isSuccess,
    error,
    isError,
    status,
  };
};
export default useUpdateOfficeDetails;
