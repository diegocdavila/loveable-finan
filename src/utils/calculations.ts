
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
