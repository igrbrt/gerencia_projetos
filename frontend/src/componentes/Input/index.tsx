import { InputProps } from "./types";

export function Input({
  label,
  ehObrigatorio,
  inputProps,
  id,
  error,
  disabled,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        className={`font-semibold ${
          error ? "text-red-600" : "text-gray-800"
        } text-sm`}
        htmlFor={`input--${id}`}
      >
        {label}
        {ehObrigatorio && "*"}
      </label>
      <input
        {...inputProps}
        id={`input--${id}`}
        disabled={disabled}
        className={`p-2 pl-4 border bg-white rounded text-gray-800 focus-visible:outline-none disabled:bg-black/10 disabled:cursor-not-allowed ${
          error ? "border-red-600" : "border-gray-800"
        } text-sm font-normal`}
      />
      {error && <p className="text-sm font-normal text-red-600">{error}</p>}
    </div>
  );
}
