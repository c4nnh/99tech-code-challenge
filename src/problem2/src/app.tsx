import { ExchangeRateProvider } from "./contexts/exchange-rate";
import { CurrencyConverter } from "./pages/currency-converter";

export function App() {
  return (
    <ExchangeRateProvider>
      <div className="flex h-full flex-col items-center gap-2 bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100 px-4 py-12">
        <CurrencyConverter />
      </div>
    </ExchangeRateProvider>
  );
}
