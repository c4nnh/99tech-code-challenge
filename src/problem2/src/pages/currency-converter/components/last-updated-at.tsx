import { IconRefresh } from "../../../components/icons/refresh";
import { Button } from "../../../components/ui/button";
import { useExchangeRate } from "../../../hooks/use-exchange-rate";
import { cn } from "../../../libs/classnames";

export function LastUpdatedAt() {
  const { lastUpdatedAt, isFetching, fetchExchangeRates } = useExchangeRate();

  return (
    <div className="flex flex-row flex-wrap items-center justify-start gap-4">
      <span className="text-sm text-gray-500">
        Last updated exchange rate:{" "}
        {lastUpdatedAt ? lastUpdatedAt.toLocaleString() : "N/A"}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-fit w-fit gap-1 p-0 text-sm font-normal text-blue-500",
          lastUpdatedAt ? "" : "hidden",
        )}
        onClick={fetchExchangeRates}
        title="Refresh exchange rate"
      >
        {isFetching ? "Refreshing..." : "Refresh"}
        <IconRefresh className={cn(isFetching && "animate-spin")} />
      </Button>
    </div>
  );
}
