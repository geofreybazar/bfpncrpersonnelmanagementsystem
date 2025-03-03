import axios from "axios";

const baseUrl = "/users";

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

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
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
        console.error("Refresh token failed. Logging out...");
        console.log(refreshError);
        localStorage.removeItem("loggedUser");
        window.location.href = "/login";
        alert("Login session expires");
      }
    }

    return Promise.reject(error);
  }
);
