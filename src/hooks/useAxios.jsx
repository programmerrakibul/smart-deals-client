import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-api-server-neon.vercel.app/api",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
