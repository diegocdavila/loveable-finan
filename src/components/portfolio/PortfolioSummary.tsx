
import React from 'react';
import { formatCurrency } from '@/utils/calculations';

interface PortfolioSummaryProps {
  initialInvestment: number;
  finalValue: number;
  totalGains: number;
  gainPercentage: number;
  annualizedReturn?: number;
  monthlyAverage?: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  initialInvestment,
  finalValue,
  totalGains,
  gainPercentage,
  annualizedReturn,
  monthlyAverage
}) => {
  return (
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

      {(annualizedReturn !== undefined && monthlyAverage !== undefined) && (
        <div className="col-span-2 p-4 bg-blue-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-blue-600">Rendimento anual total</div>
              <div className="text-2xl font-bold text-blue-700">{formatCurrency(annualizedReturn)}</div>
            </div>
            <div>
              <div className="text-sm text-blue-600">Média de rendimento mensal</div>
              <div className="text-2xl font-bold text-blue-700">{formatCurrency(monthlyAverage)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSummary;
