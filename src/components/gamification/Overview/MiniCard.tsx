"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface MiniCardProps {
  title: string;
  icon: string;
  completed: number;
  total: number;
  color: string;
  iconColor: string;
}

export default function MiniCard({
  title,
  icon,
  completed,
  total,
  color,
  iconColor,
}: MiniCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-[180px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Front side */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 p-6 flex flex-col shadow-glow">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-glow`}
          >
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon icon={icon} className={`w-6 h-6 ${iconColor}`} />
            </motion.div>
          </div>

          <h3 className="text-lg font-medium text-white">{title}</h3>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              {completed}/{total}
            </div>
            <div className="text-sm text-white/70">
              {Math.round((completed / total) * 100)}% completo
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${color.replace("from-", "bg-").split(" ")[0]}`}
              initial={{ width: 0 }}
              animate={{ width: `${(completed / total) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 p-6 flex flex-col rotate-y-180 shadow-glow"
          style={{ transform: "rotateY(180deg)" }}
        >
          <h3 className="text-lg font-medium mb-4 text-white">Detalhes</h3>

          <div className="space-y-3 overflow-auto max-h-[100px] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
            {Array.from({ length: total }).map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 3 }}
              >
                {i < completed ? (
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    className="w-5 h-5 text-green-400 mr-2"
                  />
                ) : (
                  <Icon
                    icon="solar:clock-circle-bold-duotone"
                    className="w-5 h-5 text-white/50 mr-2"
                  />
                )}
                <span
                  className={i < completed ? "text-white" : "text-white/50"}
                >
                  Desafio {i + 1}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto text-sm text-blue-400">
            <Icon
              icon="solar:info-circle-bold-duotone"
              className="w-4 h-4 inline mr-1"
            />
            Clique para ver detalhes
          </div>
        </div>
      </motion.div>
    </div>
  );
}
