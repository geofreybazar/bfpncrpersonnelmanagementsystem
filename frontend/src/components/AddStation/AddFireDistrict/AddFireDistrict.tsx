import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddFireDistrict from "../../../hooks/useAddFireDistrict";

import { TextField } from "@mui/material";

const AddFireDistrict = () => {
  const [fireDistrictName, setFireDistrictName] = useState("");
  const navigate = useNavigate();

  const {
    addFireDistrict,
    isPendingAddFireDistrict,
    isSuccess,
    error,
    isError,
    status,
  } = useAddFireDistrict();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleAddFireDistrict = async (e: React.FormEvent) => {
    e.preventDefault();
    await addFireDistrict(fireDistrictName);
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
            variant="outlined"
            size="small"
            value={fireDistrictName}
            onChange={(e) => setFireDistrictName(e.target.value)}
            // error={!!errors[name]}
            // helperText={errors[name]?.message ? String(errors[name]?.message) : ""}
          />
        </div>
        <button
          onClick={handleAddFireDistrict}
          className="w-1/6 bg-turquoise p-2 rounded-md text-white font-semibold hover:bg-lightTurquoise hover:text-black "
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default AddFireDistrict;
