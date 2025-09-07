import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      //  Verificar se a resposta existe e tem dados
      if (response.data) {
        const { token, user } = response.data;

        if (token && user) {
          login(user, token);
          navigate("/");
        } else {
          setMessage({
            type: "error",
            text: "Resposta inválida do servidor",
          });
        }
      } else {
        setMessage({
          type: "error",
          text: "Não foi possível conectar ao servidor",
        });
      }
    } catch (error) {
      console.error("Erro no login:", error);

      //Tratar diferentes tipos de erro
      if (error.response) {
        // O servidor respondeu com um status de erro
        if (error.response.status === 401) {
          setMessage({
            type: "error",
            text: "Email ou senha incorretos",
          });
        } else if (error.response.data?.message) {
          setMessage({
            type: "error",
            text: error.response.data.message,
          });
        } else {
          setMessage({
            type: "error",
            text: "Erro no servidor. Tente novamente.",
          });
        }
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        setMessage({
          type: "error",
          text: "Não foi possível conectar ao servidor. Verifique sua conexão.",
        });
      } else {
        // Outro tipo de erro
        setMessage({
          type: "error",
          text: "Erro inesperado. Tente novamente.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className="mb-4"
            >
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link
                to="/signup"
                className="text-primary hover:underline font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
