import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import api from "@/services/api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [suggestions, setSuggestions] = useState([]);
  const [musicas, setMusicas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "suggestions") {
      fetchSuggestions();
    } else if (activeTab === "musics") {
      fetchMusicas();
    }
  }, [activeTab]);

  const fetchSuggestions = async () => {
    try {
      const response = await api.get("/sugestoes/pendentes");
      setSuggestions(response.data);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  };

  const fetchMusicas = async () => {
    try {
      const response = await api.get("/musicas/admin");
      setMusicas(response.data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
  };

  const handleApproveSuggestion = async (suggestionId) => {
    try {
      await api.post(`/sugestoes/${suggestionId}/aprovar`);
      fetchSuggestions();
      fetchMusicas();
    } catch (error) {
      console.error("Erro ao aprovar sugestão:", error);
    }
  };

  const handleRejectSuggestion = async (suggestionId) => {
    try {
      await api.post(`/sugestoes/${suggestionId}/rejeitar`);
      fetchSuggestions();
    } catch (error) {
      console.error("Erro ao rejeitar sugestão:", error);
    }
  };

  const handleToggleMusicVisibility = async (musicId, currentlyVisible) => {
    try {
      await api.patch(`/musicas/${musicId}`, {
        visivel: !currentlyVisible,
      });
      fetchMusicas();
    } catch (error) {
      console.error("Erro ao alterar visibilidade da música:", error);
    }
  };

  const handleDeleteMusic = async (musicId) => {
    if (window.confirm("Tem certeza que deseja excluir esta música?")) {
      try {
        await api.delete(`/musicas/${musicId}`);
        fetchMusicas();
      } catch (error) {
        console.error("Erro ao excluir música:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:max-w-md">
            <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
            <TabsTrigger value="musics">Músicas</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions">
            <Card>
              <CardHeader>
                <CardTitle>Sugestões Pendentes</CardTitle>
                <CardDescription>
                  Aprove ou reprove as sugestões de músicas enviadas pelos
                  usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center py-4">
                  <Input
                    placeholder="Filtrar sugestões..."
                    className="max-w-sm"
                  />
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
                    {suggestions.map((suggestion) => (
                      <TableRow key={suggestion.id}>
                        <TableCell className="font-medium">
                          {suggestion.titulo}
                        </TableCell>
                        <TableCell>{suggestion.user?.email || "N/A"}</TableCell>
                        <TableCell>
                          {new Date(suggestion.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Pendente</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() =>
                              handleApproveSuggestion(suggestion.id)
                            }
                          >
                            Aprovar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleRejectSuggestion(suggestion.id)
                            }
                          >
                            Reprovar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {suggestions.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Nenhuma sugestão pendente
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="musics">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Músicas</CardTitle>
                  <CardDescription>
                    Visualize e gerencie todas as músicas do sistema
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Visualizações</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {musicas.map((musica) => (
                      <TableRow key={musica.id}>
                        <TableCell className="font-medium">
                          {musica.titulo}
                        </TableCell>
                        <TableCell>
                          {musica.visualizacoes.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={musica.visivel ? "default" : "outline"}
                          >
                            {musica.visivel ? "Visível" : "Oculta"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant={musica.visivel ? "outline" : "default"}
                            size="sm"
                            className="mr-2"
                            onClick={() =>
                              handleToggleMusicVisibility(
                                musica.id,
                                musica.visivel
                              )
                            }
                          >
                            {musica.visivel ? "Ocultar" : "Mostrar"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteMusic(musica.id)}
                          >
                            Excluir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {musicas.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Nenhuma música cadastrada
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Músicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{musicas.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Sugestões Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{suggestions.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Visualizações Totais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {musicas
                      .reduce(
                        (total, musica) => total + musica.visualizacoes,
                        0
                      )
                      .toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Músicas Visíveis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {musicas.filter((m) => m.visivel).length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>
                  Configure as preferências do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Funcionalidade em desenvolvimento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
