
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PortfolioDistribution from './portfolio/PortfolioDistribution';
import PerformanceTable from './portfolio/PerformanceTable';
import DividendsInfo from './portfolio/DividendsInfo';
import PortfolioSummary from './portfolio/PortfolioSummary';
import { calculateAnnualizedReturns, calculateMonthlyReturns } from './portfolio/calculations';

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

  // Calcular retornos anualizados e mensais
  const annualizedReturn = calculateAnnualizedReturns(
    hasFixedIncomeCalculated,
    hasVariableIncomeCalculated,
    fixedIncomeTotalAmount,
    fixedIncomeContributions,
    variableIncomeTotalAfterPeriod,
    variableIncomeAmount,
    timeInYears
  );
  
  const monthlyReturn = calculateMonthlyReturns(
    annualizedReturn,
    hasFixedIncomeCalculated,
    inflationAdjustedAmount,
    fixedIncomeContributions,
    timeInYears
  );

  // Calcular rendimento anual total e média mensal (corrigido)
  // Ganhos da renda fixa (valor final - valor inicial - contribuições totais)
  const fixedIncomeGains = hasFixedIncomeCalculated ? 
    fixedIncomeTotalAmount - fixedIncomeInitialValue - (fixedIncomeContributions * timeInYears * 12) : 0;
  
  // Ganhos da renda variável (dividendos + ganhos de capital)
  const variableIncomeGains = hasVariableIncomeCalculated ? 
    variableTotalDividends + (variableIncomeTotalAfterPeriod - variableIncomeAmount) : 0;
  
  // Total de ganhos anuais
  const totalAnnualIncome = fixedIncomeGains + variableIncomeGains;
  
  // Média mensal (total de ganhos dividido pelo número de meses)
  const monthlyAverageIncome = timeInYears > 0 ? totalAnnualIncome / (timeInYears * 12) : 0;

  return (
    <div className="space-y-6">
      <Card className="border-gray-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-800">Visão Consolidada da Carteira</CardTitle>
        </CardHeader>
        <CardContent>
          <PortfolioSummary 
            initialInvestment={initialInvestment}
            finalValue={finalValue}
            totalGains={totalGains}
            gainPercentage={gainPercentage}
            annualizedReturn={totalAnnualIncome}
            monthlyAverage={monthlyAverageIncome}
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PortfolioDistribution portfolioDistribution={portfolioDistribution} />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Comparativo de Performance</h3>
              <PerformanceTable 
                hasFixedIncomeCalculated={hasFixedIncomeCalculated}
                hasVariableIncomeCalculated={hasVariableIncomeCalculated}
                fixedIncomeInitialValue={fixedIncomeInitialValue}
                fixedIncomeTotalAmount={fixedIncomeTotalAmount}
                variableIncomeAmount={variableIncomeAmount}
                variableIncomeTotalAfterPeriod={variableIncomeTotalAfterPeriod}
                inflationAdjustedAmount={inflationAdjustedAmount}
                annualizedReturn={annualizedReturn}
                monthlyReturn={monthlyReturn}
                timeInYears={timeInYears}
              />

              <DividendsInfo 
                variableTotalDividends={variableTotalDividends}
                timeInYears={timeInYears}
                hasVariableIncomeCalculated={hasVariableIncomeCalculated}
                hasFixedIncomeCalculated={hasFixedIncomeCalculated}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioOverview;
