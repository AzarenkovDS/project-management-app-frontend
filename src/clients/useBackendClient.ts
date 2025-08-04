import axios from "axios";
import { useUser } from "../context/UserContext";

export const useBackendClient = () => {
  const { currentUser, logout } = useUser();

  const client = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  // Inject token if exists
  client.interceptors.request.use(
    (config) => {
      if (currentUser?.token) {
        config.headers.Authorization = `Bearer ${currentUser.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Catch 401 errors
  // client.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response?.status === 401) {
  //       logout();
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  return client;
};
