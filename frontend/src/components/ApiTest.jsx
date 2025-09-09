import React from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";

export function ApiTest() {
  const testPublicRoute = async () => {
    try {
      const response = await api.get("/musicas");
      console.log("✅ Rotas públicas:", response.data);
    } catch (error) {
      console.error("❌ Erro em rota pública:", error);
    }
  };

  const testProtectedRoute = async () => {
    try {
      const response = await api.get("/user");
      console.log("✅ Rotas protegidas:", response.data);
    } catch (error) {
      console.error("❌ Erro em rota protegida:", error);
    }
  };

  return (
    <div className="p-4 space-y-2">
      <Button onClick={testPublicRoute}>Testar Rota Pública</Button>
      <Button onClick={testProtectedRoute}>Testar Rota Protegida</Button>
    </div>
  );
}
