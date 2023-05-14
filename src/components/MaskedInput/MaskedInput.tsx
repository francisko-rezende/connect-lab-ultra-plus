import { ComponentProps, RefCallback, forwardRef, useRef } from "react";
import { IMaskInput } from "react-imask";
import { twMerge } from "tailwind-merge";

type MaskedInputProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  hasError: boolean;
} & ComponentProps<"input"> &
  ComponentProps<typeof IMaskInput>;

export const MaskedInput = forwardRef<IMask.MaskElement, MaskedInputProps>(
  ({ onChange, name, hasError, ...props }: MaskedInputProps, inputRef) => {
    const ref = useRef();
    const errorStyles = hasError
      ? "border-rose-200 placeholder:text-rose-300 text-rose-500"
      : "";

    return (
      <IMaskInput
        {...props}
        inputRef={inputRef as RefCallback<IMask.MaskElement>}
        ref={ref}
        className={twMerge("input", errorStyles)}
        onAccept={(value: any) => {
          onChange({ target: { name: name, value } });
        }}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";
