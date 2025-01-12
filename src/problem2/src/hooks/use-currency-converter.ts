import { useEffect, useState } from "react";
import { useExchangeRate } from "./use-exchange-rate";

export function useCurrencyConverter() {
  const { exchangeRates } = useExchangeRate();
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);

  useEffect(() => {
    convert();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency, fromAmount]);

  function convert() {
    if (!fromCurrency || !toCurrency || fromAmount === 0) return;

    // Get exchange rates for from and to currencies
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    if (!fromRate || !toRate) return;

    const exchangeRate = fromRate / toRate;
    setToAmount(fromAmount * exchangeRate);
  }

  function swap() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    convert();
  }

  return {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    setFromCurrency: setFromCurrency as (value: string) => void,
    setToCurrency: setToCurrency as (value: string) => void,
    setFromAmount: setFromAmount as (value: number | undefined) => void,
    setToAmount: setToAmount as (value: number | undefined) => void,
    convert,
    swap,
  };
}
