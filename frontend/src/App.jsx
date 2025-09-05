import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("Testando conexão...");

  useEffect(() => {
    fetch("http://localhost:9000/ping")
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch(() => setMsg("Erro ao conectar com o backend"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Teste de Conexão</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;
