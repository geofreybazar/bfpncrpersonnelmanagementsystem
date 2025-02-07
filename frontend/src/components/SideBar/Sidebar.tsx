import { useState } from "react";
import { NavLink } from "react-router-dom";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CollapseComponent from "./CollapseComponent";
import logo from "../../assets/logo.svg";

const Sidebar = () => {
  const [openPersonnel, setOpenPersonnel] = useState(false);
  const [openStation, setOpenStation] = useState(false);
  const [openOffices, setOpenOffices] = useState(false);

  return (
    <div className='h-full w-60 border-r'>
      <div className='bg-turquoise p-5'>
        <img src={logo} alt='Bureau of Fire Protection Logos' />
        <p className='text-center text-white font-semibold p-2'>
          BFP-NCR Personnel Management System
        </p>
      </div>

      <div className='p-5 flex flex-col gap-3'>
        <NavLink to='/'>Home</NavLink>

        <div>
          <div
            className='cursor-pointer flex justify-between border-b border-gray-400'
            onClick={() => setOpenPersonnel(!openPersonnel)}
          >
            <div>Personnel</div>
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
            className='cursor-pointer flex justify-between border-b border-gray-400'
            onClick={() => setOpenStation(!openStation)}
          >
            <div>Stations</div>
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
            className='cursor-pointer flex justify-between border-b border-gray-400'
            onClick={() => setOpenOffices(!openOffices)}
          >
            <div>Office</div>
            {openOffices ? <ExpandLess /> : <ExpandMore />}
          </div>
          <CollapseComponent
            state={openOffices}
            list={[
              { link: "Add Office", url: "/addoffice" },
              { link: "Office", url: "/office" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
