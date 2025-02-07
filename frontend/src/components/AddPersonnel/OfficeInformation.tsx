import React from "react";
import TextFieldComponent from "./TextFieldComponent";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface OfficeInformationProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}
const OfficeInformation: React.FC<OfficeInformationProps> = ({
  register,
  errors,
}) => {
  return (
    <div>
      <div className='w-full bg-gray-100 p-1 font-semibold'>
        Office Information
      </div>
      <div className='grid grid-cols-4 gap-10 py-5'>
        <TextFieldComponent
          label={"Fire District"}
          name={"district"}
          register={register}
          errors={errors}
        />

        <TextFieldComponent
          label={"City Fire Station"}
          name={"city"}
          register={register}
          errors={errors}
        />

        <TextFieldComponent
          label={"Office"}
          name={"office"}
          register={register}
          errors={errors}
        />

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
