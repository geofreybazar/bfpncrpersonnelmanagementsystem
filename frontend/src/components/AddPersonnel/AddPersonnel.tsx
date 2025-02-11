import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AddPersonnelSchema,
  addPersonnelSchema,
} from "../../utilities/schema.ts";

import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { FaSpinner } from "react-icons/fa";

import useAddPersonnel from "../../hooks/useAddPersonnel.ts";
import Generalinformation from "./Generalinformation.tsx";
import OfficeInformation from "./OfficeInformation.tsx";
import ModalComponent from "../ReusableComponents/ModalComponent.tsx";
import ConfirmSubmission from "./ConfirmSubmission.tsx";

interface ErrorResponse {
  error: string;
}

const AddPersonnel = () => {
  const [openSubmission, setOpenSubmission] = useState(false);
  const handleOpen = () => setOpenSubmission(true);
  const handleClose = () => setOpenSubmission(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<AddPersonnelSchema>({
    resolver: zodResolver(addPersonnelSchema),
  });

  const { addPersonnel, isPendingAddPersonnel, isSuccess, error, isError } =
    useAddPersonnel();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<Partial<AddPersonnelSchema>> = async (data) => {
    await addPersonnel(data);
  };

  if (isSuccess) {
    navigate("/personnel");
    queryClient.invalidateQueries({ queryKey: ["getAllPersonnel"] });
  }

  useEffect(() => {
    if (isError && error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      setError("root", {
        message: axiosError?.response?.data?.error || "An error occurred",
      });
    }
  }, [setError, error, isError]);

  return (
    <div className="shadow-md border p-5">
      <div className="text-xl font-semibold">Add Personnel</div>
      <div>Bureau of Fire Protection - National Capital Region</div>
      <form
        className="w-full py-5 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Generalinformation
          register={register}
          errors={errors}
          control={control}
        />
        <OfficeInformation
          register={register}
          errors={errors}
          control={control}
        />

        <FormControlLabel
          control={<Checkbox size="small" {...register("itAdmin")} />}
          label="IT Admin Personnel"
        />

        {errors.root && (
          <div className="text-center text-red-600 uppercase">
            {errors.root.message}{" "}
          </div>
        )}

        <Button
          variant="contained"
          disabled={isPendingAddPersonnel}
          type="submit"
        >
          <div className="flex items-center gap-2">
            {isPendingAddPersonnel ? (
              <>
                <FaSpinner className="animate-spin" />
                <p>Submitting</p>
              </>
            ) : (
              <p>Submit</p>
            )}
          </div>
        </Button>
      </form>

      <button onClick={handleOpen}>open</button>

      <ModalComponent open={openSubmission} onClose={handleClose}>
        <ConfirmSubmission />
      </ModalComponent>
    </div>
  );
};

export default AddPersonnel;
