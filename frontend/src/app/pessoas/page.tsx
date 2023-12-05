"use client";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Botao } from "../../componentes/Botao";
import { PessoaModal } from "../../componentes/PessoaModal";
import TabelaPessoas from "../../componentes/TabelaPessoas";

export default function PessoasPage() {
  const [aberto, setAberto] = useState(false);

  const [id, setId] = useState<number | undefined>(undefined);

  const handleEditarPessoa = (id: number) => {
    setId(id);
    setAberto(true);
  };

  const handleCriarPessoa = () => {
    setId(undefined);
    setAberto(true);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-between gap-y-10 overflow-x-hidden">
        <div className="flex gap-x-2 justify-between items-center w-full ">
          <h1 className="font-bold text-2xl">Pessoas</h1>
          <Botao onClick={handleCriarPessoa}>
            <>
              <PlusCircleIcon className="w-4 h-4" />
              <p className="text-sm">Criar pessoa</p>
            </>
          </Botao>
        </div>
        <TabelaPessoas onEditar={handleEditarPessoa} id={id} />
      </div>
      <PessoaModal aberto={aberto} fechar={() => setAberto(false)} id={id} />
    </>
  );
}
