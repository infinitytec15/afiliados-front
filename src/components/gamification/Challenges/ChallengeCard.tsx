"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import CountdownTimer from "./CountdownTimer";

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  deadline: Date;
  completed: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkComplete = () => {
    if (challenge.completed) return;

    setIsMarking(true);
    // Simulate API call
    setTimeout(() => {
      setIsMarking(false);
      // Here you would update the challenge state
    }, 1500);
  };

  return (
    <motion.div
      className={cn(
        "bg-card border rounded-xl overflow-hidden transition-all duration-300",
        challenge.completed ? "border-green-500/30" : "border-border",
        isHovered && !challenge.completed && "border-primary/50",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
    >
      {/* Card header with points badge */}
      <div className="relative p-6 pb-4 border-b border-border">
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 text-primary font-medium rounded-full px-3 py-1 text-sm flex items-center shadow-md border border-primary/10"
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="mr-1"
          >
            <Icon
              icon="solar:star-bold-duotone"
              className="w-4 h-4 text-yellow-500"
            />
          </motion.div>
          <motion.span
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {challenge.points} pts
          </motion.span>
        </motion.div>

        <h3 className="text-xl font-semibold pr-24">{challenge.title}</h3>

        <div className="flex items-center mt-2">
          <Icon
            icon={
              challenge.completed
                ? "solar:check-circle-bold-duotone"
                : "solar:clock-circle-bold-duotone"
            }
            className={cn(
              "w-4 h-4 mr-2",
              challenge.completed ? "text-green-500" : "text-muted-foreground",
            )}
          />
          <span className="text-sm text-muted-foreground">
            {challenge.completed ? "Completado" : "Prazo:"}
            {!challenge.completed && (
              <span className="ml-1">
                <CountdownTimer deadline={challenge.deadline} compact />
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 pt-4">
        <p className="text-muted-foreground mb-4">{challenge.description}</p>

        {/* Progress circle */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-16 h-16">
            {/* Background circle */}
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="stroke-current text-muted/20"
                fill="none"
                strokeWidth="3"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />

              {/* Progress circle */}
              <motion.path
                className="stroke-current text-primary"
                fill="none"
                strokeWidth="3"
                strokeDasharray={`${challenge.progress}, 100`}
                strokeLinecap="round"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${challenge.progress}, 100` }}
                transition={{ duration: 1, delay: 0.5 }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium">{challenge.progress}%</span>
            </div>
          </div>

          <div className="flex-1 ml-4">
            <div className="text-sm text-muted-foreground mb-1">Status</div>
            <div className="font-medium">
              {challenge.completed
                ? "Concluído"
                : challenge.progress === 0
                  ? "Não iniciado"
                  : "Em progresso"}
            </div>
          </div>
        </div>

        {/* Action button */}
        <motion.button
          className={cn(
            "w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center",
            challenge.completed
              ? "bg-green-500/20 text-green-500 cursor-default"
              : "bg-primary/10 text-primary hover:bg-primary/20",
          )}
          whileHover={!challenge.completed ? { scale: 1.02 } : {}}
          whileTap={!challenge.completed ? { scale: 0.98 } : {}}
          onClick={handleMarkComplete}
          disabled={challenge.completed || isMarking}
        >
          {isMarking ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processando...
            </>
          ) : challenge.completed ? (
            <>
              <Icon
                icon="solar:check-circle-bold-duotone"
                className="w-5 h-5 mr-2"
              />
              Concluído
            </>
          ) : (
            <>
              <Icon icon="solar:flag-bold-duotone" className="w-5 h-5 mr-2" />
              Marcar como Concluído
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
