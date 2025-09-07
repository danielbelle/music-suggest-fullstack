import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      // ALTERAR: remover /api da frente
      const response = await api.get("/user"); // ← CORRIGIDO
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // ALTERAR: remover /api da frente
      const response = await api.post("/login", { email, password }); // ← CORRIGIDO

      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
        setUser(response.data.user);
        return { ok: true };
      }
    } catch (error) {
      return {
        ok: false,
        message: error.response?.data?.message || "Erro no login",
      };
    }
  };

  const logout = async () => {
    try {
      // ALTERAR: remover /api da frente
      await api.post("/logout"); // ← CORRIGIDO
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
