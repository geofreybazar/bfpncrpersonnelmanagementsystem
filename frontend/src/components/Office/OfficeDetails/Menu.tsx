import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";

interface MenuProps {
  setOpenUpdateOffice: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ setOpenUpdateOffice }) => {
  return (
    <div className="absolute right-0 top-6 w-48 bg-off-white shadow-md rounded-md p-5 flex flex-col">
      <button
        className="flex items-center gap-2 text-darkBlue hover:text-darBlue3"
        onClick={() => setOpenUpdateOffice(true)}
      >
        {" "}
        <FaEdit />
        Update detail
      </button>

      <div className="border-t border-black">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
          {" "}
          <MdAutoDelete />
          Delete Office
        </button>
      </div>
    </div>
  );
};

export default Menu;
