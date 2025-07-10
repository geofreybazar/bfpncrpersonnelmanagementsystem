import { useState } from "react";
import { NavLink } from "react-router-dom";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CollapseComponent from "./CollapseComponent";
import logo from "../../assets/logo.svg";

import { FaHome, FaUser } from "react-icons/fa";
import { MdFireTruck } from "react-icons/md";
import { ImOffice } from "react-icons/im";

const Sidebar = () => {
  const [openPersonnel, setOpenPersonnel] = useState(false);
  const [openStation, setOpenStation] = useState(false);
  const [openOffice, setOpenOffice] = useState(false);

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="bg-turquoise p-5">
          <img src={logo} alt="Bureau of Fire Protection Logos" />
          <p className="text-center text-white font-semibold p-2">
            BFP-NCR Personnel Management System
          </p>
        </div>
        <div className="p-5 flex flex-col gap-3">
          <NavLink to="/">
            <div className="flex gap-2 items-center ">
              <FaHome />
              Dashboard
            </div>
          </NavLink>

          <div>
            <div
              className="cursor-pointer flex justify-between border-b border-gray-400"
              onClick={() => setOpenPersonnel(!openPersonnel)}
            >
              <div className="flex gap-2 items-center ">
                <FaUser />
                Personnel
              </div>
              {openPersonnel ? <ExpandLess /> : <ExpandMore />}
            </div>
            <CollapseComponent
              state={openPersonnel}
              list={[
                { link: "Add Personnel", url: "/addpersonnel" },
                { link: "Personnel", url: "/personnel" },
              ]}
            />
          </div>
          <div>
            <div
              className="cursor-pointer flex justify-between border-b border-gray-400"
              onClick={() => setOpenStation(!openStation)}
            >
              <div className="flex gap-2 items-center ">
                <MdFireTruck />
                Stations
              </div>
              {openStation ? <ExpandLess /> : <ExpandMore />}
            </div>
            <CollapseComponent
              state={openStation}
              list={[
                { link: "Add Station", url: "/addstation" },
                { link: "Station", url: "/station" },
              ]}
            />
          </div>

          <div>
            <div
              className="cursor-pointer flex justify-between border-b border-gray-400"
              onClick={() => setOpenOffice(!openOffice)}
            >
              <div className="flex gap-2 items-center ">
                <ImOffice />
                Offices
              </div>
              {openOffice ? <ExpandLess /> : <ExpandMore />}
            </div>
            <CollapseComponent
              state={openOffice}
              list={[{ link: "Offices", url: "/offices" }]}
            />
          </div>
        </div>
      </div>
      <div className="text-center pb-5">
        <p>Information Technology and Communications Unit</p>
        <p>@2025</p>
      </div>
    </div>
  );
};

export default Sidebar;
