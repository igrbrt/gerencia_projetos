import { ModalProps } from "../Modal/types";

export type PessoasModalProps = { id?: number } & Omit<ModalProps, "titulo">;
