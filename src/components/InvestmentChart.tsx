
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '@/utils/calculations';

interface InvestmentChartProps {
  data: {
    month: number;
    amount: number;
    interest: number;
    contribution: number;
  }[];
  hasCalculated: boolean;
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({ data, hasCalculated }) => {
  if (!hasCalculated || !data.length) {
    return null;
  }
  
  // Processar os dados para o gráfico
  const chartData = data.filter((_, index) => {
    // Para evitar muitos pontos no gráfico, mostramos apenas alguns marcos importantes
    const totalPoints = data.length;
    // Se tiver menos de 24 pontos, mostra todos
    if (totalPoints <= 24) return true;
    
    // Se tiver mais de 24 pontos, mostra pontos estratégicos
    // Sempre mostra o primeiro, o último e pontos intermediários
    if (index === 0 || index === totalPoints - 1) return true;
    
    // Para períodos longos, mostrar a cada 6 meses ou 1 ano
    if (totalPoints > 60) {
      return index % 12 === 0; // a cada ano
    } else {
      return index % 6 === 0; // a cada 6 meses
    }
  });
  
  return (
    <Card className="border-finance-accent">
      <CardHeader className="pb-2">
        <CardTitle className="text-finance-primary">Evolução do investimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                tickFormatter={(value) => {
                  // Converter mês para ano se for maior que 12
                  if (value % 12 === 0) {
                    return `${value / 12} anos`;
                  } else if (value === 1) {
                    return "Início";
                  }
                  return `${value} meses`;
                }}
              />
              <YAxis 
                tickFormatter={(value) => {
                  if (value >= 1000000) {
                    return `R$ ${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 1000) {
                    return `R$ ${(value / 1000).toFixed(0)}K`;
                  }
                  return `R$ ${value}`;
                }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(month) => {
                  if (month === 1) return "Início";
                  if (month % 12 === 0) return `${month / 12} anos`;
                  return `${month} meses`;
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="contribution" 
                name="Contribuição Total" 
                stackId="1" 
                stroke="#1A365D" 
                fill="#1A365D" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="interest" 
                name="Juros" 
                stackId="1" 
                stroke="#38A169" 
                fill="#38A169" 
                fillOpacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentChart;
