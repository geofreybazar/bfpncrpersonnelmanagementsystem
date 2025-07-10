import { Button } from "@mui/material";
import { FieldErrors } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { AddPersonnelSchema } from "../../../utilities/schema";

interface ConfirmSubmissionProps {
  errors: FieldErrors<AddPersonnelSchema>;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

const ConfirmSubmission = ({
  errors,
  onConfirm,
  onCancel,
  isPending,
}: ConfirmSubmissionProps) => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <p className="text-2xl font-semibold text-center text-darBlue2">
        Confirm Submission
      </p>
      <div className="flex gap-2">
        <p className="text-justify">
          Please review the details carefully before submitting. Once submitted,
          the account number cannot be changed.
        </p>
        <p className="text-6xl text-red-500">
          <IoIosWarning />
        </p>
      </div>

      {errors.root && (
        <div className="text-center text-red-600 uppercase">
          {errors.root.message}{" "}
        </div>
      )}

      <div className="w-full flex justify-center gap-5">
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" disabled={isPending}>
          {isPending ? <FaSpinner className="animate-spin" /> : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmSubmission;
