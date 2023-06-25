import { ComponentProps } from "react";

type CardSubtitleProps = ComponentProps<"h3">;

export function CardSubtitle({ children, ...props }: CardSubtitleProps) {
  return (
    <h3 className="mb-8 text-gray-500" {...props}>
      {children}
    </h3>
  );
}
