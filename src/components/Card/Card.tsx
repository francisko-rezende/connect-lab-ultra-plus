import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const cardStyles = cva(
  [
    "h-[325px]",
    "border-[1.5px]",
    "border-gray-200",
    "rounded-xl",
    "shadow-md",
    "overflow-hidden",
  ],
  {
    variants: {
      hasPadding: {
        true: ["px-7", "py-8"],
      },
      variant: {
        map: ["flex", "flex-col", "justify-between", "gap-4"],
      },
    },
    defaultVariants: {
      hasPadding: true,
    },
  }
);

export type CardProps = ComponentProps<"article"> &
  VariantProps<typeof cardStyles>;

export function Card({
  variant,
  children,
  hasPadding,
  className,
  ...props
}: CardProps) {
  return (
    <article
      className={twMerge(cardStyles({ hasPadding, variant }), className)}
      {...props}
    >
      {children}
    </article>
  );
}
