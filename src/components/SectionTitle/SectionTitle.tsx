import { ComponentProps } from "react";

type SectionTitleProps = ComponentProps<"h2">;

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return <h2 className="mb-20 font-semibold">{children}</h2>;
};
