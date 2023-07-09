import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ErrorTextProps = ComponentProps<"p">

export function ErrorText({ children, className }: ErrorTextProps) {
  return <p className={twMerge("text-sm text-rose-500", className)}>{children}</p>;
}
