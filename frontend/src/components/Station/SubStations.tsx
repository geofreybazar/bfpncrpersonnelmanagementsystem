import { useState } from "react";
import ModalComponent from "../ReusableComponents/ModalComponent";
import AddFireSubStationModal from "./AddFireSubStationModal";
import useGetCityFireSubStations from "../../hooks/useGetCityFireSubStations";
import { Snackbar, SnackbarCloseReason } from "@mui/material";

interface SubStationsProps {
  selectedCity: number;
  cities: string[];
  fireDistrictName: string;
  setSelectedFireSubStation: React.Dispatch<React.SetStateAction<string>>;
  selectedFireSubStation: string;
}

const SubStations: React.FC<SubStationsProps> = ({
  selectedCity,
  cities,
  fireDistrictName,
  setSelectedFireSubStation,
  selectedFireSubStation,
}) => {
  const [openAddFireSubStaionModal, setOpenAddFireSubStaionModal] =
    useState(false);
  const handleCloseModal = () => {
    setOpenAddFireSubStaionModal(false);
  };

  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackBar(false);
  };

  const { cityFireSubStations } = useGetCityFireSubStations(
    cities[selectedCity]
  );

  return (
    <div className="h-full flex flex-col relative shadow-md border">
      {cityFireSubStations.length === 0 ? (
        <p className="h-full flex items-center justify-center italic font-semibold overflow-auto">
          No registered fire sub-station
        </p>
      ) : (
        <div className="h-full overflow-auto ">
          {cityFireSubStations.map((item, index) => (
            <p
              key={index}
              className={`capitalize border p-5 cursor-pointer hover:bg-off-white ${
                selectedFireSubStation === item.id ? "bg-off-white" : ""
              } `}
              onClick={() => setSelectedFireSubStation(item.id)}
            >
              {item.name.toLowerCase()}
            </p>
          ))}
        </div>
      )}
      <button
        className="p-2 bg-darkBlue text-white rounded-md hover:bg-darBlue2"
        onClick={() => setOpenAddFireSubStaionModal(true)}
      >
        Add Fire Sub-Station
      </button>
      <ModalComponent
        open={openAddFireSubStaionModal}
        onClose={handleCloseModal}
      >
        <AddFireSubStationModal
          setOpenAddFireSubStaionModal={setOpenAddFireSubStaionModal}
          setOpenSuccessSnackBar={setOpenSuccessSnackBar}
          city={cities[selectedCity]}
          fireDistrictName={fireDistrictName}
        />
      </ModalComponent>

      <Snackbar
        open={openSuccessSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Fire Sub Station successfully added!"
      />
    </div>
  );
};

export default SubStations;
