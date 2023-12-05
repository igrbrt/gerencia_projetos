import { useProjeto } from "../../hooks/useProjeto";
import {
  formataDataParaTextoBr,
  formataDoubleParaTextoMoeda,
  textoPorRisco,
  textoPorStatus,
} from "../../utils";
import { TabelaProps } from "./types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TabelaProjetos({ id, onEditar }: TabelaProps) {
  const { projetos } = useProjeto({ id });

  const { data, carregando, erro } = projetos;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
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
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                        Editar
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
