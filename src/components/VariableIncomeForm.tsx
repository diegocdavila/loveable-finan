
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from 'lucide-react';

export interface VariableIncomeFormProps {
  investmentAmount: number;
  dividendYield: number;
  expectedGrowth: number;
  reinvestDividends: boolean;
  onInvestmentAmountChange: (value: number) => void;
  onDividendYieldChange: (value: number) => void;
  onExpectedGrowthChange: (value: number) => void;
  onReinvestDividendsChange: (value: boolean) => void;
  onCalculate: () => void;
}

const VariableIncomeForm: React.FC<VariableIncomeFormProps> = ({
  investmentAmount,
  dividendYield,
  expectedGrowth,
  reinvestDividends,
  onInvestmentAmountChange,
  onDividendYieldChange,
  onExpectedGrowthChange,
  onReinvestDividendsChange,
  onCalculate
}) => {
  return (
    <Card className="border-finance-accent">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-finance-primary">
          <Banknote className="h-6 w-6" />
          <CardTitle>Renda Variável e Dividendos</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="investmentAmount">Valor do investimento (R$)</Label>
          <Input
            id="investmentAmount"
            type="number"
            min="0"
            step="100"
            value={investmentAmount}
            onChange={(e) => onInvestmentAmountChange(parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="dividendYield">Dividend Yield anual (%)</Label>
            <span className="text-sm font-medium">{dividendYield.toFixed(2)}%</span>
          </div>
          <Slider
            id="dividendYield"
            min={0}
            max={15}
            step={0.1}
            value={[dividendYield]}
            onValueChange={(value) => onDividendYieldChange(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="expectedGrowth">Crescimento esperado anual (%)</Label>
            <span className="text-sm font-medium">{expectedGrowth.toFixed(2)}%</span>
          </div>
          <Slider
            id="expectedGrowth"
            min={0}
            max={20}
            step={0.1}
            value={[expectedGrowth]}
            onValueChange={(value) => onExpectedGrowthChange(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reinvestDividends">Reinvestir dividendos</Label>
          <Select
            value={reinvestDividends ? "sim" : "nao"}
            onValueChange={(value) => onReinvestDividendsChange(value === "sim")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sim">Sim</SelectItem>
              <SelectItem value="nao">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={onCalculate} 
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
        >
          Calcular Dividendos
        </Button>
      </CardContent>
    </Card>
  );
};

export default VariableIncomeForm;
