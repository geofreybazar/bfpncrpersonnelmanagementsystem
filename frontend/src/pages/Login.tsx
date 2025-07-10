import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button, TextField } from "@mui/material";
import { Credential } from "../utilities/models";
import userService from "../services/userService";

import logo from "../assets/logo.svg";
import { userActions } from "../store/userSlice";
const Login = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: Credential = {
      accountNumber: accountNumber,
      password: password,
    };

    userService
      .login(credentials)
      .then((res) => {
        window.localStorage.setItem("loggedUser", JSON.stringify(res));
        dispatch(userActions.setUser(res));
        navigate("/");
      })
      .catch((error) => {
        setLoginError(error.response.data.error);
      });
  };

  return (
    <div className="bg-offwhite h-screen flex items-center justify-center">
      <div className=" w-2/5 shadow-xl border p-10">
        <div className="h-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center pb-5">
            <img src={logo} className="w-3/5" />.
            <div className="text-center pb-2 font-semibold">
              <p className="text-xl">
                Bureau of Fire Protection - National Capital Region
              </p>
              <p className="text-xl">Personnel Management Information System</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="p-2 flex flex-col gap-2">
                <TextField
                  required
                  id="fullWidth"
                  size="small"
                  autoComplete="yes"
                  className="w-full"
                  margin="dense"
                  label="Account Number"
                  variant="outlined"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter Your Account Number"
                  type="string"
                />
                <TextField
                  required
                  size="small"
                  autoComplete="yes"
                  className="w-full"
                  margin="dense"
                  id="filled-password-input"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  type="password"
                />

                {loginError && (
                  <p className="text-center uppercase text-red-500">
                    {loginError}
                  </p>
                )}
                <Button type="submit" variant="contained" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </div>
          <p>Information Technology and Communication Unit, BFP-NCR</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
