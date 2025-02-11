import axios from "axios";

const baseUrl = "/firedistrict";

export const axiosJWT = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosJWT.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/users/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Access token expired, attempting to refresh...");

      try {
        await axios.post(
          "/users/generateRefreshToken",
          {},
          { withCredentials: true }
        );
        console.log("success");
        return axiosJWT(error.config);
      } catch (refreshError) {
        console.log(refreshError);
        console.error("Refresh token failed. Logging out...");
      }
    }

    return Promise.reject(error);
  }
);
