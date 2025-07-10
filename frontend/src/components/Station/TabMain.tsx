import { lazy, useState } from "react";
import { Suspense } from "react";

import useGetFireDistrict from "../../hooks/useGetFireDistrict";
import { Skeleton } from "@mui/material";
import FireSubStationDetails from "./FireSubStationDetails/FireSubStationDetails";

const SubStations = lazy(() => import("./SubStations"));

interface TabMainProps {
  id: string;
}
const TabMain: React.FC<TabMainProps> = ({ id }) => {
  const [selectedCity, setselectedCity] = useState(0);
  const [selectedFireSubStation, setSelectedFireSubStation] = useState("");

  const { fireDistrict, isLoadingGetFireDistrict } = useGetFireDistrict(id);

  const fireDistrictName = fireDistrict.name;
  const cities = fireDistrict.cities;

  if (isLoadingGetFireDistrict) {
    return <p>Loading...</p>;
  }

  const handleClickCity = (index: number) => {
    setselectedCity(index);
    setSelectedFireSubStation("");
  };

  return (
    <div className="h-full flex gap-5 ">
      <div className="w-1/5 h-full border-r">
        {cities.map((item: string, index: number) => (
          <div
            key={item}
            className={`p-5 border cursor-pointer hover:bg-off-white ${
              selectedCity === index ? "bg-off-white" : ""
            }`}
            onClick={() => handleClickCity(index)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="h-full w-1/5 ">
        <Suspense
          fallback={
            <Skeleton variant="rectangular" width="100%" height="100%" />
          }
        >
          <SubStations
            selectedCity={selectedCity}
            cities={cities}
            fireDistrictName={fireDistrictName}
            setSelectedFireSubStation={setSelectedFireSubStation}
            selectedFireSubStation={selectedFireSubStation}
          />
        </Suspense>
      </div>
      <div className="h-full w-3/5 border">
        <FireSubStationDetails
          selectedFireSubStation={selectedFireSubStation}
        />
      </div>
    </div>
  );
};

export default TabMain;
