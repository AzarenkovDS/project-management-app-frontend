import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBackendClient } from "../clients/useBackendClient";
import type {
  CurrentUser,
  LoginFormData,
  RegisterFormData,
  UserContextType,
} from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext<UserContextType>({
  currentUser: null,
  register: () => console.warn("no user provider"),
  login: () => console.warn("no user provider"),
  logout: () => console.warn("no user provider"),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useLocalStorage<null | CurrentUser>(
    "current_user",
    null
  );
  const backendClient = useBackendClient();

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const logout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const login = async (formData: LoginFormData) => {
    const res = await backendClient.post("/users/login", formData);

    setCurrentUser(res.data);

    navigate("/projects");
  };

  const register = async (formData: RegisterFormData) => {
    const res = await backendClient.post("/users/register", formData);

    setCurrentUser(res.data);

    navigate("/projects");
  };

  const values = useMemo(
    () => ({
      currentUser,
      login,
      register,
      logout,
    }),
    [currentUser]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};
