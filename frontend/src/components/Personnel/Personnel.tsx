import { Suspense, lazy } from "react";
import { Skeleton } from "@mui/material";

import Filter from "./Filter";
const TablePersonnel = lazy(() => import("./TablePersonnel"));

const Personnel = () => {
  return (
    <div className='shadow-md border p-5'>
      <div className='text-xl font-semibold'>Personnel</div>
      <Filter />
      <div>
        <Suspense
          fallback={<Skeleton variant='rectangular' width='100%' height={50} />}
        >
          <TablePersonnel />
        </Suspense>
      </div>
    </div>
  );
};

export default Personnel;
