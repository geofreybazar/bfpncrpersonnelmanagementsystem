import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

const getAllPersonnel = () => {
  const { data: allPersonnel, isLoading: isLoadingGetAllPersonnel } = useQuery({
    queryKey: ["getAllPersonnel"],
    queryFn: () => userService.getAllPersonnel(),
  });
  return { allPersonnel, isLoadingGetAllPersonnel };
};

export default getAllPersonnel;
