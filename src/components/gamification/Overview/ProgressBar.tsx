"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import "./progress-bar.css";

interface ProgressBarProps {
  progress: number; // 0-100
  rewards?: Array<{
    position: number; // 0-100
    label: string;
    icon?: string;
    value?: string;
  }>;
}

export default function ProgressBar({
  progress,
  rewards = [],
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate progress bar
    setTimeout(() => {
      setWidth(progress);
    }, 300);
  }, [progress]);

  return (
    <div className="relative">
      {/* Enhanced progress bar */}
      <div className="relative h-16 bg-slate-800/50 rounded-xl overflow-hidden border border-white/10 shadow-inner">
        {/* Animated background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10"
          style={{
            backgroundSize: "200% 100%",
            animation: "gradient 8s ease infinite",
          }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 flex justify-between px-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-full w-px bg-white/5" />
          ))}
        </div>

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 3s infinite linear",
          }}
        />

        {/* Progress bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-l-xl"
          style={{ width: `${width}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Glow effect */}
          <div className="absolute top-0 right-0 h-full w-6 bg-white/30 blur-md" />

          {/* Particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-white/70"
                initial={{ x: "-100%", y: Math.random() * 100 + "%" }}
                animate={{
                  x: "200%",
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white shadow-lg shadow-purple-500/30 flex items-center justify-center z-20"
          style={{ left: `${width}%`, translateX: "-50%" }}
          initial={{ left: 0, scale: 0.8 }}
          animate={{ left: `${width}%`, scale: [1, 1.1, 1] }}
          transition={{
            duration: 1,
            ease: "easeOut",
            scale: { repeat: Infinity, duration: 2 },
          }}
        >
          <motion.span
            className="text-sm font-bold text-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {width}%
          </motion.span>
        </motion.div>

        {/* Level indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-[10px] text-slate-400">
          {[0, 25, 50, 75, 100].map((level) => (
            <div key={level} className="flex flex-col items-center">
              <div className="h-2 w-px bg-white/20 mb-1"></div>
              {level}%
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
