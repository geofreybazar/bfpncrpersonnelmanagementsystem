import { FaEdit } from "react-icons/fa";
import { MdFireTruck } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";

interface MenuProps {
  setOpenAddFireTruckModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAddAmbulanceModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({
  setOpenAddFireTruckModal,
  setOpenAddAmbulanceModal,
  setOpenUpdateModal,
}) => {
  return (
    <div className="absolute right-0 top-6 w-48 bg-off-white shadow-md rounded-md p-5 flex flex-col">
      <button
        className="flex items-center gap-2 text-darkBlue hover:text-darBlue3"
        onClick={() => setOpenUpdateModal(true)}
      >
        {" "}
        <FaEdit />
        Update detail
      </button>
      <button
        className="flex items-center gap-2 text-darkBlue hover:text-darBlue3"
        onClick={() => setOpenAddFireTruckModal(true)}
      >
        {" "}
        <MdFireTruck />
        Add fire truck
      </button>
      <button
        className="flex items-center gap-2 text-darkBlue hover:text-darBlue3"
        onClick={() => setOpenAddAmbulanceModal(true)}
      >
        {" "}
        <FaAmbulance />
        Add Ambulance
      </button>
      <div className="border-t border-black">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
          {" "}
          <MdAutoDelete />
          Delete substation
        </button>
      </div>
    </div>
  );
};

export default Menu;
