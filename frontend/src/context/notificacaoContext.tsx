import React, { createContext, useState, useContext, ReactNode } from "react";
import { NotificacaoProps } from "../componentes/Notificacao/Notificacao";

interface NotificacaoContextProps {
  notificacoes: NotificacaoProps[];
  addNotificacao: (novaNotificacao: NotificacaoProps) => void;
  removeNotificacao: (notificacaoId: number) => void;
}

const NotificacaoContext = createContext<NotificacaoContextProps>({
  notificacoes: [],
  addNotificacao: () => {},
  removeNotificacao: () => {},
});

interface NotificacaoProviderProps {
  children: ReactNode;
}

export const NotificacaoProvider = ({ children }: NotificacaoProviderProps) => {
  const [notificacoes, setNotificacoes] = useState<NotificacaoProps[]>([]);

  const addNotificacao = (novaNotificacao: NotificacaoProps) => {
    setNotificacoes((prev) => [...prev, novaNotificacao]);
  };

  const removeNotificacao = (notificacaoId: number) => {
    setNotificacoes((prev) =>
      prev.filter((notificacao) => notificacao.id !== notificacaoId)
    );
  };

  return (
    <NotificacaoContext.Provider
      value={{ notificacoes, addNotificacao, removeNotificacao }}
    >
      {children}
    </NotificacaoContext.Provider>
  );
};

export const useNotificacao = () => {
  return useContext(NotificacaoContext);
};
