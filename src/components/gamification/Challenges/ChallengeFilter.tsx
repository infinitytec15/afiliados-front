"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type ChallengeType = "daily" | "weekly" | "biweekly" | "monthly";

interface ChallengeFilterProps {
  activeFilter: ChallengeType;
  setActiveFilter: (filter: ChallengeType) => void;
}

const filters = [
  {
    id: "daily",
    label: "Diários",
    icon: "solar:calendar-mark-bold-duotone",
  },
  {
    id: "weekly",
    label: "Semanais",
    icon: "solar:calendar-week-bold-duotone",
  },
  {
    id: "biweekly",
    label: "Quinzenais",
    icon: "solar:calendar-bold-duotone",
  },
  {
    id: "monthly",
    label: "Mensais",
    icon: "solar:calendar-mark-bold-duotone",
  },
];

export default function ChallengeFilter({
  activeFilter,
  setActiveFilter,
}: ChallengeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id as ChallengeType)}
          className={cn(
            "flex items-center px-4 py-2 rounded-lg transition-all",
            "border border-border hover:border-primary/50",
            activeFilter === filter.id
              ? "bg-primary/10 text-primary border-primary/50"
              : "bg-card/50 text-foreground/80",
          )}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon icon={filter.icon} className="w-5 h-5 mr-2" />
          {filter.label}

          {activeFilter === filter.id && (
            <motion.div
              layoutId="filterIndicator"
              className="ml-2 w-2 h-2 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
