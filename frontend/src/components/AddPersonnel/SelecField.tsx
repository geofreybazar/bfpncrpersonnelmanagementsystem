import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { AddPersonnelSchema } from "../../utilities/schema";

interface SelectFieldProps {
  label: string;
  control: Control<AddPersonnelSchema>;
  name: keyof AddPersonnelSchema;
  items: string[] | undefined;
  errors: FieldErrors<AddPersonnelSchema>;
}

const SelecField: React.FC<SelectFieldProps> = ({
  label,
  control,
  name,
  items,
  errors,
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel error={!!errors[name]}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select labelId="select-labesl" label={label} {...field}>
            {items?.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{(errors[name]?.message as string) || ""}</FormHelperText>
    </FormControl>
  );
};

export default SelecField;
