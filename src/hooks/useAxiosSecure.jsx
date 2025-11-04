import axios from "axios";
import useAuthInfo from "./useAuthInfo";
import { useEffect } from "react";

const secureInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const useAxiosSecure = () => {
  const { currentUser } = useAuthInfo();

  useEffect(() => {
    const interceptor = secureInstance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${currentUser.accessToken}`;

      return config;
    });

    return () => {
      secureInstance.interceptors.request.eject(interceptor);
    };
  }, [currentUser.accessToken]);

  return secureInstance;
};

export default useAxiosSecure;
