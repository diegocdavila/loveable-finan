
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Printer } from "lucide-react";
import { formatCurrency } from '@/utils/calculations';
import { toast } from '@/components/ui/use-toast';

interface PortfolioPDFProps {
  // Renda Fixa
  fixedIncomeInitialValue: number;
  fixedIncomeTotalAmount: number;
  fixedIncomeInterest: number;
  timeInYears: number;
  inflationAdjustedAmount: number;
  // Renda Variável
  variableIncomeAmount: number;
  variableIncomeTotalAfterPeriod: number;
  variableTotalDividends: number;
  // Valores totais calculados
  initialInvestment: number;
  finalValue: number;
  totalGains: number;
  gainPercentage: number;
  monthlyAverageGains: number;
}

const PortfolioPDF: React.FC<PortfolioPDFProps> = ({
  fixedIncomeInitialValue,
  fixedIncomeTotalAmount,
  fixedIncomeInterest,
  timeInYears,
  inflationAdjustedAmount,
  variableIncomeAmount,
  variableIncomeTotalAfterPeriod,
  variableTotalDividends,
  initialInvestment,
  finalValue,
  totalGains,
  gainPercentage,
  monthlyAverageGains,
}) => {
  // Calcular percentual mensal
  const monthlyGainPercentage = Math.pow((1 + gainPercentage / 100), 1/12) - 1;
  
  const handlePrintPDF = () => {
    // Criar um estilo específico para impressão
    const printStyles = `
      @media print {
        @page { margin: 20mm; }
        body { font-family: Arial, sans-serif; }
        .print-container { width: 100%; }
        .print-header { font-size: 18pt; font-weight: bold; text-align: center; margin-bottom: 15mm; color: #1A365D; }
        .print-subheader { font-size: 14pt; font-weight: bold; margin-top: 10mm; margin-bottom: 5mm; color: #1A365D; }
        .print-table { width: 100%; border-collapse: collapse; margin-bottom: 10mm; }
        .print-table th { background-color: #EDF2F7; padding: 8px; text-align: left; border: 1px solid #A0AEC0; }
        .print-table td { padding: 8px; border: 1px solid #A0AEC0; }
        .print-summary { display: flex; flex-wrap: wrap; column-gap: 5mm; row-gap: 5mm; margin-bottom: 10mm; }
        .print-summary-item { background-color: #F7FAFC; padding: 5mm; border-radius: 5px; width: 45%; }
        .print-summary-title { font-size: 10pt; color: #4A5568; margin-bottom: 2mm; }
        .print-summary-value { font-size: 14pt; font-weight: bold; color: #2D3748; }
        .positive { color: #38A169; }
        .print-footer { margin-top: 15mm; font-size: 8pt; color: #718096; text-align: center; }
      }
    `;

    const content = `
      <div class="print-container">
        <div class="print-header">Relatório de Investimentos - Consolidado da Carteira</div>
        
        <div class="print-subheader">Resumo da Carteira</div>
        <div class="print-summary">
          <div class="print-summary-item">
            <div class="print-summary-title">Investimento Inicial Total</div>
            <div class="print-summary-value">${formatCurrency(initialInvestment)}</div>
          </div>
          <div class="print-summary-item">
            <div class="print-summary-title">Valor Final Projetado</div>
            <div class="print-summary-value">${formatCurrency(finalValue)}</div>
          </div>
          <div class="print-summary-item">
            <div class="print-summary-title">Ganhos Totais</div>
            <div class="print-summary-value positive">${formatCurrency(totalGains)}</div>
          </div>
          <div class="print-summary-item">
            <div class="print-summary-title">Retorno Percentual Total</div>
            <div class="print-summary-value positive">+${gainPercentage.toFixed(2)}%</div>
          </div>
          <div class="print-summary-item">
            <div class="print-summary-title">Retorno Percentual Mensal</div>
            <div class="print-summary-value positive">+${(monthlyGainPercentage * 100).toFixed(2)}%</div>
          </div>
          <div class="print-summary-item">
            <div class="print-summary-title">Ganhos Médios Mensais</div>
            <div class="print-summary-value">${formatCurrency(monthlyAverageGains)}</div>
          </div>
          ${variableTotalDividends > 0 ? 
          `<div class="print-summary-item">
            <div class="print-summary-title">Total de Dividendos Acumulados</div>
            <div class="print-summary-value positive">${formatCurrency(variableTotalDividends)}</div>
          </div>` : ''}
        </div>
        
        <div class="print-subheader">Detalhes por Tipo de Investimento</div>
        <table class="print-table">
          <thead>
            <tr>
              <th>Tipo de Investimento</th>
              <th>Valor Inicial</th>
              <th>Valor Final</th>
              <th>Ganhos</th>
              <th>Retorno</th>
            </tr>
          </thead>
          <tbody>
            ${fixedIncomeTotalAmount > 0 ? 
              `<tr>
                <td>Renda Fixa</td>
                <td>${formatCurrency(fixedIncomeInitialValue)}</td>
                <td>${formatCurrency(fixedIncomeTotalAmount)}</td>
                <td>${formatCurrency(fixedIncomeTotalAmount - fixedIncomeInitialValue)}</td>
                <td>+${((fixedIncomeTotalAmount / fixedIncomeInitialValue - 1) * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Renda Fixa (ajustada pela inflação)</td>
                <td>${formatCurrency(fixedIncomeInitialValue)}</td>
                <td>${formatCurrency(inflationAdjustedAmount)}</td>
                <td>${formatCurrency(inflationAdjustedAmount - fixedIncomeInitialValue)}</td>
                <td>+${((inflationAdjustedAmount / fixedIncomeInitialValue - 1) * 100).toFixed(2)}%</td>
              </tr>` : ''}
            ${variableIncomeTotalAfterPeriod > 0 ? 
              `<tr>
                <td>Renda Variável</td>
                <td>${formatCurrency(variableIncomeAmount)}</td>
                <td>${formatCurrency(variableIncomeTotalAfterPeriod)}</td>
                <td>${formatCurrency(variableIncomeTotalAfterPeriod - variableIncomeAmount)}</td>
                <td>+${((variableIncomeTotalAfterPeriod / variableIncomeAmount - 1) * 100).toFixed(2)}%</td>
              </tr>` : ''}
          </tbody>
        </table>
        
        <div class="print-footer">
          <p>Relatório gerado em ${new Date().toLocaleDateString()} - Calculadora de Investimentos</p>
          <p>Este relatório é apenas uma simulação e não constitui recomendação de investimento</p>
        </div>
      </div>
    `;

    // Criando um novo documento para impressão
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Por favor, permita popups para esta página e tente novamente.",
        variant: "destructive",
      });
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Relatório de Investimentos</title>
          <style>${printStyles}</style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Aguardar carregamento antes de imprimir
    printWindow.onload = function() {
      setTimeout(() => {
        printWindow.print();
        toast({
          title: "PDF gerado com sucesso",
          description: "Seu relatório de investimentos foi gerado para impressão.",
        });
      }, 500);
    };
  };

  return (
    <Button 
      onClick={handlePrintPDF} 
      className="w-full mt-6 gap-2 bg-finance-primary hover:bg-finance-secondary"
    >
      <Printer className="h-4 w-4" />
      Imprimir Relatório PDF
    </Button>
  );
};

export default PortfolioPDF;
