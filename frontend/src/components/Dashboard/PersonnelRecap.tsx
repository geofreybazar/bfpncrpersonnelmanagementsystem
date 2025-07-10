import { useMemo } from "react";

import useGetAllPersonnelNopage from "../../hooks/useGetAllPersonnelNopage";
import variables from "../../utilities/variables";

const PersonnelRecap = () => {
  const { allPersonnel } = useGetAllPersonnelNopage();

  const officerRanks = variables.officerRanks;
  const nonOfficerRanks = variables.nonOfficerRanks;

  const totalOfficers = useMemo(() => {
    return allPersonnel.filter((personnel) =>
      officerRanks.includes(personnel.rank)
    ).length;
  }, [allPersonnel, officerRanks]);

  const totalNonOfficers = useMemo(() => {
    return allPersonnel.filter((personnel) =>
      nonOfficerRanks.includes(personnel.rank)
    ).length;
  }, [allPersonnel, nonOfficerRanks]);

  const totalNUP = useMemo(() => {
    return allPersonnel.filter((personnel) => personnel.rank === "NUP").length;
  }, [allPersonnel]);
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="bg-turquoise py-1 px-5 text-white text-lg font-semibold">
        Personnel
      </div>
      <div className="flex  justify-center items-center gap-5">
        <div className="border text-center  flex flex-col justify-center rounded-md p-2 w-1/6 h-32 shadow-md">
          <p>Personnel</p>
          <p className="text-2xl font-semibold">{allPersonnel.length}</p>
        </div>
        <div className="border text-center flex flex-col justify-center rounded-md p-2 w-1/6 h-32 shadow-md">
          <p>Commissioned Officers</p>
          <p className="text-2xl font-semibold">{totalOfficers}</p>
        </div>
        <div className="border text-center flex flex-col justify-center rounded-md p-2 w-1/6 h-32 shadow-md">
          <p>Non-Commission Officers</p>
          <p className="text-2xl font-semibold">{totalNonOfficers}</p>
        </div>
        <div className="border text-center flex flex-col justify-center rounded-md p-2 w-1/6 h-32 shadow-md">
          <p>Non-Uniformed Personnel</p>
          <p className="text-2xl font-semibold">{totalNUP}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonnelRecap;
