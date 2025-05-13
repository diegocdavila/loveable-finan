
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatCurrency } from '@/utils/calculations';

interface PerformanceTableProps {
  hasFixedIncomeCalculated: boolean;
  hasVariableIncomeCalculated: boolean;
  fixedIncomeInitialValue: number;
  fixedIncomeTotalAmount: number;
  variableIncomeAmount: number;
  variableIncomeTotalAfterPeriod: number;
  inflationAdjustedAmount: number;
  annualizedReturn: {
    fixedIncome: number;
    variableIncome: number;
  };
  monthlyReturn: {
    fixedIncome: number;
    variableIncome: number;
    inflationAdjusted: number;
  };
  timeInYears: number;
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({
  hasFixedIncomeCalculated,
  hasVariableIncomeCalculated,
  fixedIncomeInitialValue,
  fixedIncomeTotalAmount,
  variableIncomeAmount,
  variableIncomeTotalAfterPeriod,
  inflationAdjustedAmount,
  annualizedReturn,
  monthlyReturn,
  timeInYears
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Valor Inicial</TableHead>
          <TableHead>Valor Final</TableHead>
          <TableHead className="text-center">Retorno</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hasFixedIncomeCalculated && (
          <TableRow>
            <TableCell className="font-medium">Renda Fixa</TableCell>
            <TableCell>{formatCurrency(fixedIncomeInitialValue)}</TableCell>
            <TableCell>{formatCurrency(fixedIncomeTotalAmount)}</TableCell>
            <TableCell>
              <div className="flex justify-between items-center">
                <div className="text-green-600">
                  <div className="text-xs text-gray-500">Anual</div>
                  {(annualizedReturn.fixedIncome * 100).toFixed(2)}%
                </div>
                <div className="text-green-600">
                  <div className="text-xs text-gray-500">Mensal</div>
                  {(monthlyReturn.fixedIncome * 100).toFixed(2)}%
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {hasVariableIncomeCalculated && (
          <TableRow>
            <TableCell className="font-medium">Renda Variável</TableCell>
            <TableCell>{formatCurrency(variableIncomeAmount)}</TableCell>
            <TableCell>{formatCurrency(variableIncomeTotalAfterPeriod)}</TableCell>
            <TableCell>
              <div className="flex justify-between items-center">
                <div className="text-green-600">
                  <div className="text-xs text-gray-500">Anual</div>
                  {(annualizedReturn.variableIncome * 100).toFixed(2)}%
                </div>
                <div className="text-green-600">
                  <div className="text-xs text-gray-500">Mensal</div>
                  {(monthlyReturn.variableIncome * 100).toFixed(2)}%
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {hasFixedIncomeCalculated && (
          <TableRow className="bg-amber-50">
            <TableCell className="font-medium">Renda Fixa (ajustada pela inflação)</TableCell>
            <TableCell>{formatCurrency(fixedIncomeInitialValue)}</TableCell>
            <TableCell>{formatCurrency(inflationAdjustedAmount)}</TableCell>
            <TableCell>
              <div className="flex justify-between items-center">
                <div className="text-amber-600">
                  <div className="text-xs text-gray-500">Anual</div>
                  {((Math.pow(inflationAdjustedAmount / fixedIncomeInitialValue, 1 / timeInYears) - 1) * 100).toFixed(2)}%
                </div>
                <div className="text-amber-600">
                  <div className="text-xs text-gray-500">Mensal</div>
                  {(monthlyReturn.inflationAdjusted * 100).toFixed(2)}%
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PerformanceTable;
