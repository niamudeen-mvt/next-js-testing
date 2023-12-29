import axios from "axios";
import { getFromStorage, storeInStorage } from "./helper";

// const BASE_URL = "http://localhost:7000/api/v1";

const BASE_URL = "https://next-demo-backend.onrender.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async function (config) {
    const access_token = getFromStorage("access_token");
    if (config.url !== "/auth/login" && config.url !== "/auth/register") {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        let res = await api.get("/auth/refresh-token");
        if (res.status === 200) {
          storeInStorage("access_token", res.data.access_token);

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;
          return axios(originalRequest);
        }
      } catch (error: any) {
        console.log(error.response.data.message);
      } finally {
        isRefreshing = false;
      }

      return Promise.reject(error);
    }
  }
);

export default api;
