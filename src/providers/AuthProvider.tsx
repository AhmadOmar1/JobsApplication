import { createContext, useState, ReactNode, useEffect } from "react";
import { getAuthStatus, setAuthStatus } from "../utils/localStorage";

interface IAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => string | null;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    getAuthStatus()
  );

  useEffect(() => {
    setIsAuthenticated(getAuthStatus());
  }, []);

  const login = (email: string, password: string) => {
    if (email === "admin@admin" && password === "admin") {
      setAuthStatus(true);
      setIsAuthenticated(true);
      return null;
    }
    return "Invalid email or password";
  };

  const logout = () => {
    setAuthStatus(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
