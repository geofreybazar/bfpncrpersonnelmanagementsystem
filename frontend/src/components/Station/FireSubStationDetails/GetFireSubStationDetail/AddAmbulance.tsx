import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";

import useAddAmbulance from "../../../../hooks/useAddAmbulance";

import { AxiosError } from "axios";
import { FaSpinner } from "react-icons/fa";
import { ambulanceSchema, AmbulanceSchema } from "../../../../utilities/schema";

interface AddAmbulanceProps {
  fireSubStation: string;
  fireDistrictId: string;
  cityFireStationId: string;
  setOpenAddAmbulanceModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAddAmbulanceSuccesSnackbar: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const AddAmbulance: React.FC<AddAmbulanceProps> = ({
  fireSubStation,
  setOpenAddAmbulanceModal,
  setOpenAddAmbulanceSuccesSnackbar,
  fireDistrictId,
  cityFireStationId,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AmbulanceSchema>({
    resolver: zodResolver(ambulanceSchema),
  });

  const { addAmbulance, isPendingAddAmbulance, error, isError } =
    useAddAmbulance();

  const onSubmit = async (data: AmbulanceSchema) => {
    const fireSubStationId = fireSubStation;
    const newData = {
      ...data,
      fireSubStationId,
      fireDistrictId,
      cityFireStationId,
    };
    try {
      await addAmbulance(newData);
      queryClient.invalidateQueries({
        queryKey: ["firesubstaiondetails", fireSubStationId],
      });
      setOpenAddAmbulanceSuccesSnackbar(true);
      setOpenAddAmbulanceModal(false);
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
        Add Ambulance
      </p>
      <form
        className="flex flex-col gap-2 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
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
        {errors.root && (
          <div className="text-center text-red-600 uppercase">
            {errors.root.message}{" "}
          </div>
        )}
        <button type="submit" disabled={isPendingAddAmbulance}>
          {isPendingAddAmbulance ? (
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

export default AddAmbulance;
