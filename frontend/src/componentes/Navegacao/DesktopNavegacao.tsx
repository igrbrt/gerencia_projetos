"use client";

import { ContainerNavegacao } from "./ContainerNavegacao";
import { NavegacaoProps } from "./types";

export function DesktopNavegacao({ itens }: NavegacaoProps) {
  return (
    <section className="hidden md:block">
      <ContainerNavegacao itens={itens} />
    </section>
  );
}
