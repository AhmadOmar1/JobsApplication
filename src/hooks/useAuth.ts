import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { isAuthenticated, isAdmin, login, logout } = context;

  return { isAuthenticated, isAdmin, login, logout };
};
