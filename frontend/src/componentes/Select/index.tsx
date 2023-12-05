"use client";
import { Listbox, Transition, ListboxProps } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { SelectOpcao, SelectProps } from "./types";

const compareBy = (opcaoA?: SelectOpcao, opcaoB?: SelectOpcao) =>
  opcaoA?.id === opcaoB?.id;

export function Select({
  opcoes,
  label,
  ehObrigatorio,
  onChange,
  selecionado,
  placeholder,
  id,
  error,
  formName,
  disabled,
}: SelectProps) {
  return (
    <Listbox
      value={selecionado}
      onChange={onChange}
      as={"div"}
      className="relative flex flex-col"
      by={compareBy}
      name={formName}
      disabled={disabled}
    >
      <Listbox.Label
        className={`font-semibold ${
          error ? "text-red-600" : "text-gray-800"
        }  text-sm mb-1`}
        htmlFor={`select--${id}`}
      >
        {label}
        {ehObrigatorio && "*"}
      </Listbox.Label>
      <Listbox.Button
        id={`select--${id}`}
        className={`relative p-2 pl-4 bg-white border ${
          error ? "border-red-600" : "border-gray-800"
        } font-normal text-gray-800 text-sm rounded w-full flex justify-between disabled:bg-black/10 disabled:cursor-not-allowed`}
      >
        <span className="block truncate">
          {selecionado?.id ? selecionado.texto : placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        as={"div"}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={"relative"}
      >
        <Listbox.Options className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none text-sm">
          {opcoes.map((opcao) => (
            <Listbox.Option
              key={`select-option-${opcao.id}`}
              className={({ active }) =>
                `cursor-pointer select-none p-2 pl-9 text-gray-900 relative ${
                  active ? "bg-gray-100" : ""
                }`
              }
              value={opcao}
            >
              {({ selected }) => (
                <>
                  {selected && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-900">
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                  <span
                    className={`block truncate ${
                      selected ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {opcao.texto}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
      {error && (
        <p className="mt-1 text-sm font-normal text-red-600">{error}</p>
      )}
    </Listbox>
  );
}
