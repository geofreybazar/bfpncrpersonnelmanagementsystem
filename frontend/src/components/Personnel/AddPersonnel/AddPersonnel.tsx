import { AxiosError } from "axios";
import { lazy, Suspense, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AddPersonnelSchema,
  addPersonnelSchema,
} from "../../../utilities/schema.ts";

import { Button, Checkbox, FormControlLabel, Skeleton } from "@mui/material";
import { FaSpinner } from "react-icons/fa";

import useAddPersonnel from "../../../hooks/useAddPersonnel.ts";
import Generalinformation from "./Generalinformation.tsx";
import ModalComponent from "../../ReusableComponents/ModalComponent.tsx";
import ConfirmSubmission from "./ConfirmSubmission.tsx";

const OfficeInformation = lazy(() => import("./OfficeInformation.tsx"));

interface ErrorResponse {
  error: string;
}

const AddPersonnel = () => {
  const [openSubmission, setOpenSubmission] = useState(false);
  const handleOpen = () => setOpenSubmission(true);
  const handleClose = () => setOpenSubmission(false);

  const {
    register,
    watch,
    setValue,
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
    queryClient.invalidateQueries({ queryKey: ["getAllPersonnelNoPage"] });
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
        <Suspense
          fallback={<Skeleton variant="rectangular" width="100%" height={50} />}
        >
          <OfficeInformation
            watch={watch}
            setValue={setValue}
            register={register}
            errors={errors}
            control={control}
          />
        </Suspense>

        <FormControlLabel
          control={<Checkbox size="small" {...register("itAdmin")} />}
          label="IT Admin Personnel"
        />

        <Button
          variant="contained"
          disabled={isPendingAddPersonnel}
          onClick={handleOpen}
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

        <ModalComponent open={openSubmission} onClose={handleClose}>
          <ConfirmSubmission
            errors={errors}
            onConfirm={() => {
              handleSubmit(onSubmit)();
            }}
            onCancel={handleClose}
            isPending={isPendingAddPersonnel}
          />
        </ModalComponent>
      </form>
    </div>
  );
};

export default AddPersonnel;
