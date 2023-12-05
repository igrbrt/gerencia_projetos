import { z } from "zod";
import { INPUTS_TAMANHOS, INPUT_ERROS } from "../../utils/constants";
import { ProjetoRiscoEnum } from "../../types/ProjetoRiscoEnum";
import { ProjetoStatusEnum } from "../../types/ProjetoStatusEnum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dataEhMaiorQueOutra,
  formataTextoParaData,
  riscoOpcoes,
  statusOpcoes,
} from "../../utils";
import { useProjeto } from "../../hooks/useProjeto";
import { useNotificacao } from "../../context/notificacaoContext";

interface ProjetoModalFormHookProps {
  id?: number;
  fecharModal: () => void;
}

export function useProjetoModalForm({
  id,
  fecharModal,
}: ProjetoModalFormHookProps) {
  const {
    projetoPorId: { revalidar },
    criarProjeto: { carregando: carregandoCriar, criar },
    atualizarProjeto: { atualizar, carregando: carregandoAtualizar },
  } = useProjeto({ id });

  const { addNotificacao } = useNotificacao();

  const projetoSchema = z
    .object({
      nome: z
        .string()
        .min(1, INPUT_ERROS.REQUERIDO)
        .max(INPUTS_TAMANHOS.projetoNome, INPUT_ERROS.TAMANHO_MAXIMO),
      dataInicio: z
        .string()
        .min(1, INPUT_ERROS.REQUERIDO)
        .refine((value) => {
          const data = formataTextoParaData(value);
          if (!data) {
            return false;
          }

          if (id) {
            return true;
          }

          const dataDeHoje = new Date();
          dataDeHoje.setHours(0, 0, 0, 0);
          return data >= dataDeHoje;
        }, INPUT_ERROS.DATA_MAIOR_HOJE),
      dataPrevisaoFim: z
        .string()
        .min(1, INPUT_ERROS.REQUERIDO)
        .refine((value) => {
          const data = formataTextoParaData(value);
          if (!data) {
            return false;
          }

          if (id) {
            return true;
          }
          const dataDeHoje = new Date();
          dataDeHoje.setHours(0, 0, 0, 0);
          return data >= dataDeHoje;
        }, INPUT_ERROS.DATA_MAIOR_HOJE),
      // @TODO: Acho que esse campo não deveria existir aqui
      dataFim: z.string(),
      orcamento: z
        .number({ required_error: INPUT_ERROS.REQUERIDO })
        .refine((value) => value >= 1, {
          message: INPUT_ERROS.VALOR_MINIMO_UM_REAL,
        }),
      descricao: z
        .string()
        .min(1, INPUT_ERROS.REQUERIDO)
        .max(INPUTS_TAMANHOS.descricaoProjeto, INPUT_ERROS.TAMANHO_MAXIMO),
      risco: z.object({
        id: z.nativeEnum(ProjetoRiscoEnum),
        texto: z.string().min(1, INPUT_ERROS.REQUERIDO),
      }),
      status: z.object({
        id: z.nativeEnum(ProjetoStatusEnum),
        texto: z.string().min(1, INPUT_ERROS.REQUERIDO),
      }),
      // @TODO: Ver isso. Provavelmente parecido com o status, onde o id é string ao invés de enum. Precisara ser obrigatório
      gerente: z.object({
        id: z.string(),
        texto: z.string().min(1, INPUT_ERROS.REQUERIDO),
      }),
    })
    .superRefine((data, ctx) => {
      const dataInicio = formataTextoParaData(data.dataInicio);
      const dataPrevisaoFim = formataTextoParaData(data.dataPrevisaoFim);

      if (!dataInicio || !dataPrevisaoFim) {
        return;
      }

      const dataInicioEhMaiorQuePrevisao = dataEhMaiorQueOutra(
        dataInicio,
        dataPrevisaoFim
      );

      if (dataInicioEhMaiorQuePrevisao) {
        ctx.addIssue({
          code: "custom",
          path: ["dataPrevisaoFim"],
          message: INPUT_ERROS.PREVISAO_MAIOR_DATA,
        });
      } else {
        clearErrors(["dataPrevisaoFim"]);
      }
    });

  type ProjetoFormData = z.infer<typeof projetoSchema>;

  const { register, handleSubmit, formState, control, clearErrors, reset } =
    useForm<ProjetoFormData>({
      resolver: zodResolver(projetoSchema),
      mode: "onChange",
      defaultValues: {
        dataInicio: "",
        dataFim: "",
        descricao: "",
        nome: "",
        orcamento: 0,
        dataPrevisaoFim: "",
        gerente: { id: "", texto: "" },
        risco: {
          id: riscoOpcoes[0].id as ProjetoRiscoEnum,
          texto: riscoOpcoes[0].texto,
        },
        status: {
          id: statusOpcoes[0].id as ProjetoStatusEnum,
          texto: statusOpcoes[0].texto,
        },
      },
    });

  const criarProjeto = (data: ProjetoFormData) => {
    criar(
      {
        gerente: { id: Number(data.gerente.id), nome: data.nome },
        nome: data.nome,
        dataFim: formataTextoParaData(data.dataFim),
        dataInicio: formataTextoParaData(data.dataInicio),
        dataPrevisaoFim: formataTextoParaData(data.dataPrevisaoFim),
        descricao: data.descricao,
        orcamento: data.orcamento,
        risco: data.risco.id,
        status: data.status.id,
      },
      {
        onSuccess: () => {
          addNotificacao({
            id: Math.random(),
            mensagem: "Projeto criado com sucesso",
            tipo: "success",
          });
        },
        onError: () => {
          addNotificacao({
            id: Math.random(),
            mensagem: "Erro ao criar o projeto",
            tipo: "error",
          });
        },
      }
    );
  };

  const atualizarProjeto = async (data: ProjetoFormData, id: number) => {
    atualizar(
      {
        id: id,
        gerente: { id: Number(data.gerente.id), nome: data.nome },
        nome: data.nome,
        dataFim: formataTextoParaData(data.dataFim),
        dataInicio: formataTextoParaData(data.dataInicio),
        dataPrevisaoFim: formataTextoParaData(data.dataPrevisaoFim),
        descricao: data.descricao,
        orcamento: data.orcamento,
        risco: data.risco.id,
        status: data.status.id,
      },
      {
        onSuccess: () => {
          revalidar();
          addNotificacao({
            id: Math.random(),
            mensagem: "Projeto atualizado com sucesso",
            tipo: "success",
          });
        },
        onError: () => {
          addNotificacao({
            id: Math.random(),
            mensagem: "Erro ao atualizar o projeto",
            tipo: "error",
          });
        },
      }
    );
  };

  const onSubmit = async (data: ProjetoFormData) => {
    if (id) {
      await atualizarProjeto(data, id);
    } else {
      await criarProjeto(data);
    }

    fecharModal();
  };

  return {
    hookForm: {
      register,
      handleSubmit,
      formState,
      control,
      clearErrors,
      reset,
    },
    onSubmit,
    carregando: carregandoAtualizar || carregandoCriar,
  };
}
