import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar/Sidebar";
import AddPersonnel from "../components/Personnel/AddPersonnel/AddPersonnel";
import Personnel from "../components/Personnel/Personnel";
import Dashboard from "../components/Dashboard/Dashboard";
import AddStation from "../components/AddStation/AddStation";
import AddFireDistrict from "../components/AddStation/AddFireDistrict/AddFireDistrict";
import AddCityFIreStation from "../components/AddStation/AddCityFireStation/AddCityFIreStation";
import AddFireSubStation from "../components/AddStation/AddFireSubStation/AddFireSubStation";
import UpdatePersonnel from "../components/Personnel/UpdatePersonnel/UpdatePersonnel";
import ViewPersonnel from "../components/Personnel/ViewPersonnel/ViewPersonnel";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-initial">
        <Sidebar />
      </div>
      <div className="flex-grow p-5">
        <Navbar />
        <div className="py-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addpersonnel" element={<AddPersonnel />} />
            <Route path="/personnel" element={<Personnel />} />
            <Route path="/addstation" element={<AddStation />} />
            <Route
              path="/addstation/firedistrict"
              element={<AddFireDistrict />}
            />
            <Route
              path="/addstation/cityfirestation"
              element={<AddCityFIreStation />}
            />
            <Route
              path="/addstation/firesubstion"
              element={<AddFireSubStation />}
            />
            <Route
              path="/personnel/updatepersonnel"
              element={<UpdatePersonnel />}
            />
            <Route
              path="/personnel/viewpersonnel"
              element={<ViewPersonnel />}
            />
            {/* <Route path='/' element={} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
