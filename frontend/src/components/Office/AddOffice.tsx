import { useEffect } from "react";
import { TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import useAddOffice from "../../hooks/useAddOffice";
import {
  cityFireOfficesSchema,
  CityFireOfficesSchema,
} from "../../utilities/schema";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

interface AddOfficeProps {
  setOpenAddCityOffice: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
  city: string;
  fireDistrictName: string;
}

const AddOffice: React.FC<AddOfficeProps> = ({
  setOpenAddCityOffice,
  setOpenSuccessSnackBar,
  city,
  fireDistrictName,
}) => {
  const queryClient = useQueryClient();

  const { addOffice, isPendingAddOffice, isSuccess } = useAddOffice();

  useEffect(() => {
    if (isSuccess) {
      setOpenSuccessSnackBar(true);
      setOpenAddCityOffice(false);
    }
  }, [setOpenSuccessSnackBar, isSuccess, setOpenAddCityOffice]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm<CityFireOfficesSchema>({
    resolver: zodResolver(cityFireOfficesSchema),
  });

  const onSubmit = async (data: CityFireOfficesSchema) => {
    const fireDistrict = fireDistrictName;
    const cityFireStation = city;
    const newFireSubStation = { ...data, cityFireStation, fireDistrict };

    try {
      await addOffice(newFireSubStation);
      setValue("officeName", "");
      queryClient.invalidateQueries({
        queryKey: ["getCityOffices", cityFireStation],
      });
      //   queryClient.invalidateQueries({
      //     queryKey: ["getAllFireSubStations"],
      //   });
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
        Add Office
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

        <button type="submit" disabled={isPendingAddOffice}>
          {isPendingAddOffice ? (
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

export default AddOffice;
