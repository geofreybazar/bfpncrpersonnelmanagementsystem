import axios from "axios";

export function createAxiosJWT(baseURL: string) {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
  
    async (error) => {
      console.log(error);
      const originalRequest = error.config;

      if (originalRequest.url.includes("/userauthenticate")) {
        return Promise.reject(error);
      }

      const isInvalidTokenError =
        error.response?.status === 401 &&
        error.response?.data?.code === "InvalidToken";

      const isTokenExpiredError =
        error.response?.status === 401 &&
        error.response?.data?.code === "TokenExpired";
      console.log(isInvalidTokenError);
      if (
        (isTokenExpiredError || isInvalidTokenError) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        console.log("Access token expired, attempting to refresh...");

        try {
          await axios.post(
            "/users/generateRefreshToken",
            {},
            { withCredentials: true }
          );
          console.log("Token refreshed successfully");
          return instance(originalRequest);
        } catch (error) {
          console.error(error);
          console.error("Refresh token failed. Logging out...");
          localStorage.removeItem("loggedUser");
          window.location.href = "/login";
          alert("Login session expired");
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
