"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  change: number;
  isCurrentUser: boolean;
}

interface LeaderboardRowProps {
  user: User;
  highlight?: boolean;
}

export default function LeaderboardRow({
  user,
  highlight = false,
}: LeaderboardRowProps) {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-12 gap-4 p-4 border-b border-border items-center",
        user.isCurrentUser
          ? "bg-primary/5"
          : highlight
            ? "bg-muted/30"
            : "hover:bg-muted/10",
      )}
      whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
    >
      {/* Rank */}
      <div className="col-span-1 text-center font-medium">{user.rank}</div>

      {/* User info */}
      <div className="col-span-7 md:col-span-5 flex items-center">
        <div className="relative w-8 h-8 mr-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full"
          />
          {user.isCurrentUser && (
            <motion.div
              className="absolute -inset-0.5 rounded-full border border-primary z-0"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
        <span className={user.isCurrentUser ? "font-medium" : ""}>
          {user.name}
        </span>
        {user.isCurrentUser && (
          <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
            Você
          </span>
        )}
      </div>

      {/* Points */}
      <div className="col-span-4 md:col-span-3 text-right font-medium flex items-center justify-end">
        <Icon
          icon="solar:star-bold-duotone"
          className="w-4 h-4 text-yellow-500 mr-1"
        />
        {user.points.toLocaleString()}
        <span className="text-xs text-muted-foreground ml-1">pts</span>
      </div>

      {/* Change */}
      <div className="hidden md:flex md:col-span-3 items-center justify-end">
        {user.change === 0 ? (
          <span className="text-muted-foreground">Sem alteração</span>
        ) : (
          <div
            className={`flex items-center ${
              user.change > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <Icon
              icon={
                user.change > 0
                  ? "solar:arrow-up-bold-duotone"
                  : "solar:arrow-down-bold-duotone"
              }
              className="w-4 h-4 mr-1"
            />
            {Math.abs(user.change)} posições
          </div>
        )}
      </div>
    </motion.div>
  );
}
