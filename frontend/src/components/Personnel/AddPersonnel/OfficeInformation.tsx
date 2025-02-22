import React, { useEffect, useState } from "react";
import useGetAllFireDistricts from "../../../hooks/useGetAllFireDistricts";
import useGetAllCityFireStations from "../../../hooks/useGetAllCityFireStations";
import TextFieldComponent from "./TextFieldComponent";

import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { AddPersonnelSchema } from "../../../utilities/schema";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface OfficeInformationProps {
  register: UseFormRegister<AddPersonnelSchema>;
  errors: FieldErrors;
  control: Control<AddPersonnelSchema>;
}
const OfficeInformation: React.FC<OfficeInformationProps> = ({
  register,
  errors,
  control,
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
    <div>
      <div className="w-full bg-gray-100 p-1 font-semibold">
        Office Information
      </div>
      <div className="grid grid-cols-4 gap-10 py-5">
        <FormControl fullWidth size="small">
          <InputLabel error={!!errors["district"]}>
            {"Fire District"}
          </InputLabel>
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
          <InputLabel error={!!errors["city"]}>
            {"City Fire Station"}
          </InputLabel>
          <Controller
            name={"city"}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                variant="standard"
                disabled={fireSubStations.length === 0}
                labelId="select-labesl"
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

        <TextFieldComponent
          label={"Account Number"}
          name={"accountNumber"}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default OfficeInformation;
