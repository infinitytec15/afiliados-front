"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Users, DollarSign, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", afiliados: 40, comissoes: 2400 },
  { name: "Fev", afiliados: 30, comissoes: 1398 },
  { name: "Mar", afiliados: 20, comissoes: 9800 },
  { name: "Abr", afiliados: 27, comissoes: 3908 },
  { name: "Mai", afiliados: 18, comissoes: 4800 },
  { name: "Jun", afiliados: 23, comissoes: 3800 },
  { name: "Jul", afiliados: 34, comissoes: 4300 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total de Afiliados
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              Comissões Pagas
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              Taxa de Conversão
            </CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <div className="flex items-center pt-1 text-xs text-red-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>4% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              Novos Afiliados
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>18% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Crescimento de Afiliados</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="afiliados" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Comissões Geradas</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="comissoes" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                user: "Maria Silva",
                action: "cadastrou-se como afiliada",
                time: "há 5 minutos",
              },
              {
                user: "João Oliveira",
                action: "gerou R$ 450,00 em comissões",
                time: "há 2 horas",
              },
              {
                user: "Carlos Mendes",
                action: "indicou 3 novos clientes",
                time: "há 4 horas",
              },
              {
                user: "Ana Beatriz",
                action: "solicitou saque de R$ 1.200,00",
                time: "há 1 dia",
              },
              {
                user: "Pedro Santos",
                action: "atingiu meta de qualificação",
                time: "há 2 dias",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
