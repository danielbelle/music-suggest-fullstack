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

export default function AdminMusics({
  musicas,
  loading,
  searchTerm,
  onSearchChange,
  onToggleVisibility,
  onDelete,
  onRefresh,
}) {
  const filteredMusicas = musicas.filter((musica) =>
    musica.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-2">Carregando músicas...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar músicas por título..."
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
            <TableHead>ID YouTube</TableHead>
            <TableHead>Visualizações</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMusicas.map((musica) => (
            <TableRow key={musica.id}>
              <TableCell className="font-medium">{musica.titulo}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {musica.youtube_id}
              </TableCell>
              <TableCell>
                {(musica.visualizacoes || 0).toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant={musica.visivel ? "default" : "outline"}>
                  {musica.visivel ? "Visível" : "Oculta"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant={musica.visivel ? "outline" : "default"}
                  size="sm"
                  onClick={() => onToggleVisibility(musica.id, musica.visivel)}
                >
                  {musica.visivel ? "Ocultar" : "Mostrar"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(musica.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filteredMusicas.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhuma música cadastrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
