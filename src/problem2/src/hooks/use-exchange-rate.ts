import { useContext } from "react";
import { ExchangeRateContext } from "../contexts/exchange-rate";

export function useExchangeRate() {
  const context = useContext(ExchangeRateContext);

  if (context === undefined)
    throw new Error(
      "useExchangeRate must be used within a ExchangeRateProvider",
    );

  return context;
}
