"use client";
import { useState } from "react";
import { Botao } from "../componentes/Botao";
import { ProjetoModal } from "../componentes/ProjetoModal";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import TabelaProjetos from "../componentes/TabelaProjetos";

export default function ProjetoPage() {
  const [aberto, setAberto] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(undefined);

  const handleEditarProjeto = (id: number) => {
    setId(id);
    setAberto(true);
  };

  const handleCriarProjeto = () => {
    setId(undefined);
    setAberto(true);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-between gap-y-10 overflow-x-hidden">
        <div className="flex gap-x-2 justify-between items-center w-full ">
          <h1 className="font-bold text-2xl">Projetos</h1>
          <Botao onClick={handleCriarProjeto}>
            <>
              <PlusCircleIcon className="w-4 h-4" />
              <p className="text-sm">Criar projeto</p>
            </>
          </Botao>
        </div>
        <TabelaProjetos onEditar={handleEditarProjeto} id={id} />
      </div>
      <ProjetoModal aberto={aberto} fechar={() => setAberto(false)} id={id} />
    </>
  );
}
