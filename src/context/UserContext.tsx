import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
  currentUser: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const logout = () => {
    localStorage.removeItem("pm-app-token");
    setCurrentUser(null);
    navigate("/");
  };

    const login = () => {
    localStorage.removeItem("pm-app-token");
    setCurrentUser(null);
    navigate("/projects");
  };

    const register = () => {
    localStorage.removeItem("pm-app-token");
    setCurrentUser(null);
    navigate("/projects");
  };

  const values = {
    currentUser,
    login,
    register,
    logout,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};
