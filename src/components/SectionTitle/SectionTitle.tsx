import { ComponentProps } from "react";

type SectionTitleProps = ComponentProps<"h2">;

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className="mb-20 text-lg font-semibold text-stone-900">{children}</h2>
  );
};
