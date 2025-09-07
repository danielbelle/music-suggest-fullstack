import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        const response = await api.get("/user");
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });

      if (response.data) {
        if (response.data.token) {
          localStorage.setItem("auth_token", response.data.token);
          setUser(response.data.user);
          return { ok: true };
        }
        // Se retornar apenas o usuário (com token no cookie)
        else if (response.data.id) {
          setUser(response.data);
          return { ok: true };
        }
      }

      return { ok: false, message: "Resposta inválida do servidor" };
    } catch (error) {
      return {
        ok: false,
        message: error.response?.data?.message || "Erro no login",
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post("/register", { name, email, password });

      if (response.data) {
        if (response.data.token) {
          localStorage.setItem("auth_token", response.data.token);
          setUser(response.data.user);
          return { ok: true };
        } else if (response.data.id) {
          setUser(response.data);
          return { ok: true };
        }
      }

      return { ok: false, message: "Resposta inválida do servidor" };
    } catch (error) {
      return {
        ok: false,
        message: error.response?.data?.message || "Erro no cadastro",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
