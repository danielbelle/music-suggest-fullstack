import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormatViews } from "@/utils/FormatViews";

export default function AdminStats({ suggestions, musicas }) {
  const totalVisualizacoes = musicas.reduce(
    (total, musica) => total + (musica.visualizacoes || 0),
    0
  );

  const musicasVisiveis = musicas.filter((m) => m.visivel).length;

  const stats = [
    {
      title: "Total de Músicas",
      value: musicas.length,
    },
    {
      title: "Sugestões Pendentes",
      value: suggestions.length,
    },
    {
      title: "Visualizações Totais",
      value: FormatViews(totalVisualizacoes),
    },
    {
      title: "Músicas Visíveis",
      value: musicasVisiveis,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
