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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (activeTab === "suggestions") {
      fetchSuggestions();
    } else if (activeTab === "musics") {
      fetchMusicas();
    }
  }, [activeTab]);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/sugestoes/pendentes");
      setSuggestions(response.data);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
      // Fallback para caso a rota não exista ainda
      try {
        const response = await api.get("/sugestoes");
        const todasSugestoes = response.data;
        const pendentes = todasSugestoes.filter((s) => s.status === "pendente");
        setSuggestions(pendentes);
      } catch (secondError) {
        console.error("Erro ao buscar todas sugestões:", secondError);
        // Dados mockados para desenvolvimento
        setSuggestions([
          {
            id: 1,
            titulo: "Boi Soberano",
            user: { name: "Usuário", email: "usuario@exemplo.com" },
            created_at: "2023-11-15T00:00:00.000Z",
            status: "pendente",
            youtube_id: "abc123",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMusicas = async () => {
    setLoading(true);
    try {
      const response = await api.get("/musicas");
      setMusicas(response.data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      // Dados mockados para desenvolvimento
      setMusicas([
        {
          id: 1,
          titulo: "Boi Soberano",
          visualizacoes: 1500,
          visivel: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSuggestion = async (suggestionId) => {
    try {
      await api.patch(`/sugestoes/${suggestionId}/aprovar`);

      // Atualiza o status localmente
      setSuggestions(
        suggestions.map((s) =>
          s.id === suggestionId ? { ...s, status: "aprovada" } : s
        )
      );

      // Recarrega as músicas para mostrar a nova música aprovada
      setTimeout(() => fetchMusicas(), 500);
    } catch (error) {
      console.error("Erro ao aprovar sugestão:", error);
      alert("Erro ao aprovar sugestão");
    }
  };

  const handleRejectSuggestion = async (suggestionId) => {
    try {
      await api.patch(`/sugestoes/${suggestionId}/reprovar`);

      // Remove a sugestão reprovada da lista
      setSuggestions(suggestions.filter((s) => s.id !== suggestionId));
    } catch (error) {
      console.error("Erro ao reprovar sugestão:", error);
      alert("Erro ao reprovar sugestão");
    }
  };

  const handleToggleMusicVisibility = async (musicId, currentlyVisible) => {
    try {
      await api.put(`/musicas/${musicId}`, {
        visivel: !currentlyVisible,
      });
      fetchMusicas(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao alterar visibilidade:", error);
      alert("Erro ao alterar visibilidade da música");
    }
  };

  const handleDeleteMusic = async (musicId) => {
    if (window.confirm("Tem certeza que deseja excluir esta música?")) {
      try {
        await api.delete(`/musicas/${musicId}`);
        fetchMusicas(); // Recarrega a lista
      } catch (error) {
        console.error("Erro ao excluir música:", error);
        alert("Erro ao excluir música");
      }
    }
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.user?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      suggestion.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMusicas = musicas.filter((musica) =>
    musica.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para formatar a data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
                    placeholder="Filtrar sugestões por título, nome ou email..."
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-2">
                      Carregando sugestões...
                    </p>
                  </div>
                ) : (
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
                      {filteredSuggestions.map((suggestion) => (
                        <TableRow key={suggestion.id}>
                          <TableCell className="font-medium">
                            {suggestion.titulo}
                          </TableCell>
                          <TableCell>
                            {suggestion.user?.name ||
                              suggestion.nome_usuario ||
                              "Anônimo"}
                            {suggestion.user?.email &&
                              ` (${suggestion.user.email})`}
                            {suggestion.email_usuario &&
                              !suggestion.user?.email &&
                              ` (${suggestion.email_usuario})`}
                          </TableCell>
                          <TableCell>
                            {formatDate(suggestion.created_at)}
                          </TableCell>
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
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() =>
                                handleApproveSuggestion(suggestion.id)
                              }
                              disabled={suggestion.status === "aprovada"}
                            >
                              {suggestion.status === "aprovada"
                                ? "Aprovado"
                                : "Aprovar"}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                handleRejectSuggestion(suggestion.id)
                              }
                              disabled={suggestion.status === "rejeitada"}
                            >
                              {suggestion.status === "rejeitada"
                                ? "Rejeitado"
                                : "Rejeitar"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredSuggestions.length === 0 && (
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
                )}
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
