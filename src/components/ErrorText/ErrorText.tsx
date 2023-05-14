import { ComponentProps } from "react";

type ErrorTextProps = ComponentProps<"p">;

export function ErrorText({ children }: ErrorTextProps) {
  return <p className="text-sm text-rose-500">{children}</p>;
}
