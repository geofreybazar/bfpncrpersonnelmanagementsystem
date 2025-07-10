import { FireSubStations } from "../../../../utilities/models.ts";

interface FiretrucksProps {
  fireSubStation: FireSubStations;
}

const Ambulance: React.FC<FiretrucksProps> = ({ fireSubStation }) => {
  return (
    <div className="w-1/2 flex flex-col h-full flex-col ">
      <div>Ambulances</div>
      <div className="w-full h-full border overflow-auto p-5 flex flex-col gap-1 text-base font-semibold">
        {fireSubStation.ambulances.length === 0 ? (
          <div className="italic h-full flex justify-center items-center">
            no registered ambulances
          </div>
        ) : (
          <>
            {fireSubStation.ambulances.map((item) => (
              <p key={item.id}>{item.callsign}</p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Ambulance;
