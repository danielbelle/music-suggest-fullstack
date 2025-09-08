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
import MusicCard from "@/components/music/MusicCard";
import SuggestionForm from "@/components/music/SuggestionForm";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { useOptimisticUpdate } from "@/hooks/useOptimisticUpdate";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TopMusicas() {
  const { user } = useAuth();
  const [top5, setTop5] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState(null);
  const itemsPerPage = 8;

  const { optimisticUpdate, optimisticDelete, commitUpdate, rollbackUpdate } =
    useOptimisticUpdate();

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
    if (musica === null) {
      setEditingId(null);
      return;
    }

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
      //  Atualização otimista
      const updatedMusicas = optimisticUpdate(musicaId, editForm, top5);
      setTop5(updatedMusicas);
      setEditingId(null);

      //  API call em segundo plano
      await api.put(`/musicas/${musicaId}`, editForm);

      //  Confirma a atualização
      commitUpdate(musicaId);

      setMessage({
        type: "success",
        text: "Música atualizada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao atualizar música:", error);

      //  Rollback em caso de erro
      const rolledBackMusicas = rollbackUpdate(musicaId, top5);
      setTop5(rolledBackMusicas);

      setMessage({
        type: "error",
        text: "Erro ao salvar. Alterações revertidas.",
      });
    }
  };

  const handleDelete = async (musicaId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta música?")) return;

    try {
      //  Deleção otimista
      const updatedMusicas = optimisticDelete(musicaId, top5);
      setTop5(updatedMusicas);

      //  API call em segundo plano
      await api.delete(`/musicas/${musicaId}`);

      //  Confirma a deleção
      commitUpdate(musicaId);

      setMessage({
        type: "success",
        text: "Música excluída com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao excluir música:", error);

      //  Rollback em caso de erro
      const rolledBackMusicas = rollbackUpdate(musicaId, top5);
      setTop5(rolledBackMusicas);

      if (error.response?.status === 401) {
        setMessage({
          type: "error",
          text: "Você não tem permissão para excluir esta música.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Erro ao excluir música. Tente novamente.",
        });
      }
    }
  };

  const handleSuggestionAdded = () => {
    // Para sugestões, ainda precisamos recarregar pois pode adicionar nova música
    fetchMusicas();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Cálculo das músicas paginadas
  const top5Musicas = top5.slice(0, 5);
  const remainingMusicas = top5.slice(5);
  const totalItems = remainingMusicas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMusicas = remainingMusicas.slice(startIndex, endIndex);
  const showPagination = totalItems > itemsPerPage;

  if (loading && top5.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center py-12">Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {message && (
          <Alert
            variant={message.type === "error" ? "destructive" : "default"}
            className="mb-4"
          >
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Ranking Atual</CardTitle>
              {user && (
                <CardDescription>
                  Você está autenticado e pode editar ou excluir músicas
                </CardDescription>
              )}
            </div>
            <Button onClick={fetchMusicas} variant="outline" size="sm">
              Atualizar
            </Button>
          </CardHeader>
          <CardContent>
            {top5.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-6xl mb-4">🎵</div>
                <p className="text-lg font-semibold">
                  Nenhuma música cadastrada
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Top 5 Músicas */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Top 5 Músicas</h3>
                  <div className="space-y-3">
                    {top5Musicas.map((musica, index) => (
                      <MusicCard
                        key={musica.id}
                        musica={musica}
                        index={index}
                        compact={false}
                        canEdit={!!user}
                        isEditing={editingId === musica.id}
                        editForm={editForm}
                        onEdit={handleEdit}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        onEditFormChange={setEditForm}
                      />
                    ))}
                  </div>
                </div>

                {/* Demais Músicas */}
                {remainingMusicas.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Mais Músicas ({remainingMusicas.length} no total)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {paginatedMusicas.map((musica, index) => (
                        <MusicCard
                          key={musica.id}
                          musica={musica}
                          index={top5Musicas.length + startIndex + index}
                          compact={true}
                          canEdit={!!user}
                          isEditing={editingId === musica.id}
                          editForm={editForm}
                          onEdit={handleEdit}
                          onSave={handleSave}
                          onDelete={handleDelete}
                          onEditFormChange={setEditForm}
                        />
                      ))}
                    </div>

                    {/* Paginação */}
                    {showPagination && (
                      <div className="mt-6">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
