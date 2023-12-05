import { NumericFormatProps, OnValueChange } from "react-number-format";
import { InputProps } from "../Input/types";

export type InputNumericoProps = {
  value?: NumericFormatProps["value"];
  maxLimit?: number;
  minLimit?: number;
  onValueChange?: OnValueChange;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
} & Omit<InputProps, "inputProps">;
