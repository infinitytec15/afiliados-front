import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSignIcon,
  TrendingUpIcon,
} from "lucide-react";

interface FinancialSummaryProps {
  totalCommission?: string;
  availableBalance?: string;
  pendingCommission?: string;
  monthlyGrowth?: number;
}

export default function FinancialSummary({
  totalCommission = "R$ 2.850,00",
  availableBalance = "R$ 1.250,00",
  pendingCommission = "R$ 750,00",
  monthlyGrowth = 12.5,
}: FinancialSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comissão Total</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCommission}</div>
          <p className="text-xs text-muted-foreground">Valor total acumulado</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Saldo Disponível
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableBalance}</div>
          <p className="text-xs text-muted-foreground">Disponível para saque</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Comissão Pendente
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCommission}</div>
          <p className="text-xs text-muted-foreground">Em processamento</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Crescimento Mensal
          </CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            {monthlyGrowth}%
            <span className="ml-2">
              {monthlyGrowth >= 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
