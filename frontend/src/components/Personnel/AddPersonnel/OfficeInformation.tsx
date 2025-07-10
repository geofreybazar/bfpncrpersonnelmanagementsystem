import React, { useEffect, useState } from "react";
import TextFieldComponent from "./TextFieldComponent";

import useGetAllFireDistricts from "../../../hooks/useGetAllFireDistricts";
import useGetAllCityFireStations from "../../../hooks/useGetAllCityFireStations";
import useGetAllFireSubStations from "../../../hooks/useGetAllFireSubStations";
import useGetAllOffices from "../../../hooks/useGetAllOffices";

import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
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
  setValue: UseFormSetValue<AddPersonnelSchema>;
  watch: UseFormWatch<AddPersonnelSchema>;
  register: UseFormRegister<AddPersonnelSchema>;
  errors: FieldErrors;
  control: Control<AddPersonnelSchema>;
}
const OfficeInformation: React.FC<OfficeInformationProps> = ({
  setValue,
  watch,
  register,
  errors,
  control,
}) => {
  const [selectedFireDistrict, setSelectedFireDistrict] = useState("");
  const [cityFireStationsDropdown, setCityFireStationsDropdown] = useState<
    string[]
  >([]);

  const [assignment, setAssignment] = useState<string[]>([]);

  const { fireDistricts, isLoadingGetFireDistricts } = useGetAllFireDistricts();
  const { cityMunicipalFireStations, isLoadingCityMunicipalFireStations } =
    useGetAllCityFireStations();
  const { fireSubStations, isLoadingGetfireSubStations } =
    useGetAllFireSubStations();

  const { cityOffices, isLoadingGetAllCityOffices } = useGetAllOffices();

  const watchCity = watch("city");
  const watchOfficeOrStation = watch("officeOrStation");

  const fireDistrictsList = fireDistricts.map((item) => item.name);

  useEffect(() => {
    if (watchOfficeOrStation === "Station") {
      setAssignment(
        fireSubStations
          .filter((item) => item.cityFireStationId.name === watchCity)
          .map((item) => item.name)
      );
    } else if (watchOfficeOrStation === "Office") {
      setAssignment(
        cityOffices
          .filter((item) => item.cityFireStationId.name === watchCity)
          .map((item) => item.officeName)
      );
    }
  }, [watchCity, watchOfficeOrStation, fireSubStations, cityOffices]);

  useEffect(() => {
    if (selectedFireDistrict) {
      const filteredStations = cityMunicipalFireStations.filter(
        (station) => station.fireDistrict === selectedFireDistrict
      );
      setCityFireStationsDropdown(
        filteredStations.map((station) => station.name)
      );
    }
  }, [
    selectedFireDistrict,
    cityMunicipalFireStations,
    setCityFireStationsDropdown,
  ]);

  if (
    isLoadingGetFireDistricts ||
    isLoadingCityMunicipalFireStations ||
    isLoadingGetfireSubStations ||
    isLoadingGetAllCityOffices
  ) {
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
                label={"Fire District"}
                {...field}
                value={field.value}
                onChange={(e) => {
                  setSelectedFireDistrict(e.target.value);
                  setValue("city", "");
                  setValue("assignment", "");
                  field.onChange(e);
                }}
              >
                {fireDistrictsList?.map((item) => (
                  <MenuItem key={item} value={item}>
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
                disabled={cityFireStationsDropdown.length === 0}
                label={"City Fire Station"}
                {...field}
                onChange={(e) => {
                  setValue("city", "");
                  setValue("assignment", "");
                  field.onChange(e);
                }}
              >
                {cityFireStationsDropdown?.map((item) => (
                  <MenuItem key={item} value={item}>
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

        <FormControl fullWidth size="small">
          <InputLabel error={!!errors["officeOrStation"]}>
            {"Office or Station"}
          </InputLabel>
          <Controller
            name={"officeOrStation"}
            control={control}
            defaultValue=""
            disabled={!watchCity}
            render={({ field }) => (
              <Select
                variant="standard"
                disabled={cityFireStationsDropdown.length === 0}
                label={"Office or Station"}
                {...field}
                onChange={(e) => {
                  setValue("assignment", "");
                  field.onChange(e);
                }}
              >
                <MenuItem value={"Office"}>Office</MenuItem>
                <MenuItem value={"Station"}>Station</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>
            {(errors["city"]?.message as string) || ""}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel error={!!errors["assignment"]}>{"Assignment"}</InputLabel>
          <Controller
            name={"assignment"}
            control={control}
            defaultValue=""
            disabled={!watchOfficeOrStation}
            render={({ field }) => (
              <Select
                variant="standard"
                disabled={cityFireStationsDropdown.length === 0}
                label={"City Fire Station"}
                {...field}
              >
                {assignment?.map((item) => (
                  <MenuItem key={item} value={item}>
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
