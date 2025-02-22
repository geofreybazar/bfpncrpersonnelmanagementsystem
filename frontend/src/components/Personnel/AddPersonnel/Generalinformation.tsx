import { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import SelecField from "./SelecField";
import TextFieldComponent from "./TextFieldComponent";
import { AddPersonnelSchema } from "../../../utilities/schema";
import variable from "../../../utilities/variables.js";

const rank = variable.rank;

interface GeneralinformationProps {
  register: UseFormRegister<AddPersonnelSchema>;
  errors: FieldErrors<AddPersonnelSchema>;
  control: Control<AddPersonnelSchema>;
}

const Generalinformation: React.FC<GeneralinformationProps> = ({
  register,
  errors,
  control,
}) => {
  return (
    <div>
      <div className="w-full bg-gray-100 p-1 font-semibold">
        General Information
      </div>
      <div className="grid grid-cols-4 gap-10 py-5">
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
        <SelecField
          control={control}
          label={"Rank"}
          name="rank"
          errors={errors}
          items={rank}
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
