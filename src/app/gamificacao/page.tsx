"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

// Components
import Sidebar from "@/components/gamification/Layout/Sidebar";
import OverviewSection from "@/components/gamification/Overview/OverviewSection";
import RewardsSection from "@/components/gamification/Rewards/RewardsSection";

export default function GamificationPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Refs for scrollspy
  const overviewRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const rewardsRef = useRef<HTMLDivElement>(null);
  const leaderboardRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // offset

      const sections = [
        { id: "overview", ref: overviewRef },
        { id: "challenges", ref: challengesRef },
        { id: "rewards", ref: rewardsRef },
        { id: "leaderboard", ref: leaderboardRef },
        { id: "badges", ref: badgesRef },
      ];

      for (const section of sections) {
        if (!section.ref.current) continue;

        const offsetTop = section.ref.current.offsetTop;
        const offsetHeight = section.ref.current.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const sectionMap: Record<string, React.RefObject<HTMLDivElement>> = {
      overview: overviewRef,
      challenges: challengesRef,
      rewards: rewardsRef,
      leaderboard: leaderboardRef,
      badges: badgesRef,
    };

    const ref = sectionMap[sectionId];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }

    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Topbar component
  const Topbar = ({ toggleSidebar, isSidebarOpen, isMobile }: any) => {
    return (
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-slate-900/80 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Icon
                icon={
                  isSidebarOpen
                    ? "solar:hamburger-menu-bold-duotone"
                    : "solar:hamburger-menu-bold-duotone"
                }
                className="w-6 h-6 text-white"
              />
            </button>
            <div className="ml-4 flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-cyan-500/30 p-2 rounded-lg shadow-lg relative overflow-hidden mr-3"
              >
                <Icon
                  icon="solar:gamepad-minimalistic-bold-duotone"
                  className="w-6 h-6 text-white drop-shadow-lg"
                />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Gamificação
                </h1>
                <p className="text-xs text-white/70">Sistema de Recompensas</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              {[
                "overview",
                "challenges",
                "rewards",
                "leaderboard",
                "badges",
              ].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    activeSection === section
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/5",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10"
            >
              <Icon
                icon="solar:bell-bold-duotone"
                className="w-5 h-5 text-white"
              />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 p-1.5 pr-3 rounded-full bg-white/5 border border-white/10 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                JS
              </div>
              <span className="text-sm text-white hidden md:inline">
                João Silva
              </span>
            </motion.div>
          </div>
        </div>
      </header>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Background animated elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated circles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <Topbar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out relative z-10",
            sidebarOpen && !isMobile ? "ml-64" : "ml-0",
          )}
        >
          <div className="container mx-auto px-4 py-8">
            <section
              ref={overviewRef}
              id="overview"
              className="min-h-screen py-16"
            >
              <OverviewSection />
            </section>

            <section
              ref={rewardsRef}
              id="rewards"
              className="min-h-screen py-16"
            >
              <RewardsSection />
            </section>

            <section
              ref={challengesRef}
              id="challenges"
              className="min-h-screen py-16"
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Desafios
                    </h2>
                    <p className="text-white/70">
                      Complete desafios e ganhe pontos
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Indique 3 novos afiliados",
                      description:
                        "Indique 3 novos afiliados para o programa e ganhe pontos extras",
                      progress: 33,
                      current: 1,
                      target: 3,
                      reward: "300 pontos",
                      deadline: "15/12/2023",
                      icon: "solar:users-group-rounded-bold-duotone",
                      color: "from-blue-500/20 to-cyan-500/20",
                      iconColor: "text-blue-400",
                    },
                    {
                      title: "Venda R$10.000 em produtos",
                      description:
                        "Alcance R$10.000 em vendas dentro do período atual",
                      progress: 65,
                      current: 6500,
                      target: 10000,
                      reward: "500 pontos",
                      deadline: "31/12/2023",
                      icon: "solar:chart-bold-duotone",
                      color: "from-purple-500/20 to-violet-500/20",
                      iconColor: "text-purple-400",
                    },
                    {
                      title: "Complete seu perfil",
                      description:
                        "Adicione todas as informações ao seu perfil de afiliado",
                      progress: 100,
                      current: 1,
                      target: 1,
                      reward: "100 pontos",
                      deadline: "Concluído",
                      icon: "solar:user-check-rounded-bold-duotone",
                      color: "from-green-500/20 to-emerald-500/20",
                      iconColor: "text-green-400",
                      completed: true,
                    },
                  ].map((challenge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 p-6 flex flex-col h-full shadow-glow relative overflow-hidden"
                    >
                      {/* Background glow effect */}
                      <motion.div
                        className={`absolute -inset-[50px] bg-gradient-to-r ${challenge.color} rounded-full blur-3xl opacity-20 z-0`}
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
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${challenge.color} flex items-center justify-center`}
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
                                icon={challenge.icon}
                                className={`w-6 h-6 ${challenge.iconColor}`}
                              />
                            </motion.div>
                          </div>

                          {challenge.completed ? (
                            <div className="bg-green-500/20 text-green-400 text-xs font-medium py-1 px-3 rounded-full flex items-center">
                              <Icon
                                icon="solar:check-circle-bold-duotone"
                                className="w-3 h-3 mr-1"
                              />
                              Concluído
                            </div>
                          ) : (
                            <div className="text-xs text-white/70">
                              Prazo: {challenge.deadline}
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-medium text-white mb-2">
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-white/70 mb-4">
                          {challenge.description}
                        </p>

                        <div className="mt-auto space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-white/70">Progresso</div>
                            <div className="text-white font-medium">
                              {challenge.current}/{challenge.target}
                              {typeof challenge.current === "number" &&
                              challenge.current > 1000
                                ? " (R$)"
                                : ""}
                            </div>
                          </div>

                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${challenge.color
                                .replace("from-", "")
                                .replace("/20", "")}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${challenge.progress}%` }}
                              transition={{
                                duration: 1,
                                delay: 0.2 + index * 0.1,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-yellow-400">
                              <Icon
                                icon="solar:star-bold-duotone"
                                className="w-4 h-4 mr-1"
                              />
                              {challenge.reward}
                            </div>

                            {!challenge.completed && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-xs py-1 px-3 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors"
                              >
                                Ver detalhes
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section
              ref={leaderboardRef}
              id="leaderboard"
              className="min-h-screen py-16"
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Ranking
                    </h2>
                    <p className="text-white/70">
                      Veja sua posição entre os afiliados
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center text-sm text-white"
                    >
                      <Icon
                        icon="solar:calendar-mark-bold-duotone"
                        className="mr-2 w-4 h-4 text-blue-400"
                      />
                      Este mês
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-glow"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-white/70 text-sm font-medium">
                            Posição
                          </th>
                          <th className="text-left py-3 px-4 text-white/70 text-sm font-medium">
                            Afiliado
                          </th>
                          <th className="text-left py-3 px-4 text-white/70 text-sm font-medium">
                            Nível
                          </th>
                          <th className="text-left py-3 px-4 text-white/70 text-sm font-medium">
                            Pontos
                          </th>
                          <th className="text-left py-3 px-4 text-white/70 text-sm font-medium">
                            Vendas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            position: 1,
                            name: "Carlos Mendes",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
                            level: 8,
                            points: 3250,
                            sales: "R$ 32.450",
                            isCurrentUser: false,
                          },
                          {
                            position: 2,
                            name: "Ana Silva",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
                            level: 7,
                            points: 2980,
                            sales: "R$ 29.800",
                            isCurrentUser: false,
                          },
                          {
                            position: 3,
                            name: "Roberto Alves",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
                            level: 7,
                            points: 2750,
                            sales: "R$ 27.500",
                            isCurrentUser: false,
                          },
                          {
                            position: 24,
                            name: "João Silva",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
                            level: 5,
                            points: 1250,
                            sales: "R$ 12.500",
                            isCurrentUser: true,
                          },
                        ].map((user) => (
                          <motion.tr
                            key={user.position}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.3 + user.position * 0.1,
                              duration: 0.3,
                            }}
                            className={cn(
                              "border-b border-white/5 hover:bg-white/5",
                              user.isCurrentUser && "bg-blue-500/10",
                            )}
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                {user.position <= 3 ? (
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      user.position === 1
                                        ? "bg-yellow-500/20 text-yellow-400"
                                        : user.position === 2
                                          ? "bg-slate-300/20 text-slate-300"
                                          : "bg-amber-600/20 text-amber-600"
                                    }`}
                                  >
                                    <Icon
                                      icon="solar:cup-star-bold-duotone"
                                      className="w-4 h-4"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm text-white">
                                    {user.position}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 flex items-center justify-center mr-3 overflow-hidden">
                                  <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full"
                                  />
                                </div>
                                <span
                                  className={`font-medium ${
                                    user.isCurrentUser
                                      ? "text-blue-400"
                                      : "text-white"
                                  }`}
                                >
                                  {user.name}
                                  {user.isCurrentUser && " (Você)"}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 flex items-center justify-center text-xs font-bold text-white mr-2">
                                  {user.level}
                                </div>
                                <div className="text-white/70">
                                  {user.level >= 7
                                    ? "Elite"
                                    : user.level >= 5
                                      ? "Pro"
                                      : "Iniciante"}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <Icon
                                  icon="solar:star-bold-duotone"
                                  className="w-4 h-4 text-yellow-400 mr-2"
                                />
                                <span className="text-white">
                                  {user.points.toLocaleString()}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-white">{user.sales}</div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </section>

            <section ref={badgesRef} id="badges" className="min-h-screen py-16">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Conquistas
                    </h2>
                    <p className="text-white/70">
                      Desbloqueie conquistas e ganhe recompensas
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "Primeira Venda",
                      description: "Realize sua primeira venda como afiliado",
                      icon: "solar:cart-check-bold-duotone",
                      color: "from-blue-500/20 to-cyan-500/20",
                      iconColor: "text-blue-400",
                      unlocked: true,
                      date: "15/09/2023",
                    },
                    {
                      name: "Vendedor Bronze",
                      description: "Atinja R$5.000 em vendas totais",
                      icon: "solar:medal-ribbons-star-bold-duotone",
                      color: "from-amber-500/20 to-yellow-500/20",
                      iconColor: "text-amber-400",
                      unlocked: true,
                      date: "02/10/2023",
                    },
                    {
                      name: "Vendedor Prata",
                      description: "Atinja R$10.000 em vendas totais",
                      icon: "solar:medal-ribbons-star-bold-duotone",
                      color: "from-slate-400/20 to-slate-300/20",
                      iconColor: "text-slate-300",
                      unlocked: true,
                      date: "28/10/2023",
                    },
                    {
                      name: "Vendedor Ouro",
                      description: "Atinja R$25.000 em vendas totais",
                      icon: "solar:medal-ribbons-star-bold-duotone",
                      color: "from-yellow-500/20 to-amber-500/20",
                      iconColor: "text-yellow-400",
                      unlocked: false,
                    },
                    {
                      name: "Rede de Contatos",
                      description: "Indique 5 novos afiliados",
                      icon: "solar:users-group-rounded-bold-duotone",
                      color: "from-purple-500/20 to-violet-500/20",
                      iconColor: "text-purple-400",
                      unlocked: false,
                    },
                    {
                      name: "Especialista",
                      description: "Venda 10 produtos da mesma categoria",
                      icon: "solar:star-bold-duotone",
                      color: "from-green-500/20 to-emerald-500/20",
                      iconColor: "text-green-400",
                      unlocked: true,
                      date: "10/11/2023",
                    },
                    {
                      name: "Consistente",
                      description: "Faça vendas por 5 meses consecutivos",
                      icon: "solar:calendar-mark-bold-duotone",
                      color: "from-blue-500/20 to-cyan-500/20",
                      iconColor: "text-blue-400",
                      unlocked: true,
                      date: "01/11/2023",
                    },
                    {
                      name: "Vendedor Diamante",
                      description: "Atinja R$50.000 em vendas totais",
                      icon: "solar:medal-ribbons-star-bold-duotone",
                      color: "from-cyan-500/20 to-blue-500/20",
                      iconColor: "text-cyan-400",
                      unlocked: false,
                    },
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border ${badge.unlocked ? "border-white/10" : "border-white/5"} p-5 flex flex-col shadow-glow relative overflow-hidden ${!badge.unlocked && "opacity-60"}`}
                    >
                      {/* Background glow effect */}
                      <motion.div
                        className={`absolute -inset-[50px] bg-gradient-to-r ${badge.color} rounded-full blur-3xl opacity-20 z-0`}
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
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center mb-4`}
                        >
                          <motion.div
                            animate={
                              badge.unlocked
                                ? { rotate: [0, 10, 0, -10, 0] }
                                : {}
                            }
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <Icon
                              icon={badge.icon}
                              className={`w-6 h-6 ${badge.iconColor} ${!badge.unlocked && "opacity-50"}`}
                            />
                          </motion.div>
                        </div>

                        <h3 className="text-base font-medium text-white mb-1">
                          {badge.name}
                        </h3>
                        <p className="text-xs text-white/70 mb-3">
                          {badge.description}
                        </p>

                        {badge.unlocked ? (
                          <div className="flex items-center text-xs text-green-400">
                            <Icon
                              icon="solar:check-circle-bold-duotone"
                              className="w-3 h-3 mr-1"
                            />
                            Desbloqueado em {badge.date}
                          </div>
                        ) : (
                          <div className="flex items-center text-xs text-white/50">
                            <Icon
                              icon="solar:lock-bold-duotone"
                              className="w-3 h-3 mr-1"
                            />
                            Bloqueado
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
