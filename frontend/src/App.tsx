import { useEffect, useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";
import { RootState } from "./store";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(userActions.setUser(user));
      }
    } catch (error) {
      console.error("Error parsing loggedUser data:", error);
    }
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={user ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
