import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextFieldComponentProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
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
        variant='standard'
        label={label}
        {...register(name)}
        size='small'
        error={!!errors[name]}
        helperText={errors[name]?.message ? String(errors[name]?.message) : ""}
      />
    </div>
  );
};

export default TextFieldComponent;
