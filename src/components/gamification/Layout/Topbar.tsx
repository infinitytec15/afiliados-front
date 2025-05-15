"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface TopbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

export default function Topbar({
  toggleSidebar,
  isSidebarOpen,
  isMobile,
}: TopbarProps) {
  const [points, setPoints] = useState(0);
  const [targetPoints] = useState(1250);
  const [userName, setUserName] = useState("Afiliado");

  // Animate points counter
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        if (prev < targetPoints) {
          return prev + Math.ceil((targetPoints - prev) / 20);
        }
        clearInterval(interval);
        return targetPoints;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [targetPoints]);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/80 backdrop-blur-xl border-b border-white/10 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-white/10 transition-colors"
            aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
          >
            <Icon
              icon={
                isSidebarOpen
                  ? "solar:close-square-bold-duotone"
                  : "solar:hamburger-menu-bold-duotone"
              }
              className="w-6 h-6 text-white"
            />
          </button>

          {(!isMobile || !isSidebarOpen) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-4 flex items-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Icon
                  icon="solar:gamepad-minimalistic-bold-duotone"
                  className="w-7 h-7 text-purple-400 mr-2 drop-shadow-glow"
                />
              </motion.div>
              <motion.span
                className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Gamificação
              </motion.span>
            </motion.div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="welcome-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center"
            >
              <span className="text-white/70">Olá,</span>
              <span className="font-medium ml-1 text-white">{userName}</span>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.2 }}
            className="flex items-center bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 px-4 py-2 rounded-full border border-white/20 shadow-glow"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              <Icon
                icon="solar:star-bold-duotone"
                className="w-5 h-5 text-yellow-400 drop-shadow-md"
              />
            </motion.div>
            <motion.span
              className="font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {points.toLocaleString()}
            </motion.span>
            <motion.span
              className="text-xs text-white/70 ml-1"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              pts
            </motion.span>
          </motion.div>

          <motion.button
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              icon="solar:bell-bold-duotone"
              className="w-5 h-5 text-white"
            />
            <motion.span
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              3
            </motion.span>
          </motion.button>

          <motion.button
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/50 to-blue-500/50 flex items-center justify-center">
              <span className="text-sm font-medium text-white">AF</span>
            </div>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
