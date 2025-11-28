import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

let accessToken = localStorage.getItem("accessToken") || "";

function setAccessToken(newToken: string) {
  localStorage.setItem("accessToken", newToken);
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { setAccessToken };

export default axiosInstance;
