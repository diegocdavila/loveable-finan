
import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-finance-primary mb-4">
            Calculadora de Investimentos
          </h1>
          <p className="text-finance-neutral max-w-2xl mx-auto">
            Simule seus investimentos e planeje seu futuro financeiro. Calcule juros compostos, 
            retorno sobre investimentos e veja a evolução do seu patrimônio ao longo do tempo.
          </p>
        </header>
        
        <main>
          <Calculator />
        </main>
        
        <footer className="mt-16 text-center text-sm text-finance-neutral">
          <p>© 2025 Calculadora de Investimentos - Todos os direitos reservados</p>
          <p className="mt-2">Esta é uma ferramenta de simulação financeira para fins educacionais.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
