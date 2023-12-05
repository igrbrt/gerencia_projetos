import { NumericFormat } from "react-number-format";
import { InputNumericoProps } from "./types";

export const InputNumerico = ({
  disabled,
  id,
  label,
  ehObrigatorio,
  error,
  onValueChange,
  onBlur,
  maxLimit,
  minLimit,
  value,
}: InputNumericoProps) => {
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
      <NumericFormat
        className={`p-2 pl-4 border bg-white rounded text-gray-800 focus-visible:outline-none disabled:bg-black/10 disabled:cursor-not-allowed ${
          error ? "border-red-600" : "border-gray-800"
        } text-sm font-normal`}
        decimalSeparator=","
        prefix={"R$ "}
        suffix={",00"}
        value={value}
        id={`input--${id}`}
        disabled={disabled}
        thousandSeparator={"."}
        onValueChange={onValueChange}
        onBlur={onBlur}
        inputMode="numeric"
        isAllowed={({ floatValue = 0, value }) => {
          if (value.includes(".")) return false;
          if (floatValue < 0) return false;
          if (maxLimit) return floatValue <= maxLimit;
          if (minLimit) return floatValue >= minLimit;

          return true;
        }}
      />
      {error && <p className="text-sm font-normal text-red-600">{error}</p>}
    </div>
  );
};
