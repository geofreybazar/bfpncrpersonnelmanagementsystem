import { useState } from "react";

const useFireSubStationStates = () => {
  const [openAddAmbulanceModal, setOpenAddAmbulanceModal] = useState(false);
  const [openAddFireTruckModal, setOpenAddFireTruckModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openViewFireTruckModal, setOpenViewFireTruckModal] = useState(false);
  const [openMenu, setopenMenu] = useState(false);
  const [openAddAmbulanceSuccesSnackbar, setOpenAddAmbulanceSuccesSnackbar] =
    useState(false);
  const [openSuccesSnackbar, setOpenSuccesSnackbar] = useState(false);

  const [selectedFireTruck, setSelectedFireTruck] = useState<null | string>(
    null
  );

  return {
    openAddAmbulanceModal,
    setOpenAddAmbulanceModal,
    openAddFireTruckModal,
    setOpenAddFireTruckModal,
    openUpdateModal,
    setOpenUpdateModal,
    openMenu,
    setopenMenu,
    openAddAmbulanceSuccesSnackbar,
    setOpenAddAmbulanceSuccesSnackbar,
    openSuccesSnackbar,
    setOpenSuccesSnackbar,
    openViewFireTruckModal,
    setOpenViewFireTruckModal,
    selectedFireTruck,
    setSelectedFireTruck,
  };
};

export default useFireSubStationStates;
