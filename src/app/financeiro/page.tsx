"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialSummary from "@/components/financeiro/FinancialSummary";
import CommissionChart from "@/components/financeiro/CommissionChart";
import CommissionStatement from "@/components/financeiro/CommissionStatement";

export default function FinanceiroPage() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
      </div>

      <FinancialSummary />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="statement">Extrato Detalhado</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6 mt-6">
          <CommissionChart />
        </TabsContent>
        <TabsContent value="statement" className="space-y-6 mt-6">
          <CommissionStatement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
