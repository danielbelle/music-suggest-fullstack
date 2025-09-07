import React, { useState, useMemo } from "react";
import MusicCard from "./MusicCard";
import Pagination from "@/components/ui/pagination";

export default function MusicList({ musicas, loading, onRefresh }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { top5Musicas, paginatedMusicas, totalPages, showPagination } =
    useMemo(() => {
      if (musicas.length <= 5) {
        return {
          top5Musicas: musicas,
          paginatedMusicas: [],
          totalPages: 0,
          showPagination: false,
        };
      }

      const top5Musicas = musicas.slice(0, 5);
      const remainingMusicas = musicas.slice(5);

      const totalItems = remainingMusicas.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedMusicas = remainingMusicas.slice(startIndex, endIndex);

      return {
        top5Musicas,
        paginatedMusicas,
        totalPages,
        showPagination: totalItems > itemsPerPage,
      };
    }, [musicas, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("pagination-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    <div className="space-y-6">
      {/* Top 5 músicas */}
      <div className="space-y-4">
        {top5Musicas.map((musica, index) => (
          <MusicCard key={musica.id} musica={musica} index={index} />
        ))}
      </div>

      {/* Músicas restantes com paginação */}
      {musicas.length > 5 && (
        <div id="pagination-section" className="space-y-4">
          <h3 className="text-lg font-semibold">
            Mais Músicas ({musicas.length - 5} no total)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedMusicas.map((musica, index) => (
              <div
                key={musica.id}
                className="bg-muted rounded-lg p-3 hover:bg-accent transition-colors border"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex flex-col h-full">
                    <img
                      src={musica.thumb}
                      alt={musica.titulo}
                      className="w-full h-32 rounded-lg object-cover mb-3"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary mb-1">
                        {musica.titulo}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {musica.visualizacoes.toLocaleString()} views
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        #
                        {top5Musicas.length +
                          (currentPage - 1) * itemsPerPage +
                          index +
                          1}
                      </span>
                      <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        ▶
                      </div>
                    </div>
                  </div>
                </a>
              </div>
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
