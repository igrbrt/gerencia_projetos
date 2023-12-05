import { InputProps } from "../Input/types";
import { CheckboxProps as RadixCheckboxProps } from "@radix-ui/react-checkbox";

export type CheckboxProps = { inputProps?: RadixCheckboxProps } & Omit<
  InputProps,
  "inputProps" | "ehObrigatorio"
>;
