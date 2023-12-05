import { z } from "zod";
import {
  INPUTS_TAMANHOS,
  INPUT_ERROS,
  REACT_QUERY_CHAVES,
} from "../../utils/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formataTextoParaData, removeNaoNumericos } from "../../utils";
import { usePessoa } from "../../hooks/usePessoa";
import { useQueryClient } from "react-query";
import { useNotificacao } from "../../context/notificacaoContext";

interface PessoaFormHookProps {
  id?: number;
  fecharModal: () => void;
}

export function usePessoaModalForm({ id, fecharModal }: PessoaFormHookProps) {
  const {
    criarPessoa: { carregando: carregandoCriar, criar },
    pessoaPorId: { revalidar },
    atualizarPessoa: { atualizar, carregando: carregandoAtualizar },
  } = usePessoa({ id });

  const { addNotificacao } = useNotificacao();

  const queryClient = useQueryClient();

  const pessoaSchema = z.object({
    nome: z
      .string()
      .min(1, INPUT_ERROS.REQUERIDO)
      .max(INPUTS_TAMANHOS.nome, INPUT_ERROS.TAMANHO_MAXIMO),
    cpf: z
      .string()
      .min(1, INPUT_ERROS.REQUERIDO)
      .min(INPUTS_TAMANHOS.cpf, INPUT_ERROS.CPF_TAMANHO_MAXIMO)
      .max(INPUTS_TAMANHOS.cpf, INPUT_ERROS.TAMANHO_MAXIMO),
    dataNascimento: z
      .string()
      .min(1, INPUT_ERROS.REQUERIDO)
      .refine((value) => {
        const data = formataTextoParaData(value);
        if (!data) {
          return false;
        }
        const dataDeHoje = new Date();
        dataDeHoje.setHours(0, 0, 0, 0);
        return data < dataDeHoje;
      }, INPUT_ERROS.DATA_MENOR_HOJE),
    funcionario: z.boolean(),
  });

  type PessoaFormData = z.infer<typeof pessoaSchema>;

  const { register, handleSubmit, formState, control, clearErrors, reset } =
    useForm<PessoaFormData>({
      resolver: zodResolver(pessoaSchema),
      mode: "onChange",
      defaultValues: {
        cpf: "",
        dataNascimento: "",
        nome: "",
        funcionario: false,
      },
    });

  const atualizarPessoa = async (data: PessoaFormData, id: number) => {
    atualizar(
      {
        id,
        nome: data.nome,
        cpf: removeNaoNumericos(data.cpf),
        dataNascimento: formataTextoParaData(data.dataNascimento),
        funcionario: data.funcionario,
      },
      {
        onSuccess: () => {
          revalidar();
          queryClient.invalidateQueries(REACT_QUERY_CHAVES.pessoas);
          queryClient.invalidateQueries([REACT_QUERY_CHAVES.pessoaPorId, id]);
          addNotificacao({
            id: Math.random(),
            tipo: "success",
            mensagem: "Pessoa atualizada com sucesso",
            titulo: "Sucesso",
          });
        },
        onError: () => {
          addNotificacao({
            id: Math.random(),
            tipo: "error",
            mensagem: "Erro ao atualizar pessoa",
            titulo: "Erro",
          });
        },
      }
    );
  };

  const criarPessoa = async (data: PessoaFormData) => {
    criar(
      {
        nome: data.nome,
        cpf: removeNaoNumericos(data.cpf),
        dataNascimento: formataTextoParaData(data.dataNascimento),
        funcionario: data.funcionario,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(REACT_QUERY_CHAVES.pessoas);
          addNotificacao({
            id: Math.random(),
            tipo: "success",
            mensagem: "Pessoa criada com sucesso",
            titulo: "Sucesso",
          });
        },
        onError: () => {
          addNotificacao({
            id: Math.random(),
            tipo: "error",
            mensagem: "Erro ao criar pessoa",
            titulo: "Erro",
          });
        },
      }
    );
  };

  const onSubmit = async (data: PessoaFormData) => {
    if (id) {
      await atualizarPessoa(data, id);
    } else {
      await criarPessoa(data);
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
