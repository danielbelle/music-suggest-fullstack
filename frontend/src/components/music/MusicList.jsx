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
      {musicas.map((musica, index) => (
        <MusicCard key={musica.id} musica={musica} index={index} />
      ))}
    </div>
  );
}
