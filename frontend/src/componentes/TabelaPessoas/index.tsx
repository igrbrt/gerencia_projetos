import { usePessoa } from "../../hooks/usePessoa";
import { formataCPF, formataDataParaTextoBr } from "../../utils";
import { TabelaProps } from "./types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TabelaPessoas({ id, onEditar }: TabelaProps) {
  const { pessoas } = usePessoa({ id });

  const { data, carregando, erro } = pessoas;

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
                Nascimento
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                CPF
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Funcionário
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data !== undefined && data.length > 0 ? (
              data.map((pessoa, pessoaIdx) => {
                return (
                  <tr key={pessoa.id}>
                    <td
                      className={classNames(
                        pessoaIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500 table-cell",
                        pessoaIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {pessoa.nome}
                    </td>
                    <td
                      className={classNames(
                        pessoaIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500 table-cell",
                        pessoaIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {pessoa.dataNascimento !== null
                        ? formataDataParaTextoBr(pessoa.dataNascimento)
                        : ""}
                    </td>
                    <td
                      className={classNames(
                        pessoaIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500 table-cell",
                        pessoaIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {pessoa.cpf != null ? formataCPF(pessoa.cpf) : ""}
                    </td>
                    <td //
                      className={classNames(
                        pessoaIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500 table-cell",
                        pessoaIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      {pessoa.funcionario ? "Sim" : "Não"}
                    </td>

                    <td
                      className={classNames(
                        pessoaIdx === 0 ? "" : "border-t border-transparent",
                        "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6",
                        pessoaIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      )}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-x-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                        onClick={() => onEditar(pessoa.id)}
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
                      {pessoaIdx !== 0 ? (
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
