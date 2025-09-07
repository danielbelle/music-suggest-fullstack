import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function TopMusicas() {
  const [top5, setTop5] = useState([]);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMusicas();
  }, []);

  const fetchMusicas = async () => {
    try {
      const response = await api.get("/musicas");
      setTop5(response.data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      setTop5([]);
    }
  };

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

      await api.post("/sugestoes", {
        youtube_id: youtubeId,
        titulo,
        thumb,
      });

      setMessage({ type: "success", text: "Sugestão enviada com sucesso!" });
      setUrl("");
      fetchMusicas();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Erro ao enviar sugestão.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Principal */}
        <Card className="mb-8 text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Top 5 Músicas Mais Tocadas
            </CardTitle>
            <CardDescription className="text-lg">
              Tião Carreiro & Pardinho
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Formulário de Sugestão */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Sugerir Nova Música</CardTitle>
            <CardDescription>
              Cole o link do YouTube para sugerir uma música
            </CardDescription>
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
          </CardContent>
        </Card>

        {/* Lista de Músicas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Ranking Atual</CardTitle>
          </CardHeader>
          <CardContent>
            {top5.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-6xl mb-4">🎵</div>
                <p className="text-lg font-semibold">
                  Nenhuma música cadastrada
                </p>
                <p className="text-sm">Seja o primeiro a sugerir uma música!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {top5.map((musica, index) => (
                  <a
                    key={musica.id}
                    href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="flex items-center bg-muted rounded-lg p-4 hover:bg-accent transition-all duration-200 group-hover:shadow-md border">
                      <div className="text-2xl font-bold text-primary w-10 text-center">
                        {index + 1}
                      </div>

                      <img
                        src={musica.thumb}
                        alt={musica.titulo}
                        className="w-16 h-16 rounded-lg object-cover mx-4"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {musica.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {musica.visualizacoes.toLocaleString()} visualizações
                        </p>
                      </div>

                      <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        ▶
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default TopMusicas;
