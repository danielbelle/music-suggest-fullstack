import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // REMOVA a chamada para sanctum/csrf-cookie - não é mais necessária
      const response = await api.post("/login", { email, password });

      if (response.data.token) {
        login(response.data.token, response.data.user);
        window.location.href = "/";
      }
    } catch (error) {
      setErro(error.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        {erro && <div className="text-red-500 mb-2 text-sm">{erro}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Senha
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
