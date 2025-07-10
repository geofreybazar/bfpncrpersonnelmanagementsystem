import { useForm } from "react-hook-form";

import { TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import _ from "lodash";

import useUpdateOfficeDetails from "../../../hooks/useUpdateOfficeDetails";

import { ReturnedOffice } from "../../../utilities/models";
import {
  CityFireOfficesSchema,
  cityFireOfficesSchema,
} from "../../../utilities/schema";
import { FaSpinner } from "react-icons/fa";

interface UpdateOfficeProps {
  officeDetail: ReturnedOffice;
  setOpenUpdateOffice: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateOffice: React.FC<UpdateOfficeProps> = ({
  officeDetail,
  setOpenUpdateOffice,
}) => {
  const queryClient = useQueryClient();
  const { updateOfficeDetail, isPendingUpdateOfficeDetail, isSuccess } =
    useUpdateOfficeDetails();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CityFireOfficesSchema>({
    resolver: zodResolver(cityFireOfficesSchema),
    defaultValues: {
      officeName: officeDetail.officeName,
    },
  });

  const onSubmit = async (data: CityFireOfficesSchema) => {
    const newData = { ...data, id: officeDetail.id };

    const officeName = data.officeName;
    if (_.isEqual(officeName, officeDetail.officeName)) {
      setOpenUpdateOffice(false);
      return;
    }

    try {
      await updateOfficeDetail(newData);
      queryClient.invalidateQueries({
        queryKey: ["officeDetail", officeDetail.id],
      });
      reset();
      setOpenUpdateOffice(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      setError("root", {
        message: axiosError.response?.data.error || "An error occurred",
      });
    }
  };

  return (
    <div className="w-full">
      <p className="text-left text-white rounded-t-2xl uppercase bg-turquoise font-semibold text-xl p-5">
        Edit Office
      </p>
      <form
        className="flex flex-col gap-2 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2 ">
          <label className="font-semibold w-1/2">Office Name:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            {...register("officeName")}
            error={!!errors["officeName"]}
            helperText={
              errors["officeName"]?.message
                ? String(errors["officeName"]?.message)
                : ""
            }
          />
        </div>

        {errors.root && (
          <div className="text-center text-red-600 uppercase">
            {errors.root.message}{" "}
          </div>
        )}

        <button
          type={isPendingUpdateOfficeDetail ? "button" : "submit"}
          disabled={isPendingUpdateOfficeDetail}
        >
          {isPendingUpdateOfficeDetail ? (
            <div className="flex justify-center p-2 rounded-md items-center gap-2 bg-lightTurquoise">
              <FaSpinner className="animate-spin" />
              <p>Submitting</p>
            </div>
          ) : (
            <div className="bg-turquoise p-2 rounded-md text-white hover:bg-lightTurquoise hover:text-black">
              SUBMIT
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateOffice;
