import axios from "axios";

const API_BASE_URL = "http://localhost:9000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const testApiConnection = async () => {
  try {
    console.log("Testando conexão com API...");

    // Teste rota pública
    const publicResponse = await api.get("/musicas");
    console.log("✅ Rotas públicas funcionando:", publicResponse.status);

    // Teste rota protegida (se estiver autenticado)
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        const protectedResponse = await api.get("/user");
        console.log(
          "✅ Rotas protegidas funcionando:",
          protectedResponse.status
        );
      } catch (error) {
        console.log("❌ Erro em rota protegida:", error.response?.status);
      }
    }
  } catch (error) {
    console.error("❌ Erro na conexão com API:", error.message);
  }
};

export default api;
