import { Controller } from "react-hook-form";
import { Botao } from "../Botao";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { Select } from "../Select";
import { TextArea } from "../TextArea";
import { ProjetoModalProps } from "./types";
import { useProjetoModalForm } from "./useProjetoModalForm";
import { useEffect, useMemo } from "react";
import {
  formataDataParaTexto,
  riscoOpcoes,
  statusOpcoes,
  textoPorRisco,
  textoPorStatus,
} from "../../utils";
import { InputNumerico } from "../InputNumerico";
import { INPUTS_TAMANHOS, REACT_QUERY_CHAVES } from "../../utils/constants";
import { useProjeto } from "../../hooks/useProjeto";
import { ProjetoRiscoEnum } from "../../types/ProjetoRiscoEnum";
import { ProjetoStatusEnum } from "../../types/ProjetoStatusEnum";
import { usePessoa } from "../../hooks/usePessoa";
import { SelectOpcao } from "../Select/types";

export function ProjetoModal({ aberto, fechar, id }: ProjetoModalProps) {
  const {
    pessoas: { data: pessoasData, carregando: pessoasCarregando },
  } = usePessoa({});

  const {
    projetoPorId: { carregando: carregandoProjetoPorId, data, erro },
  } = useProjeto({ id });

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
  } = useProjetoModalForm({
    id,
    fecharModal: fechar,
  });

  const fecharModal = () => {
    clearErrors();
    reset();
    fechar();
  };

  const opcoesGerentes = useMemo(
    () =>
      pessoasData?.map<SelectOpcao>((pessoa) => ({
        id: String(pessoa.id),
        texto: pessoa.nome,
      })) ?? [],
    [pessoasData]
  );

  const dataFormatadaHoje = useMemo(() => formataDataParaTexto(new Date()), []);

  const inputsDesabilitados = useMemo(
    () =>
      (id && carregandoProjetoPorId) ||
      pessoasCarregando ||
      !opcoesGerentes.length,
    [carregandoProjetoPorId, id, opcoesGerentes.length, pessoasCarregando]
  );

  useEffect(() => {
    reset({
      dataFim: data?.dataFim
        ? formataDataParaTexto(new Date(data.dataFim))
        : "",
      dataInicio: data?.dataInicio
        ? formataDataParaTexto(new Date(data.dataInicio))
        : "",
      dataPrevisaoFim: data?.dataPrevisaoFim
        ? formataDataParaTexto(new Date(data.dataPrevisaoFim))
        : "",
      descricao: data?.descricao ?? "",
      nome: data?.nome ?? "",
      orcamento: data?.orcamento ?? 0,
      risco: {
        id: data?.risco ?? (riscoOpcoes[0].id as ProjetoRiscoEnum),
        texto:
          textoPorRisco[data?.risco ?? (riscoOpcoes[0].id as ProjetoRiscoEnum)],
      },
      status: {
        id: data?.status ?? (statusOpcoes[0].id as ProjetoStatusEnum),
        texto:
          textoPorStatus[
            data?.status ?? (statusOpcoes[0].id as ProjetoStatusEnum)
          ],
      },
      gerente: {
        id: data?.gerente.id ? String(data?.gerente.id) : "",
        texto: data?.gerente.nome ?? "",
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal
      aberto={aberto}
      fechar={fecharModal}
      titulo={`${id ? "Atualizar" : "Criar"} projeto`}
    >
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {!pessoasCarregando && pessoasData && Boolean(!pessoasData.length) && (
          <p className="text-sm font-semibold text-red-600">
            Você precisa primeiro cadastrar um funcionário para poder criar um
            projeto.
          </p>
        )}
        <Input
          id="projeto-nome"
          label="Nome"
          inputProps={{
            ...register("nome"),
            maxLength: INPUTS_TAMANHOS.projetoNome,
          }}
          error={formState.errors.nome?.message}
          disabled={inputsDesabilitados}
          ehObrigatorio
        />
        <Controller
          control={control}
          name="gerente"
          render={({ field: { name, onChange, value } }) => (
            <Select
              formName={name}
              error={
                formState.errors.gerente?.message ||
                formState.errors.gerente?.texto?.message
              }
              id="projeto-gerente"
              label="Gerente responsável"
              onChange={onChange}
              opcoes={opcoesGerentes}
              selecionado={value}
              placeholder="Escolha um gerente"
              disabled={inputsDesabilitados}
              ehObrigatorio
            />
          )}
        />
        <Input
          id="projeto-data-inicio"
          label="Data de ínicio"
          inputProps={{
            type: "date",
            ...register("dataInicio"),
            min: !id ? dataFormatadaHoje : undefined,
          }}
          error={formState.errors.dataInicio?.message}
          disabled={inputsDesabilitados}
          ehObrigatorio
        />
        <Input
          id="projeto-previsao-termino"
          label="Previsão de término"
          inputProps={{
            type: "date",
            ...register("dataPrevisaoFim"),
            min: !id ? dataFormatadaHoje : undefined,
          }}
          error={formState.errors.dataPrevisaoFim?.message}
          disabled={inputsDesabilitados}
          ehObrigatorio
        />
        {/* @TODO: Acho que isso aqui não deve aparecer nesse modal, mas como uma ação na exibicão dos projetos. */}
        <Input
          id="projeto-data-termino"
          label="Data real de término"
          inputProps={{ type: "date", ...register("dataFim") }}
          error={formState.errors.dataFim?.message}
          disabled={inputsDesabilitados}
        />
        <Controller
          control={control}
          name="risco"
          render={({ field: { name, onChange, value } }) => (
            <Select
              formName={name}
              error={formState.errors.risco?.message}
              id="projeto-risco"
              label="Risco"
              onChange={onChange}
              opcoes={riscoOpcoes}
              selecionado={value}
              placeholder="Escolha um risco"
              disabled={inputsDesabilitados}
              ehObrigatorio
            />
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { name, onChange, value } }) => (
            <Select
              formName={name}
              error={formState.errors.status?.message}
              id="projeto-status"
              label="Status"
              onChange={onChange}
              selecionado={value}
              opcoes={statusOpcoes}
              placeholder="Escolha um status"
              disabled={inputsDesabilitados}
              ehObrigatorio
            />
          )}
        />
        <Controller
          control={control}
          name="orcamento"
          render={({ field: { onChange, value, onBlur } }) => (
            <InputNumerico
              id="projeto-orcamento"
              label="Orçamento"
              ehObrigatorio
              minLimit={1}
              maxLimit={999999}
              value={value}
              disabled={inputsDesabilitados}
              error={formState.errors.orcamento?.message}
              onBlur={onBlur}
              onValueChange={(e) => {
                onChange(e.floatValue);
              }}
            />
          )}
        />
        <TextArea
          id="projeto-descricao"
          label="Descrição"
          inputProps={{
            ...register("descricao"),
            maxLength: INPUTS_TAMANHOS.descricaoProjeto,
          }}
          error={formState.errors.descricao?.message}
          disabled={inputsDesabilitados}
          ehObrigatorio
        />
        {/* @TODO: ADICIONAR ESTADO DE DISABLED. USAR MESMA CONDICAO DOS INPUTS */}
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
