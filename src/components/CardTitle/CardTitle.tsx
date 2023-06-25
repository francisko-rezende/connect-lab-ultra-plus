import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const cardTitleStyles = cva(["text-lg", "font-semibold", "text-gray-900"], {
  variants: {
    hasMarginBottom: {
      true: ["mb-1"],
    },
  },
  defaultVariants: {
    hasMarginBottom: false,
  },
});

export type CardTitleProps = ComponentProps<"h2"> &
  VariantProps<typeof cardTitleStyles>;

export function CardTitle({
  children,
  hasMarginBottom,
  ...props
}: CardTitleProps) {
  return (
    <h2 className={twMerge(cardTitleStyles({ hasMarginBottom }))} {...props}>
      {children}
    </h2>
  );
}
