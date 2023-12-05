import { ModalProps } from "../Modal/types";

export type ProjetoModalProps = { id?: number } & Omit<ModalProps, "titulo">;
