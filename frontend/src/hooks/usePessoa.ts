import { useMutation, useQuery } from "react-query";
import { REACT_QUERY_CHAVES } from "../utils/constants";
import { IErro } from "../types/APIErro";
import { PessoaProps } from "../componentes/TabelaPessoas/types";

interface PessoaDTO {
  id: number;
  nome: string;
  dataNascimento?: Date | null;
  cpf?: string | null;
  funcionario?: boolean | null;
}

// Precisamos fazer isso porque a data vem como string do BackEnd
export interface PessoaData extends Omit<PessoaDTO, "dataNascimento"> {
  dataNascimento?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function usePessoa({ id }: { id?: number }) {
  const {
    data: pessoaData,
    error: pessoaErro,
    isLoading: pessoaCarregando,
    refetch: revalidarPessoas,
  } = useQuery<PessoaDTO[]>({
    enabled: Boolean(id),
    queryKey: [REACT_QUERY_CHAVES.pessoaPorId, id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/pessoas/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse?.error);
      }

      return jsonResponse;
    },
  });

  const {
    data: pessoasData,
    error: pessoasErro,
    isLoading: pessoasCarregando,
    refetch: revalidarPessoa,
  } = useQuery<PessoaProps[]>({
    queryKey: [REACT_QUERY_CHAVES.pessoas],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/pessoas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse?.error);
      }

      return jsonResponse.content;
    },
  });

  const { mutate: criarPessoaExec, isLoading: criarPessoaCarregando } =
    useMutation<PessoaData, IErro, Omit<PessoaDTO, "id">>({
      mutationKey: [REACT_QUERY_CHAVES.criarPessoa],
      mutationFn: async (pessoaData: Omit<PessoaDTO, "id">) => {
        const pessoaFormatada: Omit<PessoaData, "id"> = {
          ...pessoaData,
          dataNascimento: pessoaData.dataNascimento?.toISOString(),
        };

        const response = await fetch(`${API_URL}/pessoas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pessoaFormatada),
        });

        const jsonResponse = await response.json();

        if (!response.ok) {
          throw new Error(jsonResponse?.error);
        }

        return jsonResponse;
      },
    });

  const { mutate: atualizarPessoaExec, isLoading: atualizarPessoaCarregando } =
    useMutation<PessoaData, IErro, PessoaDTO>({
      mutationKey: [REACT_QUERY_CHAVES.atualizarPessoa],
      mutationFn: async (pessoaData: PessoaDTO) => {
        const pessoaFormatada: Omit<PessoaData, "id"> = {
          ...pessoaData,
          dataNascimento: pessoaData.dataNascimento?.toISOString(),
        };

        const response = await fetch(`${API_URL}/pessoas/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pessoaFormatada),
        });

        const jsonResponse = await response.json();

        if (!response.ok) {
          throw new Error(jsonResponse?.error);
        }

        return jsonResponse;
      },
    });

  const { mutate: deletarPessoaExec, isLoading: deletarPessoaCarregando } =
    useMutation({
      mutationKey: [REACT_QUERY_CHAVES.deletarPessoa],
      mutationFn: async ({ id }: { id: number }) => {
        const response = await fetch(`${API_URL}/pessoas/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error();
        }
      },
    });

  return {
    pessoas: {
      data: pessoasData,
      carregando: pessoasCarregando,
      erro: pessoasErro,
      revalidar: revalidarPessoas,
    },
    pessoaPorId: {
      data: pessoaData,
      carregando: pessoaCarregando,
      erro: pessoaErro,
      revalidar: revalidarPessoa,
    },
    criarPessoa: {
      criar: criarPessoaExec,
      carregando: criarPessoaCarregando,
    },
    atualizarPessoa: {
      atualizar: atualizarPessoaExec,
      carregando: atualizarPessoaCarregando,
    },
    deletarPessoa: {
      deletar: deletarPessoaExec,
      carregando: deletarPessoaCarregando,
    },
  };
}
