import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input"> & {
  hasError: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, hasError, ...props }: InputProps, ref) => {
    const errorStyles = hasError ? "input-error" : "";

    return (
      <input
        type={type}
        id={id}
        ref={ref}
        className={twMerge("input", errorStyles)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
