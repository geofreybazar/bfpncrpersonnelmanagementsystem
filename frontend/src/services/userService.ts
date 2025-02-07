// import axios from "axios";
import { Credential } from "../utilities/models.ts";
import { User } from "../utilities/models.ts";

import { axiosJWT } from "./axiosCreate.ts";

// const baseUrl = "/users";

// const axiosJWT = axios.create({ baseURL: baseUrl, withCredentials: true });

// axiosJWT.interceptors.request.use(
//   async (config) => {
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosJWT.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (originalRequest.url.includes("/users/login")) {
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       console.log("Access token expired, attempting to refresh...");

//       try {
//         await axios.post(
//           "/users/generateRefreshToken",
//           {},
//           { withCredentials: true }
//         );
//         console.log("success");
//         return axiosJWT(error.config);
//       } catch (refreshError) {
//         console.error("Refresh token failed. Logging out...");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

const login = async (credentials: Credential) => {
  const response = await axiosJWT.post("/login", credentials);
  return response.data;
};

const getAllPersonnel = async (): Promise<User[]> => {
  const response = await axiosJWT.get("/getpersonnel");
  return response.data;
};

const addPersonnel = async (newPersonnel: User): Promise<User[]> => {
  const response = await axiosJWT.post("/addPersonnel", newPersonnel);
  return response.data;
};

export default {
  login,
  getAllPersonnel,
  addPersonnel,
};
