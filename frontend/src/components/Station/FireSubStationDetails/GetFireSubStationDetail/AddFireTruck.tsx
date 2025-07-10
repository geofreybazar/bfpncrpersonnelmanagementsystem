import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";

import useAddFireTruck from "../../../../hooks/useAddFireTruck";

import { fireTruckSchema, FireTruckSchema } from "../../../../utilities/schema";
import { AxiosError } from "axios";
import { FaSpinner } from "react-icons/fa";

interface AddFireTruckProps {
  fireSubStation: string;
  fireDistrictId: string;
  cityFireStationId: string;
  setOpenAddFireTruckModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccesSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFireTruck: React.FC<AddFireTruckProps> = ({
  fireSubStation,
  setOpenAddFireTruckModal,
  setOpenSuccesSnackbar,
  fireDistrictId,
  cityFireStationId,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FireTruckSchema>({
    resolver: zodResolver(fireTruckSchema),
  });

  const { addFireTruck, isPendingAddFireTruck, error, isError } =
    useAddFireTruck();

  const onSubmit = async (data: FireTruckSchema) => {
    const fireSubStationId = fireSubStation;
    const newData = {
      ...data,
      fireSubStationId,
      fireDistrictId,
      cityFireStationId,
    };
    try {
      await addFireTruck(newData);
      queryClient.invalidateQueries({
        queryKey: ["firesubstaiondetails", fireSubStationId],
      });
      setOpenSuccesSnackbar(true);
      setOpenAddFireTruckModal(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      setError("root", {
        message: axiosError.response?.data.error || "An error occurred",
      });
    }
  };

  if (isError) {
    console.log(error);
  }

  return (
    <div className="w-full">
      <p className="text-left rounded-t-2xl text-white uppercase bg-turquoise font-semibold text-xl p-5">
        Add Fire Truck
      </p>
      <form
        className="flex flex-col gap-2 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <div className="flex items-center gap-2 ">
          <label className="font-semibold w-1/2">Engine Type:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            {...register("engineType")}
            error={!!errors["engineType"]}
            helperText={
              errors["engineType"]?.message
                ? String(errors["engineType"]?.message)
                : ""
            }
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label className="font-semibold w-1/2">Brand:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            {...register("brand")}
            error={!!errors["brand"]}
            helperText={
              errors["brand"]?.message ? String(errors["brand"]?.message) : ""
            }
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label className="font-semibold w-1/2">Water Capicity:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            {...register("waterCapacity")}
            error={!!errors["waterCapacity"]}
            helperText={
              errors["waterCapacity"]?.message
                ? String(errors["waterCapacity"]?.message)
                : ""
            }
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label className="font-semibold w-1/2">Year acquired:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            {...register("yearAcquired")}
            error={!!errors["yearAcquired"]}
            helperText={
              errors["yearAcquired"]?.message
                ? String(errors["yearAcquired"]?.message)
                : ""
            }
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label className="font-semibold w-1/2">Call sign:</label>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            {...register("callsign")}
            error={!!errors["callsign"]}
            helperText={
              errors["callsign"]?.message
                ? String(errors["callsign"]?.message)
                : ""
            }
          />
        </div>
        <button type="submit" disabled={isPendingAddFireTruck}>
          {isPendingAddFireTruck ? (
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

export default AddFireTruck;
