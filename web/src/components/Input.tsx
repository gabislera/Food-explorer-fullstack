import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: string;
  placeholder: string;
  label: string;
  icon?: any;
  error?: FieldError;
  isTitle?: any;
}

const InputBase = (
  { type, label, placeholder, error, ...rest }: InputProps,
  ref: any
) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-light-400" htmlFor={label}>
        {label}
      </label>
      <input
        {...rest}
        ref={ref}
        id={label}
        className="px-[0.875rem] text-light-500 py-[0.75rem] bg-dark-900 rounded-lg"
        type={type}
        placeholder={placeholder}
      />
      {!!error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
