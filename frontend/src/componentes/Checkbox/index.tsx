"use client";
import { CheckIcon } from "@heroicons/react/20/solid";
import { CheckboxProps } from "./types";
import * as RadixCheckbox from "@radix-ui/react-checkbox";

export function Checkbox({ id, label, inputProps, disabled }: CheckboxProps) {
  return (
    <div className="flex items-center gap-1">
      <RadixCheckbox.Root
        {...inputProps}
        className="flex h-6 w-6 appearance-none items-center justify-center rounded bg-white outline-none border border-gray-800 disabled:bg-black/10"
        id={`checkbox--${id}`}
        disabled={disabled}
      >
        <RadixCheckbox.Indicator className="text-gray-800">
          <CheckIcon className="w-4 h-4" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label
        className="text-gray-800 text-sm font-semibold"
        htmlFor={`checkbox--${id}`}
      >
        {label}
      </label>
    </div>
  );
}
