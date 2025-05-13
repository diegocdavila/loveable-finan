
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { formatCurrency } from '@/utils/calculations';

interface PortfolioDistributionProps {
  portfolioDistribution: {
    name: string;
    value: number;
  }[];
}

const PortfolioDistribution: React.FC<PortfolioDistributionProps> = ({ portfolioDistribution }) => {
  // Cores para o gráfico
  const COLORS = ['#9b87f5', '#8B5CF6'];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribuição Projetada</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolioDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {portfolioDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioDistribution;
