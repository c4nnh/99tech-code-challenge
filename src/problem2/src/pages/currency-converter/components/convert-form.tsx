import { IconCoin } from "../../../components/icons/coin";
import { IconTransfer } from "../../../components/icons/transfer";
import { Button } from "../../../components/ui/button";
import { ComboBox } from "../../../components/ui/combobox";
import { NumberInput } from "../../../components/ui/number-input";
import { useCurrencyConverter } from "../../../hooks/use-currency-converter";
import { useExchangeRate } from "../../../hooks/use-exchange-rate";
import { ConvertResult } from "./convert-result";

export function ConvertForm() {
  const { supportedCurrencies } = useExchangeRate();
  const {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    setFromCurrency,
    setToCurrency,
    setFromAmount,
    setToAmount,
    swap,
  } = useCurrencyConverter();
  const currencyOptions = supportedCurrencies.map((currency) => ({
    label: currency,
    value: currency,
    icon: (
      <img src={`/tokens/${currency}.svg`} alt={currency} className="h-4 w-4" />
    ),
  }));

  return (
    <>
      <div className="small:flex-col small:p-4 flex flex-row items-center justify-between gap-4">
        <div className="flex w-full flex-row items-center">
          <NumberInput
            placeholder="Enter amount"
            className="max-w-108 w-full rounded-r-none"
            value={fromAmount}
            onValueChange={(values) => {
              setFromAmount(values.floatValue);
            }}
          />
          <ComboBox
            className="min-w-48 rounded-l-none border-l-0"
            options={currencyOptions}
            placeholder={
              <>
                Select currency <IconCoin />
              </>
            }
            title="Select currency"
            value={fromCurrency}
            onChange={(option) => {
              setFromCurrency(option.value as string);
            }}
          />
        </div>
        <Button
          aria-label="Switch currencies"
          title="Switch currencies"
          onClick={swap}
        >
          <IconTransfer className="small:rotate-90" />
        </Button>
        <div className="flex w-full flex-row items-center">
          <NumberInput
            className="max-w-108 w-full rounded-r-none"
            value={toAmount}
            onValueChange={(values) => {
              setToAmount(values.floatValue);
            }}
          />
          <ComboBox
            className="min-w-48 rounded-l-none border-l-0"
            options={currencyOptions}
            placeholder={
              <>
                Select currency <IconCoin />
              </>
            }
            title="Select currency"
            value={toCurrency}
            onChange={(option) => {
              setToCurrency(option.value as string);
            }}
          />
        </div>
      </div>
      <ConvertResult
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        fromAmount={fromAmount}
        toAmount={toAmount}
      />
    </>
  );
}
