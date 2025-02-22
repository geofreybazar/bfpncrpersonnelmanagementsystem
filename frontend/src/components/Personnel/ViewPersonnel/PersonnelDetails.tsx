import { useSelector } from "react-redux";
import useGetPersonnel from "../../../hooks/useGetPersonnel";
import { RootState } from "../../../store";
import { Skeleton } from "@mui/material";

const PersonnelDetails = () => {
  const clickedPersonnel = useSelector(
    (state: RootState) => state.clickedPersonnel.id
  );

  const { personnel, isLoadingPersonnel } = useGetPersonnel(clickedPersonnel);

  if (isLoadingPersonnel) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </>
    );
  }

  const generalinformationData = [
    {
      title: "First Name",
      data: personnel.firstName,
    },
    {
      title: "Middle Name",
      data: personnel.middleName,
    },
    {
      title: "Last Name",
      data: personnel.lastName,
    },
    {
      title: "Email Address",
      data: personnel.email,
    },
  ];

  const officeInformationData = [
    {
      title: "Fire District",
      data: personnel.district,
    },
    {
      title: "City Fire Station",
      data: personnel.city,
    },
    {
      title: "Account Number",
      data: personnel.accountNumber,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">Personal Information</p>
      <div className="flex justify-between">
        <p className="font-semibold">Status: Active</p>
        <button className="bg-lightTurquoise p-2 rounded-md font-semibold hover:bg-turquoise hover:text-white">
          Update
        </button>
      </div>
      <div>
        <div className="w-full bg-gray-100 p-1 font-semibold">
          General Information
        </div>
        <div className="grid grid-cols-4 py-5">
          {generalinformationData.map((data, index) => (
            <div key={index}>
              <p className="text-gray-400">{data.title}</p>
              <p>{data.data}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="w-full bg-gray-100 p-1 font-semibold">
          Office Information
        </div>
        <div className="grid grid-cols-4 py-5">
          {officeInformationData.map((data, index) => (
            <div key={index}>
              <p className="text-gray-400">{data.title}</p>
              <p>{data.data}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonnelDetails;
