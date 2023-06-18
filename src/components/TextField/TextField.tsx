"use client";
import { ErrorText } from "@/components/ErrorText";
import { Label } from "@/components/Label";
import { ComponentProps, forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { twMerge } from "tailwind-merge";

type TextFieldProps = {
  children: React.ReactNode;
  errorMessage?: string;
  label: string;
  htmlFor: string;
};

function TextField({ children, errorMessage, label, htmlFor }: TextFieldProps) {
  const hasError = !!errorMessage;

  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor={htmlFor} hasError={hasError}>
        {label}
      </Label>
      {children}
      {hasError && <ErrorText>{errorMessage}</ErrorText>}
    </div>
  );
}

type InputProps = ComponentProps<"input"> & {
  hasError: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, hasError, ...props }: InputProps, ref) => {
    const errorStyles = hasError
      ? "border-rose-200 text-rose-500 placeholder:text-rose-300"
      : "";

    return (
      <input
        type={type}
        id={id}
        ref={ref}
        className={twMerge(
          "w-full rounded-md border border-gray-200 placeholder:text-gray-400 read-only:bg-gray-100 read-only:text-gray-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500",
          errorStyles
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

type MaskedInputProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  hasError: boolean;
} & ComponentProps<"input"> &
  ComponentProps<typeof IMaskInput>;

const MaskedInput = forwardRef<IMask.MaskElement, MaskedInputProps>(
  ({ onChange, name, hasError, ...props }: MaskedInputProps, ref) => {
    const errorStyles = hasError
      ? "border-rose-200 text-rose-500 placeholder:text-rose-300"
      : "";

    return (
      <IMaskInput
        {...props}
        inputRef={ref}
        className={twMerge(
          "w-full rounded-md border border-gray-200 placeholder:text-gray-400 read-only:bg-gray-100 read-only:text-gray-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500",
          errorStyles
        )}
        onAccept={(value: string) => {
          onChange({ target: { name: name, value } });
        }}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";

type SelectProps = ComponentProps<"select"> & {
  hasError: boolean;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, children, ...props }: SelectProps, ref) => {
    const errorStyles = hasError
      ? "border-rose-200 text-rose-500 placeholder:text-rose-300"
      : "";

    return (
      <select
        ref={ref}
        className={twMerge(
          "w-full rounded-md border border-gray-200  placeholder:text-gray-400   invalid:text-red-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500",
          errorStyles
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

TextField.Input = Input;
TextField.MaskedInput = MaskedInput;
TextField.Select = Select;

export { TextField };
