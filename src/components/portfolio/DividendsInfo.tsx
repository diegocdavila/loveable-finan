
import React from 'react';
import { formatCurrency } from '@/utils/calculations';

interface DividendsInfoProps {
  variableTotalDividends: number;
  timeInYears: number;
  hasVariableIncomeCalculated: boolean;
  hasFixedIncomeCalculated: boolean;
}

const DividendsInfo: React.FC<DividendsInfoProps> = ({ 
  variableTotalDividends, 
  timeInYears,
  hasVariableIncomeCalculated,
  hasFixedIncomeCalculated
}) => {
  if (!hasVariableIncomeCalculated) return null;

  return (
    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
      <div className="text-sm text-purple-600">Total de dividendos acumulados</div>
      <div className="text-xl font-bold text-purple-700">{formatCurrency(variableTotalDividends)}</div>
      {hasFixedIncomeCalculated && hasVariableIncomeCalculated && (
        <div className="text-sm text-purple-600 mt-2">
          Rendimento mensal médio de dividendos: {formatCurrency(variableTotalDividends / (timeInYears * 12))}
        </div>
      )}
    </div>
  );
};

export default DividendsInfo;
