
import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';
import InvestmentChart from './InvestmentChart';
import { calculateCompoundInterest, calculateMonthlyGrowth } from '@/utils/calculations';
import { toast } from '@/components/ui/use-toast';

const Calculator: React.FC = () => {
  // Estados para os valores do formulário
  const [initialValue, setInitialValue] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [inflationRate, setInflationRate] = useState<number>(4);
  const [timeInYears, setTimeInYears] = useState<number>(10);
  
  // Estados para os resultados
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [inflationAdjustedAmount, setInflationAdjustedAmount] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  
  const handleCalculate = () => {
    try {
      // Validar entradas
      if (initialValue < 0 || monthlyContribution < 0 || interestRate < 0 || inflationRate < 0 || timeInYears <= 0) {
        toast({
          title: "Valores inválidos",
          description: "Por favor, preencha todos os campos com valores válidos.",
          variant: "destructive",
        });
        return;
      }
      
      // Calcular montante final
      const finalAmount = calculateCompoundInterest(
        initialValue,
        monthlyContribution,
        interestRate,
        timeInYears
      );
      
      // Calcular valores mensais para o gráfico, incluindo ajuste da inflação
      const monthlyValues = calculateMonthlyGrowth(
        initialValue,
        monthlyContribution,
        interestRate,
        timeInYears,
        inflationRate
      );
      
      // Calcular total de contribuições
      const totalContrib = initialValue + (monthlyContribution * timeInYears * 12);
      
      // Calcular o valor ajustado pela inflação
      const inflationAdjusted = finalAmount / Math.pow(1 + inflationRate / 100, timeInYears);
      
      // Atualizar estados
      setTotalAmount(finalAmount);
      setTotalContributions(totalContrib);
      setTotalInterest(finalAmount - totalContrib);
      setInflationAdjustedAmount(inflationAdjusted);
      setMonthlyData(monthlyValues);
      setHasCalculated(true);
      
      toast({
        title: "Cálculo realizado",
        description: "A simulação foi realizada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao calcular:", error);
      toast({
        title: "Erro ao calcular",
        description: "Ocorreu um erro ao realizar a simulação.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CalculatorForm
            initialValue={initialValue}
            monthlyContribution={monthlyContribution}
            interestRate={interestRate}
            inflationRate={inflationRate}
            timeInYears={timeInYears}
            onInitialValueChange={setInitialValue}
            onMonthlyContributionChange={setMonthlyContribution}
            onInterestRateChange={setInterestRate}
            onInflationRateChange={setInflationRate}
            onTimeInYearsChange={setTimeInYears}
            onCalculate={handleCalculate}
          />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <CalculatorResults
            initialValue={initialValue}
            totalAmount={totalAmount}
            totalContributions={totalContributions}
            totalInterest={totalInterest}
            inflationAdjustedAmount={inflationAdjustedAmount}
            inflationRate={inflationRate}
            monthlyData={monthlyData}
            hasCalculated={hasCalculated}
          />
          
          <InvestmentChart
            data={monthlyData}
            hasCalculated={hasCalculated}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
