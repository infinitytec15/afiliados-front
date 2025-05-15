"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const sidebarItems = [
  {
    id: "overview",
    label: "Visão Geral",
    icon: "solar:chart-bold-duotone",
  },
  {
    id: "challenges",
    label: "Desafios",
    icon: "solar:flag-bold-duotone",
  },
  {
    id: "rewards",
    label: "Prêmios",
    icon: "solar:gift-bold-duotone",
  },
  {
    id: "leaderboard",
    label: "Ranking",
    icon: "solar:cup-star-bold-duotone",
  },
  {
    id: "badges",
    label: "Conquistas",
    icon: "solar:medal-ribbons-star-bold-duotone",
  },
];

export default function Sidebar({
  isOpen,
  activeSection,
  onNavigate,
}: SidebarProps) {
  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: isOpen ? 256 : 0,
        opacity: isOpen ? 1 : 0,
        x: isOpen ? 0 : -50,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-md border-r border-white/10 z-30",
        "overflow-hidden transition-all duration-300 ease-in-out",
      )}
    >
      <div className="flex flex-col h-full p-4 space-y-6">
        <div className="flex items-center justify-center py-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: [0, 5, 0, -5, 0] }}
            transition={{
              delay: 0.2,
              duration: 0.3,
              rotate: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-cyan-500/30 p-4 rounded-xl shadow-lg relative overflow-hidden"
          >
            {/* Animated glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-blue-500/40 blur-xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <Icon
                icon="solar:gamepad-minimalistic-bold-duotone"
                className="w-12 h-12 text-white drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex items-center w-full px-4 py-3 rounded-lg transition-all",
                "hover:bg-white/10 group",
                activeSection === item.id
                  ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white font-medium"
                  : "text-white/80",
              )}
              whileHover={{ x: 5 }}
            >
              <div className="relative">
                <Icon
                  icon={item.icon}
                  className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110"
                />
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -left-1 -right-1 -top-1 -bottom-1 bg-white/20 rounded-md -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span>{item.label}</span>

              {/* Animated dot indicator */}
              {activeSection === item.id && (
                <motion.div
                  className="ml-auto w-2 h-2 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="pt-4 border-t border-white/10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-center"
          >
            <div className="text-sm text-white/70">Nível Atual</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-1">
              Afiliado Pro
            </div>
            <div className="mt-2 text-xs text-white/70">
              Próximo nível: 500 pts
            </div>

            {/* 3D progress bar */}
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
