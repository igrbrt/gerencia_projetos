"use client";

import { useState } from "react";
import { ContainerNavegacao } from "./ContainerNavegacao";
import { NavegacaoProps } from "./types";

export function MobileNavegacao({ itens }: NavegacaoProps) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <div className="flex w-full relative md:hidden p-4 bg-gray-900 h-16">
        <button
          onClick={() => setAberto((prev) => !prev)}
          className={`flex flex-col justify-center items-center text-white transition-all duration-300 ${
            aberto ? "translate-x-[20rem] z-20 relative" : ""
          }`}
        >
          <span
            className={`bg-white block transition-all duration-500 ease-out h-0.5 w-6 rounded-sm ${
              aberto ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          />
          <span
            className={`bg-white block transition-all duration-500 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      aberto ? "opacity-0" : "opacity-100"
                    }`}
          />
          <span
            className={`bg-white block transition-all duration-500 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      aberto ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                    }`}
          />
        </button>
        <section
          className={`absolute transition-transform duration-300 left-0 top-0 flex gap-2 justify-start z-10 ${
            aberto ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ContainerNavegacao itens={itens} />
        </section>
      </div>
      {aberto && (
        <span
          className="w-full h-full bg-black/50 block min-h-screen min-w-full fixed"
          onClick={() => {
            setAberto(false);
          }}
        />
      )}
    </>
  );
}
