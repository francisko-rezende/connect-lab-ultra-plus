import { ErrorText } from "@/components/ErrorText";
import { Label } from "@/components/Label";

type TextFieldProps = {
  children: React.ReactNode;
  errorMessage?: string;
  label: string;
  htmlFor: string;
};

export function TextField({
  children,
  errorMessage,
  label,
  htmlFor,
}: TextFieldProps) {
  const hasError = !!errorMessage;

  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor={htmlFor} hasError={hasError}>
        {label}
      </Label>
      {children}
      {/* <input
        id="confirmPassword"
        type="password"
        className="w-full rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
        {...register("confirmPassword")}
      /> */}
      {hasError && <ErrorText>{errorMessage}</ErrorText>}
    </div>
  );
}
