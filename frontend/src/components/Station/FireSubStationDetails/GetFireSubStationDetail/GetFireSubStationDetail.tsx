import { useEffect, useRef } from "react";

import useGetFireSubstationDetails from "../../../../hooks/useGetFireSubstationDetails";
import useFireSubStationStates from "../../../../hooks/useFireSubStationStates";

import Firetrucks from "./Firetrucks";
import Ambulance from "./Ambulance";
import Menu from "./Menu";
import FireSubStation from "./FireSubStation";
import ModalsSnackbars from "./ModalsSnackbars";

interface GetFireSubStationDetailProps {
  selectedFireSubStation: string;
}

const GetFireSubStationDetail: React.FC<GetFireSubStationDetailProps> = ({
  selectedFireSubStation,
}) => {
  const {
    setOpenAddAmbulanceModal,
    setOpenAddFireTruckModal,
    setOpenUpdateModal,
    openMenu,
    setopenMenu,
    openAddAmbulanceSuccesSnackbar,
    setOpenAddAmbulanceSuccesSnackbar,
    openSuccesSnackbar,
    setOpenSuccesSnackbar,
    setOpenViewFireTruckModal,
    setSelectedFireTruck,
    openAddAmbulanceModal,
    openAddFireTruckModal,
    openUpdateModal,
    openViewFireTruckModal,
    selectedFireTruck,
  } = useFireSubStationStates();

  const { fireSubStation } = useGetFireSubstationDetails(
    selectedFireSubStation
  );

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setopenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu, setopenMenu]);

  return (
    <div className="h-full flex flex-col relative">
      <FireSubStation
        setopenMenu={setopenMenu}
        openMenu={openMenu}
        fireSubStation={fireSubStation}
      />
      <div className="flex-1 flex gap-5 h-full overflow-auto">
        <Firetrucks
          fireSubStation={fireSubStation}
          setOpenViewFireTruckModal={setOpenViewFireTruckModal}
          setSelectedFireTruck={setSelectedFireTruck}
        />
        <Ambulance fireSubStation={fireSubStation} />
      </div>

      {openMenu && (
        <div ref={menuRef}>
          <Menu
            setOpenAddFireTruckModal={setOpenAddFireTruckModal}
            setOpenAddAmbulanceModal={setOpenAddAmbulanceModal}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </div>
      )}

      <ModalsSnackbars
        fireSubStation={fireSubStation}
        openAddFireTruckModal={openAddFireTruckModal}
        setOpenAddFireTruckModal={setOpenAddFireTruckModal}
        setOpenSuccesSnackbar={setOpenSuccesSnackbar}
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        openAddAmbulanceModal={openAddAmbulanceModal}
        setOpenAddAmbulanceModal={setOpenAddAmbulanceModal}
        setOpenAddAmbulanceSuccesSnackbar={setOpenAddAmbulanceSuccesSnackbar}
        openViewFireTruckModal={openViewFireTruckModal}
        selectedFireTruck={selectedFireTruck}
        setOpenViewFireTruckModal={setOpenViewFireTruckModal}
        openSuccesSnackbar={openSuccesSnackbar}
        openAddAmbulanceSuccesSnackbar={openAddAmbulanceSuccesSnackbar}
      />
    </div>
  );
};

export default GetFireSubStationDetail;
