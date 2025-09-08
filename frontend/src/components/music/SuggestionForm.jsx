import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";

export default function SuggestionForm({ onSuggestionAdded }) {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractYouTubeId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z09_-]{11})/,
      /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const fetchVideoTitle = async (youtubeId) => {
    try {
      const response = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${youtubeId}`
      );
      const data = await response.json();
      return data.title || "Título não disponível";
    } catch (error) {
      console.error("Erro ao buscar título:", error);
      return "Título não disponível";
    }
  };

  const handleSuggest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const youtubeId = extractYouTubeId(url);
      if (!youtubeId) {
        setMessage({
          type: "error",
          text: "URL do YouTube inválida ou não reconhecida.",
        });
        return;
      }

      const titulo = await fetchVideoTitle(youtubeId);
      const thumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

      const sugestaoData = {
        youtube_id: youtubeId,
        titulo: titulo,
        thumb: thumb,
      };

      if (user) {
        sugestaoData.nome_usuario = user.name;
        sugestaoData.email_usuario = user.email;
        sugestaoData.user_id = user.id;
      }

      // ✅ DEBUG: Verificar token antes da requisição
      const token = localStorage.getItem("auth_token");
      console.log("Token no localStorage:", token);
      console.log("User no context:", user);
      console.log("Enviando dados:", sugestaoData);

      const response = await api.post("/sugestoes", sugestaoData);

      // ✅ DEBUG: Verificar resposta
      console.log("Resposta da API:", response.data);

      const successMessage = user
        ? response.data.message || "Música adicionada com sucesso!"
        : "Sugestão enviada com sucesso! Aguarde aprovação.";

      setMessage({
        type: "success",
        text: successMessage,
      });
      setUrl("");

      if (onSuggestionAdded) {
        onSuggestionAdded();
      }
    } catch (error) {
      // ✅ DEBUG: Verificar erro completo
      console.error("Erro completo:", error);
      console.error("Resposta de erro:", error.response);

      setMessage({
        type: "error",
        text: error.response?.data?.message || "Erro ao enviar sugestão.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && (
        <Alert
          variant={message.type === "error" ? "destructive" : "default"}
          className="mb-4"
        >
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={handleSuggest}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          type="url"
          placeholder="Cole aqui o link do YouTube (qualquer formato)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Sugerir Música"}
        </Button>
      </form>
    </div>
  );
}
