"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import LeaderboardRow from "./LeaderboardRow";
import LeaderboardSearch from "./LeaderboardSearch";

// Sample leaderboard data
const leaderboardData = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  rank: i + 1,
  name: `Afiliado ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user-${i + 1}`,
  points: Math.floor(10000 / (i + 1)) * 10,
  change: Math.floor(Math.random() * 5) - 2, // Random change between -2 and 2
  isCurrentUser: i === 23, // Example: current user is rank 24
}));

export default function LeaderboardSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(leaderboardData);
  const [visibleCount, setVisibleCount] = useState(10);

  // Filter data based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(leaderboardData);
      return;
    }

    const filtered = leaderboardData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredData(filtered);
  }, [searchTerm]);

  // Load more items
  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, filteredData.length));
  };

  // Get top 3 users
  const topUsers = filteredData.slice(0, 3);

  // Get remaining users (excluding top 3)
  const remainingUsers = filteredData.slice(3, visibleCount);

  // Find current user if not in visible list
  const currentUser = leaderboardData.find((user) => user.isCurrentUser);
  const isCurrentUserVisible = filteredData
    .slice(0, visibleCount)
    .some((user) => user.isCurrentUser);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Ranking</h2>
        <p className="text-muted-foreground">
          Veja sua posição entre os melhores afiliados
        </p>
      </motion.div>

      <LeaderboardSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Top 3 Users */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className={`bg-card border ${user.isCurrentUser ? "border-primary" : "border-border"} rounded-xl p-6 text-center relative overflow-hidden`}
            >
              {/* Crown for top position */}
              {index === 0 && (
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Icon
                    icon="solar:crown-bold-duotone"
                    className="w-8 h-8 text-yellow-500"
                  />
                </motion.div>
              )}

              {/* Position badge */}
              <div
                className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold ${
                  index === 0
                    ? "bg-yellow-500/20 text-yellow-500"
                    : index === 1
                      ? "bg-gray-300/20 text-gray-300"
                      : "bg-amber-600/20 text-amber-600"
                }`}
              >
                {user.rank}
              </div>

              {/* Avatar */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full border-4 border-background"
                />
                {user.isCurrentUser && (
                  <motion.div
                    className="absolute -inset-1 rounded-full border-2 border-primary z-0"
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* User info */}
              <h3 className="text-lg font-semibold mb-1">{user.name}</h3>
              <div className="flex items-center justify-center mb-4">
                <Icon
                  icon="solar:star-bold-duotone"
                  className="w-5 h-5 text-yellow-500 mr-1"
                />
                <span className="font-bold">
                  {user.points.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground ml-1">pts</span>
              </div>

              {/* Change indicator */}
              {user.change !== 0 && (
                <div
                  className={`text-sm flex items-center justify-center ${
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
        ))}
      </div>

      {/* Remaining Users */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border text-sm font-medium text-muted-foreground">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-7 md:col-span-5">Afiliado</div>
          <div className="col-span-4 md:col-span-3 text-right">Pontos</div>
          <div className="hidden md:block md:col-span-3 text-right">
            Variação
          </div>
        </div>

        <AnimatePresence>
          {remainingUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <LeaderboardRow user={user} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current user indicator if not visible */}
        {currentUser && !isCurrentUserVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="border-t border-border py-2 px-4 text-center text-sm text-muted-foreground">
              ⋯
            </div>
            <LeaderboardRow user={currentUser} highlight />
          </motion.div>
        )}

        {/* Load more button */}
        {visibleCount < filteredData.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 text-center"
          >
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            >
              Carregar mais
            </button>
          </motion.div>
        )}

        {/* Empty state */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 text-center"
          >
            <Icon
              icon="solar:user-search-bold-duotone"
              className="w-16 h-16 text-muted-foreground mx-auto mb-4"
            />
            <h3 className="text-lg font-medium mb-1">
              Nenhum resultado encontrado
            </h3>
            <p className="text-muted-foreground">Tente outro termo de busca</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
