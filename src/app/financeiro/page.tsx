"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialSummary from "@/components/financeiro/FinancialSummary";
import CommissionChart from "@/components/financeiro/CommissionChart";
import CommissionStatement from "@/components/financeiro/CommissionStatement";
import { WalletIcon, TrendingUpIcon, BarChart3Icon } from "lucide-react";
import { motion } from "framer-motion";
import UserPanelHeader from "@/components/UserPanelHeader";

export default function FinanceiroPage() {
  // Animações para os elementos da página
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <UserPanelHeader />
      <motion.div
        className="flex flex-col gap-6 p-6 bg-background bg-gradient-to-br from-background to-secondary/20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex items-center justify-between"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-primary/10 text-primary">
              <WalletIcon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FinancialSummary />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs
            defaultValue="overview"
            className="w-full rounded-xl overflow-hidden border shadow-lg bg-card"
          >
            <TabsList className="w-full justify-start p-1.5 bg-muted/50">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4" /> Visão Geral
              </TabsTrigger>
              <TabsTrigger
                value="statement"
                className="flex items-center gap-2"
              >
                <BarChart3Icon className="h-4 w-4" /> Extrato Detalhado
              </TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="overview" className="space-y-6 mt-0">
                <CommissionChart />
              </TabsContent>
              <TabsContent value="statement" className="space-y-6 mt-0">
                <CommissionStatement />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </>
  );
}
