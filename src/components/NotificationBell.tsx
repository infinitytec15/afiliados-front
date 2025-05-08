"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  avatar?: string;
  initials?: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Novo Afiliado",
      message: "Maria Oliveira se cadastrou como afiliada.",
      time: "Agora mesmo",
      read: false,
      type: "info",
      initials: "MO",
    },
    {
      id: "2",
      title: "Comissão Recebida",
      message: "Você recebeu uma comissão de R$ 150,00.",
      time: "5 minutos atrás",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Documentos Pendentes",
      message: "Carlos Ferreira precisa enviar documentos.",
      time: "1 hora atrás",
      read: true,
      type: "warning",
      initials: "CF",
    },
    {
      id: "4",
      title: "Venda Realizada",
      message: "Pedro Santos realizou uma venda de R$ 500,00.",
      time: "3 horas atrás",
      read: true,
      type: "info",
      initials: "PS",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notificações</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b last:border-b-0 ${!notification.read ? "bg-blue-50" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <Avatar className="h-9 w-9">
                    {notification.avatar && (
                      <AvatarImage src={notification.avatar} alt="Avatar" />
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
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-1"></div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma notificação
            </div>
          )}
        </div>
        <div className="p-2 border-t text-center">
          <Button variant="ghost" size="sm" className="text-xs w-full">
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
