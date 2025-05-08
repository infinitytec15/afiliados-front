import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "completed" | "pending" | "processing";
  type: "direct" | "indirect";
}

interface CommissionStatementProps {
  transactions?: Transaction[];
}

export default function CommissionStatement({
  transactions = [
    {
      id: "1",
      date: "15/05/2023",
      description: "Comissão - Venda #12345",
      amount: "R$ 350,00",
      status: "completed" as const,
      type: "direct" as const,
    },
    {
      id: "2",
      date: "10/05/2023",
      description: "Comissão - Venda #12340",
      amount: "R$ 250,00",
      status: "completed" as const,
      type: "direct" as const,
    },
    {
      id: "3",
      date: "05/05/2023",
      description: "Comissão - Venda #12335",
      amount: "R$ 150,00",
      status: "completed" as const,
      type: "indirect" as const,
    },
    {
      id: "4",
      date: "01/05/2023",
      description: "Comissão - Venda #12330",
      amount: "R$ 200,00",
      status: "completed" as const,
      type: "direct" as const,
    },
    {
      id: "5",
      date: "28/04/2023",
      description: "Comissão - Venda #12325",
      amount: "R$ 175,00",
      status: "completed" as const,
      type: "indirect" as const,
    },
    {
      id: "6",
      date: "20/05/2023",
      description: "Comissão - Venda #12350",
      amount: "R$ 300,00",
      status: "pending" as const,
      type: "direct" as const,
    },
    {
      id: "7",
      date: "18/05/2023",
      description: "Comissão - Venda #12348",
      amount: "R$ 450,00",
      status: "processing" as const,
      type: "direct" as const,
    },
  ],
}: CommissionStatementProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction | null;
    direction: "ascending" | "descending";
  }>({ key: "date", direction: "descending" });

  // Filtrar transações
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? transaction.status === statusFilter
      : true;
    const matchesType = typeFilter ? transaction.type === typeFilter : true;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Ordenar transações
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === "date") {
      // Converter datas no formato DD/MM/YYYY para objetos Date
      const [aDay, aMonth, aYear] = a.date.split("/").map(Number);
      const [bDay, bMonth, bYear] = b.date.split("/").map(Number);

      const aDate = new Date(aYear, aMonth - 1, aDay);
      const bDate = new Date(bYear, bMonth - 1, bDay);

      return sortConfig.direction === "ascending"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    }

    if (sortConfig.key === "amount") {
      // Extrair valores numéricos de strings como "R$ 350,00"
      const aAmount = parseFloat(
        a.amount.replace(/[^0-9,]/g, "").replace(",", "."),
      );
      const bAmount = parseFloat(
        b.amount.replace(/[^0-9,]/g, "").replace(",", "."),
      );

      return sortConfig.direction === "ascending"
        ? aAmount - bAmount
        : bAmount - aAmount;
    }

    // Ordenação padrão para strings
    return sortConfig.direction === "ascending"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  // Função para alternar a ordenação
  const requestSort = (key: keyof Transaction) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Função para renderizar o ícone de ordenação
  const getSortIcon = (key: keyof Transaction) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Animação para o card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animação para as linhas da tabela
  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariants}>
      <Card className="col-span-1 border bg-gradient-to-br from-background to-secondary/10 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            Extrato de Comissões
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-primary/10" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 space-y-4 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por descrição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <select
                        value={statusFilter || ""}
                        onChange={(e) =>
                          setStatusFilter(e.target.value || null)
                        }
                        className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="">Status</option>
                        <option value="completed">Concluído</option>
                        <option value="pending">Pendente</option>
                        <option value="processing">Processando</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={typeFilter || ""}
                        onChange={(e) => setTypeFilter(e.target.value || null)}
                        className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="">Tipo</option>
                        <option value="direct">Direto</option>
                        <option value="indirect">Indireto</option>
                      </select>
                    </div>
                    {(searchTerm || statusFilter || typeFilter) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchTerm("");
                          setStatusFilter(null);
                          setTypeFilter(null);
                        }}
                      >
                        <X className="h-4 w-4 mr-1" /> Limpar
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <div className="grid grid-cols-4 bg-muted/50 p-3 text-sm font-medium">
                <button
                  onClick={() => requestSort("date")}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  Data {getSortIcon("date")}
                </button>
                <button
                  onClick={() => requestSort("description")}
                  className="col-span-2 flex items-center gap-1 hover:text-primary transition-colors"
                >
                  Descrição {getSortIcon("description")}
                </button>
                <button
                  onClick={() => requestSort("amount")}
                  className="text-right flex items-center justify-end gap-1 hover:text-primary transition-colors"
                >
                  Valor {getSortIcon("amount")}
                </button>
              </div>
              <div className="divide-y">
                <AnimatePresence initial={false}>
                  {sortedTransactions.length > 0 ? (
                    sortedTransactions.map((transaction, i) => (
                      <motion.div
                        key={transaction.id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={rowVariants}
                        className="grid grid-cols-4 p-3 text-sm hover:bg-muted/30 transition-colors"
                      >
                        <div className="text-muted-foreground">
                          {transaction.date}
                        </div>
                        <div className="col-span-2 flex items-center flex-wrap gap-1.5">
                          {transaction.description}
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${transaction.type === "direct" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"}`}
                          >
                            {transaction.type === "direct"
                              ? "Direto"
                              : "Indireto"}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${transaction.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : transaction.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"}`}
                          >
                            {transaction.status === "completed"
                              ? "Concluído"
                              : transaction.status === "pending"
                                ? "Pendente"
                                : "Processando"}
                          </span>
                        </div>
                        <div className="text-right font-medium">
                          {transaction.amount}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Nenhuma transação encontrada com os filtros aplicados.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
