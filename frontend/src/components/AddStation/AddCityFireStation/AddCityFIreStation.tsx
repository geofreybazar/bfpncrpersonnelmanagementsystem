import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useGetAllFireDistricts from "../../../hooks/useGetAllFireDistricts";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CityMunicipalFireStation,
  cityMunicipalFireStation,
} from "../../../utilities/schema";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";

import useAddCityMunicipalFireStation from "../../../hooks/useAddCityMunicipalFireStation";
import { FaSpinner } from "react-icons/fa";
import { AxiosError } from "axios";

const AddCityFIreStation = () => {
  const navigate = useNavigate();
  const [openSuccesSnackbar, setOpenSuccesSnackbar] = useState(false);
  const handleCloseSnackBar = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccesSnackbar(false);
  };

  const { fireDistricts, isLoadingGetFireDistricts } = useGetAllFireDistricts();
  const fireDistrictsList = fireDistricts?.map((item) => item.name);

  const {
    addCityMunicipalFIreStation,
    isPendingAddCityMunicipalFIreStation,
    isSuccess,
    error,
    isError,
  } = useAddCityMunicipalFireStation();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<CityMunicipalFireStation>({
    resolver: zodResolver(cityMunicipalFireStation),
  });

  useEffect(() => {
    if (isError && error) {
      const axiosError = error as AxiosError<{ error: string }>;
      setError("root", {
        message: axiosError.response?.data.error || "An error occurred",
      });
    }
  }, [isError, error, setError]);

  useEffect(() => {
    if (isSuccess) {
      setOpenSuccesSnackbar(true);
    }
  }, [isSuccess]);

  const handleBackButton = () => {
    navigate(-1);
  };

  if (isLoadingGetFireDistricts) {
    return <p>Loading</p>;
  }

  const onSubmit = async (data: CityMunicipalFireStation) => {
    await addCityMunicipalFIreStation(data);
  };

  return (
    <div>
      <button
        onClick={handleBackButton}
        className="text-lg hover:text-lightTurquoise"
      >
        Back
      </button>
      <p className=" text-center text-3xl font-semibold">
        ADD NEW CITY/MUNICIFAL FIRE STATION
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center p-5 gap-5 w-full"
      >
        <div className="flex gap-2 items-center w-[500px]">
          <label className="font-semibold w-1/2 ">Select Fire District:</label>
          <FormControl fullWidth variant="standard" size="small">
            <Controller
              name="fireDistrict"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Select labelId="select-labesl" {...field}>
                  {fireDistrictsList?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText error={!!errors.fireDistrict}>
              {errors.fireDistrict?.message}
            </FormHelperText>
          </FormControl>
        </div>

        <div className="flex items-center gap-2 w-[500px]">
          <label className="font-semibold w-1/2">City Fire Station Name:</label>
          <TextField
            fullWidth
            variant="standard"
            size="small"
            {...register("name")}
            error={!!errors["name"]}
            helperText={
              errors["name"]?.message ? String(errors["name"]?.message) : ""
            }
          />
        </div>

        {errors.root && (
          <div className="text-center text-red-600 uppercase">
            {errors.root.message}{" "}
          </div>
        )}

        <button type="submit" disabled={isPendingAddCityMunicipalFIreStation}>
          {isPendingAddCityMunicipalFIreStation ? (
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
        message="City Fire Station successfully added!"
      />
    </div>
  );
};

export default AddCityFIreStation;
