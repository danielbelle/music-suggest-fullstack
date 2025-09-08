import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MusicCard({
  musica,
  index,
  compact = false,
  canEdit = false,
  isEditing = false,
  editForm = {},
  onEdit,
  onSave,
  onDelete,
  onEditFormChange,
}) {
  // Função para evitar propagação de eventos
  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // Função para abrir o YouTube
  const openYouTube = () => {
    window.open(
      `https://www.youtube.com/watch?v=${musica.youtube_id}`,
      "_blank"
    );
  };

  if (compact) {
    return (
      <div
        className="bg-muted rounded-lg p-3 hover:bg-accent transition-colors border group relative cursor-pointer"
        onClick={!isEditing ? openYouTube : undefined} // Só é clicável quando não está editando
      >
        {/* Botões de edição para usuários autenticados */}
        {canEdit && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {isEditing ? (
              <>
                <Button
                  onClick={(e) => {
                    stopPropagation(e);
                    onSave(musica.id);
                  }}
                  size="sm"
                  className="h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                >
                  ✓
                </Button>
                <Button
                  onClick={(e) => {
                    stopPropagation(e);
                    if (onEdit) onEdit(null);
                  }}
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  ✕
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={(e) => {
                    stopPropagation(e);
                    onEdit(musica);
                  }}
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  ✏️
                </Button>
                <Button
                  onClick={(e) => {
                    stopPropagation(e);
                    onDelete(musica.id);
                  }}
                  variant="destructive"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  🗑️
                </Button>
              </>
            )}
          </div>
        )}

        {/* REMOVIDO o link <a> que envolvia tudo */}
        <div className="flex flex-col h-full">
          <img
            src={musica.thumb}
            alt={musica.titulo}
            className="w-full h-32 rounded-lg object-cover mb-3"
          />

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2" onClick={stopPropagation}>
                <Input
                  value={editForm.titulo || ""}
                  onChange={(e) =>
                    onEditFormChange({
                      ...editForm,
                      titulo: e.target.value,
                    })
                  }
                  placeholder="Título"
                  className="text-sm"
                  onClick={stopPropagation}
                  onFocus={stopPropagation}
                />
                <Input
                  type="number"
                  value={editForm.visualizacoes || ""}
                  onChange={(e) =>
                    onEditFormChange({
                      ...editForm,
                      visualizacoes: e.target.value,
                    })
                  }
                  placeholder="Visualizações"
                  className="text-sm"
                  onClick={stopPropagation}
                  onFocus={stopPropagation}
                />
              </div>
            ) : (
              <>
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary mb-1">
                  {musica.titulo}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {musica.visualizacoes.toLocaleString()} views
                </p>
              </>
            )}
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">
              Posição #{index + 1}
            </span>
            {!isEditing && ( // Só mostra o ícone do YouTube quando não está editando
              <div
                className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm cursor-pointer"
                onClick={openYouTube}
              >
                ▶
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Para o layout não compact (top 5)
  return (
    <div
      className="flex items-center bg-muted rounded-lg p-4 hover:bg-accent transition-colors border group relative cursor-pointer"
      onClick={!isEditing ? openYouTube : undefined} // Só é clicável quando não está editando
    >
      {/* Número da posição */}
      <div className="text-2xl font-bold text-primary w-10 text-center">
        {index + 1}
      </div>

      <img
        src={musica.thumb}
        alt={musica.titulo}
        className="w-16 h-16 rounded-lg object-cover mx-4"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-2" onClick={stopPropagation}>
            <Input
              value={editForm.titulo || ""}
              onChange={(e) =>
                onEditFormChange({
                  ...editForm,
                  titulo: e.target.value,
                })
              }
              placeholder="Título"
              onClick={stopPropagation}
              onFocus={stopPropagation}
            />
            <Input
              type="number"
              value={editForm.visualizacoes || ""}
              onChange={(e) =>
                onEditFormChange({
                  ...editForm,
                  visualizacoes: e.target.value,
                })
              }
              placeholder="Visualizações"
              onClick={stopPropagation}
              onFocus={stopPropagation}
            />
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-foreground">{musica.titulo}</h3>
            <p className="text-sm text-muted-foreground">
              {musica.visualizacoes.toLocaleString()} visualizações
            </p>
          </>
        )}
      </div>

      {/* Botões de ação */}
      {canEdit && (
        <div className="flex gap-2 ml-4" onClick={stopPropagation}>
          {isEditing ? (
            <>
              <Button
                onClick={(e) => {
                  stopPropagation(e);
                  onSave(musica.id);
                }}
                size="sm"
              >
                Salvar
              </Button>
              <Button
                onClick={(e) => {
                  stopPropagation(e);
                  if (onEdit) onEdit(null);
                }}
                variant="outline"
                size="sm"
              >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={(e) => {
                  stopPropagation(e);
                  onEdit(musica);
                }}
                variant="outline"
                size="sm"
              >
                Editar
              </Button>
              <Button
                onClick={(e) => {
                  stopPropagation(e);
                  onDelete(musica.id);
                }}
                variant="destructive"
                size="sm"
              >
                Excluir
              </Button>
            </>
          )}
        </div>
      )}

      {!isEditing && ( // Só mostra o link do YouTube quando não está editando
        <div
          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-4 cursor-pointer"
          onClick={openYouTube}
        >
          ▶
        </div>
      )}
    </div>
  );
}
