
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatCurrency } from '@/utils/calculations';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

interface PortfolioOverviewProps {
  // Renda Fixa
  fixedIncomeInitialValue: number;
  fixedIncomeTotalAmount: number;
  fixedIncomeInterest: number;
  fixedIncomeContributions: number;
  inflationAdjustedAmount: number;
  timeInYears: number;
  // Renda Variável
  variableIncomeAmount: number;
  variableIncomeTotalAfterPeriod: number;
  variableTotalDividends: number;
  // Estado
  hasFixedIncomeCalculated: boolean;
  hasVariableIncomeCalculated: boolean;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  fixedIncomeInitialValue,
  fixedIncomeTotalAmount,
  fixedIncomeInterest,
  fixedIncomeContributions,
  inflationAdjustedAmount,
  timeInYears,
  variableIncomeAmount,
  variableIncomeTotalAfterPeriod,
  variableTotalDividends,
  hasFixedIncomeCalculated,
  hasVariableIncomeCalculated
}) => {
  // Verificar se pelo menos um dos cálculos foi realizado
  if (!hasFixedIncomeCalculated && !hasVariableIncomeCalculated) {
    return (
      <div className="p-6 bg-finance-light rounded-lg text-center">
        <p className="text-finance-neutral">Calcule pelo menos uma simulação para ver o consolidado da carteira</p>
      </div>
    );
  }

  // Calcular valores totais do portfólio
  const initialInvestment = (hasFixedIncomeCalculated ? fixedIncomeInitialValue : 0) + 
                            (hasVariableIncomeCalculated ? variableIncomeAmount : 0);
  
  const finalValue = (hasFixedIncomeCalculated ? fixedIncomeTotalAmount : 0) + 
                     (hasVariableIncomeCalculated ? variableIncomeTotalAfterPeriod : 0);
  
  const totalGains = finalValue - initialInvestment;
  const gainPercentage = initialInvestment > 0 ? (totalGains / initialInvestment) * 100 : 0;
  
  // Calcular ganhos médios mensais
  const monthlyAverageGains = totalGains / (timeInYears * 12);
  
  // Preparar dados para o gráfico de distribuição do portfólio final
  const portfolioDistribution = [
    {
      name: 'Renda Fixa',
      value: hasFixedIncomeCalculated ? fixedIncomeTotalAmount : 0,
    },
    {
      name: 'Renda Variável',
      value: hasVariableIncomeCalculated ? variableIncomeTotalAfterPeriod : 0,
    }
  ].filter(item => item.value > 0);

  // Cores para o gráfico
  const COLORS = ['#9b87f5', '#8B5CF6'];

  // Preparar dados para tabela comparativa
  const annualizedReturn = {
    fixedIncome: hasFixedIncomeCalculated && timeInYears > 0
      ? Math.pow(fixedIncomeTotalAmount / fixedIncomeContributions, 1 / timeInYears) - 1
      : 0,
    variableIncome: hasVariableIncomeCalculated && timeInYears > 0
      ? Math.pow(variableIncomeTotalAfterPeriod / variableIncomeAmount, 1 / timeInYears) - 1
      : 0,
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-800">Visão Consolidada da Carteira</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Investimento inicial total</div>
              <div className="text-2xl font-bold text-gray-800">{formatCurrency(initialInvestment)}</div>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="text-sm text-white opacity-80">Valor final projetado</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(finalValue)}</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Ganhos totais</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalGains)}</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600">Retorno percentual</div>
              <div className="text-2xl font-bold text-green-700">+{gainPercentage.toFixed(2)}%</div>
            </div>
            
            {/* Campo para média mensal com estilo atualizado */}
            <div className="p-4 bg-blue-100 rounded-lg">
              <div className="text-sm text-blue-800">Ganhos médios mensais</div>
              <div className="text-2xl font-bold text-blue-900">{formatCurrency(monthlyAverageGains)}</div>
            </div>
          </div>
          
          {/* Distribuição do portfólio em gráfico de pizza */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribuição Projetada</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {portfolioDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Tabela comparativa */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Comparativo de Performance</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor Inicial</TableHead>
                    <TableHead>Valor Final</TableHead>
                    <TableHead>Retorno Anual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hasFixedIncomeCalculated && (
                    <TableRow>
                      <TableCell className="font-medium">Renda Fixa</TableCell>
                      <TableCell>{formatCurrency(fixedIncomeInitialValue)}</TableCell>
                      <TableCell>{formatCurrency(fixedIncomeTotalAmount)}</TableCell>
                      <TableCell className="text-green-600">
                        {(annualizedReturn.fixedIncome * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  )}
                  {hasVariableIncomeCalculated && (
                    <TableRow>
                      <TableCell className="font-medium">Renda Variável</TableCell>
                      <TableCell>{formatCurrency(variableIncomeAmount)}</TableCell>
                      <TableCell>{formatCurrency(variableIncomeTotalAfterPeriod)}</TableCell>
                      <TableCell className="text-green-600">
                        {(annualizedReturn.variableIncome * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  )}
                  {hasFixedIncomeCalculated && (
                    <TableRow className="bg-amber-50">
                      <TableCell className="font-medium">Renda Fixa (ajustada pela inflação)</TableCell>
                      <TableCell>{formatCurrency(fixedIncomeInitialValue)}</TableCell>
                      <TableCell>{formatCurrency(inflationAdjustedAmount)}</TableCell>
                      <TableCell className="text-amber-600">
                        {((Math.pow(inflationAdjustedAmount / fixedIncomeContributions, 1 / timeInYears) - 1) * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {hasVariableIncomeCalculated && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600">Total de dividendos acumulados</div>
                  <div className="text-xl font-bold text-purple-700">{formatCurrency(variableTotalDividends)}</div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioOverview;
