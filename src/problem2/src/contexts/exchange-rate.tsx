import { createContext, useState } from "react";

type ExchangeRateState = {
  exchangeRates: Record<string, number>;
  isFetching: boolean;
  supportedCurrencies: string[];
  lastUpdatedAt: Date | null;
  fetchExchangeRates: () => Promise<void>;
};

const initialState: ExchangeRateState = {
  exchangeRates: {},
  isFetching: false,
  supportedCurrencies: [],
  lastUpdatedAt: null,
  fetchExchangeRates: () => Promise.resolve(),
};

export const ExchangeRateContext =
  createContext<ExchangeRateState>(initialState);

export function ExchangeRateProvider({ children }: React.PropsWithChildren) {
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {},
  );
  const [isFetching, setIsFetching] = useState(false);
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  async function fetchExchangeRates() {
    setIsFetching(true);
    try {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json",
      );

      // Fake api delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }
      const data = await response.json();
      const rates: Record<string, number> = {};
      data.forEach((item: { currency: string; price: string }) => {
        rates[item.currency] = parseFloat(item.price);
      });
      setExchangeRates(rates);
      setSupportedCurrencies(Object.keys(rates));
      setLastUpdatedAt(new Date());
    } catch {
      alert("Error fetching exchange rates");
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <ExchangeRateContext.Provider
      value={{
        exchangeRates,
        isFetching,
        supportedCurrencies,
        lastUpdatedAt,
        fetchExchangeRates,
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
}
