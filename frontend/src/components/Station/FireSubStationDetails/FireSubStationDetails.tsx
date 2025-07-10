import { lazy, Suspense } from "react";
import DefaultStation from "./DefaultStation";
import { Skeleton } from "@mui/material";

const GetFireSubStationDetail = lazy(
  () => import("./GetFireSubStationDetail/GetFireSubStationDetail")
);

interface FireSubStationDetailsProps {
  selectedFireSubStation: string;
}

const FireSubStationDetails: React.FC<FireSubStationDetailsProps> = ({
  selectedFireSubStation,
}) => {
  return (
    <div className="w-full h-full p-5">
      {selectedFireSubStation === "" ? (
        <DefaultStation />
      ) : (
        <Suspense
          fallback={
            <Skeleton variant="rectangular" width="100%" height="100%" />
          }
        >
          <GetFireSubStationDetail
            selectedFireSubStation={selectedFireSubStation}
          />
        </Suspense>
      )}
    </div>
  );
};

export default FireSubStationDetails;
