import { FireSubStations } from "../../../../utilities/models.ts";
import { IoEllipsisHorizontal } from "react-icons/io5";

interface FireSubStationProps {
  setopenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openMenu: boolean;
  fireSubStation: FireSubStations;
}

const FireSubStation: React.FC<FireSubStationProps> = ({
  setopenMenu,
  openMenu,
  fireSubStation,
}) => {
  return (
    <div>
      <div className="text-2xl mb-3 border-b border-black flex justify-between">
        <p>Fire Sub Station Details</p>
        <div
          className="cursor-pointer text-darkBlue p-2 rounded-full hover:bg-gray-200"
          onClick={() => setopenMenu(!openMenu)}
        >
          <IoEllipsisHorizontal />
        </div>
      </div>
      <p>
        <span className="text-gray-500">Fire District: </span>
        <span className="text-lg ">{fireSubStation.fireDistrictId.name}</span>
      </p>
      <p>
        <span className="text-gray-500">City Fire Station: </span>
        <span className="text-lg">{fireSubStation.cityFireStationId.name}</span>
      </p>
      <p>
        <span className="text-gray-500">Name of fire sub-station: </span>
        <span className="text-lg">{fireSubStation.name}</span>
      </p>
      <div>
        <p className="text-gray-500">Coordinates: </p>
        <ul className="pl-5">
          <li>
            <span className="text-gray-500">Longtitue: </span>
            <span className="text-lg">{fireSubStation.location.long}</span>
          </li>
          <li>
            <span className="text-gray-500">Lattitude: </span>
            <span className="text-lg">{fireSubStation.location.lat}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FireSubStation;
