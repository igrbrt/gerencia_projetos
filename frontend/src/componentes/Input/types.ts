import { InputHTMLAttributes } from "react";

export type InputProps = {
  label: string;
  id: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  ehObrigatorio?: boolean;
  error?: string;
  disabled?: boolean;
};
