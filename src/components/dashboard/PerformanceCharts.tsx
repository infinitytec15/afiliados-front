"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PerformanceChartsProps {
  cadastrosData?: Array<{
    date: string;
    nivel1: number;
    nivel2: number;
  }>;
  receitaData?: Array<{
    date: string;
    nivel1: number;
    nivel2: number;
  }>;
}

const defaultCadastrosData = [
  { date: "01/05", nivel1: 4, nivel2: 2 },
  { date: "02/05", nivel1: 3, nivel2: 1 },
  { date: "03/05", nivel1: 5, nivel2: 3 },
  { date: "04/05", nivel1: 7, nivel2: 4 },
  { date: "05/05", nivel1: 6, nivel2: 3 },
  { date: "06/05", nivel1: 8, nivel2: 5 },
  { date: "07/05", nivel1: 9, nivel2: 6 },
];

const defaultReceitaData = [
  { date: "01/05", nivel1: 1200, nivel2: 600 },
  { date: "02/05", nivel1: 900, nivel2: 450 },
  { date: "03/05", nivel1: 1500, nivel2: 750 },
  { date: "04/05", nivel1: 2100, nivel2: 1050 },
  { date: "05/05", nivel1: 1800, nivel2: 900 },
  { date: "06/05", nivel1: 2400, nivel2: 1200 },
  { date: "07/05", nivel1: 2700, nivel2: 1350 },
];

const PerformanceCharts = ({
  cadastrosData = defaultCadastrosData,
  receitaData = defaultReceitaData,
}: PerformanceChartsProps) => {
  const [period, setPeriod] = useState("7d");

  // Filtrar dados com base no período selecionado
  const getFilteredData = (data: any[], period: string) => {
    // Em uma implementação real, filtraríamos os dados com base no período
    // Por enquanto, retornamos todos os dados
    return data;
  };

  const filteredCadastrosData = getFilteredData(cadastrosData, period);
  const filteredReceitaData = getFilteredData(receitaData, period);

  // Formatador para valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="w-full space-y-4 bg-background">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Desempenho</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="90d">Últimos 90 dias</SelectItem>
            <SelectItem value="year">Este ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="cadastros" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="cadastros">Cadastros por Dia</TabsTrigger>
          <TabsTrigger value="receita">Receita por Dia</TabsTrigger>
        </TabsList>

        <TabsContent value="cadastros">
          <Card>
            <CardHeader>
              <CardTitle>Cadastros por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredCadastrosData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="nivel1"
                      name="Nível 1"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="nivel2"
                      name="Nível 2"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receita">
          <Card>
            <CardHeader>
              <CardTitle>Receita por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredReceitaData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `R$ ${value}`} />
                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(value as number),
                        "Valor",
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="nivel1"
                      name="Nível 1"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="nivel2"
                      name="Nível 2"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceCharts;
