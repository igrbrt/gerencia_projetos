"use client";

import { usePathname } from "next/navigation";
import { DesktopNavegacao } from "./DesktopNavegacao";
import { MobileNavegacao } from "./MobileNavegacao";
import { ItemNavegacaoProps, NavegacaoProps } from "./types";

export function Navegacao({ itens }: NavegacaoProps) {
  const pathname = usePathname();

  const itensFormatados = itens.map<ItemNavegacaoProps>((item) => ({
    ...item,
    ativo: item.href === pathname,
  }));

  return (
    <>
      <DesktopNavegacao itens={itensFormatados} />
      <MobileNavegacao itens={itensFormatados} />
    </>
  );
}
