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

export const debugRoutes = async () => {
  try {
    const routesToTest = [
      "/sugestoes",
      "/musicas",
      "/sugestoes/pendentes",
      "/musicas/admin",
      "/user",
    ];

    for (const route of routesToTest) {
      try {
        const response = await api.get(route);
        console.log(`✅ ${route}:`, response.status);
      } catch (error) {
        console.log(`❌ ${route}:`, error.response?.status || error.message);
      }
    }
  } catch (error) {
    console.error("Erro no debug de rotas:", error);
  }
};

export default api;
