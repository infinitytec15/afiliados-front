"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  date?: string;
  progress?: number;
  special?: boolean;
}

interface BadgeCardProps {
  badge: Badge;
}

const colorMap: Record<string, string> = {
  blue: "from-blue-500/20 to-cyan-500/20 text-blue-500",
  green: "from-emerald-500/20 to-green-500/20 text-emerald-500",
  purple: "from-purple-500/20 to-violet-500/20 text-purple-500",
  yellow: "from-amber-500/20 to-yellow-500/20 text-amber-500",
};

export default function BadgeCard({ badge }: BadgeCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const colorClass = colorMap[badge.color] || colorMap.blue;

  return (
    <div className="relative">
      <motion.div
        className={cn(
          "bg-card border rounded-xl p-6 text-center transition-all duration-300",
          badge.unlocked
            ? "border-border"
            : "border-border/50 opacity-50 hover:opacity-80",
        )}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Special badge effect */}
        {badge.special && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 blur-xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}

        {/* Badge icon */}
        <div className="relative mx-auto w-20 h-20 mb-4">
          <div
            className={cn(
              "w-full h-full rounded-full bg-gradient-to-br flex items-center justify-center",
              colorClass,
            )}
          >
            <Icon icon={badge.icon} className="w-10 h-10" />
          </div>

          {/* Special badge glow */}
          {badge.special && badge.unlocked && (
            <motion.div
              className="absolute -inset-3 rounded-full bg-primary/20 -z-10 blur-md"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          )}

          {/* Lock icon for locked badges */}
          {!badge.unlocked && (
            <div className="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
              <Icon
                icon="solar:lock-bold-duotone"
                className="w-4 h-4 text-muted-foreground"
              />
            </div>
          )}

          {/* Progress circle for locked badges with progress */}
          {!badge.unlocked &&
            badge.progress !== undefined &&
            badge.progress > 0 && (
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="stroke-current text-primary/30"
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray={`${badge.progress}, 100`}
                  strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            )}
        </div>

        {/* Badge title */}
        <motion.h3
          className={cn(
            "text-lg font-medium mb-1 relative z-10",
            badge.special && badge.unlocked
              ? "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent"
              : "",
          )}
          animate={
            badge.special && badge.unlocked ? { scale: [1, 1.03, 1] } : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          {badge.title}
        </motion.h3>
        <motion.p
          className="text-sm text-muted-foreground relative z-10"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {badge.description}
        </motion.p>

        {/* Badge date */}
        {badge.unlocked && badge.date && (
          <div className="mt-3 text-xs text-muted-foreground">
            <Icon
              icon="solar:calendar-mark-bold-duotone"
              className="w-3 h-3 inline mr-1"
            />
            Desbloqueado em {new Date(badge.date).toLocaleDateString("pt-BR")}
          </div>
        )}

        {/* Badge progress */}
        {!badge.unlocked && badge.progress !== undefined && (
          <div className="mt-3 text-xs text-muted-foreground">
            <span className="font-medium">{badge.progress}%</span> completo
          </div>
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !badge.unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-lg z-50 w-48"
          >
            <div className="text-xs text-center">
              {badge.progress !== undefined ? (
                <span>Complete {badge.progress}% para desbloquear</span>
              ) : (
                <span>Complete desafios para desbloquear</span>
              )}
            </div>
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
