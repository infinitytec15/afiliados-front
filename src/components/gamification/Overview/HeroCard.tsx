"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface HeroCardProps {
  points: number;
  level: number;
}

export default function HeroCard({ points, level }: HeroCardProps) {
  const [displayPoints, setDisplayPoints] = useState(0);

  // Animate points counter
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayPoints((prev) => {
        if (prev < points) {
          return prev + Math.ceil((points - prev) / 20);
        }
        clearInterval(interval);
        return points;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [points]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 h-full shadow-glow">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 z-0" />

      {/* Animated glow effect */}
      <motion.div
        className="absolute -inset-[100px] bg-purple-500/10 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* 3D particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30],
            x: [0, Math.random() * 10 - 5],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Status do Afiliado</h3>
          <motion.div
            className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full p-2 shadow-glow"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Icon
              icon="solar:star-bold-duotone"
              className="w-6 h-6 text-yellow-400"
            />
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center py-8">
          <div className="text-center">
            <motion.div
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayPoints.toLocaleString()}
            </motion.div>
            <div className="text-white/70 mt-2">Pontos Acumulados</div>
          </div>

          <div className="mt-8 flex items-center">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-cyan-500/40 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <motion.span
                  className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {level}
                </motion.span>
              </div>
              <motion.div
                className="absolute -inset-1 rounded-full border-2 border-purple-500/30 z-0"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-3 rounded-full border border-blue-500/20 z-0"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0.3, 0.7],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </motion.div>
            <div className="ml-4">
              <div className="text-xl font-semibold text-white">
                Nível {level}
              </div>
              <div className="text-white/70">Afiliado Pro</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Desafios Completos",
              value: "12",
              icon: "solar:flag-bold-duotone",
              color: "from-blue-500/20 to-cyan-500/20",
              iconColor: "text-blue-400",
            },
            {
              label: "Ranking Atual",
              value: "#24",
              icon: "solar:cup-star-bold-duotone",
              color: "from-yellow-500/20 to-amber-500/20",
              iconColor: "text-yellow-400",
            },
            {
              label: "Conquistas",
              value: "7/20",
              icon: "solar:medal-ribbons-star-bold-duotone",
              color: "from-purple-500/20 to-violet-500/20",
              iconColor: "text-purple-400",
            },
            {
              label: "Dias Ativos",
              value: "32",
              icon: "solar:calendar-mark-bold-duotone",
              color: "from-green-500/20 to-emerald-500/20",
              iconColor: "text-green-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-white/20 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center mb-2">
                <div
                  className={`w-6 h-6 rounded-md bg-gradient-to-br ${stat.color} flex items-center justify-center mr-2`}
                >
                  <Icon
                    icon={stat.icon}
                    className={`w-3.5 h-3.5 ${stat.iconColor}`}
                  />
                </div>
                <span className="text-xs text-white/70">{stat.label}</span>
              </div>
              <div className="text-lg font-semibold text-white">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rewards section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-white">
              Próximos Prêmios
            </h4>
            <motion.button
              className="text-xs text-blue-400 flex items-center"
              whileHover={{ x: 3 }}
            >
              Ver todos
              <Icon
                icon="solar:arrow-right-bold-duotone"
                className="ml-1 w-3 h-3"
              />
            </motion.button>
          </div>

          <div className="relative h-16 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            {/* Progress track with milestones */}
            <div className="absolute inset-0 flex items-center px-4">
              {/* Progress bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[65%] bg-gradient-to-r from-purple-500/30 to-blue-500/30" />

              {/* Milestone markers */}
              {[25, 50, 75, 100].map((milestone) => (
                <div
                  key={milestone}
                  className="absolute h-full flex flex-col items-center justify-center"
                  style={{
                    left: `${milestone}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full ${milestone <= 65 ? "bg-white" : "bg-white/30"} z-10`}
                    animate={milestone <= 65 ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div
                    className={`text-xs mt-1 ${milestone <= 65 ? "text-white" : "text-white/50"}`}
                  >
                    {milestone === 25 && "R$50"}
                    {milestone === 50 && "Curso"}
                    {milestone === 75 && "R$150"}
                    {milestone === 100 && "iPhone"}
                  </div>
                </div>
              ))}

              {/* Current position marker */}
              <motion.div
                className="absolute h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-white flex items-center justify-center z-20"
                style={{ left: "65%", transform: "translateX(-50%)" }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon
                  icon="solar:user-bold-duotone"
                  className="w-4 h-4 text-white"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
