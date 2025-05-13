
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from '@/utils/calculations';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface VariableIncomeResultsProps {
  initialInvestment: number;
  totalAfterPeriod: number;
  totalDividends: number;
  yearlyData: {
    year: number;
    investmentValue: number;
    dividendAmount: number;
    accumulatedDividends: number;
  }[];
  hasCalculated: boolean;
}

const VariableIncomeResults: React.FC<VariableIncomeResultsProps> = ({
  initialInvestment,
  totalAfterPeriod,
  totalDividends,
  yearlyData,
  hasCalculated
}) => {
  if (!hasCalculated) {
    return null;
  }

  const growthPercentage = ((totalAfterPeriod / initialInvestment - 1) * 100).toFixed(2);
  const dividendYield = ((totalDividends / initialInvestment) * 100).toFixed(2);

  return (
    <Card className="border-purple-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-purple-700">Resultado de Renda Variável e Dividendos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600">Investimento inicial</div>
            <div className="text-2xl font-bold text-purple-700">{formatCurrency(initialInvestment)}</div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600">Valor final do investimento</div>
            <div className="text-2xl font-bold text-purple-700">{formatCurrency(totalAfterPeriod)}</div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600">Total de dividendos</div>
            <div className="text-2xl font-bold text-purple-700">{formatCurrency(totalDividends)}</div>
          </div>
          
          <div className="p-4 bg-purple-700 rounded-lg">
            <div className="text-sm text-white opacity-80">Crescimento total</div>
            <div className="text-2xl font-bold text-white">+{growthPercentage}%</div>
          </div>
        </div>
        
        <div className="mt-4 px-4 py-3 bg-purple-50 rounded-lg">
          <div className="text-sm text-purple-600">Retorno em dividendos</div>
          <div className="text-xl font-bold text-purple-700">
            {dividendYield}% do investimento inicial
          </div>
        </div>

        <div className="h-[300px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={yearlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Ano', position: 'insideBottomRight', offset: -5 }} 
              />
              <YAxis 
                tickFormatter={(value) => {
                  if (value >= 1000000) {
                    return `R$ ${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 1000) {
                    return `R$ ${(value / 1000).toFixed(0)}K`;
                  }
                  return `R$ ${value}`;
                }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(year) => `Ano ${year}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="investmentValue" 
                name="Valor do Investimento" 
                stroke="#9b87f5" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="accumulatedDividends" 
                name="Dividendos Acumulados" 
                stroke="#38A169" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="dividendAmount" 
                name="Dividendos Anuais" 
                stroke="#8B5CF6" 
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VariableIncomeResults;
