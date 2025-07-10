import { useSuspenseQuery } from "@tanstack/react-query";
import userService from "../services/userService";

const useGetAllPersonnelNopage = () => {
  const { data: allPersonnel, isLoading: isLoadingGetAllPersonnel } =
    useSuspenseQuery({
      queryKey: ["getAllPersonnelNoPage"],
      queryFn: () => userService.getAllPersonnelNoPage(),
    });
  return { allPersonnel, isLoadingGetAllPersonnel };
};

export default useGetAllPersonnelNopage;
