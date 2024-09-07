import axios from "axios";
import UAParser from "ua-parser-js";

const appUrl= import.meta.env.VITE_REACT_APP_API_URL
let parser = new UAParser()

const axiosInstance=axios.create({
  baseURL:appUrl
})

axiosInstance.interceptors.request.use(
  config => {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    response => {
        // console.log(response)
        return response;
    },
    async error => {
        const originalRequest = error.config;
        console.log(error.request.status)

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // console.log("original Request",originalRequest)

            try {
                const refreshToken=sessionStorage.getItem("refreshToken")
                const response = await axios.post(`${appUrl}/api/auth/token`, {refreshToken,deviceId:`${parser.getBrowser().name} | ${parser.getCPU().architecture} | ${parser.getOS().name}`});
                console.log("response",response)

                
                if (response.status === 200) {
                    sessionStorage.setItem('accessToken', response.data.accessToken);
                    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
                    return await axiosInstance(originalRequest);
                }
            } catch (tokenError) {
                if (tokenError.response && tokenError.response.status === 403) {
                    sessionStorage.removeItem('accessToken');
                    sessionStorage.removeItem('refreshToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href='/'
                }
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance    