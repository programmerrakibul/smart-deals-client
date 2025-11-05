import axios from "axios";
import useAuthInfo from "./useAuthInfo";
import { useEffect } from "react";

const secureInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const useAxiosSecure = () => {
  const { currentUser, signOutUser } = useAuthInfo();

  useEffect(() => {
    const requestInterceptor = secureInstance.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${currentUser.accessToken}`;

        return config;
      }
    );

    const responseInterceptor = secureInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log(error);
        const status = error.status;

        if (status === 401 || status === 403) {
          console.log("User Logged out");
          signOutUser();
        }

        return error;
      }
    );

    return () => {
      secureInstance.interceptors.request.eject(requestInterceptor);
      secureInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser.accessToken, signOutUser]);

  return secureInstance;
};

export default useAxiosSecure;
