import { ItemNavegacaoProps } from "./types";
import Link from "next/link";

export function ItemNavegacao({ href, titulo, ativo }: ItemNavegacaoProps) {
  return (
    <li
      className={`w-full hover:bg-gray-900 cursor-pointer transition-all duration-200 rounded p-1 text-white ${
        ativo ? "font-semibold bg-gray-800" : "font-medium"
      }`}
    >
      <Link href={href} className="block w-full">
        {titulo}
      </Link>
    </li>
  );
}
