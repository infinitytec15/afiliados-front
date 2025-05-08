import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSignIcon,
  TrendingUpIcon,
  WalletIcon,
  ClockIcon,
} from "lucide-react";
import { motion } from "framer-motion";

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
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const cards = [
    {
      title: "Comissão Total",
      value: totalCommission,
      description: "Valor total acumulado",
      icon: <DollarSignIcon className="h-5 w-5" />,
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
      iconBg: "bg-blue-500",
    },
    {
      title: "Saldo Disponível",
      value: availableBalance,
      description: "Disponível para saque",
      icon: <WalletIcon className="h-5 w-5" />,
      color: "from-green-500/20 to-green-600/20 border-green-500/30",
      iconBg: "bg-green-500",
    },
    {
      title: "Comissão Pendente",
      value: pendingCommission,
      description: "Em processamento",
      icon: <ClockIcon className="h-5 w-5" />,
      color: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
      iconBg: "bg-amber-500",
    },
    {
      title: "Crescimento Mensal",
      value: `${monthlyGrowth}%`,
      description: "Em relação ao mês anterior",
      icon: <TrendingUpIcon className="h-5 w-5" />,
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
      iconBg: "bg-purple-500",
      indicator:
        monthlyGrowth >= 0 ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        ),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card
            className={`overflow-hidden border bg-gradient-to-br ${card.color} backdrop-blur-sm`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${card.iconBg} text-white`}>
                {card.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-2xl font-bold">
                {card.value}
                {card.indicator && (
                  <span className="ml-2">{card.indicator}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
