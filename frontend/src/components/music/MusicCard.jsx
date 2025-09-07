import React from "react";

export default function MusicCard({ musica, index, compact = false }) {
  if (compact) {
    return (
      <a
        href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="flex items-center bg-muted rounded-lg p-3 hover:bg-accent transition-colors">
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
    );
  }

  return (
    <a
      href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex items-center bg-muted rounded-lg p-4 hover:bg-accent transition-all duration-200 group-hover:shadow-md border">
        <div className="text-2xl font-bold text-primary w-10 text-center">
          {index + 1}
        </div>

        <img
          src={musica.thumb}
          alt={musica.titulo}
          className="w-16 h-16 rounded-lg object-cover mx-4"
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {musica.titulo}
          </h3>
          <p className="text-sm text-muted-foreground">
            {musica.visualizacoes.toLocaleString()} visualizações
          </p>
        </div>

        <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          ▶
        </div>
      </div>
    </a>
  );
}
