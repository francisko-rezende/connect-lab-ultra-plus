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
      {hasError && <ErrorText>{errorMessage}</ErrorText>}
    </div>
  );
}
