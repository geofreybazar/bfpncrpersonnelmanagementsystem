import { lazy, Suspense } from "react";
import DefaultOffice from "./DefaultOffice";
import { Skeleton } from "@mui/material";

const GetOfficeDetails = lazy(() => import("./GetOfficeDetails"));

interface OfficeDetailsProps {
  selectedOffice: string;
}

const OfficeDetails: React.FC<OfficeDetailsProps> = ({ selectedOffice }) => {
  return (
    <div className="w-full h-full p-5">
      {selectedOffice === "" ? (
        <DefaultOffice />
      ) : (
        <Suspense
          fallback={
            <Skeleton variant="rectangular" width="100%" height="100%" />
          }
        >
          <GetOfficeDetails selectedOffice={selectedOffice} />
        </Suspense>
      )}
    </div>
  );
};

export default OfficeDetails;
