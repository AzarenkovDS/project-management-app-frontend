import axios from "axios";
import { useUser } from "../context/UserContext";

export const useBackendClient = () => {
  const { currentUser } = useUser();

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

  return client;
};
