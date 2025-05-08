"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  avatar?: string;
  initials?: string;
  category: "system" | "affiliate" | "financial";
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Novo Afiliado",
      message: "Maria Oliveira se cadastrou como afiliada.",
      time: "Agora mesmo",
      read: false,
      type: "info",
      initials: "MO",
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
      initials: "CF",
      category: "affiliate",
    },
    {
      id: "4",
      title: "Venda Realizada",
      message: "Pedro Santos realizou uma venda de R$ 500,00.",
      time: "3 horas atrás",
      read: true,
      type: "info",
      initials: "PS",
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

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeStyles = (type: Notification["type"]) => {
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
          <Bell className="h-5 w-5" />
          Centro de Notificações
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} novas
            </Badge>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Marcar todas como lidas
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="affiliate">Afiliados</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
          </TabsList>
          {["all", "system", "affiliate", "financial"].map((category) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="space-y-4">
                {filterNotifications(category).length > 0 ? (
                  filterNotifications(category).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${!notification.read ? "bg-blue-50 border-blue-200" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          {notification.avatar && (
                            <AvatarImage
                              src={notification.avatar}
                              alt="Avatar"
                            />
                          )}
                          <AvatarFallback
                            className={getTypeStyles(notification.type)}
                          >
                            {notification.initials ||
                              notification.type.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium">
                                  {notification.title}
                                </h4>
                                {getTypeIcon(notification.type)}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge
                              variant="outline"
                              className="text-xs font-normal"
                            >
                              {notification.category === "system"
                                ? "Sistema"
                                : notification.category === "affiliate"
                                  ? "Afiliados"
                                  : "Financeiro"}
                            </Badge>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Marcar como lida
                              </Button>
                            )}
                          </div>
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
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
