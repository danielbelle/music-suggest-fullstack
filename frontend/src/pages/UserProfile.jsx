import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProfileSettings from "@/components/user/ProfileSettings";
import ChangePassword from "@/components/user/ChangePassword";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Meu Perfil</h1>

          <ProfileSettings />
          <ChangePassword />
        </div>
      </main>

      <Footer />
    </div>
  );
}
