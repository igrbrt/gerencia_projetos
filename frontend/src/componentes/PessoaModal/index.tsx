import { Controller } from "react-hook-form";
import { Botao } from "../Botao";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { useEffect, useMemo } from "react";
import { formataCPF, formataDataParaTexto } from "../../utils";
import { PessoasModalProps } from "./types";
import { Checkbox } from "../Checkbox";
import { usePessoaModalForm } from "./usePessoaModalForm";
import { INPUTS_TAMANHOS } from "../../utils/constants";
import { usePessoa } from "../../hooks/usePessoa";

export function PessoaModal({ aberto, fechar, id }: PessoasModalProps) {
  // @TODO: SHOW TOAST EM CASO DE ERRO E FECHAR MODAL
  const {
    pessoaPorId: { carregando: carregandoPessoaPorId, data, erro },
  } = usePessoa({ id });

  const fecharModal = () => {
    clearErrors();
    reset();
    fechar();
  };

  const {
    hookForm: {
      register,
      formState,
      handleSubmit,
      control,
      clearErrors,
      reset,
    },
    onSubmit,
    carregando,
  } = usePessoaModalForm({
    id,
    fecharModal,
  });

  const dataFormatadaMaximo = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    hoje.setDate(hoje.getDate() - 1);
    return formataDataParaTexto(hoje);
  }, []);

  useEffect(() => {
    reset({
      cpf: formataCPF(data?.cpf ?? ""),
      funcionario: data?.funcionario ?? false,
      nome: data?.nome ?? "",
      dataNascimento: data?.dataNascimento
        ? formataDataParaTexto(new Date(data?.dataNascimento))
        : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal
      aberto={aberto}
      fechar={fecharModal}
      titulo={`${id ? "Atualizar" : "Criar"} pessoa`}
    >
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="pessoa-nome"
          label="Nome"
          inputProps={{
            ...register("nome"),
            maxLength: INPUTS_TAMANHOS.nome,
          }}
          error={formState.errors.nome?.message}
          disabled={Boolean(id && carregandoPessoaPorId)}
          ehObrigatorio
        />

        <Input
          id="pessoa-data-nascimento"
          label="Data de nascimento"
          inputProps={{
            type: "date",
            max: dataFormatadaMaximo,
            ...register("dataNascimento"),
          }}
          disabled={Boolean(id && carregandoPessoaPorId)}
          error={formState.errors.dataNascimento?.message}
          ehObrigatorio
        />
        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, ...resto } }) => (
            <Input
              id="pessoa-cpf"
              label="CPF"
              disabled={Boolean(id && carregandoPessoaPorId)}
              inputProps={{
                ...resto,
                onPaste: (e) => {
                  e.preventDefault();
                  const valorFormatado = formataCPF(
                    e.clipboardData.getData("text")
                  );
                  onChange(valorFormatado);
                },
                onChange: (e) => {
                  const valorFormatado = formataCPF(e.target.value);
                  onChange(valorFormatado);
                },
                maxLength: INPUTS_TAMANHOS.cpf,
              }}
              error={formState.errors.cpf?.message}
              ehObrigatorio
            />
          )}
        />
        <Controller
          control={control}
          name="funcionario"
          render={({ field: { onBlur, onChange, value } }) => (
            <Checkbox
              id="pessoa-eh-funcionario"
              label="É funcionario"
              disabled={Boolean(id && carregandoPessoaPorId)}
              inputProps={{
                checked: value,
                onCheckedChange: (checked) =>
                  // Isso está sendo feito porque o radix permite que o valor venha como 'indeterminado'
                  onChange(checked === true ? true : false),
                onBlur,
              }}
            />
          )}
        />

        <Botao
          tamanho="sm"
          type="submit"
          variante="outlined"
          carregando={carregando}
        >
          {id ? "Atualizar" : "Criar"}
        </Botao>
      </form>
    </Modal>
  );
}
