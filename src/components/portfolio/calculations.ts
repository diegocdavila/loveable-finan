
import { annualToMonthlyRate } from '@/utils/calculations';

interface AnnualizedReturnResult {
  fixedIncome: number;
  variableIncome: number;
}

interface MonthlyReturnResult {
  fixedIncome: number;
  variableIncome: number;
  inflationAdjusted: number;
}

/**
 * Calcula os retornos anualizados para investimentos
 */
export const calculateAnnualizedReturns = (
  hasFixedIncomeCalculated: boolean,
  hasVariableIncomeCalculated: boolean,
  fixedIncomeTotalAmount: number,
  fixedIncomeContributions: number,
  variableIncomeTotalAfterPeriod: number,
  variableIncomeAmount: number,
  timeInYears: number
): AnnualizedReturnResult => {
  return {
    fixedIncome: hasFixedIncomeCalculated && timeInYears > 0
      ? Math.pow(fixedIncomeTotalAmount / fixedIncomeContributions, 1 / timeInYears) - 1
      : 0,
    variableIncome: hasVariableIncomeCalculated && timeInYears > 0
      ? Math.pow(variableIncomeTotalAfterPeriod / variableIncomeAmount, 1 / timeInYears) - 1
      : 0,
  };
};

/**
 * Calcula os retornos mensais para investimentos
 */
export const calculateMonthlyReturns = (
  annualizedReturn: AnnualizedReturnResult,
  hasFixedIncomeCalculated: boolean,
  inflationAdjustedAmount: number,
  fixedIncomeContributions: number,
  timeInYears: number
): MonthlyReturnResult => {
  return {
    fixedIncome: annualToMonthlyRate(annualizedReturn.fixedIncome),
    variableIncome: annualToMonthlyRate(annualizedReturn.variableIncome),
    inflationAdjusted: hasFixedIncomeCalculated && timeInYears > 0
      ? annualToMonthlyRate(Math.pow(inflationAdjustedAmount / fixedIncomeContributions, 1 / timeInYears) - 1)
      : 0
  };
};
