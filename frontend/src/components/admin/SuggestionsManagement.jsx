import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOptimisticUpdate } from "@/hooks/useOptimisticUpdate";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/services/api"; //  ADICIONAR ESTA IMPORTACAO

export default function SuggestionsManagement({
  suggestions,
  loading,
  onSuggestionAction,
  onRefresh,
}) {
  const [message, setMessage] = useState(null);
  const { optimisticUpdate, commitUpdate, rollbackUpdate } =
    useOptimisticUpdate();

  const handleAction = async (sugestaoId, action) => {
    try {
      //  Atualização otimista
      const updatedSuggestions = optimisticUpdate(
        sugestaoId,
        { status: action === "approve" ? "aprovada" : "rejeitada" },
        suggestions
      );
      onRefresh(updatedSuggestions);

      //  API call - CORRIGIDO: usando api importado
      if (action === "approve") {
        await api.patch(`/sugestoes/${sugestaoId}/aprovar`);
      } else {
        await api.patch(`/sugestoes/${sugestaoId}/reprovar`);
      }

      //  Confirma
      commitUpdate(sugestaoId);

      setMessage({
        type: "success",
        text: `Sugestão ${
          action === "approve" ? "aprovada" : "rejeitada"
        } com sucesso!`,
      });
    } catch (error) {
      console.error("Erro ao processar sugestão:", error);

      //  Rollback
      const rolledBackSuggestions = rollbackUpdate(sugestaoId, suggestions);
      onRefresh(rolledBackSuggestions);

      setMessage({
        type: "error",
        text: "Erro ao processar sugestão. Tente novamente.",
      });
    }
  };

  if (loading && suggestions.length === 0) {
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
      {message && (
        <Alert
          variant={message.type === "error" ? "destructive" : "default"}
          className="mb-4"
        >
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Sugestões Pendentes</h3>
        <Button onClick={() => onRefresh()} variant="outline" size="sm">
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
                onClick={() => handleAction(sugestao.id, "approve")}
                variant="default"
                size="sm"
                disabled={sugestao.status === "aprovada"}
              >
                {sugestao.status === "aprovada" ? "Aprovado" : "Aprovar"}
              </Button>
              <Button
                onClick={() => handleAction(sugestao.id, "reject")}
                variant="destructive"
                size="sm"
                disabled={sugestao.status === "rejeitada"}
              >
                {sugestao.status === "rejeitada" ? "Rejeitado" : "Reprovar"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
