import ModalComponent from "../../../ReusableComponents/ModalComponent";
import AddFireTruck from "./AddFireTruck";
import AddAmbulance from "./AddAmbulance";
import UpdateSubStation from "./UpdateSubStation";
import ViewFireTruck from "./ViewFireTruck";

import { Snackbar, SnackbarCloseReason } from "@mui/material";
import { FireSubStations } from "../../../../utilities/models";

interface ModalsSnackbarsProps {
  fireSubStation: FireSubStations;
  openAddFireTruckModal: boolean;
  setOpenAddFireTruckModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccesSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  openUpdateModal: boolean;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  openAddAmbulanceModal: boolean;
  setOpenAddAmbulanceModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAddAmbulanceSuccesSnackbar: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  openViewFireTruckModal: boolean;
  selectedFireTruck: string | null;
  setOpenViewFireTruckModal: React.Dispatch<React.SetStateAction<boolean>>;
  openSuccesSnackbar: boolean;
  openAddAmbulanceSuccesSnackbar: boolean;
}

const ModalsSnackbars: React.FC<ModalsSnackbarsProps> = ({
  fireSubStation,
  openAddFireTruckModal,
  setOpenAddFireTruckModal,
  setOpenSuccesSnackbar,
  openUpdateModal,
  setOpenUpdateModal,
  openAddAmbulanceModal,
  setOpenAddAmbulanceModal,
  setOpenAddAmbulanceSuccesSnackbar,
  openViewFireTruckModal,
  selectedFireTruck,
  setOpenViewFireTruckModal,
  openSuccesSnackbar,
  openAddAmbulanceSuccesSnackbar,
}) => {
  const handleCloseAddAmbulanceModal = () => setOpenAddAmbulanceModal(false);
  const handleCloseAddFireTruckModal = () => setOpenAddFireTruckModal(false);
  const handleCloseOpenUpdateModal = () => setOpenUpdateModal(false);
  const handleCloseOpenViewFireTruckModal = () =>
    setOpenViewFireTruckModal(false);

  const renderModal = (
    open: boolean,
    onClose: () => void,
    content: JSX.Element
  ) => (
    <ModalComponent open={open} onClose={onClose}>
      {content}
    </ModalComponent>
  );

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccesSnackbar(false);
    setOpenAddAmbulanceSuccesSnackbar(false);
  };

  return (
    <div>
      {renderModal(
        openAddFireTruckModal,
        handleCloseAddFireTruckModal,
        <AddFireTruck
          fireSubStation={fireSubStation.id}
          fireDistrictId={fireSubStation.fireDistrictId.id}
          cityFireStationId={fireSubStation.cityFireStationId.id}
          setOpenAddFireTruckModal={setOpenAddFireTruckModal}
          setOpenSuccesSnackbar={setOpenSuccesSnackbar}
        />
      )}

      {renderModal(
        openUpdateModal,
        handleCloseOpenUpdateModal,
        <UpdateSubStation
          fireSubStation={fireSubStation}
          setOpenUpdateModal={setOpenUpdateModal}
        />
      )}

      {renderModal(
        openAddAmbulanceModal,
        handleCloseAddAmbulanceModal,
        <AddAmbulance
          fireSubStation={fireSubStation.id}
          fireDistrictId={fireSubStation.fireDistrictId.id}
          cityFireStationId={fireSubStation.cityFireStationId.id}
          setOpenAddAmbulanceModal={setOpenAddAmbulanceModal}
          setOpenAddAmbulanceSuccesSnackbar={setOpenAddAmbulanceSuccesSnackbar}
        />
      )}

      {renderModal(
        openViewFireTruckModal,
        handleCloseOpenViewFireTruckModal,
        <ViewFireTruck selectedFireTruck={selectedFireTruck} />
      )}

      <Snackbar
        open={openSuccesSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Fire truck successfully added!"
      />

      <Snackbar
        open={openAddAmbulanceSuccesSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Ambulance successfully added!"
      />
    </div>
  );
};

export default ModalsSnackbars;
