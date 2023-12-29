import axios from "axios";
import { getFromStorage } from "./helper";

// const BASE_URL = "http://localhost:7000/api/v1";
const BASE_URL = "https://next-demo-backend.onrender.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
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

export default api;
