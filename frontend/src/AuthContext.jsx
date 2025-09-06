import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      api
        .get("/user")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
          localStorage.removeItem("auth_token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("auth_token", token);
    setUser(userData);
  };

  const logout = () => {
    api.post("/logout").finally(() => {
      localStorage.removeItem("auth_token");
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
