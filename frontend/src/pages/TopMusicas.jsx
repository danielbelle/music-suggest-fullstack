import { useState, useEffect } from "react";
import Header from "../components/Header";
import SuggestionForm from "../components/SuggestionForm";
import EmptyState from "../components/EmptyState";
import MusicList from "../components/MusicList";

export default function TopMusicas() {
  const [top5, setTop5] = useState([]);
  const [message, setMessage] = useState(null);

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

  function handleSuggest(url) {
    fetch("/sugestoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage({ type: "success", text: "Sugestão enviada com sucesso!" });
        // Opcional: recarregar lista
      })
      .catch(() =>
        setMessage({ type: "error", text: "Erro ao enviar sugestão." })
      );
  }

  return (
    <>
      <Header />
      <div className="container">
        <SuggestionForm onSubmit={handleSuggest} message={message} />
        {top5.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <h3 className="section-title">Ranking Atual</h3>
            <MusicList top5={top5} />
          </>
        )}
      </div>
    </>
  );
}
