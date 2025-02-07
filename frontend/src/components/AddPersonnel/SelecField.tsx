import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

function SelecField({ label, Controller, control, name, items, errors }) {
  return (
    <FormControl fullWidth size='small'>
      <InputLabel error={!!errors[name]}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <Select labelId='select-labesl' label={label} {...field}>
            {items.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText error>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelecField;
