import React, { useEffect, useState } from "react";
import api from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import MusicList from "@/components/music/MusicList";
import SuggestionForm from "@/components/music/SuggestionForm";

export default function TopMusicas() {
  const [top5, setTop5] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMusicas();
  }, []);

  const fetchMusicas = async () => {
    setLoading(true);
    try {
      const response = await api.get("/musicas");
      setTop5(response.data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      setTop5([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionAdded = () => {
    // Você pode adicionar lógica aqui se necessário
    console.log("Nova sugestão adicionada");
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
            <SuggestionForm onSuggestionAdded={handleSuggestionAdded} />
          </CardContent>
        </Card>

        {/* Lista de Músicas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Ranking Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <MusicList
              musicas={top5}
              loading={loading}
              onRefresh={fetchMusicas}
            />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
