import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user } = useAuth();
  const [top5, setTop5] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

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

  const handleEdit = (musica) => {
    if (!musica || !musica.id) {
      console.error("Música inválida para edição:", musica);
      return;
    }

    setEditingId(musica.id);
    setEditForm({
      titulo: musica.titulo || "",
      visualizacoes: musica.visualizacoes || 0,
    });
  };

  const handleSave = async (musicaId) => {
    try {
      // ✅ Atualização otimizada: atualiza localmente primeiro
      const musicaIndex = top5.findIndex((m) => m.id === musicaId);
      if (musicaIndex !== -1) {
        const updatedMusicas = [...top5];
        updatedMusicas[musicaIndex] = {
          ...updatedMusicas[musicaIndex],
          ...editForm,
        };
        setTop5(updatedMusicas); // Atualiza UI imediatamente
      }

      // ✅ Faz a requisição para o backend
      await api.put(`/musicas/${musicaId}`, editForm);

      setEditingId(null);

      // ✅ Apenas sincroniza se necessário (para dados muito sensíveis)
      // fetchMusicas(); // Removido para otimização
    } catch (error) {
      console.error("Erro ao atualizar música:", error);

      // ✅ Revert a atualização local em caso de erro
      fetchMusicas(); // Recarrega os dados originais do servidor

      alert("Erro ao salvar. Os dados foram restaurados.");
    }
  };

  const handleDelete = async (musicaId) => {
    if (window.confirm("Tem certeza que deseja excluir esta música?")) {
      try {
        // ✅ Remoção otimizada: remove localmente primeiro
        setTop5((prev) => prev.filter((m) => m.id !== musicaId));

        // ✅ Faz a requisição para o backend
        await api.delete(`/musicas/${musicaId}`);

        // ✅ Não precisa recarregar tudo, já removemos localmente
      } catch (error) {
        console.error("Erro ao excluir música:", error);

        // ✅ Revert a remoção local em caso de erro
        fetchMusicas(); // Recarrega os dados originais

        if (error.response?.status === 401) {
          alert("Você não tem permissão para excluir esta música.");
        } else {
          alert("Erro ao excluir música. Tente novamente.");
        }
      }
    }
  };

  const handleSuggestionAdded = () => {
    fetchMusicas();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
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
              {user
                ? "Como usuário autenticado, sua música será adicionada diretamente!"
                : "Cole o link do YouTube para sugerir uma música (será necessária aprovação)"}
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
            {user && (
              <CardDescription>
                Você está autenticado e pode editar ou excluir músicas
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <MusicList
              musicas={top5}
              loading={loading}
              onRefresh={fetchMusicas}
              canEdit={!!user}
              onEdit={handleEdit}
              onSave={handleSave}
              onDelete={handleDelete}
              editingId={editingId}
              editForm={editForm}
              onEditFormChange={setEditForm}
            />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
