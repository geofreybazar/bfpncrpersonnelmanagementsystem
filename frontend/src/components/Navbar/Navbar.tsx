import { Skeleton } from "@mui/material";
import { Suspense, lazy } from "react";

const NavbarPage = lazy(() => import("./NavbarPage"));

const Navbar = () => {
  return (
    <div className="h-full w-full">
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={50} />}
      >
        <NavbarPage />
      </Suspense>
    </div>
  );
};

export default Navbar;
