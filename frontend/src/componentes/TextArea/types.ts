import { TextareaHTMLAttributes } from "react";
import { InputProps } from "../Input/types";

export type TextAreaProps = {
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
} & Omit<InputProps, "inputProps">;
