import React, { useEffect, useState } from "react";
import api from "@/services/api";

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

  // Função para extrair ID do vídeo de qualquer formato do YouTube
  const extractYouTubeId = (url) => {
    const patterns = [
      // Formato padrão: https://www.youtube.com/watch?v=VIDEO_ID
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      // Formato curto: https://youtu.be/VIDEO_ID
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      // Formato embed: https://www.youtube.com/embed/VIDEO_ID
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      // Formato mobile: https://m.youtube.com/watch?v=VIDEO_ID
      /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z09_-]{11})/,
      // Formato com parâmetros extras: https://www.youtube.com/watch?v=VIDEO_ID&t=10s
      /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
      // Formato com lista: https://www.youtube.com/watch?v=VIDEO_ID&list=LIST_ID
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

  // Função para buscar título do vídeo usando a API do YouTube
  const fetchVideoTitle = async (youtubeId) => {
    try {
      // Você pode usar a API pública do YouTube (requer chave API)
      // Ou uma alternativa sem API (pode ser bloqueada pelo CORS)

      // Alternativa 1: Usando oAPI do YouTube (recomendado)
      // const response = await fetch(
      //   `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=snippet&key=SUA_CHAVE_API`
      // );
      // const data = await response.json();
      // return data.items[0]?.snippet?.title || "Título não disponível";

      // Alternativa 2: Raspagem simples (pode não funcionar em produção)
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

      // Buscar título automaticamente
      const titulo = await fetchVideoTitle(youtubeId);
      const thumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

      await api.post("/sugestoes", {
        youtube_id: youtubeId,
        titulo,
        thumb,
      });

      setMessage({ type: "success", text: "Sugestão enviada com sucesso!" });
      setUrl("");

      // Atualizar a lista de músicas
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

  // ... resto do código permanece igual
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Top 5 Músicas Mais Tocadas
          </h1>
          <p className="text-gray-600">Tião Carreiro & Pardinho</p>
        </div>

        {/* Formulário de Sugestão */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sugerir Nova Música
          </h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.type === "error"
                  ? "bg-red-100 border border-red-400 text-red-700"
                  : "bg-green-100 border border-green-400 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form
            onSubmit={handleSuggest}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="url"
              placeholder="Cole aqui o link do YouTube (qualquer formato)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Sugerir Música"}
            </button>
          </form>
        </div>

        {/* Lista de Músicas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Ranking Atual
          </h2>

          {top5.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🎵</div>
              <p className="text-lg font-semibold">Nenhuma música cadastrada</p>
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
                  <div className="flex items-center bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition duration-200 group-hover:shadow-md">
                    <div className="text-2xl font-bold text-blue-600 w-10 text-center">
                      {index + 1}
                    </div>

                    <img
                      src={musica.thumb}
                      alt={musica.titulo}
                      className="w-16 h-16 rounded-lg object-cover mx-4"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate group-hover:text-blue-600">
                        {musica.titulo}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {musica.visualizacoes.toLocaleString()} visualizações
                      </p>
                    </div>

                    <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopMusicas;
