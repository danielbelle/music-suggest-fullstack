import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicManagement from "@/components/admin/MusicManagement";
import SuggestionsManagement from "@/components/admin/SuggestionsManagement";
import api from "@/services/api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [suggestions, setSuggestions] = useState([]);
  const [musicas, setMusicas] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const response = await api.get("/musicas?with_trashed=true");
      setMusicas(response.data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchSuggestions(), fetchMusicas()]);
    setLoading(false);
  };

  const handleSuggestionAction = async (sugestaoId, action) => {
    try {
      if (action === "approve") {
        await api.patch(`/sugestoes/${sugestaoId}/aprovar`);
      } else if (action === "reject") {
        await api.patch(`/sugestoes/${sugestaoId}/reprovar`);
      }

      // Atualizar a lista de sugestões e músicas
      await fetchData();
    } catch (error) {
      console.error("Erro ao processar sugestão:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Painel Administrativo
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="suggestions">
                  Sugestões Pendentes ({suggestions.length})
                </TabsTrigger>
                <TabsTrigger value="musics">
                  Gerenciar Músicas ({musicas.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="suggestions">
                <SuggestionsManagement
                  suggestions={suggestions}
                  loading={loading}
                  onSuggestionAction={handleSuggestionAction}
                  onRefresh={fetchData}
                />
              </TabsContent>
              <TabsContent value="musics">
                <MusicManagement
                  musicas={musicas}
                  loading={loading}
                  onRefresh={fetchMusicas}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
