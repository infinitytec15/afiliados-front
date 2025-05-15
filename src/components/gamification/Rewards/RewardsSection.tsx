"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function RewardsSection() {
  const rewards = [
    {
      id: 1,
      name: "Bônus de 10%",
      description: "Ganhe 10% extra em todas as suas comissões",
      points: 500,
      icon: "solar:dollar-minimalistic-bold-duotone",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      claimed: true,
    },
    {
      id: 2,
      name: "Curso Premium",
      description: "Acesso gratuito ao curso avançado de vendas",
      points: 1000,
      icon: "solar:diploma-verified-bold-duotone",
      color: "from-purple-500/20 to-violet-500/20",
      iconColor: "text-purple-400",
      claimed: false,
    },
    {
      id: 3,
      name: "Bônus de 25%",
      description: "Ganhe 25% extra em todas as suas comissões",
      points: 2000,
      icon: "solar:dollar-minimalistic-bold-duotone",
      color: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-yellow-400",
      claimed: false,
    },
    {
      id: 4,
      name: "iPhone 15 Pro",
      description: "Ganhe um iPhone 15 Pro como recompensa especial",
      points: 5000,
      icon: "solar:smartphone-bold-duotone",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
      claimed: false,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Prêmios
          </h2>
          <p className="text-white/70">
            Conquiste pontos e resgate recompensas
          </p>
        </div>

        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center text-sm text-white"
          >
            <Icon
              icon="solar:gift-bold-duotone"
              className="mr-2 w-4 h-4 text-blue-400"
            />
            Meus Prêmios
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 p-6 flex flex-col h-full shadow-glow relative overflow-hidden"
          >
            {/* Background glow effect */}
            <motion.div
              className={`absolute -inset-[50px] bg-gradient-to-r ${reward.color} rounded-full blur-3xl opacity-20 z-0`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <div className="relative z-10">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${reward.color} flex items-center justify-center mb-4`}
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon
                    icon={reward.icon}
                    className={`w-6 h-6 ${reward.iconColor}`}
                  />
                </motion.div>
              </div>

              <h3 className="text-lg font-medium text-white mb-2">
                {reward.name}
              </h3>
              <p className="text-sm text-white/70 mb-4">{reward.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <Icon
                    icon="solar:star-bold-duotone"
                    className="w-4 h-4 text-yellow-400 mr-1"
                  />
                  <span className="text-sm font-medium text-white">
                    {reward.points} pontos
                  </span>
                </div>

                {reward.claimed ? (
                  <span className="text-xs py-1 px-3 bg-green-500/20 text-green-400 rounded-full">
                    Resgatado
                  </span>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs py-1 px-3 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    Resgatar
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-glow"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">
              Progresso de Pontos
            </h3>
            <p className="text-white/70 text-sm">
              Acompanhe seu progresso para os próximos prêmios
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              name: "Bônus de 10%",
              current: 1250,
              target: 500,
              color: "from-blue-400 to-cyan-400",
              completed: true,
            },
            {
              name: "Curso Premium",
              current: 1250,
              target: 1000,
              color: "from-purple-400 to-violet-400",
              completed: true,
            },
            {
              name: "Bônus de 25%",
              current: 1250,
              target: 2000,
              color: "from-yellow-400 to-amber-400",
              completed: false,
            },
            {
              name: "iPhone 15 Pro",
              current: 1250,
              target: 5000,
              color: "from-green-400 to-emerald-400",
              completed: false,
            },
          ].map((progress, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-white">
                    {progress.name}
                  </span>
                  {progress.completed && (
                    <Icon
                      icon="solar:check-circle-bold-duotone"
                      className="w-4 h-4 text-green-400 ml-2"
                    />
                  )}
                </div>
                <div className="text-sm text-white/70">
                  {progress.current}/{progress.target} pontos
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${progress.color}`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(
                      100,
                      (progress.current / progress.target) * 100,
                    )}%`,
                  }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
