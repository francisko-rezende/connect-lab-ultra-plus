import { ComponentProps } from "react";

type LabelProps = ComponentProps<"label"> & {
  hasError: boolean;
};

export function Label({ htmlFor, children, hasError }: LabelProps) {
  const textColor = hasError ? "text-rose-500" : "text-gray-900";
  return (
    <label htmlFor={htmlFor} className={`font-semibold ${textColor}`}>
      {children}
    </label>
  );
}
