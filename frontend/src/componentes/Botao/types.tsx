import { ButtonHTMLAttributes, MouseEventHandler } from "react";

export type TamanhosBotao = "sm" | "md" | "lg";

export type VariantesBotao = "primary" | "outlined";

export type BotaoProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  tamanho?: TamanhosBotao;
  variante?: VariantesBotao;
  carregando?: boolean;
};
