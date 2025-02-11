import { useNavigate } from "react-router-dom";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const AddCityFIreStation = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
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
        <p className="text-3xl font-semibold">
          ADD NEW CITY/MUNICIFAL FIRE STATION
        </p>
        <div className="flex gap-5 items-center">
          <label className="font-semibold">Select Fire District:</label>
          <TextField
            sx={{ width: "250px" }}
            variant="outlined"
            size="small"
            // error={!!errors[name]}
            // helperText={errors[name]?.message ? String(errors[name]?.message) : ""}
          />
        </div>
        <div className="flex gap-5 items-center">
          <label className="font-semibold">City Fire Station Name:</label>
          <TextField
            sx={{ width: "250px" }}
            variant="outlined"
            size="small"
            // error={!!errors[name]}
            // helperText={errors[name]?.message ? String(errors[name]?.message) : ""}
          />
        </div>
        <button className="w-1/6 bg-turquoise p-2 rounded-md text-white font-semibold hover:bg-lightTurquoise hover:text-black ">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default AddCityFIreStation;
