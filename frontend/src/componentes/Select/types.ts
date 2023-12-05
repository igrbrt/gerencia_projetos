import { InputProps } from "../Input/types";

export type SelectOpcao = {
  id: string;
  texto: string;
};

export type SelectProps = {
  placeholder: string;
  selecionado?: SelectOpcao;
  opcoes: SelectOpcao[];
  onChange: (selecionado: SelectOpcao) => void;
  formName?: string;
} & Omit<InputProps, "inputProps">;
