import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/services/api";

export default function MusicManagement({ musicas, loading, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (musica) => {
    setEditingId(musica.id);
    setEditForm({
      titulo: musica.titulo,
      visualizacoes: musica.visualizacoes,
      youtube_id: musica.youtube_id,
      thumb: musica.thumb,
    });
  };

  const handleSave = async (musicaId) => {
    try {
      await api.put(`/musicas/${musicaId}`, editForm);
      setEditingId(null);
      onRefresh();
    } catch (error) {
      console.error("Erro ao atualizar música:", error);
    }
  };

  const handleDelete = async (musicaId) => {
    if (window.confirm("Tem certeza que deseja excluir esta música?")) {
      try {
        await api.delete(`/musicas/${musicaId}`);
        onRefresh();
      } catch (error) {
        console.error("Erro ao excluir música:", error);
      }
    }
  };

  const handleRestore = async (musicaId) => {
    try {
      await api.patch(`/musicas/${musicaId}/restore`);
      onRefresh();
    } catch (error) {
      console.error("Erro ao restaurar música:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando músicas...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gerenciar Músicas</h3>
        <Button onClick={onRefresh} variant="outline" size="sm">
          Atualizar
        </Button>
      </div>

      {musicas.map((musica) => (
        <Card
          key={musica.id}
          className={`p-4 ${musica.deleted_at ? "bg-muted opacity-75" : ""}`}
        >
          <div className="flex items-start gap-4">
            <img
              src={musica.thumb}
              alt={musica.titulo}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1 space-y-2">
              {editingId === musica.id ? (
                <>
                  <Input
                    value={editForm.titulo}
                    onChange={(e) =>
                      setEditForm({ ...editForm, titulo: e.target.value })
                    }
                    placeholder="Título"
                  />
                  <Input
                    type="number"
                    value={editForm.visualizacoes}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        visualizacoes: e.target.value,
                      })
                    }
                    placeholder="Visualizações"
                  />
                  <Input
                    value={editForm.youtube_id}
                    onChange={(e) =>
                      setEditForm({ ...editForm, youtube_id: e.target.value })
                    }
                    placeholder="YouTube ID"
                  />
                </>
              ) : (
                <>
                  <h4 className="font-semibold">{musica.titulo}</h4>
                  <p className="text-sm text-muted-foreground">
                    {musica.visualizacoes.toLocaleString()} visualizações
                  </p>
                  <p className="text-sm text-muted-foreground">
                    YouTube ID: {musica.youtube_id}
                  </p>
                  {musica.deleted_at && (
                    <p className="text-sm text-destructive">
                      Excluída em:{" "}
                      {new Date(musica.deleted_at).toLocaleDateString()}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2 flex-col">
              {editingId === musica.id ? (
                <>
                  <Button onClick={() => handleSave(musica.id)} size="sm">
                    Salvar
                  </Button>
                  <Button
                    onClick={() => setEditingId(null)}
                    variant="outline"
                    size="sm"
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  {!musica.deleted_at && (
                    <>
                      <Button
                        onClick={() => handleEdit(musica)}
                        variant="outline"
                        size="sm"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(musica.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Excluir
                      </Button>
                    </>
                  )}
                  {musica.deleted_at && (
                    <Button
                      onClick={() => handleRestore(musica.id)}
                      variant="default"
                      size="sm"
                    >
                      Restaurar
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
