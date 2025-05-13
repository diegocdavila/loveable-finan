
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from '@/utils/calculations';

interface CalculatorResultsProps {
  initialValue: number;
  totalAmount: number;
  totalContributions: number;
  totalInterest: number;
  monthlyData: {
    month: number;
    amount: number;
    interest: number;
    contribution: number;
  }[];
  hasCalculated: boolean;
}

const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  initialValue,
  totalAmount,
  totalContributions,
  totalInterest,
  hasCalculated
}) => {
  if (!hasCalculated) {
    return (
      <div className="p-6 bg-finance-light rounded-lg text-center">
        <p className="text-finance-neutral">Preencha os dados e clique em calcular para ver os resultados</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-finance-accent">
        <CardHeader className="pb-2">
          <CardTitle className="text-finance-primary">Resultado da simulação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-finance-light rounded-lg">
              <div className="text-sm text-finance-neutral">Valor inicial</div>
              <div className="text-2xl font-bold text-finance-primary">{formatCurrency(initialValue)}</div>
            </div>
            
            <div className="p-4 bg-finance-light rounded-lg">
              <div className="text-sm text-finance-neutral">Total investido</div>
              <div className="text-2xl font-bold text-finance-primary">{formatCurrency(totalContributions)}</div>
            </div>
            
            <div className="p-4 bg-finance-light rounded-lg">
              <div className="text-sm text-finance-neutral">Juros acumulados</div>
              <div className="text-2xl font-bold text-finance-positive">{formatCurrency(totalInterest)}</div>
            </div>
            
            <div className="p-4 bg-finance-primary rounded-lg">
              <div className="text-sm text-white opacity-80">Montante final</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalAmount)}</div>
            </div>
          </div>
          
          <div className="mt-4 px-4 py-3 bg-finance-light rounded-lg">
            <div className="text-sm text-finance-neutral">Rendimento</div>
            <div className="text-xl font-bold text-finance-positive">
              +{((totalAmount / totalContributions - 1) * 100).toFixed(2)}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorResults;
