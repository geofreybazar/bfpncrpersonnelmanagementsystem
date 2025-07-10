import { useState } from "react";

import { useSelector } from "react-redux";

import { RootState } from "../../store";

import ModalComponent from "../ReusableComponents/ModalComponent";
import LogOutConfirmPage from "./LogOutConfirmPage";

import useGetPersonnel from "../../hooks/useGetPersonnel";

const NavbarPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [openLogOutModal, setOpenLogOutModal] = useState(false);
  const handleCloseLogOutModal = () => setOpenLogOutModal(false);

  const { personnel } = useGetPersonnel(user?.id);

  const handleLogout = () => {
    setOpenLogOutModal(true);
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-5 text-base border-b shadow-sm ">
      <p className="font-semibold">
        {personnel.rank} {personnel.firstName} {personnel.middleName}{" "}
        {personnel.lastName} - {personnel.city}
      </p>
      <button
        className="bg-darBlue2 text-white px-3 py-1 rounded-md shadow-md font-semibold hover:bg-darkBlue"
        onClick={handleLogout}
      >
        Log out
      </button>

      <ModalComponent open={openLogOutModal} onClose={handleCloseLogOutModal}>
        <LogOutConfirmPage setOpenLogOutModal={setOpenLogOutModal} />
      </ModalComponent>
    </div>
  );
};

export default NavbarPage;
