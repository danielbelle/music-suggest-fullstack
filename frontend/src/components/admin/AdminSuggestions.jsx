import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminSuggestions({
  suggestions,
  loading,
  searchTerm,
  onSearchChange,
  onApprove,
  onReject,
  onRefresh,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "Data não disponível";
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getUserInfo = (suggestion) => {
    if (suggestion.user) {
      return {
        name: suggestion.user.name,
        email: suggestion.user.email,
      };
    }
    return {
      name: suggestion.nome_usuario || "Anônimo",
      email: suggestion.email_usuario || "",
    };
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.user?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      suggestion.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (suggestion.nome_usuario &&
        suggestion.nome_usuario
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (suggestion.email_usuario &&
        suggestion.email_usuario
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-2">Carregando sugestões...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar sugestões por título, nome ou email..."
          className="max-w-sm"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <Button onClick={onRefresh} variant="outline" size="sm">
          Atualizar
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSuggestions.map((suggestion) => {
            const userInfo = getUserInfo(suggestion);
            return (
              <TableRow key={suggestion.id}>
                <TableCell className="font-medium">
                  {suggestion.titulo}
                  {suggestion.youtube_id && (
                    <div className="text-xs text-muted-foreground">
                      ID: {suggestion.youtube_id}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {userInfo.name}
                  {userInfo.email && ` (${userInfo.email})`}
                </TableCell>
                <TableCell>{formatDate(suggestion.created_at)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      suggestion.status === "aprovada"
                        ? "default"
                        : suggestion.status === "rejeitada"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {suggestion.status === "aprovada"
                      ? "Aprovada"
                      : suggestion.status === "rejeitada"
                      ? "Rejeitada"
                      : "Pendente"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApprove(suggestion.id)}
                    disabled={suggestion.status === "aprovada"}
                  >
                    {suggestion.status === "aprovada" ? "Aprovado" : "Aprovar"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onReject(suggestion.id)}
                    disabled={suggestion.status === "rejeitada"}
                  >
                    {suggestion.status === "rejeitada"
                      ? "Rejeitado"
                      : "Rejeitar"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
          {filteredSuggestions.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                {searchTerm
                  ? "Nenhuma sugestão encontrada"
                  : "Nenhuma sugestão pendente"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
