import { useState } from "react";
import { NotificacaoProps } from "../componentes/Notificacao/Notificacao";

export function useNotificacao() {
  const [notificacoes, setNotificacoes] = useState<NotificacaoProps[]>([]);

  const addNotificacao = (novaNotificacao: NotificacaoProps) => {
    setNotificacoes((prev) => [...prev, { ...novaNotificacao }]);
  };

  const removeNotificacao = (notificacaoId: number) => {
    setNotificacoes((prev) =>
      prev.filter((notificacao) => notificacao.id !== notificacaoId)
    );
  };

  return { notificacoes, addNotificacao, removeNotificacao };
}
