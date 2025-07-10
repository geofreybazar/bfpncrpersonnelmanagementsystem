import { useMutation } from "@tanstack/react-query";
import OfficesService from "../services/offices/OfficesService";

const useAddOffice = () => {
  const {
    mutateAsync: addOffice,
    isPending: isPendingAddOffice,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: OfficesService.addOffice,
  });

  return {
    addOffice,
    isPendingAddOffice,
    isSuccess,
    error,
    isError,
    status,
  };
};

export default useAddOffice;
