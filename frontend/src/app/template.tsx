import { Navegacao } from "../componentes/Navegacao";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navegacao
        itens={[
          { href: "/pessoas", titulo: "Pessoas" },
          { href: "/", titulo: "Projetos" },
        ]}
      />
      <main className="w-full p-4">{children}</main>
    </>
  );
}
