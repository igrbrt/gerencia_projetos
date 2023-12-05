export type ItemNavegacaoProps = {
  titulo: string;
  href: string;
  ativo?: boolean;
};

export type NavegacaoProps = {
  itens: ItemNavegacaoProps[];
};
