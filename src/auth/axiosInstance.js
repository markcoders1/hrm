import axios from "axios";
import UAParser from "ua-parser-js";

const appUrl = import.meta.env.VITE_REACT_APP_API_URL;
let parser = new UAParser();

const axiosInstance = axios.create({
  baseURL: appUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) {
          // Handle missing refreshToken
          sessionStorage.removeItem("accessToken");
          window.location.href = "/";
          return Promise.reject(error);
        }

        const response = await axios.post(`${appUrl}/api/auth/token`, {
          refreshToken,
          deviceId: `${parser.getBrowser().name} | ${parser.getCPU().architecture} | ${parser.getOS().name}`,
        });

        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          sessionStorage.setItem("accessToken", newAccessToken);
          // Set new token directly on the original request headers
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        }
      } catch (tokenError) {
        if (tokenError.response && tokenError.response.status === 403) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
