import { createContext, useState, ReactNode, useEffect } from "react";
import { getAuthStatus, setAuthStatus } from "../utils/localStorage";

interface IAuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => string | null;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    getAuthStatus()
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    () => localStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    setIsAuthenticated(getAuthStatus());
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const login = (email: string, password: string) => {
    if (email === "admin@admin" && password === "admin") {
      setAuthStatus(true);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return null;
    }
    return "Invalid email or password";
  };

  const logout = () => {
    setAuthStatus(false);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
