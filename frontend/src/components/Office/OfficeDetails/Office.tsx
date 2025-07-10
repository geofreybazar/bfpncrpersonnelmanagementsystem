import { ReturnedOffice } from "../../../utilities/models";
import { IoEllipsisHorizontal } from "react-icons/io5";

interface OfficeProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openMenu: boolean;
  officeDetail: ReturnedOffice;
}

const Office: React.FC<OfficeProps> = ({
  officeDetail,
  setOpenMenu,
  openMenu,
}) => {
  return (
    <div>
      <div className="text-2xl mb-3 border-b border-black flex justify-between">
        <p>Office Details</p>
        <div
          className="cursor-pointer text-darkBlue p-2 rounded-full hover:bg-gray-200"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <IoEllipsisHorizontal />
        </div>
      </div>
      <p>
        <span className="text-gray-500">Fire District: </span>
        <span className="text-lg ">{officeDetail.fireDistrictId.name}</span>
      </p>
      <p>
        <span className="text-gray-500">City Fire Station: </span>
        <span className="text-lg">{officeDetail.cityFireStationId.name}</span>
      </p>
      <p>
        <span className="text-gray-500">Name of fire sub-station: </span>
        <span className="text-lg">{officeDetail.officeName}</span>
      </p>
    </div>
  );
};

export default Office;
