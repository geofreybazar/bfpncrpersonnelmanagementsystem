import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";
import { filteredPersonnelSliceActions } from "../../../store/filteredPersonnelSlice.js";

import { TextField } from "@mui/material";

import { FaFilter } from "react-icons/fa";

import { FilterSchema, filterSchema } from "../../../utilities/schema.js";
import SelectFields from "./SelectFields.js";

import useGetFilteredPersonnel from "../../../hooks/useGetFilteredPersonnel.js";
import { useEffect, useState } from "react";

interface FilterProps {
  page: number;
  rowsPerPage: number;
}

const Filter: React.FC<FilterProps> = ({ page, rowsPerPage }) => {
  const dispatch = useDispatch();
  const [submittedData, setSubmittedData] = useState({
    rank: "",
    district: "",
    city: "",
    search: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { filteredPersonnel } = useGetFilteredPersonnel(
    submittedData,
    page,
    rowsPerPage,
    isSubmitted
  );

  useEffect(() => {
    if (filteredPersonnel) {
      dispatch(
        filteredPersonnelSliceActions.setFilteredPersonnel(filteredPersonnel)
      );
    }
  }, [filteredPersonnel, dispatch]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit: SubmitHandler<FilterSchema> = (data) => {
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  return (
    <div className="py-5 ">
      <p className="text-gray-400 flex gap-2 items-center py-2 w-full">
        <FaFilter />
        Filter
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-5 flex gap-5">
          <SelectFields errors={errors} control={control} setValue={setValue} />
        </div>
        <div>
          <TextField
            fullWidth
            variant="standard"
            label="Search"
            {...register("search")}
            size="small"
            error={!!errors["search"]}
            helperText={
              errors["search"]?.message ? String(errors["search"]?.message) : ""
            }
          />
        </div>
        <button
          className="mt-5 py-2 px-5 bg-darkBlue text-white font-semibold rounded-md hover:bg-darBlue2"
          type="submit"
        >
          Filter
        </button>
      </form>
    </div>
  );
};

export default Filter;
