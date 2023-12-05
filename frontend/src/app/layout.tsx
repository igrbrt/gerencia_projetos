import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../componentes/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desafio Code Group",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="w-full h-full min-h-full">
      <body
        className={`${inter.className} flex flex-col md:flex-row h-full w-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
