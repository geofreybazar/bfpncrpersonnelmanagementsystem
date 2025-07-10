import { Suspense, lazy } from "react";
import { Skeleton } from "@mui/material";

const PersonnelRecap = lazy(() => import("./PersonnelRecap"));
const StationsRecap = lazy(() => import("./StationsRecap"));

const Dashboard = () => {
  return (
    <div>
      <div className="text-xl font-semibold">
        Bureau of Fire Protection - National Capital Region
      </div>
      <div className="flex flex-col py-10 gap-10">
        <Suspense
          fallback={<Skeleton variant="rectangular" width="100%" height={50} />}
        >
          <PersonnelRecap />
        </Suspense>
        <Suspense
          fallback={<Skeleton variant="rectangular" width="100%" height={50} />}
        >
          <StationsRecap />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
