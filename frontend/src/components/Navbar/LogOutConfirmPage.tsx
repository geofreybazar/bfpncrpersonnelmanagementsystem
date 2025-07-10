import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";

import userService from "../../services/userService";
import { Button } from "@mui/material";
import { FaSpinner } from "react-icons/fa";

interface LogOutConfirmPageProps {
  setOpenLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogOutConfirmPage: React.FC<LogOutConfirmPageProps> = ({
  setOpenLogOutModal,
}) => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPending(true);
    e.preventDefault();
    try {
      await userService.logout();
      dispatch(userActions.logout());
      navigate("/login");
      setOpenLogOutModal(false);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      setIsPending(false);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-6 text-center">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold">Confirm Logout</div>
        <div className="text-lg">Are you sure you want to log out?</div>
      </div>
      <div className="w-full flex justify-center gap-5">
        <Button variant="outlined" onClick={() => setOpenLogOutModal(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleLogout} disabled={isPending}>
          {isPending ? <FaSpinner className="animate-spin" /> : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default LogOutConfirmPage;
