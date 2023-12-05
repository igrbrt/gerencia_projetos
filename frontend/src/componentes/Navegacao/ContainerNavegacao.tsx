"use client";

import Image from "next/image";
import { ItemNavegacao } from "./ItemNavegacao";
import logo from "../../../public/logo-white.png";
import { ItemNavegacaoProps } from "./types";

export function ContainerNavegacao({ itens }: { itens: ItemNavegacaoProps[] }) {
  return (
    <aside className="bg-gray-700 w-full max-w-xs p-4 h-full min-h-screen">
      <nav className="flex flex-col w-full gap-4">
        <Image alt="Logo da empresa Code Group" src={logo} />
        <ul className="w-full flex flex-col gap-1">
          {itens.map((item) => (
            <ItemNavegacao key={item.href} {...item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
