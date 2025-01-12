type Props = {
  fromCurrency?: string;
  toCurrency?: string;
  fromAmount?: number;
  toAmount?: number;
};

export function ConvertResult({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
}: Props) {
  if (!fromCurrency || !toCurrency || !fromAmount) {
    return (
      <span className="text-lg font-medium text-gray-500">
        Your conversion result will appear here
      </span>
    );
  }

  return (
    <span className="text-lg font-medium text-gray-500">
      {fromAmount} {fromCurrency} equals {toAmount} {toCurrency}
    </span>
  );
}
