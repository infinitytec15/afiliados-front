"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import BadgeCard from "./BadgeCard";

// Sample badges data
const badgesData = [
  {
    id: "b1",
    title: "Primeira Indicação",
    description: "Completou sua primeira indicação",
    icon: "solar:user-check-bold-duotone",
    color: "blue",
    unlocked: true,
    date: "2023-10-15",
  },
  {
    id: "b2",
    title: "5 Indicações",
    description: "Completou 5 indicações",
    icon: "solar:users-group-rounded-bold-duotone",
    color: "blue",
    unlocked: true,
    date: "2023-10-20",
  },
  {
    id: "b3",
    title: "10 Indicações",
    description: "Completou 10 indicações",
    icon: "solar:users-group-two-rounded-bold-duotone",
    color: "blue",
    unlocked: true,
    date: "2023-11-05",
  },
  {
    id: "b4",
    title: "Primeira Conversão",
    description: "Primeira indicação convertida em cliente",
    icon: "solar:chart-arrow-growth-bold-duotone",
    color: "green",
    unlocked: true,
    date: "2023-10-18",
  },
  {
    id: "b5",
    title: "5 Conversões",
    description: "5 indicações convertidas em clientes",
    icon: "solar:chart-arrow-growth-bold-duotone",
    color: "green",
    unlocked: true,
    date: "2023-11-10",
  },
  {
    id: "b6",
    title: "10 Conversões",
    description: "10 indicações convertidas em clientes",
    icon: "solar:chart-arrow-growth-bold-duotone",
    color: "green",
    unlocked: false,
    progress: 70,
  },
  {
    id: "b7",
    title: "Primeiro Mês Completo",
    description: "Completou um mês como afiliado",
    icon: "solar:calendar-mark-bold-duotone",
    color: "purple",
    unlocked: true,
    date: "2023-11-01",
  },
  {
    id: "b8",
    title: "3 Meses Completos",
    description: "Completou três meses como afiliado",
    icon: "solar:calendar-bold-duotone",
    color: "purple",
    unlocked: false,
    progress: 33,
  },
  {
    id: "b9",
    title: "Top 50 do Ranking",
    description: "Alcançou o top 50 no ranking de afiliados",
    icon: "solar:cup-star-bold-duotone",
    color: "yellow",
    unlocked: true,
    date: "2023-11-15",
  },
  {
    id: "b10",
    title: "Top 25 do Ranking",
    description: "Alcançou o top 25 no ranking de afiliados",
    icon: "solar:cup-first-bold-duotone",
    color: "yellow",
    unlocked: false,
    progress: 90,
  },
  {
    id: "b11",
    title: "Top 10 do Ranking",
    description: "Alcançou o top 10 no ranking de afiliados",
    icon: "solar:medal-ribbons-star-bold-duotone",
    color: "yellow",
    unlocked: false,
    progress: 0,
  },
  {
    id: "b12",
    title: "Top Mensal",
    description: "Afiliado do mês",
    icon: "solar:crown-bold-duotone",
    color: "yellow",
    unlocked: false,
    progress: 0,
    special: true,
  },
];

export default function BadgesSection() {
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  // Filter badges based on selected filter
  const filteredBadges = badgesData.filter((badge) => {
    if (filter === "all") return true;
    if (filter === "unlocked") return badge.unlocked;
    if (filter === "locked") return !badge.unlocked;
    return true;
  });

  // Count unlocked badges
  const unlockedCount = badgesData.filter((badge) => badge.unlocked).length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Conquistas</h2>
        <p className="text-muted-foreground">
          Desbloqueie conquistas para ganhar pontos e reconhecimento
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === "all" ? "bg-primary/10 text-primary" : "bg-card/50 hover:bg-card"}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("unlocked")}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === "unlocked" ? "bg-primary/10 text-primary" : "bg-card/50 hover:bg-card"}`}
          >
            Desbloqueadas
          </button>
          <button
            onClick={() => setFilter("locked")}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === "locked" ? "bg-primary/10 text-primary" : "bg-card/50 hover:bg-card"}`}
          >
            Bloqueadas
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-card/50 rounded-lg border border-border p-3 flex items-center"
        >
          <Icon
            icon="solar:medal-ribbons-star-bold-duotone"
            className="w-5 h-5 text-primary mr-2"
          />
          <span className="text-sm">
            <span className="font-medium">{unlockedCount}</span> de{" "}
            <span className="font-medium">{badgesData.length}</span> conquistas
            desbloqueadas
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <BadgeCard badge={badge} />
          </motion.div>
        ))}
      </div>

      {filteredBadges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Icon
            icon="solar:medal-ribbons-bold-duotone"
            className="w-16 h-16 text-muted-foreground mx-auto mb-4"
          />
          <h3 className="text-xl font-medium mb-1">
            Nenhuma conquista encontrada
          </h3>
          <p className="text-muted-foreground">
            {filter === "unlocked"
              ? "Você ainda não desbloqueou nenhuma conquista."
              : filter === "locked"
                ? "Não há mais conquistas para desbloquear."
                : "Não há conquistas disponíveis no momento."}
          </p>
        </motion.div>
      )}
    </div>
  );
}
