import { useNotificacao } from "../context/notificacaoContext";
import NotificacaoComponent from "./Notificacao/Notificacao";

export function NotificacaoWrapper() {
  const { notificacoes, removeNotificacao } = useNotificacao();
  return (
    <div className="fixed top-16 right-0 mb-4 mr-4 flex flex-col-reverse items-end space-y-reverse space-y-2 z-20">
      {notificacoes.map((notificacao) => (
        <NotificacaoComponent
          key={notificacao.id}
          notificacao={notificacao}
          removeNotificacao={removeNotificacao}
        />
      ))}
    </div>
  );
}
