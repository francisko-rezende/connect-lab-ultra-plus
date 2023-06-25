import { ComponentProps } from "react";

type CardValueProps = ComponentProps<"span">;

export function CardValue({ children, ...props }: CardValueProps) {
  return (
    <span className="text-sm font-semibold" {...props}>
      {children}
    </span>
  );
}
