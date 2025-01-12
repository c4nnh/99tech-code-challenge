import { FetchExchangeRateLoading } from "./components/fetch-exchange-rate-loading";
import { useExchangeRate } from "../../hooks/use-exchange-rate";
import { useOnMount } from "../../hooks/use-on-mount";
import { Title } from "./components/title";
import { LastUpdatedAt } from "./components/last-updated-at";
import { ConvertForm } from "./components/convert-form";

export function CurrencyConverter() {
  const { fetchExchangeRates } = useExchangeRate();

  useOnMount(() => {
    fetchExchangeRates();
  });

  return (
    <>
      <FetchExchangeRateLoading />
      <Title />
      <div className="small:h-5 h-20" />
      <div className="small:p-4 flex flex-col gap-4 rounded-lg bg-white p-10">
        <ConvertForm />
        <LastUpdatedAt />
      </div>
    </>
  );
}
