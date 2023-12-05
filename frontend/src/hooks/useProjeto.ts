import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProjetoRiscoEnum } from "../types/ProjetoRiscoEnum";
import { ProjetoStatusEnum } from "../types/ProjetoStatusEnum";
import { REACT_QUERY_CHAVES } from "../utils/constants";
import { IErro } from "../types/APIErro";
import { ProjetoProps } from "../componentes/TabelaProjetos/types";

interface ProjetoDTO {
  id: number;
  nome: string;
  dataPrevisaoFim?: Date | null;
  dataFim?: Date | null;
  dataInicio?: Date | null;
  orcamento?: number | null;
  status?: ProjetoStatusEnum | null;
  risco?: ProjetoRiscoEnum | null;
  gerente: {
    id: number;
    nome: string;
  };
  descricao?: string | null;
}

// Precisamos fazer isso porque a data vem como string do BackEnd
interface ProjetoData
  extends Omit<ProjetoDTO, "dataPrevisaoFim" | "dataFim" | "dataInicio"> {
  dataPrevisaoFim?: string | null;
  dataFim?: string | null;
  dataInicio?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useProjeto({ id }: { id?: number }) {
  const queryClient = useQueryClient();

  const {
    data: projetosData,
    error: projetosErro,
    isLoading: projetosCarregando,
    refetch: revalidarProjetos,
  } = useQuery<ProjetoProps[]>({
    queryKey: [REACT_QUERY_CHAVES.projetos],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/projetos`, {
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

  const {
    data: projetoData,
    error: projetoErro,
    isLoading: projetoCarregando,
    refetch: revalidarProjeto,
  } = useQuery<ProjetoData>({
    enabled: Boolean(id),
    queryKey: [REACT_QUERY_CHAVES.projetoPorId, id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/projetos/${id}`, {
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

  const { mutate: criarProjetoExec, isLoading: criarProjetoCarregando } =
    useMutation<ProjetoData, IErro, Omit<ProjetoDTO, "id">>({
      mutationKey: [REACT_QUERY_CHAVES.criarProjeto],
      mutationFn: async (projetoData: Omit<ProjetoDTO, "id">) => {
        const projetoFormatado: Omit<ProjetoData, "id"> = {
          ...projetoData,
          dataFim: projetoData.dataFim?.toISOString(),
          dataInicio: projetoData.dataInicio?.toISOString(),
          dataPrevisaoFim: projetoData.dataPrevisaoFim?.toISOString(),
        };

        const response = await fetch(`${API_URL}/projetos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projetoFormatado),
        });

        const jsonResponse = await response.json();

        if (!response.ok) {
          throw new Error(jsonResponse?.error);
        }

        return jsonResponse;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_CHAVES.projetos);
      },
    });

  const {
    mutate: atualizarProjetoExec,
    isLoading: atualizarProjetoCarregando,
  } = useMutation<ProjetoData, IErro, ProjetoDTO>({
    mutationKey: [REACT_QUERY_CHAVES.atualizarProjeto],
    mutationFn: async (projetoData: ProjetoDTO) => {
      const projetoFormatado: ProjetoData = {
        ...projetoData,
        dataFim: projetoData.dataFim?.toISOString(),
        dataInicio: projetoData.dataInicio?.toISOString(),
        dataPrevisaoFim: projetoData.dataPrevisaoFim?.toISOString(),
      };
      const response = await fetch(`${API_URL}/projetos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projetoFormatado),
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse?.error);
      }

      return jsonResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_CHAVES.projetos);
      queryClient.invalidateQueries([REACT_QUERY_CHAVES.projetoPorId, id]);
    },
  });

  return {
    projetos: {
      data: projetosData,
      carregando: projetosCarregando,
      erro: projetosErro,
      revalidar: revalidarProjetos,
    },
    projetoPorId: {
      data: projetoData,
      carregando: projetoCarregando,
      erro: projetoErro,
      revalidar: revalidarProjeto,
    },
    criarProjeto: {
      criar: criarProjetoExec,
      carregando: criarProjetoCarregando,
    },
    atualizarProjeto: {
      atualizar: atualizarProjetoExec,
      carregando: atualizarProjetoCarregando,
    },
  };
}
