import React, { useState, useMemo } from "react";
import MusicCard from "./MusicCard";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function MusicList({
  musicas,
  loading,
  onRefresh,
  canEdit = false,
  onEdit,
  onSave,
  onDelete,
  editingId,
  editForm,
  onEditFormChange,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    top5Musicas,
    remainingMusicas,
    paginatedMusicas,
    totalPages,
    showPagination,
  } = useMemo(() => {
    // Separar top 5 das demais
    const top5Musicas = musicas.slice(0, 5);
    const remainingMusicas = musicas.slice(5);

    const totalItems = remainingMusicas.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMusicas = remainingMusicas.slice(startIndex, endIndex);

    return {
      top5Musicas,
      remainingMusicas,
      paginatedMusicas,
      totalPages,
      showPagination: totalItems > itemsPerPage,
    };
  }, [musicas, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  if (musicas.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="text-6xl mb-4">🎵</div>
        <p className="text-lg font-semibold">Nenhuma música cadastrada</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top 5 Músicas - Estilo especial */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Top 5 Músicas</h3>
        <div className="space-y-3">
          {top5Musicas.map((musica, index) => (
            <div
              key={musica.id}
              className="flex items-center bg-muted rounded-lg p-4 hover:bg-accent transition-colors border"
            >
              <div className="text-2xl font-bold text-primary w-10 text-center">
                {index + 1}
              </div>

              <img
                src={musica.thumb}
                alt={musica.titulo}
                className="w-16 h-16 rounded-lg object-cover mx-4"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">
                  {musica.titulo}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {musica.visualizacoes.toLocaleString()} visualizações
                </p>
              </div>

              {/* Botões de ação para o Top 5 */}
              {canEdit && (
                <div className="flex gap-2 ml-4">
                  {editingId === musica.id ? (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSave(musica.id);
                        }}
                        size="sm"
                      >
                        Salvar
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditFormChange({});
                          onEdit(null);
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
                          e.stopPropagation();
                          if (musica && musica.id) {
                            onEdit(musica);
                          } else {
                            console.error(
                              "Tentativa de editar música inválida:",
                              musica
                            );
                          }
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
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

              <a
                href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary opacity-0 hover:opacity-100 transition-opacity ml-4"
                onClick={(e) => e.stopPropagation()}
              >
                ▶
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Demais Músicas - Estilo grid */}
      {remainingMusicas.length > 0 && (
        <div id="pagination-section">
          <h3 className="text-xl font-semibold mb-4">
            Mais Músicas ({remainingMusicas.length} no total)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedMusicas.map((musica, index) => (
              <MusicCard
                key={musica.id}
                musica={musica}
                index={
                  top5Musicas.length + (currentPage - 1) * itemsPerPage + index
                }
                compact={true}
                canEdit={canEdit}
                isEditing={editingId === musica.id}
                editForm={editForm}
                onEdit={onEdit}
                onSave={onSave}
                onDelete={onDelete}
                onEditFormChange={onEditFormChange}
              />
            ))}
          </div>

          {/* Componente de paginação */}
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}
