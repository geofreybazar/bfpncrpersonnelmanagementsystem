import { useMutation } from "@tanstack/react-query";
import userService from "../services/userService";

function useAddPersonnel() {
  const {
    mutateAsync: addPersonnel,
    isPending: isPendingAddPersonnel,
    isSuccess,
    error,
    isError,
    status,
  } = useMutation({
    mutationFn: userService.addPersonnel,
  });

  return {
    addPersonnel,
    isPendingAddPersonnel,
    isSuccess,
    error,
    isError,
    status,
  };
}

export default useAddPersonnel;
