import { useEffect, useRef, useState } from "react";
import ModalComponent from "../../ReusableComponents/ModalComponent";

import Office from "./Office";
import Menu from "./Menu";

import useGetCityOfficeDetails from "../../../hooks/useGetCityOfficeDetails";
import UpdateOffice from "./UpdateOffice";

interface GetOfficeDetailsProps {
  selectedOffice: string;
}

const GetOfficeDetails: React.FC<GetOfficeDetailsProps> = ({
  selectedOffice,
}) => {
  const { officeDetail } = useGetCityOfficeDetails(selectedOffice);
  const [openUpdateOffice, setOpenUpdateOffice] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu, setOpenMenu]);

  return (
    <div className="relative">
      <Office
        officeDetail={officeDetail}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />

      {openMenu && (
        <div ref={menuRef}>
          <Menu setOpenUpdateOffice={setOpenUpdateOffice} />
        </div>
      )}

      <ModalComponent
        open={openUpdateOffice}
        onClose={() => setOpenUpdateOffice(false)}
      >
        <UpdateOffice
          officeDetail={officeDetail}
          setOpenUpdateOffice={setOpenUpdateOffice}
        />
      </ModalComponent>
    </div>
  );
};

export default GetOfficeDetails;
