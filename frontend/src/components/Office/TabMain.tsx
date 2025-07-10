import { lazy, useState } from "react";
import { Suspense } from "react";

import useGetFireDistrict from "../../hooks/useGetFireDistrict";
import { Skeleton } from "@mui/material";
import OfficeDetails from "./OfficeDetails/OfficeDetails";

const ListOffices = lazy(() => import("./ListOffices"));

interface TabMainProps {
  id: string;
}
const TabMain: React.FC<TabMainProps> = ({ id }) => {
  const [selectedCity, setselectedCity] = useState(0);
  const [selectedOffice, setSelectedOffice] = useState("");

  const { fireDistrict, isLoadingGetFireDistrict } = useGetFireDistrict(id);

  const fireDistrictName = fireDistrict.name;
  const cities = fireDistrict.cities;

  if (isLoadingGetFireDistrict) {
    return <p>Loading...</p>;
  }

  const handleClickCity = (index: number) => {
    setselectedCity(index);
    setSelectedOffice("");
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
          <ListOffices
            selectedCity={selectedCity}
            cities={cities}
            fireDistrictName={fireDistrictName}
            setSelectedOffice={setSelectedOffice}
            selectedOffice={selectedOffice}
          />
        </Suspense>
      </div>
      <div className="h-full w-3/5 border">
        <OfficeDetails selectedOffice={selectedOffice} />
      </div>
    </div>
  );
};

export default TabMain;
