import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor - เพิ่ม Authorization Header จาก Cookie
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    // ดึง Token จาก localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data || error.message);
    } else {
      console.error("Unexpected Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
