import { useEffect, useState } from "react";

import { Controller, Control, FieldErrors } from "react-hook-form";

import useGetStaionsDetails from "../../../hooks/useGetStationsDetails";

import { FireSubStationSchema } from "../../../utilities/schema";

import { Select, MenuItem, FormControl, FormHelperText } from "@mui/material";
import React from "react";

interface FieldsProps {
  errors: FieldErrors;
  control: Control<FireSubStationSchema>;
}

const Fields: React.FC<FieldsProps> = ({ errors, control }) => {
  const { fireDistricts, cityMunicipalFireStations } = useGetStaionsDetails();

  const [selectedFireDistrict, setSelectedFireDistrict] = useState("");
  const [fireSubStations, setFireSubStations] = useState<string[]>([]);

  const fireDistrictsList = fireDistricts?.map((item) => item.name);

  useEffect(() => {
    if (cityMunicipalFireStations) {
      const filteredStations = cityMunicipalFireStations.filter(
        (station) => station.fireDistrict === selectedFireDistrict
      );
      setFireSubStations(filteredStations.map((station) => station.name));
    }
  }, [selectedFireDistrict, cityMunicipalFireStations, setFireSubStations]);

  return (
    <div className="w-1/2">
      <div className="flex gap-2 items-center ">
        <label className="font-semibold w-1/2 ">Select Fire District:</label>
        <FormControl fullWidth variant="standard" size="small">
          <Controller
            name="fireDistrict"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Select
                labelId="select-labesl"
                {...field}
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
          <FormHelperText error={!!errors.fireDistrict}>
            {(errors["fireDistrict"]?.message as string) || ""}
          </FormHelperText>
        </FormControl>
      </div>
      <div className="flex gap-2 items-center">
        <label className="font-semibold w-1/2 ">
          Select City Fire Station:
        </label>
        <FormControl fullWidth variant="standard" size="small">
          <Controller
            name="cityFireStation"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Select
                labelId="select-label"
                {...field}
                disabled={fireSubStations.length === 0}
              >
                {fireSubStations?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error={!!errors.fireDistrict}>
            {(errors["cityFireStation"]?.message as string) || ""}
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};

export default Fields;
