import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuggestionsManagement({
  suggestions,
  loading,
  onSuggestionAction,
  onRefresh,
}) {
  if (loading) {
    return <div className="text-center py-8">Carregando sugestões...</div>;
  }

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhuma sugestão pendente</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sugestões Pendentes</h3>
        <Button onClick={onRefresh} variant="outline" size="sm">
          Atualizar
        </Button>
      </div>

      {suggestions.map((sugestao) => (
        <Card key={sugestao.id} className="p-4">
          <div className="flex items-start gap-4">
            <img
              src={sugestao.thumb}
              alt={sugestao.titulo}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h4 className="font-semibold">{sugestao.titulo}</h4>
              <p className="text-sm text-muted-foreground">
                Sugerido por: {sugestao.nome_usuario || "Anônimo"}
              </p>
              <p className="text-sm text-muted-foreground">
                {sugestao.email_usuario}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onSuggestionAction(sugestao.id, "approve")}
                variant="default"
                size="sm"
              >
                Aprovar
              </Button>
              <Button
                onClick={() => onSuggestionAction(sugestao.id, "reject")}
                variant="destructive"
                size="sm"
              >
                Reprovar
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
