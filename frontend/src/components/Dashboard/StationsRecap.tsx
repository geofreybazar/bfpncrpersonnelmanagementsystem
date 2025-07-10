import { useMemo } from "react";

import useGetStaionsDetails from "../../hooks/useGetStationsDetails";

const StationsRecap = () => {
  const { fireDistricts, cityMunicipalFireStations, fireSubStations } =
    useGetStaionsDetails();

  const totalFireDistricts = useMemo(() => {
    return fireDistricts.filter(
      (district) => district.name !== "Regional Office"
    ).length;
  }, [fireDistricts]);

  const totalCityFireStations = useMemo(() => {
    return cityMunicipalFireStations.filter(
      (city) =>
        city.name !== "Manila Fire District" &&
        city.name !== "Quezon City Fire District" &&
        city.name !== "Fire District II Office" &&
        city.name !== "Fire District III Office" &&
        city.name !== "Fire District IV Office" &&
        city.name !== "Regional Office"
    ).length;
  }, [cityMunicipalFireStations]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="bg-turquoise py-1 px-5 text-white text-lg font-semibold">
        Stations
      </div>
      <div className="flex  justify-center items-center gap-5">
        <div className="border text-center  flex flex-col justify-center rounded-md p-2 w-1/6 h-32 shadow-md">
          <p>Fire District Offices</p>
          <p className="text-2xl font-semibold">{totalFireDistricts}</p>
        </div>
        <div className="border text-center flex flex-col justify-center rounded-md p-2 w-1/6 h-32 shadow-md">
          <p>City Fire Stations</p>
          <p className="text-2xl font-semibold">{totalCityFireStations}</p>
        </div>
        <div className="border text-center flex flex-col justify-center rounded-md p-2 w-1/6 h-32 shadow-md">
          <p>Fire Sub-Stations</p>
          <p className="text-2xl font-semibold">{fireSubStations.length}</p>
        </div>
      </div>
    </div>
  );
};

export default StationsRecap;
