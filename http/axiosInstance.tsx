import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create();


// axios defaults
// axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

// interceptors
// Request interceptor
axiosInstance.interceptors.request.use(
  async(config: any) => {
    // bottom line is required, if you are using react-query or something similar
    const token = await AsyncStorage.getItem("token");
    if (config.headers["authorization"]) {
      config.headers["authorization"] = null;
    }
    config.headers["authorization"] = `Bearer ${token}`;
    //TODO:+ token to be picked from AsyncStorage

    if (config.params) {
      for (const key of Object.keys(config.params)) {
        if (config.params[key] === "") {
          delete config.params[key];
        } else if (typeof config.params === "string") {
          config.params[key].trim();
        }
      }
    }

    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// for multiple requests
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   function (response: any) {
//     return response;
//   },
//   function (error: any) {
//     // if refresh also fails with 401
//     if (error.response.status === 401) {
//       return true;
//       //TODO logout function to be triggered
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
