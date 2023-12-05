import { ProjetoRiscoEnum } from "../../types/ProjetoRiscoEnum";
import { ProjetoStatusEnum } from "../../types/ProjetoStatusEnum";

export interface ProjetoProps {
  id: number;
  nome: string;
  dataInicio: string;
  dataPrevisaoFim: string;
  dataFim: string;
  descricao: string;
  status: ProjetoStatusEnum;
  risco: ProjetoRiscoEnum;
  gerente: {
    id: number;
    nome: string;
  };
  orcamento: number;
}

export interface TabelaProps {
  id?: number;
  onEditar: (id: number) => void;
}
