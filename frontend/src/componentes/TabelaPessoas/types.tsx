export interface PessoaProps {
  id: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  funcionario: boolean;
}

export interface TabelaProps {
  id?: number;
  onEditar: (id: number) => void;
}
