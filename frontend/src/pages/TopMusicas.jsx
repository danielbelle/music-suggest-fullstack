import { useEffect, useState } from "react";

export default function Top5Musicas() {
  const [musicas, setMusicas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9000/musicas")
      .then((res) => res.json())
      .then((data) => {
        // Ordena por visualizações e pega as 5 primeiras
        const top5 = data
          .sort((a, b) => b.visualizacoes - a.visualizacoes)
          .slice(0, 5);
        setMusicas(top5);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Top 5 Músicas</h2>
      <ul className="space-y-4">
        {musicas.map((musica, idx) => (
          <li
            key={musica.id}
            className="flex items-center bg-white rounded shadow p-3"
          >
            <span className="text-xl font-bold mr-4">{idx + 1}.</span>
            <img
              src={musica.thumb}
              alt={musica.titulo}
              className="w-16 h-16 rounded mr-4"
            />
            <div>
              <div className="font-semibold">{musica.titulo}</div>
              <div className="text-sm text-gray-500">
                {musica.visualizacoes.toLocaleString()} views
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline"
              >
                Ver no YouTube
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
