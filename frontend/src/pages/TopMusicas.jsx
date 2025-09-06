import React, { useEffect, useState } from "react";
import api from "../services/api";

function TopMusicas() {
  const [top5, setTop5] = useState([]);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchMusicas() {
      try {
        const response = await api.get("/musicas");
        setTop5(response.data);
      } catch (error) {
        setTop5([]);
      }
    }
    fetchMusicas();
  }, []);

  async function handleSuggest(e) {
    e.preventDefault();
    try {
      const youtubeMatch = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
      const youtube_id = youtubeMatch ? youtubeMatch[1] : null;

      if (!youtube_id) {
        setMessage({ type: "error", text: "URL do YouTube inválida." });
        return;
      }

      const titulo = "Título Exemplo";
      const thumb = `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`;

      await api.post("/sugestoes", {
        youtube_id,
        titulo,
        thumb,
      });

      setMessage({ type: "success", text: "Sugestão enviada com sucesso!" });
      setUrl("");
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao enviar sugestão." });
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top 5 Músicas</h1>
      <ul>
        {top5.map((musica, idx) => (
          <li key={musica.id || idx} className="mb-2">
            <img
              src={musica.thumb}
              alt={musica.titulo}
              className="inline w-16 h-16 mr-2"
            />
            {musica.titulo}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSuggest} className="mt-6">
        <input
          type="text"
          placeholder="URL do YouTube"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Sugerir música
        </button>
      </form>
      {message && (
        <div
          className={`mt-2 ${
            message.type === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

export default TopMusicas;
