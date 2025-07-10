import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";
import { FilterSchema } from "../utilities/schema";

const useGetFilteredPersonnel = (
  data: FilterSchema,
  page: number,
  rowsPerPage: number,
  enabled: boolean
) => {
  const newData = { ...data, page, rowsPerPage };
  const { data: filteredPersonnel, isLoading: isLoadingGetfilteredPersonnel } =
    useQuery({
      queryKey: ["filteredPersonnel", newData],
      queryFn: () => userService.filterPersonnel(newData),
      enabled: enabled,
    });
  return { filteredPersonnel, isLoadingGetfilteredPersonnel };
};

export default useGetFilteredPersonnel;
