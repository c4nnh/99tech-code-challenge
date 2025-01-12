import { NumericFormatProps, NumericFormat } from "react-number-format";
import { Input } from "./input";

export function NumberInput(props: NumericFormatProps) {
  return <NumericFormat customInput={Input} {...props} />;
}
