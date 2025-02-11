import React from "react";
import useGetAllFireDistricts from "../../hooks/useGetAllFireDistricts";
import TextFieldComponent from "./TextFieldComponent";
import SelecField from "./SelecField";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { AddPersonnelSchema } from "../../utilities/schema";

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
  const { fireDistricts, isLoadingGetFireDistricts } = useGetAllFireDistricts();

  const fireDistrictsList = fireDistricts?.map((item) => item.name);

  if (isLoadingGetFireDistricts) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <div className="w-full bg-gray-100 p-1 font-semibold">
        Office Information
      </div>
      <div className="grid grid-cols-4 gap-10 py-5">
        <TextFieldComponent
          label={"Fire District"}
          name={"district"}
          register={register}
          errors={errors}
        />
        <SelecField
          control={control}
          label={"Rank"}
          name="rank"
          errors={errors}
          items={fireDistrictsList}
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
