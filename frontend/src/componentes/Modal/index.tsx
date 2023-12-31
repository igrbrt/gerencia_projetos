"use client";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment, PropsWithChildren, useState } from "react";
import { ModalProps } from "./types";

export function Modal({
  aberto,
  fechar,
  titulo,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <Transition appear show={aberto} as={Fragment}>
      <Dialog onClose={fechar}>
        <Transition.Child
          as={"div"}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={"fixed inset-0 bg-black/50"}
        >
          <div className="flex min-h-full max-h-screen w-full md:items-center justify-center">
            <Dialog.Panel className="w-full md:max-w-2xl transform overflow-x-hidden max-h-screen overflow-y-auto rounded bg-white p-4 shadow-xl transition-all">
              <div className="flex w-full gap-2 justify-between">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold text-gray-900"
                >
                  {titulo}
                </Dialog.Title>
                <button className="text-gray-900" onClick={fechar}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <section className="mt-2">{children}</section>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
