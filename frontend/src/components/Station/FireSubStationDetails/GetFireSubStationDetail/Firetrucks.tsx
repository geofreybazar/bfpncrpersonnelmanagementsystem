import { FireSubStations } from "../../../../utilities/models.ts";

interface FiretrucksProps {
  fireSubStation: FireSubStations;
  setOpenViewFireTruckModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFireTruck: React.Dispatch<React.SetStateAction<string | null>>;
}

const Firetrucks: React.FC<FiretrucksProps> = ({
  fireSubStation,
  setOpenViewFireTruckModal,
  setSelectedFireTruck,
}) => {
  const handleViewFireTruck = (id: string) => {
    setSelectedFireTruck(id);
    setOpenViewFireTruckModal(true);
  };

  return (
    <div className="w-1/2 flex flex-col h-full flex-col">
      <div>Fire Trucks:</div>
      <div className="w-full h-full border overflow-auto p-5 flex flex-col gap-1 text-base font-semibold">
        {fireSubStation.fireTrucks.length === 0 ? (
          <div className="italic h-full flex justify-center items-center">
            no registered firetrucks
          </div>
        ) : (
          <>
            {fireSubStation.fireTrucks.map((item) => (
              <p
                key={item.id}
                onClick={() => handleViewFireTruck(item.id)}
                className="text-lg hover:text-darkBlue cursor-pointer"
              >
                {item.callsign}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Firetrucks;
