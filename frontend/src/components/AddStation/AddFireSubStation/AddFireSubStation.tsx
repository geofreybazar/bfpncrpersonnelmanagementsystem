import { lazy, Suspense } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAddFireSubStation from "../../../hooks/useAddFireSubStation";

import {
  FireSubStationSchema,
  fireSubStationSchema,
} from "../../../utilities/schema";

import { FaSpinner } from "react-icons/fa";
import { AxiosError } from "axios";

import { Skeleton, Snackbar, SnackbarCloseReason } from "@mui/material";

import Text from "./Text";

const Fields = lazy(() => import("./Fields"));

const AddFireSubStation = () => {
  const navigate = useNavigate();

  const [openSuccesSnackbar, setOpenSuccesSnackbar] = useState(false);
  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccesSnackbar(false);
  };

  const { addFireSubStation, isPendingAddFireSubStation, isSuccess } =
    useAddFireSubStation();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    setValue,
  } = useForm<FireSubStationSchema>({
    resolver: zodResolver(fireSubStationSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenSuccesSnackbar(true);
    }
  }, [isSuccess]);

  const handleBackButton = () => {
    navigate(-1);
  };

  const onSubmit = async (data: FireSubStationSchema) => {
    try {
      await addFireSubStation(data);
      setValue("cityFireStation", "");
      setValue("fireDistrict", "");
      setValue("name", "");
      setValue("lat", "");
      setValue("long", "");
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      setError("root", {
        message: axiosError.response?.data.error || "An error occurred",
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleBackButton}
        className="text-lg hover:text-lightTurquoise"
      >
        Back
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center p-5 gap-5 w-full"
      >
        <Suspense
          fallback={<Skeleton variant="rectangular" width="50%" height={50} />}
        >
          <Fields errors={errors} control={control} />
        </Suspense>

        <Text register={register} errors={errors} />

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

      <Snackbar
        open={openSuccesSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Fire Sub Station successfully added!"
      />
    </div>
  );
};

export default AddFireSubStation;
