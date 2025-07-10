import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FireSubStationSchema } from "../../../utilities/schema";

interface TextProps {
  register: UseFormRegister<FireSubStationSchema>;
  errors: FieldErrors;
}

const Text: React.FC<TextProps> = ({ register, errors }) => {
  return (
    <div className="w-1/2">
      <div className="flex items-center gap-2 ">
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

      <div className="flex items-center gap-2">
        <label className="font-semibold w-1/2">Latitude:</label>
        <TextField
          fullWidth
          variant="standard"
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
          variant="standard"
          size="small"
          {...register("long")}
          error={!!errors["long"]}
          helperText={
            errors["long"]?.message ? String(errors["long"]?.message) : ""
          }
        />
      </div>
    </div>
  );
};

export default Text;
