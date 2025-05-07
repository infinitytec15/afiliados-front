import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CommissionChartProps {
  data?: {
    month: string;
    direct: number;
    indirect: number;
  }[];
}

export default function CommissionChart({
  data = [
    {
      month: "Jan",
      direct: 400,
      indirect: 240,
    },
    {
      month: "Fev",
      direct: 300,
      indirect: 139,
    },
    {
      month: "Mar",
      direct: 200,
      indirect: 980,
    },
    {
      month: "Abr",
      direct: 278,
      indirect: 390,
    },
    {
      month: "Mai",
      direct: 189,
      indirect: 480,
    },
    {
      month: "Jun",
      direct: 239,
      indirect: 380,
    },
  ],
}: CommissionChartProps) {
  const [period, setPeriod] = useState("6m");

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Comissões por Período</CardTitle>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Último mês</SelectItem>
            <SelectItem value="3m">Últimos 3 meses</SelectItem>
            <SelectItem value="6m">Últimos 6 meses</SelectItem>
            <SelectItem value="1y">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`R$ ${value}`, undefined]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Legend />
            <Bar name="Comissão Direta" dataKey="direct" fill="#3b82f6" />
            <Bar name="Comissão Indireta" dataKey="indirect" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
