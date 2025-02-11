import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddPersonnelSchema } from "../../utilities/schema";
interface TextFieldComponentProps {
  label: string;
  name: keyof AddPersonnelSchema;
  register: UseFormRegister<AddPersonnelSchema>;
  errors: FieldErrors;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  label,
  name,
  register,
  errors,
}) => {
  return (
    <div>
      <TextField
        fullWidth
        variant="standard"
        label={label}
        {...register(name)}
        size="small"
        error={!!errors[name]}
        helperText={errors[name]?.message ? String(errors[name]?.message) : ""}
      />
    </div>
  );
};

export default TextFieldComponent;
