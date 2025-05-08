"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  category: "system" | "affiliate" | "financial";
}

export default function SimpleNotificationCenter() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Novo Afiliado",
      message: "Maria Oliveira se cadastrou como afiliada.",
      time: "Agora mesmo",
      read: false,
      type: "info",
      category: "affiliate",
    },
    {
      id: "2",
      title: "Comissão Recebida",
      message: "Você recebeu uma comissão de R$ 150,00.",
      time: "5 minutos atrás",
      read: false,
      type: "success",
      category: "financial",
    },
    {
      id: "3",
      title: "Documentos Pendentes",
      message: "Carlos Ferreira precisa enviar documentos.",
      time: "1 hora atrás",
      read: true,
      type: "warning",
      category: "affiliate",
    },
    {
      id: "4",
      title: "Venda Realizada",
      message: "Pedro Santos realizou uma venda de R$ 500,00.",
      time: "3 horas atrás",
      read: true,
      type: "info",
      category: "financial",
    },
    {
      id: "5",
      title: "Atualização do Sistema",
      message: "Nova versão do sistema disponível com melhorias.",
      time: "1 dia atrás",
      read: true,
      type: "info",
      category: "system",
    },
    {
      id: "6",
      title: "Erro no Processamento",
      message: "Houve um erro ao processar seu último saque.",
      time: "2 dias atrás",
      read: true,
      type: "error",
      category: "financial",
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const filterNotifications = (category: string) => {
    if (category === "all") {
      return notifications;
    }
    return notifications.filter((n) => n.category === category);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
          Centro de Notificações
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount} novas
            </span>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Marcar todas como lidas
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="border-b mb-4">
          <div className="flex space-x-1">
            {["all", "system", "affiliate", "financial"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${activeTab === tab ? "border-b-2 border-primary" : "text-muted-foreground"}`}
              >
                {tab === "all"
                  ? "Todas"
                  : tab === "system"
                    ? "Sistema"
                    : tab === "affiliate"
                      ? "Afiliados"
                      : "Financeiro"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filterNotifications(activeTab).length > 0 ? (
            filterNotifications(activeTab).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${!notification.read ? "bg-blue-50 border-blue-200" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">
                        {notification.title}
                      </h4>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs ${getTypeColor(notification.type)}`}
                      >
                        {notification.type === "info"
                          ? "Info"
                          : notification.type === "success"
                            ? "Sucesso"
                            : notification.type === "warning"
                              ? "Aviso"
                              : "Erro"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full border">
                        {notification.category === "system"
                          ? "Sistema"
                          : notification.category === "affiliate"
                            ? "Afiliados"
                            : "Financeiro"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Marcar como lida
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma notificação encontrada
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
