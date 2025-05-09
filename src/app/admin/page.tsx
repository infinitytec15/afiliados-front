"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  Award,
  UserPlus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
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

const qualificacaoData = [
  { name: "Bronze", value: 540 },
  { name: "Prata", value: 320 },
  { name: "Ouro", value: 210 },
  { name: "Diamante", value: 120 },
  { name: "Platina", value: 58 },
];

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444"];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Admin
        </h1>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-md overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-700">
              Total de Afiliados
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">1,248</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-md overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-purple-700">
              Comissões Pagas
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-full">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              R$ 45.231,89
            </div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-0 shadow-md overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-green-700">
              Taxa de Conversão
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <Activity className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">24.8%</div>
            <div className="flex items-center pt-1 text-xs text-red-600">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>4% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-md overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-amber-700">
              Novos Afiliados
            </CardTitle>
            <div className="p-2 bg-amber-100 rounded-full">
              <UserPlus className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">128</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>18% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white border-0 shadow-md overflow-hidden col-span-1 lg:col-span-1">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-blue-800">Qualificações</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualificacaoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {qualificacaoData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value) => [`${value} afiliados`, "Quantidade"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {qualificacaoData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs text-gray-600">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-md overflow-hidden col-span-1 lg:col-span-1">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-blue-800">
              Crescimento de Afiliados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                    formatter={(value) => [`${value} afiliados`, "Total"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="afiliados"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                      r: 4,
                      fill: "#fff",
                    }}
                    activeDot={{
                      r: 6,
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-md overflow-hidden col-span-2 lg:col-span-1">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-blue-800">Comissões Geradas</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                    formatter={(value) => [
                      `R$ ${value.toLocaleString("pt-BR")}`,
                      "Comissões",
                    ]}
                  />
                  <Bar
                    dataKey="comissoes"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <Card className="bg-white border-0 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="text-blue-800 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[
              {
                user: "Maria Silva",
                action: "cadastrou-se como afiliada",
                time: "há 5 minutos",
                icon: <UserPlus className="h-4 w-4 text-green-500" />,
                color: "bg-green-100",
              },
              {
                user: "João Oliveira",
                action: "gerou R$ 450,00 em comissões",
                time: "há 2 horas",
                icon: <DollarSign className="h-4 w-4 text-blue-500" />,
                color: "bg-blue-100",
              },
              {
                user: "Carlos Mendes",
                action: "indicou 3 novos clientes",
                time: "há 4 horas",
                icon: <Users className="h-4 w-4 text-purple-500" />,
                color: "bg-purple-100",
              },
              {
                user: "Ana Beatriz",
                action: "solicitou saque de R$ 1.200,00",
                time: "há 1 dia",
                icon: <TrendingUp className="h-4 w-4 text-amber-500" />,
                color: "bg-amber-100",
              },
              {
                user: "Pedro Santos",
                action: "atingiu meta de qualificação",
                time: "há 2 dias",
                icon: <Award className="h-4 w-4 text-indigo-500" />,
                color: "bg-indigo-100",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <div className={`${activity.color} p-2 rounded-full mr-3`}>
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
