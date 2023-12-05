"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "react-query";
import { NotificacaoProvider } from "../../context/notificacaoContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <NotificacaoProvider>{children}</NotificacaoProvider>
    </ReactQueryClientProvider>
  );
}
