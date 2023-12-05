"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "react-query";
import {
  NotificacaoProvider,
  useNotificacao,
} from "../../context/notificacaoContext";
import { NotificacaoWrapper } from "../NotificacaoWrapper";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <NotificacaoProvider>
        <NotificacaoWrapper />
        {children}
      </NotificacaoProvider>
    </ReactQueryClientProvider>
  );
}
