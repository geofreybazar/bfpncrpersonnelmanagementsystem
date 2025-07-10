import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddFireDistrict from "../../../hooks/useAddFireDistrict";

import { Snackbar, SnackbarCloseReason, TextField } from "@mui/material";
import { FaSpinner } from "react-icons/fa";
import { AxiosError } from "axios";

const AddFireDistrict = () => {
  const [fireDistrictName, setFireDistrictName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const navigate = useNavigate();

  const {
    addFireDistrict,
    isPendingAddFireDistrict,
    isSuccess,
    error,
    isError,
  } = useAddFireDistrict();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleAddFireDistrict = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addFireDistrict(fireDistrictName);
    } catch (error) {
      const axiosError = error as AxiosError<unknown>;
      const errorData = axiosError.response?.data;

      if (typeof errorData === "string") {
        setErrorMessage(errorData);
      } else if (
        typeof errorData === "object" &&
        errorData !== null &&
        "error" in errorData
      ) {
        setErrorMessage((errorData as { error: string }).error);
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFireDistrictName("");
      setErrorMessage("");
      setOpenSnackBar(true);
    }
  }, [isSuccess]);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <div>
      <button
        onClick={handleBackButton}
        className="text-lg hover:text-lightTurquoise"
      >
        Back
      </button>

      <div className="flex flex-col gap-6 items-center">
        <p className="text-3xl font-semibold">ADD NEW FIRE DISTRICT</p>
        <div className="flex gap-5 items-center">
          <label className="font-semibold">Fire District Name :</label>
          <TextField
            sx={{ width: "250px" }}
            variant="standard"
            size="small"
            value={fireDistrictName}
            onChange={(e) => setFireDistrictName(e.target.value)}
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          onClick={handleAddFireDistrict}
          disabled={isPendingAddFireDistrict}
          className="w-1/6 rounded-md font-semibold"
        >
          {isPendingAddFireDistrict ? (
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
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Fire District successfully added!"
      />
    </div>
  );
};

export default AddFireDistrict;
