import { forwardRef, ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  [
    "w-full",
    "rounded-md",
    "py-3",
    "text-lg",
    "font-semibold ",
    "transition-colors",
    "disabled:bg-neutral-400",
    "disabled:cursor-not-allowed",
    "disabled:border-neutral-400",
  ],
  {
    variants: {
      variant: {
        primary: [
          "hover:bg-brand-600",
          "active:bg-brand-400",
          "bg-brand-500",
          "text-white",
          "border-brand-500",
          "hover:border-brand-600",
          "active:border-brand-400",
        ],
        outlined: [
          "hover:bg-slate-100",
          "active:bg-slate-200",
          "text-slate-500",
          "border-slate-500",
        ],
      },
      upperCase: {
        true: "uppercase",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    variant: Required<VariantProps<typeof buttonStyles>["variant"]>;
    isLoading: boolean
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, upperCase, isLoading, ...props }: ButtonProps, ref) => (
    <button
      ref={ref}
      className={twMerge(buttonStyles({ variant, upperCase }), className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
);

Button.displayName = "Button";
