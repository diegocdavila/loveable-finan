
import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';
import InvestmentChart from './InvestmentChart';
import VariableIncomeForm from './VariableIncomeForm';
import VariableIncomeResults from './VariableIncomeResults';
import PortfolioOverview from './PortfolioOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  calculateCompoundInterest, 
  calculateMonthlyGrowth,
  calculateDividendInvestment 
} from '@/utils/calculations';
import { toast } from '@/components/ui/use-toast';

const Calculator: React.FC = () => {
  // Estados para os valores do formulário de renda fixa
  const [initialValue, setInitialValue] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [inflationRate, setInflationRate] = useState<number>(4);
  const [timeInYears, setTimeInYears] = useState<number>(10);
  
  // Estados para os resultados de renda fixa
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [inflationAdjustedAmount, setInflationAdjustedAmount] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  
  // Estados para os valores do formulário de renda variável
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [dividendYield, setDividendYield] = useState<number>(5);
  const [expectedGrowth, setExpectedGrowth] = useState<number>(8);
  const [reinvestDividends, setReinvestDividends] = useState<boolean>(true);
  
  // Estados para os resultados de renda variável
  const [variableIncomeResults, setVariableIncomeResults] = useState<{
    totalAfterPeriod: number;
    totalDividends: number;
    yearlyData: any[];
  }>({
    totalAfterPeriod: 0,
    totalDividends: 0,
    yearlyData: []
  });
  const [hasCalculatedVariableIncome, setHasCalculatedVariableIncome] = useState<boolean>(false);
  
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
        description: "A simulação de renda fixa foi realizada com sucesso!",
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
  
  const handleCalculateDividends = () => {
    try {
      // Validar entradas
      if (investmentAmount <= 0 || dividendYield < 0 || expectedGrowth < 0 || timeInYears <= 0) {
        toast({
          title: "Valores inválidos",
          description: "Por favor, preencha todos os campos com valores válidos.",
          variant: "destructive",
        });
        return;
      }
      
      // Calcular rendimentos de dividendos
      const results = calculateDividendInvestment(
        investmentAmount,
        dividendYield,
        expectedGrowth,
        timeInYears,
        reinvestDividends
      );
      
      // Atualizar estados
      setVariableIncomeResults(results);
      setHasCalculatedVariableIncome(true);
      
      toast({
        title: "Cálculo realizado",
        description: "A simulação de renda variável e dividendos foi realizada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao calcular dividendos:", error);
      toast({
        title: "Erro ao calcular",
        description: "Ocorreu um erro ao realizar a simulação de dividendos.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Tabs defaultValue="fixed-income" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="fixed-income">Renda Fixa</TabsTrigger>
          <TabsTrigger value="variable-income">Renda Variável</TabsTrigger>
          <TabsTrigger value="portfolio">Consolidado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fixed-income">
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
        </TabsContent>
        
        <TabsContent value="variable-income">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <VariableIncomeForm
                investmentAmount={investmentAmount}
                dividendYield={dividendYield}
                expectedGrowth={expectedGrowth}
                reinvestDividends={reinvestDividends}
                onInvestmentAmountChange={setInvestmentAmount}
                onDividendYieldChange={setDividendYield}
                onExpectedGrowthChange={setExpectedGrowth}
                onReinvestDividendsChange={setReinvestDividends}
                onCalculate={handleCalculateDividends}
              />
            </div>
            
            <div className="lg:col-span-2">
              <VariableIncomeResults
                initialInvestment={investmentAmount}
                totalAfterPeriod={variableIncomeResults.totalAfterPeriod}
                totalDividends={variableIncomeResults.totalDividends}
                yearlyData={variableIncomeResults.yearlyData}
                hasCalculated={hasCalculatedVariableIncome}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="portfolio">
          <PortfolioOverview
            fixedIncomeInitialValue={initialValue}
            fixedIncomeTotalAmount={totalAmount}
            fixedIncomeInterest={totalInterest}
            fixedIncomeContributions={totalContributions}
            inflationAdjustedAmount={inflationAdjustedAmount}
            timeInYears={timeInYears}
            variableIncomeAmount={investmentAmount}
            variableIncomeTotalAfterPeriod={variableIncomeResults.totalAfterPeriod}
            variableTotalDividends={variableIncomeResults.totalDividends}
            hasFixedIncomeCalculated={hasCalculated}
            hasVariableIncomeCalculated={hasCalculatedVariableIncome}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calculator;
