import { PropsWithChildren } from "react";
import { BotaoProps, TamanhosBotao, VariantesBotao } from "./types";

export function Botao({
  children,
  onClick,
  tamanho = "md",
  variante = "primary",
  type = "button",
  carregando,
}: PropsWithChildren<BotaoProps>) {
  const classNamePorTamanho: { [key in TamanhosBotao]: string } = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "p-4",
  };

  const classNamePorVariante: { [key in VariantesBotao]: string } = {
    primary: "bg-gray-800 hover:bg-gray-900 text-white active:bg-gray-950",
    outlined:
      "bg-white text-gray-900 outline outline-1 outline-gray-800 hover:bg-gray-800 hover:outline-0 hover:text-white active:bg-gray-900 active:text-white active:outline-0",
  };

  const classNameCarregandoPorVariante: { [key in VariantesBotao]: string } = {
    primary: "border-white border-r-gray-500",
    outlined: "border-gray-500 border-r-gray-800",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`transition-colors ease-linear duration-200 font-semibold rounded flex gap-1 items-center justify-center ${
        classNamePorVariante[variante]
      } ${classNamePorTamanho[tamanho]} ${
        carregando ? "pointer-events-none" : ""
      }`}
    >
      {carregando ? (
        <div
          role="status"
          className={`w-6 h-6 rounded-full animate-spin border ${classNameCarregandoPorVariante[variante]}`}
        ></div>
      ) : (
        children
      )}
    </button>
  );
}
