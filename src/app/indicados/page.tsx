"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpandableReferralTree from "@/components/clientes/ExpandableReferralTree";
import ClientesTable from "@/components/clientes/ClientesTable";

// Componentes simplificados para evitar erros
const SimpleClientesTable = () => (
  <Card className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-4">
      <CardTitle className="text-white text-xl font-medium">
        Lista de Indicados
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nível
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">Maria Oliveira</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                maria.oliveira@email.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Nível 1
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Ativo
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">Carlos Ferreira</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                carlos.ferreira@email.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Nível 1
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Ativo
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const SimpleAffiliatesApproval = () => (
  <Card className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 py-4">
      <CardTitle className="text-white text-xl font-medium">
        Aprovação de Afiliados Pendentes
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-amber-50 border-b border-amber-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-amber-800 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-amber-100">
            <tr className="hover:bg-amber-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">Marcos Silva</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                marcos.silva@email.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                18/05/2023
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    Aprovar
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                    Rejeitar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default function IndicadosPage() {
  return (
    <div className="bg-background min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Meus Indicados</h1>
        <p className="text-muted-foreground">
          Gerencie seus indicados diretos e indiretos.
        </p>
      </header>

      {/* Cards de estatísticas com design simplificado */}
      <div className="mb-8">
        <Card className="bg-blue-600 rounded-xl overflow-hidden shadow-lg border-0">
          <CardHeader className="bg-blue-700 py-3 px-6">
            <CardTitle className="text-white text-lg font-medium">
              Estatísticas de Indicados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-blue-500/30">
              <div className="bg-blue-600 p-6 text-white flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-blue-100 mb-1">
                  Total de Indicados Diretos
                </p>
                <p className="text-4xl font-bold">18</p>
              </div>
              <div className="bg-blue-600 p-6 text-white flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-blue-100 mb-1">
                  Total de Indicados Indiretos
                </p>
                <p className="text-4xl font-bold">7</p>
              </div>
              <div className="bg-blue-600 p-6 text-white flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-blue-100 mb-1">
                  Conversão para Compras
                </p>
                <p className="text-4xl font-bold">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Indicados */}
      <div className="mb-8">
        <ClientesTable />
      </div>

      {/* Área de aprovação de afiliados */}
      <div className="mb-8">
        <SimpleAffiliatesApproval />
      </div>

      {/* Árvore de Indicados */}
      <div className="mb-8">
        <ExpandableReferralTree />
      </div>
    </div>
  );
}
