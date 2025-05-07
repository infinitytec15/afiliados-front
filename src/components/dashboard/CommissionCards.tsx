import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletIcon, TrendingUpIcon, ReceiptIcon } from "lucide-react";

interface CommissionCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  color?: string;
}

const CommissionCard = ({
  title,
  value,
  description,
  icon = <TrendingUpIcon className="h-5 w-5 text-white" />,
  buttonText,
  onButtonClick,
  color = "bg-blue-500",
}: CommissionCardProps) => {
  return (
    <Card className={`${color} text-white shadow-lg`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {description && (
              <p className="text-xs text-white/80 mt-2">{description}</p>
            )}
            {buttonText && onButtonClick && (
              <Button
                onClick={onButtonClick}
                variant="secondary"
                className="mt-4 bg-white/20 hover:bg-white/30 text-white"
              >
                {buttonText}
              </Button>
            )}
          </div>
          <div className="p-2 bg-white/20 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CommissionCardsProps {
  totalCommission: string;
  availableBalance: string;
  onRequestWithdrawal: () => void;
}

const CommissionCards = ({
  totalCommission = "R$ 1.687,50",
  availableBalance = "R$ 1.250,00",
  onRequestWithdrawal,
}: CommissionCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommissionCard
        title="Comissão Total"
        value={totalCommission}
        description="Valor acumulado desde o início"
        icon={<TrendingUpIcon className="h-5 w-5 text-white" />}
        color="bg-gradient-to-br from-purple-500 to-indigo-600"
      />
      <CommissionCard
        title="Saldo Disponível"
        value={availableBalance}
        description="Disponível para saque"
        buttonText="Solicitar Saque"
        onButtonClick={onRequestWithdrawal}
        icon={<WalletIcon className="h-5 w-5 text-white" />}
        color="bg-gradient-to-br from-emerald-500 to-teal-600"
      />
    </div>
  );
};

export default CommissionCards;
