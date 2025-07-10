import { useEffect } from "react";
import { TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import useAddFireSubStation from "../../hooks/useAddFireSubStation";
import {
  FireSubStationSchemaModal,
  fireSubStationSchemaModal,
} from "../../utilities/schema";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

interface AddFireSubStationProps {
  setOpenAddFireSubStaionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
  city: string;
  fireDistrictName: string;
}

const AddFireSubStationModal: React.FC<AddFireSubStationProps> = ({
  setOpenAddFireSubStaionModal,
  setOpenSuccessSnackBar,
  city,
  fireDistrictName,
}) => {
  const queryClient = useQueryClient();
  const { addFireSubStation, isPendingAddFireSubStation, isSuccess } =
    useAddFireSubStation();

  useEffect(() => {
    if (isSuccess) {
      setOpenSuccessSnackBar(true);
      setOpenAddFireSubStaionModal(false);
    }
  }, [setOpenSuccessSnackBar, isSuccess, setOpenAddFireSubStaionModal]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm<FireSubStationSchemaModal>({
    resolver: zodResolver(fireSubStationSchemaModal),
  });

  const onSubmit = async (data: FireSubStationSchemaModal) => {
    const fireDistrict = fireDistrictName;
    const cityFireStation = city;
    const newFireSubStation = { ...data, cityFireStation, fireDistrict };

    try {
      await addFireSubStation(newFireSubStation);
      setValue("name", "");
      setValue("lat", "");
      setValue("long", "");
      queryClient.invalidateQueries({
        queryKey: ["getCityFireSubStation", cityFireStation],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllFireSubStations"],
      });
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
        Add Fire Sub-Station
      </p>
      <form
        className="flex flex-col gap-2 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2 ">
          <label className="font-semibold w-1/2">Fire Sub Station Name:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            {...register("name")}
            error={!!errors["name"]}
            helperText={
              errors["name"]?.message ? String(errors["name"]?.message) : ""
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold w-1/2">Latitude:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            {...register("lat")}
            error={!!errors["lat"]}
            helperText={
              errors["lat"]?.message ? String(errors["lat"]?.message) : ""
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold w-1/2">Longtitude:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            {...register("long")}
            error={!!errors["long"]}
            helperText={
              errors["long"]?.message ? String(errors["long"]?.message) : ""
            }
          />
        </div>
        {errors.root && (
          <div className="text-center text-red-600 uppercase">
            {errors.root.message}{" "}
          </div>
        )}

        <button type="submit" disabled={isPendingAddFireSubStation}>
          {isPendingAddFireSubStation ? (
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

export default AddFireSubStationModal;
