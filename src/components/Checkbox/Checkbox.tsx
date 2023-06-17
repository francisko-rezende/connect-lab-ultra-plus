import { ComponentProps } from "react";

type CheckboxProps = ComponentProps<"input">;

export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <input
      className="mx-5 h-5 w-5 rounded transition-colors"
      type="checkbox"
      {...props}
    >
      {children}
    </input>
  );
}
