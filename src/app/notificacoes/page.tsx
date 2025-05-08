"use client";

import SimpleNotificationCenter from "@/components/SimpleNotificationCenter";

export default function NotificacoesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Notificações</h1>
      <SimpleNotificationCenter />
    </div>
  );
}
