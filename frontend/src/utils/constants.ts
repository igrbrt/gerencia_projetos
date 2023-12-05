export const INPUT_ERROS = {
  REQUERIDO: "Este campo é obrigatório",
  CPF_TAMANHO_MAXIMO: "Este campo deve possuir 14 caracteres.",
  TAMANHO_MAXIMO: "Você atingiu o tamanho máximo deste campo.",
  DATA_MAIOR_HOJE: "A data selecionada precisa ser posterior a hoje.",
  DATA_MENOR_HOJE: "A data selecionada precisa ser anterior a hoje.",
  PREVISAO_MAIOR_DATA:
    "A previsão de término precisa ser posterior a data de ínicio.",
  VALOR_MINIMO_UM_REAL: "O valor mínimo deste campo é R$ 1,00",
};

export const INPUTS_TAMANHOS = {
  nome: 100,
  cpf: 14,
  projetoNome: 200,
  descricaoProjeto: 5000,
};

export const REACT_QUERY_CHAVES = {
  projetoPorId: "projetoPorId",
  criarProjeto: "criarProjeto",
  atualizarProjeto: "atualizarProjeto",
  deletarProjeto: "deletarProjeto",
  pessoaPorId: "pessoaPorId",
  criarPessoa: "criarPessoa",
  atualizarPessoa: "atualizarPessoa",
  deletarPessoa: "deletarPessoa",
  pessoas: "pessoas",
  projetos: "projetos",
};
