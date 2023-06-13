import { ComponentProps } from "react";

type SectionTitleProps = ComponentProps<"h2">;

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return <h2 className="font-semibold">{children}</h2>;
};
