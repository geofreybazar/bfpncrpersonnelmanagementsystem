import { Suspense, lazy } from "react";
import { Skeleton } from "@mui/material";

const Personnel = lazy(() => import("./PersonnelDetails"));
const System = lazy(() => import("./SystemAccess"));

const ViewPersonnel = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="shadow-md border p-5 flex flex-col gap-5">
        <Suspense
          fallback={<Skeleton variant="rectangular" width="100%" height={50} />}
        >
          <Personnel />
        </Suspense>
      </div>
      <div className="shadow-md border p-5 flex flex-col gap-5">
        <Suspense
          fallback={<Skeleton variant="rectangular" width="100%" height={50} />}
        >
          <System />
        </Suspense>
      </div>
    </div>
  );
};

export default ViewPersonnel;
