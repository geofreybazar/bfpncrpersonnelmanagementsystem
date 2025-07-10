import { useSuspenseQuery } from "@tanstack/react-query";
import userService from "../services/userService";

const useGetPersonnel = (id: string | undefined) => {
  const { data: personnel, isLoading: isLoadingPersonnel } = useSuspenseQuery({
    queryKey: ["getPersonnel", id],
    queryFn: () => userService.getPersonnel(id),
  });

  return { personnel, isLoadingPersonnel };
};

export default useGetPersonnel;
