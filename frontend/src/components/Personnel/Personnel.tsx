import { Suspense, lazy } from "react";
import { Skeleton } from "@mui/material";

const TablePersonnel = lazy(() => import("./TablePersonnel"));

const Personnel = () => {
  return (
    <div className="shadow-md border p-5 h-full overflow-auto">
      <div className="text-xl font-semibold">Personnel</div>

      <div>
        <Suspense
          fallback={<Skeleton variant="rectangular" width="100%" height={50} />}
        >
          <TablePersonnel />
        </Suspense>
      </div>
    </div>
  );
};

export default Personnel;
