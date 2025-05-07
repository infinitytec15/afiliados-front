import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

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
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Extrato de Comissões</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
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
        <div className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-4 bg-muted/50 p-3 text-sm font-medium">
              <div>Data</div>
              <div className="col-span-2">Descrição</div>
              <div className="text-right">Valor</div>
            </div>
            <div className="divide-y">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-4 p-3 text-sm"
                >
                  <div className="text-muted-foreground">
                    {transaction.date}
                  </div>
                  <div className="col-span-2 flex items-center">
                    {transaction.description}
                    <span
                      className={`ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs ${transaction.type === "direct" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                    >
                      {transaction.type === "direct" ? "Direto" : "Indireto"}
                    </span>
                    <span
                      className={`ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs ${transaction.status === "completed" ? "bg-green-100 text-green-800" : transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
