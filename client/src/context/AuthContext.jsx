import { createContext, useState, useContext, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data);
    } catch {
      setUser(null);
    }
  };

  const login = async (credentials) => {
    await API.post("/auth/login", credentials);
    await fetchUser();
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
