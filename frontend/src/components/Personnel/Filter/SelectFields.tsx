import { useEffect, useState } from "react";

import useGetAllFireDistricts from "../../../hooks/useGetAllFireDistricts.js";
import useGetAllCityFireStations from "../../../hooks/useGetAllCityFireStations.js";

import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import variables from "../../../utilities/variables.js";

import { FilterSchema } from "../../../utilities/schema.js";

const rank: string[] = variables.rank;

interface SelectFieldsProps {
  errors: FieldErrors;
  control: Control<FilterSchema>;
  setValue: UseFormSetValue<FilterSchema>;
}

const SelectFields: React.FC<SelectFieldsProps> = ({
  errors,
  control,
  setValue,
}) => {
  const [selectedFireDistrict, setSelectedFireDistrict] = useState("");
  const [fireSubStations, setFireSubStations] = useState<string[]>([]);
  const { fireDistricts, isLoadingGetFireDistricts } = useGetAllFireDistricts();
  const { cityMunicipalFireStations, isLoadingCityMunicipalFireStations } =
    useGetAllCityFireStations();

  const fireDistrictsList = fireDistricts?.map((item) => item.name);

  useEffect(() => {
    if (cityMunicipalFireStations) {
      const filteredStations = cityMunicipalFireStations.filter(
        (station) => station.fireDistrict === selectedFireDistrict
      );
      setFireSubStations(filteredStations.map((station) => station.name));
    }
  }, [selectedFireDistrict, cityMunicipalFireStations, setFireSubStations]);

  if (isLoadingGetFireDistricts && isLoadingCityMunicipalFireStations) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-full flex gap-5">
      <FormControl fullWidth size="small">
        <InputLabel error={!!errors["rank"]}>{"Rank"}</InputLabel>
        <Controller
          name={"rank"}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              variant="standard"
              labelId="select-labesl"
              label={"Rank"}
              {...field}
            >
              {rank.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>
          {(errors["rank"]?.message as string) || ""}
        </FormHelperText>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel error={!!errors["district"]}>{"Fire District"}</InputLabel>
        <Controller
          name={"district"}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              variant="standard"
              labelId="select-labesl"
              label={"Fire District"}
              {...field}
              value={selectedFireDistrict}
              onChange={(e) => {
                setSelectedFireDistrict(e.target.value);
                setValue("city", "");
                field.onChange(e);
              }}
            >
              {fireDistrictsList?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>
          {(errors["district"]?.message as string) || ""}
        </FormHelperText>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel error={!!errors["city"]}>{"City Fire Station"}</InputLabel>
        <Controller
          name={"city"}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              variant="standard"
              disabled={fireSubStations.length === 0}
              label={"City Fire Station"}
              {...field}
            >
              {fireSubStations?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>
          {(errors["city"]?.message as string) || ""}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default SelectFields;
