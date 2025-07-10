import { useForm } from "react-hook-form";

import { TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import _ from "lodash";

import useUpdateFireSubStationDetails from "../../../../hooks/useUpdateFireSubStationDetails.ts";

import { FireSubStations } from "../../../../utilities/models.ts";
import {
  fireSubStationSchemaModal,
  FireSubStationSchemaModal,
} from "../../../../utilities/schema.ts";
import { FaSpinner } from "react-icons/fa";

interface UpdateSubStationProps {
  fireSubStation: FireSubStations;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateSubStation: React.FC<UpdateSubStationProps> = ({
  fireSubStation,
  setOpenUpdateModal,
}) => {
  const queryClient = useQueryClient();
  const { updateFireSubStation, isPendingUpdateFireSubStation, isSuccess } =
    useUpdateFireSubStationDetails();

  const defaultValues = {
    name: fireSubStation.name,
    lat: fireSubStation.location.lat,
    long: fireSubStation.location.long,
  };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FireSubStationSchemaModal>({
    resolver: zodResolver(fireSubStationSchemaModal),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FireSubStationSchemaModal) => {
    const newData = { ...data, id: fireSubStation.id };
    const { name, lat, long } = data;
    if (_.isEqual({ name, lat, long }, defaultValues)) {
      setOpenUpdateModal(false);
      return;
    }

    try {
      await updateFireSubStation(newData);
      queryClient.invalidateQueries({
        queryKey: ["firesubstaiondetails", fireSubStation.id],
      });
      reset();
      setOpenUpdateModal(false);
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
        Edit Fire Sub-Station
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

        <button
          type={isPendingUpdateFireSubStation ? "button" : "submit"}
          disabled={isPendingUpdateFireSubStation}
        >
          {isPendingUpdateFireSubStation ? (
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

export default UpdateSubStation;
