import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import api from "@/services/api";
import AdminSuggestions from "@/components/admin/AdminSuggestions";
import AdminMusics from "@/components/admin/AdminMusics";
import AdminStats from "@/components/admin/AdminStats";
import AdminSettings from "@/components/admin/AdminSettings";

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
      console.log("Sugestões recebidas:", response.data);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
      try {
        const response = await api.get("/sugestoes");
        const todasSugestoes = response.data;
        const pendentes = todasSugestoes.filter((s) => s.status === "pendente");
        setSuggestions(pendentes);
      } catch (secondError) {
        console.error("Erro ao buscar todas sugestões:", secondError);
        setSuggestions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMusicas = async () => {
    setLoading(true);
    try {
      const response = await api.get("/musicas");
      console.log("Músicas recebidas:", response.data);
      setMusicas(response.data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      setMusicas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSuggestion = async (suggestionId) => {
    try {
      console.log("Aprovando sugestão:", suggestionId);
      const response = await api.patch(`/sugestoes/${suggestionId}/aprovar`);
      console.log("Resposta da aprovação:", response.data);

      setSuggestions(
        suggestions.map((s) =>
          s.id === suggestionId ? { ...s, status: "aprovada" } : s
        )
      );

      setTimeout(() => fetchMusicas(), 500);
    } catch (error) {
      console.error("Erro ao aprovar sugestão:", error);
      alert(
        "Erro ao aprovar sugestão: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleRejectSuggestion = async (suggestionId) => {
    try {
      console.log("Reprovando sugestão:", suggestionId);
      const response = await api.patch(`/sugestoes/${suggestionId}/reprovar`);
      console.log("Resposta da reprovação:", response.data);

      setSuggestions(suggestions.filter((s) => s.id !== suggestionId));
    } catch (error) {
      console.error("Erro ao reprovar sugestão:", error);
      alert(
        "Erro ao reprovar sugestão: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleToggleMusicVisibility = async (musicId, currentlyVisible) => {
    try {
      const response = await api.put(`/musicas/${musicId}`, {
        visivel: !currentlyVisible,
      });
      console.log("Visibilidade alterada:", response.data);
      fetchMusicas();
    } catch (error) {
      console.error("Erro ao alterar visibilidade:", error);
      alert(
        "Erro ao alterar visibilidade: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleDeleteMusic = async (musicId) => {
    if (window.confirm("Tem certeza que deseja excluir esta música?")) {
      try {
        const response = await api.delete(`/musicas/${musicId}`);
        console.log("Música excluída:", response.data);
        fetchMusicas();
      } catch (error) {
        console.error("Erro ao excluir música:", error);
        alert(
          "Erro ao excluir música: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
                <AdminSuggestions
                  suggestions={suggestions}
                  loading={loading}
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                  onApprove={handleApproveSuggestion}
                  onReject={handleRejectSuggestion}
                  onRefresh={fetchSuggestions}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="musics">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Músicas</CardTitle>
                <CardDescription>
                  Visualize e gerencie todas as músicas do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminMusics
                  musicas={musicas}
                  loading={loading}
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                  onToggleVisibility={handleToggleMusicVisibility}
                  onDelete={handleDeleteMusic}
                  onRefresh={fetchMusicas}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>Visão geral do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminStats suggestions={suggestions} musicas={musicas} />
              </CardContent>
            </Card>
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
                <AdminSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
