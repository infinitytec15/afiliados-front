"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import HeroCard from "./HeroCard";
import MiniCard from "./MiniCard";
import ProgressBar from "./ProgressBar";
import Link from "next/link";

export default function OverviewSection() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-glow">
            Detalhes
          </h2>
          <p className="text-white/70">
            Acompanhe seu progresso e conquistas no programa de afiliados
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/dashboard">
            <motion.button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="solar:home-2-bold-duotone" className="w-5 h-5" />
              <span>Voltar ao Dashboard</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HeroCard points={1250} level={4} />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-glow">
            <h3 className="text-lg font-medium mb-4 text-white">
              Próximo Nível
            </h3>

            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-white/70">Progresso</div>
              <div className="text-sm font-medium text-white">
                1250 / 2000 pts
              </div>
            </div>

            <ProgressBar
              progress={62}
              rewards={[
                {
                  position: 25,
                  label: "Bônus",
                  value: "R$50",
                  icon: "solar:dollar-minimalistic-bold-duotone",
                },
                {
                  position: 50,
                  label: "Curso Premium",
                  icon: "solar:diploma-verified-bold-duotone",
                },
                {
                  position: 75,
                  label: "Bônus",
                  value: "R$150",
                  icon: "solar:dollar-minimalistic-bold-duotone",
                },
                {
                  position: 100,
                  label: "iPhone 15",
                  icon: "solar:smartphone-bold-duotone",
                },
                {
                  position: 125,
                  label: "Viagem",
                  value: "Internacional",
                  icon: "solar:plane-bold-duotone",
                },
                {
                  position: 150,
                  label: "Bônus",
                  value: "R$500",
                  icon: "solar:dollar-minimalistic-bold-duotone",
                },
              ]}
            />

            <div className="mt-6 flex items-center justify-between text-sm">
              <div className="flex items-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-cyan-500/40 flex items-center justify-center mr-2 shadow-glow"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm font-bold text-white">4</span>
                </motion.div>
                <span className="text-white">Nível Atual</span>
              </div>

              <Icon
                icon="solar:arrow-right-bold-duotone"
                className="w-5 h-5 text-white/50 mx-2"
              />

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mr-2">
                  <span className="text-sm font-bold text-white/70">5</span>
                </div>
                <span className="text-white/70">Próximo Nível</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-sm text-white/70 mb-2">
                Benefícios do próximo nível:
              </div>
              <div className="space-y-2">
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mr-2">
                    <Icon
                      icon="solar:star-bold-duotone"
                      className="w-3.5 h-3.5 text-yellow-400"
                    />
                  </div>
                  <span className="text-sm text-white">
                    +2% de comissão em vendas
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mr-2">
                    <Icon
                      icon="solar:gift-bold-duotone"
                      className="w-3.5 h-3.5 text-purple-400"
                    />
                  </div>
                  <span className="text-sm text-white">
                    Acesso a materiais exclusivos
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-glow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">
                Próximos Pagamentos
              </h3>
              <motion.button
                className="text-xs text-blue-400 flex items-center"
                whileHover={{ x: 3 }}
              >
                Ver todos
                <Icon
                  icon="solar:arrow-right-bold-duotone"
                  className="ml-1 w-3 h-3"
                />
              </motion.button>
            </div>

            <div className="space-y-3">
              <motion.div
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mr-3">
                    <Icon
                      icon="solar:wallet-money-bold-duotone"
                      className="w-5 h-5 text-green-400"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      Comissões - Agosto
                    </div>
                    <div className="text-xs text-white/70">Processando</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">R$ 1.250,00</div>
                  <div className="text-xs text-white/70">15/09/2023</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-3">
                    <Icon
                      icon="solar:wallet-money-bold-duotone"
                      className="w-5 h-5 text-blue-400"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      Bônus - Nível 4
                    </div>
                    <div className="text-xs text-white/70">Agendado</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">R$ 500,00</div>
                  <div className="text-xs text-white/70">30/09/2023</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-white">
            Categorias de Desafios
          </h3>
          <motion.button
            className="text-sm text-blue-400 flex items-center"
            whileHover={{ x: 3 }}
          >
            Ver todos os desafios
            <Icon
              icon="solar:arrow-right-bold-duotone"
              className="ml-1 w-4 h-4"
            />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MiniCard
            title="Indicações"
            icon="solar:users-group-rounded-bold-duotone"
            completed={8}
            total={10}
            color="from-blue-500/20 to-cyan-500/20"
            iconColor="text-blue-400"
          />

          <MiniCard
            title="Conversões"
            icon="solar:chart-arrow-growth-bold-duotone"
            completed={5}
            total={10}
            color="from-green-500/20 to-emerald-500/20"
            iconColor="text-green-400"
          />

          <MiniCard
            title="Engajamento"
            icon="solar:chat-round-dots-bold-duotone"
            completed={3}
            total={5}
            color="from-purple-500/20 to-violet-500/20"
            iconColor="text-purple-400"
          />

          <MiniCard
            title="Treinamentos"
            icon="solar:diploma-verified-bold-duotone"
            completed={2}
            total={5}
            color="from-amber-500/20 to-yellow-500/20"
            iconColor="text-amber-400"
          />
        </div>
      </motion.div>
    </div>
  );
}
