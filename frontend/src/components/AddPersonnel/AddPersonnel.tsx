import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addPersonnelSchema } from "../../utilities/schema.ts";
import { User } from "../../utilities/models.ts";

import { Button, Checkbox, FormControlLabel } from "@mui/material";

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
  } = useForm<User>({
    resolver: zodResolver(addPersonnelSchema),
  });

  const { addPersonnel, isPendingAddPersonnel, isSuccess, error, isError } =
    useAddPersonnel();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<User> = async (data) => {
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
  }, [error, isError]);

  return (
    <div className='shadow-md border p-5'>
      <div className='text-xl font-semibold'>Add Personnel</div>
      <div>Bureau of Fire Protection - National Capital Region</div>
      <form
        className='w-full py-5 flex flex-col gap-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Generalinformation
          register={register}
          errors={errors}
          control={control}
          Controller={Controller}
        />
        <OfficeInformation register={register} errors={errors} />

        <FormControlLabel
          control={<Checkbox size='small' {...register("role")} />}
          label='IT Admin Personnel'
        />

        {errors.root && (
          <div className='text-center text-red-600 uppercase'>
            {errors.root.message}{" "}
          </div>
        )}

        <Button
          variant='contained'
          disabled={isPendingAddPersonnel}
          type='submit'
        >
          {isPendingAddPersonnel ? "Submitting" : "Submit"}
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
