import { useState, useEffect } from "react";
import tiaoImg from "../assets/perfilImg.png";

export default function TopMusicas() {
  const [top5, setTop5] = useState([]);
  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fetchMusicas() {
      try {
        const res = await fetch("http://localhost:9000/musicas");
        const data = await res.json();
        setTop5(data);
        console.log("Dados recebidos:", data);
      } catch (error) {
        setTop5([]);
        console.error("Erro ao buscar músicas:", error);
      }
    }
    fetchMusicas();
  }, []);

  async function handleSuggest(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:9000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      // Extrair o ID do YouTube da URL
      const youtubeMatch = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
      const youtube_id = youtubeMatch ? youtubeMatch[1] : null;

      if (!youtube_id) {
        setMessage({ type: "error", text: "URL do YouTube inválida." });
        return;
      }

      // Exemplo de título e thumb (ajuste conforme necessário)
      const titulo = "Título Exemplo";
      const thumb = `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`;

      // Pega o token CSRF do cookie
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      }
      const xsrfToken = getCookie("XSRF-TOKEN");

      const res = await fetch("http://localhost:9000/sugestoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        credentials: "include",
        body: JSON.stringify({
          youtube_id,
          titulo,
          thumb,
        }),
      });

      const responseBody = await res.text();

      if (res.ok) {
        setMessage({ type: "success", text: "Sugestão enviada com sucesso!" });
        setUrl("");
      } else {
        setMessage({
          type: "error",
          text: `Erro ao enviar sugestão: ${res.status} - ${responseBody}`,
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao enviar sugestão." });
      console.error("Erro na requisição:", error);
    }
  }

  return (
    <>
      {/* Header */}
      <header className="flex flex-col items-center gap-2 py-8 bg-gradient-to-b from-yellow-100 to-white shadow-md rounded-b-2xl mb-8">
        <img
          src={tiaoImg}
          alt="Tião Carreiro"
          className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
        />
        <h1 className="text-3xl font-bold text-yellow-800 mt-2">
          Top 5 Músicas Mais Tocadas
        </h1>
        <h2 className="text-xl text-yellow-700 font-medium">
          Tião Carreiro & Pardinho
        </h2>
      </header>

      <div className="container mx-auto max-w-xl px-4">
        {/* Formulário de sugestão */}
        <div className="submit-form mb-8">
          <h3 className="text-lg font-semibold mb-2">Sugerir Nova Música</h3>
          {message && (
            <div
              className={`mb-2 p-2 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSuggest}>
            <div className="flex gap-2">
              <input
                type="url"
                name="url"
                placeholder="Cole aqui o link do YouTube"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
              >
                Enviar Link
              </button>
            </div>
          </form>
        </div>

        {/* Ranking Atual */}
        <h3 className="section-title text-lg font-semibold mb-4">
          Ranking Atual
        </h3>
        {top5.length === 0 ? (
          <div className="empty-state flex flex-col items-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🎵</div>
            <div className="font-semibold">Nenhuma música cadastrada ainda</div>
            <div className="text-sm">
              Seja o primeiro a sugerir uma música usando o formulário acima!
            </div>
          </div>
        ) : (
          top5.map((item, idx) => (
            <a
              key={item.id}
              href={`https://www.youtube.com/watch?v=${item.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4"
            >
              <div className="flex items-center bg-white rounded-lg shadow-md p-4 hover:bg-yellow-50 transition">
                <div className="text-2xl font-bold text-yellow-600 w-8 text-center">
                  {idx + 1}
                </div>
                <img
                  src={item.thumb}
                  alt={`Thumbnail ${item.titulo}`}
                  className="w-16 h-16 rounded-md object-cover mx-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.titulo}</div>
                  <div className="text-gray-500 text-sm">
                    {item.visualizacoes} visualizações
                  </div>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </>
  );
}
