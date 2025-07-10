import { useState } from "react";
import ModalComponent from "../ReusableComponents/ModalComponent";
import AddOffice from "./AddOffice";
import useGetCityOffices from "../../hooks/useGetCityOffices";
import { Snackbar, SnackbarCloseReason } from "@mui/material";

interface SubStationsProps {
  selectedCity: number;
  cities: string[];
  fireDistrictName: string;
  setSelectedOffice: React.Dispatch<React.SetStateAction<string>>;
  selectedOffice: string;
}

const ListOffices: React.FC<SubStationsProps> = ({
  selectedCity,
  cities,
  fireDistrictName,
  setSelectedOffice,
  selectedOffice,
}) => {
  const [openAddCityOffice, setOpenAddCityOffice] = useState(false);
  const handleCloseModal = () => {
    setOpenAddCityOffice(false);
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

  const { cityOffices } = useGetCityOffices(cities[selectedCity]);

  return (
    <div className="h-full flex flex-col relative shadow-md border">
      {cityOffices.length === 0 ? (
        <p className="h-full flex items-center justify-center italic font-semibold overflow-auto">
          No registered office
        </p>
      ) : (
        <div className="h-full overflow-auto ">
          {cityOffices.map((item, index) => (
            <p
              key={index}
              className={`capitalize border p-5 cursor-pointer hover:bg-off-white ${
                selectedOffice === item.id ? "bg-off-white" : ""
              } `}
              onClick={() => setSelectedOffice(item.id)}
            >
              {item.officeName.toLowerCase()}
            </p>
          ))}
        </div>
      )}
      <button
        className="p-2 bg-darkBlue text-white rounded-md hover:bg-darBlue2"
        onClick={() => setOpenAddCityOffice(true)}
      >
        Add Fire Sub-Station
      </button>
      <ModalComponent open={openAddCityOffice} onClose={handleCloseModal}>
        <AddOffice
          setOpenAddCityOffice={setOpenAddCityOffice}
          setOpenSuccessSnackBar={setOpenSuccessSnackBar}
          city={cities[selectedCity]}
          fireDistrictName={fireDistrictName}
        />
      </ModalComponent>

      <Snackbar
        open={openSuccessSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="City Office successfully added!"
      />
    </div>
  );
};

export default ListOffices;
