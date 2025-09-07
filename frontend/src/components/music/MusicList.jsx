import React from "react";
import MusicCard from "./MusicCard";

export default function MusicList({ musicas, loading, onRefresh }) {
  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2">Carregando músicas...</p>
      </div>
    );
  }

  if (musicas.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="text-6xl mb-4">🎵</div>
        <p className="text-lg font-semibold">Nenhuma música cadastrada</p>
        <p className="text-sm">Seja o primeiro a sugerir uma música!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Primeiras 5 músicas - tamanho normal */}
      {musicas.slice(0, 5).map((musica, index) => (
        <MusicCard key={musica.id} musica={musica} index={index} />
      ))}

      {/* Músicas a partir da 6ª - layout grid menor */}
      {musicas.length > 5 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="col-span-full">
            <h3 className="text-lg font-semibold mb-4">Mais músicas</h3>
          </div>
          {musicas.slice(5).map((musica, index) => (
            <div
              key={musica.id}
              className="bg-muted rounded-lg p-3 hover:bg-accent transition-colors"
            >
              <a
                href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-center">
                  <img
                    src={musica.thumb}
                    alt={musica.titulo}
                    className="w-12 h-12 rounded-lg object-cover mr-3"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate group-hover:text-primary">
                      {musica.titulo}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {musica.visualizacoes.toLocaleString()} views
                    </p>
                  </div>

                  <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    ▶
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
