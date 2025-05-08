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
  Cell,
} from "recharts";
import { motion } from "framer-motion";

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
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Cores para os gráficos
  const directColor = "hsl(var(--chart-1))";
  const indirectColor = "hsl(var(--chart-2))";

  // Animação para o card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
          <p className="font-medium mb-1">{`Mês: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariants}>
      <Card className="col-span-1 border bg-gradient-to-br from-background to-secondary/10 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-primary/10 text-primary">
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
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </span>
            Comissões por Período
          </CardTitle>
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
              barGap={8}
              barSize={24}
            >
              <defs>
                <linearGradient id="directGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={directColor} stopOpacity={0.8} />
                  <stop
                    offset="100%"
                    stopColor={directColor}
                    stopOpacity={0.4}
                  />
                </linearGradient>
                <linearGradient
                  id="indirectGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={indirectColor}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor={indirectColor}
                    stopOpacity={0.4}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.4}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span className="text-sm font-medium">{value}</span>
                )}
              />
              <Bar
                name="Comissão Direta"
                dataKey="direct"
                fill="url(#directGradient)"
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                animationDuration={1500}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      hoveredBar === index
                        ? directColor
                        : "url(#directGradient)"
                    }
                    style={{
                      filter: hoveredBar === index ? "brightness(1.2)" : "none",
                    }}
                  />
                ))}
              </Bar>
              <Bar
                name="Comissão Indireta"
                dataKey="indirect"
                fill="url(#indirectGradient)"
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setHoveredBar(index + data.length)}
                onMouseLeave={() => setHoveredBar(null)}
                animationDuration={1500}
                animationBegin={300}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      hoveredBar === index + data.length
                        ? indirectColor
                        : "url(#indirectGradient)"
                    }
                    style={{
                      filter:
                        hoveredBar === index + data.length
                          ? "brightness(1.2)"
                          : "none",
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
