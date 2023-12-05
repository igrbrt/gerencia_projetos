"use client";
import { useEffect, useState } from "react";
import { Botao } from "../componentes/Botao";
import { ProjetoModal } from "../componentes/ProjetoModal";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import TabelaProjetos from "../componentes/TabelaProjetos";
import NotificacaoComponent, {
  NotificacaoProps,
} from "../componentes/Notificacao/Notificacao";
import { useNotificacao } from "../hooks/useNotificacao";

export default function ProjetoPage() {
  const [aberto, setAberto] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(undefined);
  const { notificacoes, removeNotificacao } = useNotificacao();

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
      <div className="fixed top-0 right-0 mb-4 mr-4 flex flex-col-reverse items-end space-y-reverse space-y-2 w-full">
        {notificacoes.map((notificacao) => (
          <NotificacaoComponent
            key={notificacao.id}
            notificacao={notificacao}
            removeNotificacao={removeNotificacao}
          />
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-between gap-y-10">
        <div className="flex gap-x-2 justify-between items-center w-full">
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
