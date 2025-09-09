import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormatViews } from "@/utils/FormatViews";

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
  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

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
        onClick={!isEditing ? openYouTube : undefined}
      >
        {/* Botões de edição responsivos */}
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

        <div className="flex flex-col h-full">
          {/* Thumb aumentada - de h-32 para h-40 */}
          <img
            src={musica.thumb}
            alt={musica.titulo}
            className="w-full h-40 md:h-48 lg:h-56 rounded-lg object-cover mb-3"
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
                  {FormatViews(musica.visualizacoes)} views
                </p>
              </>
            )}
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">
              Posição #{index + 1}
            </span>
            {!isEditing && (
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
      className="flex flex-col sm:flex-row items-center bg-muted rounded-lg p-4 hover:bg-accent transition-colors border group relative cursor-pointer gap-4"
      onClick={!isEditing ? openYouTube : undefined}
    >
      {/* Número da posição */}
      <div className="text-2xl font-bold text-primary w-10 text-center">
        #{index + 1}
      </div>

      <img
        src={musica.thumb}
        alt={musica.titulo}
        className="w-30 h-30 rounded-lg object-cover"
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
              className="w-full"
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
              className="w-full"
            />
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-foreground text-base sm:text-lg">
              {musica.titulo}
            </h3>
            <p className="text-sm text-muted-foreground">
              {FormatViews(musica.visualizacoes)} visualizações
            </p>
          </>
        )}
      </div>

      {/* Botões de ação responsivos */}
      {canEdit && (
        <div
          className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-4 sm:mt-0"
          onClick={stopPropagation}
        >
          {isEditing ? (
            <>
              <Button
                onClick={(e) => {
                  stopPropagation(e);
                  onSave(musica.id);
                }}
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline">Salvar</span>
                <span className="sm:hidden">✓</span>
              </Button>
              <Button
                onClick={(e) => {
                  stopPropagation(e);
                  if (onEdit) onEdit(null);
                }}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline">Cancelar</span>
                <span className="sm:hidden">✕</span>
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
                className="px-2 sm:px-3"
              >
                <span className="hidden sm:inline mr-1">Editar</span>
                <span>✏️</span>
              </Button>
              <Button
                onClick={(e) => {
                  stopPropagation(e);
                  onDelete(musica.id);
                }}
                variant="destructive"
                size="sm"
                className="px-2 sm:px-3"
              >
                <span className="hidden sm:inline mr-1">Excluir</span>
                <span>🗑️</span>
              </Button>
            </>
          )}
        </div>
      )}

      {!isEditing && (
        <div
          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer mt-4 sm:mt-0 sm:ml-4"
          onClick={openYouTube}
        >
          <span className="hidden sm:inline">Assistir</span>
          <span className="sm:hidden">▶</span>
        </div>
      )}
    </div>
  );
}
