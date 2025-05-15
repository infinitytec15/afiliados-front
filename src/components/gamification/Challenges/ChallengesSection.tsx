"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import ChallengeCard from "./ChallengeCard";
import ChallengeFilter from "./ChallengeFilter";
import CountdownTimer from "./CountdownTimer";

// Sample challenge data
const challengeData = {
  daily: [
    {
      id: "d1",
      title: "Primeira Indicação do Dia",
      description: "Faça sua primeira indicação do dia e ganhe pontos extras.",
      points: 50,
      progress: 100,
      deadline: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
      completed: true,
    },
    {
      id: "d2",
      title: "Compartilhe nas Redes",
      description:
        "Compartilhe seu link de afiliado em pelo menos uma rede social.",
      points: 30,
      progress: 0,
      deadline: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      completed: false,
    },
    {
      id: "d3",
      title: "Acesse o Dashboard",
      description: "Acesse seu dashboard para verificar suas métricas diárias.",
      points: 10,
      progress: 100,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      completed: true,
    },
  ],
  weekly: [
    {
      id: "w1",
      title: "5 Indicações na Semana",
      description:
        "Complete 5 indicações nesta semana para ganhar pontos bônus.",
      points: 200,
      progress: 60,
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      completed: false,
    },
    {
      id: "w2",
      title: "Converta 2 Leads",
      description: "Converta 2 leads em clientes pagantes nesta semana.",
      points: 300,
      progress: 50,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      completed: false,
    },
  ],
  biweekly: [
    {
      id: "b1",
      title: "Alcance 10 Indicações",
      description: "Complete 10 indicações nesta quinzena.",
      points: 500,
      progress: 30,
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      completed: false,
    },
  ],
  monthly: [
    {
      id: "m1",
      title: "Top 50 do Ranking",
      description: "Termine o mês entre os 50 melhores afiliados.",
      points: 1000,
      progress: 70,
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      completed: false,
    },
    {
      id: "m2",
      title: "Conquiste 5 Badges",
      description: "Desbloqueie 5 badges neste mês.",
      points: 800,
      progress: 40,
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
      completed: false,
    },
  ],
};

type ChallengeType = "daily" | "weekly" | "biweekly" | "monthly";

export default function ChallengesSection() {
  const [activeFilter, setActiveFilter] = useState<ChallengeType>("daily");

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Desafios</h2>
        <p className="text-muted-foreground">
          Complete desafios para ganhar pontos e subir de nível
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <ChallengeFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-card/50 rounded-lg border border-border p-3 flex items-center"
        >
          <Icon
            icon="solar:clock-circle-bold-duotone"
            className="w-5 h-5 text-primary mr-2"
          />
          <span className="text-sm mr-2">Próxima atualização:</span>
          <CountdownTimer
            deadline={new Date(Date.now() + 8 * 60 * 60 * 1000)}
          />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {challengeData[activeFilter].map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ChallengeCard challenge={challenge} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {challengeData[activeFilter].length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Icon
            icon="solar:document-search-bold-duotone"
            className="w-16 h-16 text-muted-foreground mx-auto mb-4"
          />
          <h3 className="text-xl font-medium">Nenhum desafio encontrado</h3>
          <p className="text-muted-foreground mt-2">
            Não há desafios disponíveis nesta categoria no momento.
          </p>
        </motion.div>
      )}
    </div>
  );
}
