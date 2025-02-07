import SelecField from "./SelecField";
import TextFieldComponent from "./TextFieldComponent";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface GeneralinformationProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: any;
  Controller: any;
}

const rank = [
  "FCSUPT",
  "FSSUPT",
  "FSUPT",
  "FCINSP",
  "FSINSP",
  "FINSP",
  "FINSP",
  "SFO4",
  "SFO3",
  "SFO2",
  "SFO1",
  "FO3",
  "FO2",
  "FO1",
];

const Generalinformation: React.FC<GeneralinformationProps> = ({
  register,
  errors,
  control,
  Controller,
}) => {
  return (
    <div>
      <div className='w-full bg-gray-100 p-1 font-semibold'>
        General Information
      </div>
      <div className='grid grid-cols-4 gap-10 py-5'>
        <TextFieldComponent
          label={"First Name"}
          name={"firstName"}
          register={register}
          errors={errors}
        />
        <TextFieldComponent
          label={"Middle Name"}
          name={"middleName"}
          register={register}
          errors={errors}
        />
        <TextFieldComponent
          label={"Last Name"}
          name={"lastName"}
          register={register}
          errors={errors}
        />
        <TextFieldComponent
          label={"Suffix"}
          name={"suffix"}
          register={register}
          errors={errors}
        />

        {/* <SelecField
          Controller={Controller}
          control={control}
          label={"Rank"}
          name={rank}
          errors={errors}
          items={rank}
        /> */}

        <TextFieldComponent
          label={"Rank"}
          name={"rank"}
          register={register}
          errors={errors}
        />
        <TextFieldComponent
          label={"Email address"}
          name={"email"}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default Generalinformation;
