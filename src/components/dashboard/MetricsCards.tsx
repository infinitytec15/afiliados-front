import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  trendLabel: string;
  icon?: React.ReactNode;
}

const MetricCard = (
  { title, value, trend, trendLabel, icon }: MetricCardProps = {
    title: "Métrica",
    value: "R$ 0,00",
    trend: 0,
    trendLabel: "vs. mês anterior",
    icon: <TrendingUpIcon className="h-5 w-5 text-muted-foreground" />,
  },
) => {
  const isPositive = trend >= 0;

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center mt-2">
              <span
                className={`flex items-center text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}
              >
                {isPositive ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                )}
                {Math.abs(trend)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                {trendLabel}
              </span>
            </div>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsCardsProps {
  vendasNivel1: string;
  vendasNivel2: string;
  comissaoNivel1: string;
  comissaoNivel2: string;
  trendVendasNivel1: number;
  trendVendasNivel2: number;
  trendComissaoNivel1: number;
  trendComissaoNivel2: number;
}

const MetricsCards = ({
  vendasNivel1 = "R$ 12.500,00",
  vendasNivel2 = "R$ 8.750,00",
  comissaoNivel1 = "R$ 1.250,00",
  comissaoNivel2 = "R$ 437,50",
  trendVendasNivel1 = 12.5,
  trendVendasNivel2 = 8.3,
  trendComissaoNivel1 = 15.2,
  trendComissaoNivel2 = -3.7,
}: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-background">
      <MetricCard
        title="Vendas Nível 1"
        value={vendasNivel1}
        trend={trendVendasNivel1}
        trendLabel="vs. mês anterior"
        icon={<TrendingUpIcon className="h-5 w-5 text-primary" />}
      />
      <MetricCard
        title="Vendas Nível 2"
        value={vendasNivel2}
        trend={trendVendasNivel2}
        trendLabel="vs. mês anterior"
        icon={<TrendingUpIcon className="h-5 w-5 text-primary" />}
      />
      <MetricCard
        title="Comissão Nível 1"
        value={comissaoNivel1}
        trend={trendComissaoNivel1}
        trendLabel="vs. mês anterior"
        icon={<TrendingUpIcon className="h-5 w-5 text-primary" />}
      />
      <MetricCard
        title="Comissão Nível 2"
        value={comissaoNivel2}
        trend={trendComissaoNivel2}
        trendLabel="vs. mês anterior"
        icon={<TrendingUpIcon className="h-5 w-5 text-primary" />}
      />
    </div>
  );
};

export default MetricsCards;
