import { TextAreaProps } from "./types";

export function TextArea({
  id,
  label,
  ehObrigatorio,
  inputProps,
  error,
  disabled,
}: TextAreaProps) {
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
      <textarea
        {...inputProps}
        rows={5}
        id={`input--${id}`}
        disabled={disabled}
        className={`p-2 pl-4 border focus-visible:outline-none ${
          error ? "border-red-600" : "border-gray-800"
        } bg-white rounded text-gray-800 text-sm font-normal resize-none disabled:bg-black/10 disabled:cursor-not-allowed`}
      />
      {error && <p className="text-sm font-normal text-red-600">{error}</p>}
    </div>
  );
}
