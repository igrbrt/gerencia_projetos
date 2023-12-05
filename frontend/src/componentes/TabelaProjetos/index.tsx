import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useProjeto } from "../../hooks/useProjeto";
import {
  formataDataParaTextoBr,
  formataDoubleParaTextoMoeda,
  textoPorRisco,
  textoPorStatus,
} from "../../utils";
import { TabelaProps } from "./types";
import { useNotificacao } from "../../context/notificacaoContext";
import { useQueryClient } from "react-query";
import { REACT_QUERY_CHAVES } from "../../utils/constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TabelaProjetos({ id, onEditar }: TabelaProps) {
  const queryClient = useQueryClient();
  const { addNotificacao } = useNotificacao();

  const {
    projetos,
    deletarProjeto: { deletar, carregando: carregandoDeletar },
  } = useProjeto({ id });

  const { data, carregando, erro } = projetos;

  const handleDeletarProjeto = (id: number) => {
    deletar(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([REACT_QUERY_CHAVES.projetos]);
          addNotificacao({
            id: Math.random(),
            tipo: "success",
            mensagem: "Projeto deletado com sucesso",
            titulo: "Sucesso",
          });
        },
        onError: () => {
          addNotificacao({
            id: Math.random(),
            tipo: "error",
            mensagem: "Erro ao deletar projeto",
            titulo: "Erro",
          });
        },
      }
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full py-4">
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Gerente
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Início
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Previsão
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Fim
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Descrição
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Risco
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Orçamento
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data !== undefined && data.length > 0 ? (
              data.map((projeto, projetoIdx) => {
                return (
                  <tr key={projeto.id}>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500 table-cell",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.nome}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500 table-cell",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.gerente.nome}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.dataInicio !== null
                        ? formataDataParaTextoBr(projeto.dataInicio)
                        : ""}
                    </td>
                    <td //
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.dataPrevisaoFim !== null
                        ? formataDataParaTextoBr(projeto.dataPrevisaoFim)
                        : ""}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.dataFim !== null
                        ? formataDataParaTextoBr(projeto.dataFim)
                        : ""}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.descricao}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.status !== null
                        ? textoPorStatus[projeto.status]
                        : ""}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.risco !== null
                        ? textoPorRisco[projeto.risco]
                        : ""}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {projeto.orcamento !== null
                        ? formataDoubleParaTextoMoeda(projeto.orcamento)
                        : ""}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-transparent",
                        "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-x-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                        onClick={() => onEditar(projeto.id)}
                        disabled={carregandoDeletar}
                      >
                        <PencilIcon className="w-4 h-4" />
                        Editar
                      </button>
                      {projetoIdx !== 0 ? (
                        <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                      ) : null}
                    </td>
                    <td
                      className={classNames(
                        projetoIdx === 0 ? "" : "border-t border-transparent",
                        "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6",
                        projetoIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-x-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                        onClick={() => handleDeletarProjeto(projeto.id)}
                        disabled={carregandoDeletar}
                      >
                        <TrashIcon className="w-4 h-4" />
                        Deletar
                      </button>
                      {projetoIdx !== 0 ? (
                        <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                      ) : null}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="text-center">
                  {carregando ? (
                    <p>Carregando...</p>
                  ) : erro ? (
                    <p>Erro ao carregar</p>
                  ) : (
                    <p>Nenhum projeto encontrado</p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
