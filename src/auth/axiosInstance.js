import axios from "axios";
import store from "../store.js";
import { login } from "../Redux/userSlice.js";
import { navigate } from "./navigation.js";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UAParser from "ua-parser-js";

const appUrl = import.meta.env.VITE_REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: appUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    // console.log(state.user.user.permissions)
    const accessToken = state?.user?.user?.accessToken;
    // console.log(accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const parser = new UAParser();
    const deviceInfo = `${parser.getBrowser().name} | ${
      parser.getCPU().architecture
    } | ${parser.getOS().name}`;
    config.headers["Device-Info"] = deviceInfo;

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, tokens = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(tokens);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.endsWith("/token")
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((tokens) => {
            originalRequest.headers["Authorization"] =
              "Bearer " + tokens.accessToken;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const state = store.getState();

      const refreshToken = state.user?.user?.refreshToken;

      if (!refreshToken) {
        toast.error(
          "Your session has expired. Please log in again to continue."
        );
        navigate("/");
        store.dispatch(login(""));
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${appUrl}/token`, {
          refreshToken,
        });
        console.log(refreshToken);

        const newAccessToken = response.data.accessToken;
        console.log(newAccessToken);
        store.dispatch(
          login({
            accessToken: newAccessToken,
          })
        );

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        processQueue(null, {
          accessToken: newAccessToken,
        });

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(
          login({
            accessToken: null,
            refreshToken: null,
            authenticated: false,
          })
        );

        toast.error(
          "Your session has expired. Please log in again to continue."
        );
        console.log("refreshToken Expired");
        navigate("/");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
