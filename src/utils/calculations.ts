/**
 * Calcula o montante final utilizando juros compostos
 * @param initialValue Valor inicial investido
 * @param monthlyContribution Contribuição mensal
 * @param interestRate Taxa de juros anual (em porcentagem)
 * @param timeInYears Tempo em anos
 * @returns O montante final após o período
 */
export const calculateCompoundInterest = (
  initialValue: number,
  monthlyContribution: number,
  interestRate: number,
  timeInYears: number
): number => {
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = timeInYears * 12;
  
  let totalAmount = initialValue;
  
  for (let i = 0; i < totalMonths; i++) {
    totalAmount = totalAmount * (1 + monthlyRate) + monthlyContribution;
  }
  
  return parseFloat(totalAmount.toFixed(2));
};

/**
 * Calcula o montante mensal ao longo do período
 * @param initialValue Valor inicial investido
 * @param monthlyContribution Contribuição mensal
 * @param interestRate Taxa de juros anual (em porcentagem)
 * @param timeInYears Tempo em anos
 * @param inflationRate Taxa de inflação anual (em porcentagem)
 * @returns Array com os montantes mês a mês
 */
export const calculateMonthlyGrowth = (
  initialValue: number,
  monthlyContribution: number,
  interestRate: number,
  timeInYears: number,
  inflationRate: number = 0
): { month: number; amount: number; interest: number; contribution: number; inflationAdjusted: number }[] => {
  const monthlyRate = interestRate / 100 / 12;
  const monthlyInflationRate = inflationRate / 100 / 12;
  const totalMonths = timeInYears * 12;
  
  let currentAmount = initialValue;
  let totalContribution = initialValue;
  const result = [];
  
  for (let i = 0; i < totalMonths; i++) {
    const interestEarned = currentAmount * monthlyRate;
    currentAmount = currentAmount + interestEarned + monthlyContribution;
    totalContribution += monthlyContribution;
    
    // Calculando o valor ajustado pela inflação
    const inflationFactor = Math.pow(1 + monthlyInflationRate, i + 1);
    const inflationAdjusted = currentAmount / inflationFactor;
    
    result.push({
      month: i + 1,
      amount: parseFloat(currentAmount.toFixed(2)),
      interest: parseFloat((currentAmount - totalContribution).toFixed(2)),
      contribution: parseFloat(totalContribution.toFixed(2)),
      inflationAdjusted: parseFloat(inflationAdjusted.toFixed(2))
    });
  }
  
  return result;
};

/**
 * Calcula o rendimento de dividendos ao longo dos anos
 * @param investmentAmount Valor inicial investido
 * @param dividendYield Taxa de dividendos anual (em porcentagem)
 * @param expectedGrowth Taxa de crescimento esperado anual (em porcentagem)
 * @param timeInYears Tempo em anos
 * @param reinvestDividends Flag indicando se os dividendos são reinvestidos
 * @returns Objeto com resultados do investimento em dividendos
 */
export const calculateDividendInvestment = (
  investmentAmount: number,
  dividendYield: number,
  expectedGrowth: number,
  timeInYears: number,
  reinvestDividends: boolean
): {
  totalAfterPeriod: number,
  totalDividends: number,
  yearlyData: {
    year: number;
    investmentValue: number;
    dividendAmount: number;
    accumulatedDividends: number;
  }[]
} => {
  let currentInvestmentValue = investmentAmount;
  let totalDividends = 0;
  let yearlyDividends = 0;
  const yearlyData = [];

  for (let year = 1; year <= timeInYears; year++) {
    // Calcula dividendos do ano atual
    yearlyDividends = currentInvestmentValue * (dividendYield / 100);
    totalDividends += yearlyDividends;
    
    // Adiciona dados do ano atual
    yearlyData.push({
      year,
      investmentValue: parseFloat(currentInvestmentValue.toFixed(2)),
      dividendAmount: parseFloat(yearlyDividends.toFixed(2)),
      accumulatedDividends: parseFloat(totalDividends.toFixed(2))
    });
    
    // Aplica crescimento esperado ao valor do investimento
    currentInvestmentValue = currentInvestmentValue * (1 + expectedGrowth / 100);
    
    // Se optar por reinvestir dividendos, adiciona ao valor atual do investimento
    if (reinvestDividends) {
      currentInvestmentValue += yearlyDividends;
    }
  }
  
  return {
    totalAfterPeriod: parseFloat(currentInvestmentValue.toFixed(2)),
    totalDividends: parseFloat(totalDividends.toFixed(2)),
    yearlyData
  };
};

/**
 * Converte uma taxa anual para mensal equivalente
 * @param annualRate Taxa anual em decimal (ex: 0.08 para 8%)
 * @returns Taxa mensal equivalente em decimal
 */
export const annualToMonthlyRate = (annualRate: number): number => {
  // Fórmula para converter taxa anual para mensal: (1 + i)^(1/12) - 1
  return Math.pow(1 + annualRate, 1/12) - 1;
};

/**
 * Formata um valor monetário para exibição
 * @param value Valor a ser formatado
 * @param currency Moeda (padrão: BRL)
 * @returns String formatada como valor monetário
 */
export const formatCurrency = (value: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Formata um valor percentual para exibição
 * @param value Valor decimal (ex: 0.05 para 5%)
 * @returns String formatada como percentual
 */
export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};
