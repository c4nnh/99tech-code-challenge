import { IconSpinner } from "../../../components/icons/spinner";
import { useExchangeRate } from "../../../hooks/use-exchange-rate";

export function FetchExchangeRateLoading() {
  const { isFetching, exchangeRates } = useExchangeRate();

  if (!isFetching || Object.keys(exchangeRates).length > 0) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white">
      <IconSpinner className="text-primary h-10 w-10 animate-spin" />
      <span className="text-primary">Fetching exchange rates...</span>
    </div>
  );
}
