import { ComponentProps, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// const inputStyles = cva(
//   [
//     "rounded-md",
//     "border",
//     "border-gray-200",
//     "placeholder:text-gray-400",
//     "focus:border-brand-500",
//     "focus:ring-2",
//     "focus:ring-brand-500",
//   ],
//   {
//     variants: {
//       hasError: {
//         true: ["border-rose-200", "placeholder:text-rose-400"],
//       },
//     },
//     defaultVariants: {
//       hasError: false,
//     },
//   }
// );

type InputProps = ComponentProps<"input"> & {
  hasError: boolean;
};
// & VariantProps<typeof inputStyles>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, hasError, ...props }: InputProps, ref) => {
    const errorStyles = hasError
      ? "border-rose-200 placeholder:text-rose-400"
      : "";

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
