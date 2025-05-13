
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator } from 'lucide-react';

export interface CalculatorFormProps {
  initialValue: number;
  monthlyContribution: number;
  interestRate: number;
  timeInYears: number;
  onInitialValueChange: (value: number) => void;
  onMonthlyContributionChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onTimeInYearsChange: (value: number) => void;
  onCalculate: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  initialValue,
  monthlyContribution,
  interestRate,
  timeInYears,
  onInitialValueChange,
  onMonthlyContributionChange,
  onInterestRateChange,
  onTimeInYearsChange,
  onCalculate
}) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 text-finance-primary">
        <Calculator className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Calculadora de Investimentos</h2>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="initialValue">Valor inicial (R$)</Label>
          <Input
            id="initialValue"
            type="number"
            min="0"
            step="100"
            value={initialValue}
            onChange={(e) => onInitialValueChange(parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="monthlyContribution">Aporte mensal (R$)</Label>
          <Input
            id="monthlyContribution"
            type="number"
            min="0"
            step="50"
            value={monthlyContribution}
            onChange={(e) => onMonthlyContributionChange(parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="interestRate">Taxa de juros anual (%)</Label>
            <span className="text-sm font-medium">{interestRate.toFixed(2)}%</span>
          </div>
          <Slider
            id="interestRate"
            min={0}
            max={20}
            step={0.1}
            value={[interestRate]}
            onValueChange={(value) => onInterestRateChange(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="timeInYears">Tempo (anos)</Label>
            <span className="text-sm font-medium">{timeInYears} anos</span>
          </div>
          <Slider
            id="timeInYears"
            min={1}
            max={50}
            step={1}
            value={[timeInYears]}
            onValueChange={(value) => onTimeInYearsChange(value[0])}
          />
        </div>
        
        <Button 
          onClick={onCalculate} 
          className="w-full mt-4 bg-finance-primary hover:bg-finance-secondary"
        >
          Calcular
        </Button>
      </div>
    </div>
  );
};

export default CalculatorForm;
