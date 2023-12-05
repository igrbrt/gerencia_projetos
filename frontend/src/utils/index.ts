import { SelectOpcao } from "../componentes/Select/types";
import { ProjetoRiscoEnum } from "../types/ProjetoRiscoEnum";
import { ProjetoStatusEnum } from "../types/ProjetoStatusEnum";

export function formataDataParaTexto(data: Date) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  return `${ano}-${mes}-${dia}`;
}

export function formataDataParaTextoBr(data: string) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function formataTextoParaData(dataEmTexto: string) {
  const data = new Date(dataEmTexto.replaceAll("-", "/"));

  if (isNaN(data.getTime())) {
    return undefined;
  }

  return data;
}

export function formataDoubleParaTextoMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function dataEhMaiorQueOutra(
  dataAComparar: Date,
  dataASerComparada: Date
) {
  dataAComparar.setHours(0, 0, 0, 0);
  dataASerComparada.setHours(0, 0, 0, 0);
  return dataAComparar > dataASerComparada;
}

export function removeNaoNumericos(valor: string) {
  return valor.replace(/\D/g, "");
}

export function formataCPF(valor: string) {
  return removeNaoNumericos(valor)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export const textoPorRisco: { [key in ProjetoRiscoEnum]: string } = {
  ALTO: "Alto",
  BAIXO: "Baixo",
  MEDIO: "Médio",
};

export const textoPorStatus: { [key in ProjetoStatusEnum]: string } = {
  ANALISE: "Em análise",
  ANALISE_APROVADA: "Análise aprovada",
  ANALISE_REALIZADA: "Análise realizada",
  CANCELADO: "Cancelado",
  EM_ANDAMENTO: "Em andamento",
  ENCERRADO: "Encerrado",
  INICIADO: "Iniciado",
  PLANEJADO: "Planejado",
};

export const riscoOpcoes = Object.keys(ProjetoRiscoEnum).map<SelectOpcao>(
  (chave) => ({
    id: ProjetoRiscoEnum[chave as keyof typeof ProjetoRiscoEnum],
    texto: textoPorRisco[chave as keyof typeof textoPorRisco],
  })
);

export const statusOpcoes = Object.keys(ProjetoStatusEnum).map<SelectOpcao>(
  (chave) => ({
    id: ProjetoStatusEnum[chave as keyof typeof ProjetoStatusEnum],
    texto: textoPorStatus[chave as keyof typeof textoPorStatus],
  })
);
