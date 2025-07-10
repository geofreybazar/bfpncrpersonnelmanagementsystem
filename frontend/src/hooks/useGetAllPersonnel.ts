import { useSuspenseQuery } from "@tanstack/react-query";
import userService from "../services/userService";
import { PageAndRows } from "../utilities/models";

const useGetAllPersonnel = (data: PageAndRows) => {
  const { data: allPersonnel, isLoading: isLoadingGetAllPersonnel } =
    useSuspenseQuery({
      queryKey: ["getAllPersonnel", data.page, data.rowsPerPage],
      queryFn: () => userService.getAllPersonnel(data),
    });
  return { allPersonnel, isLoadingGetAllPersonnel };
};

export default useGetAllPersonnel;
