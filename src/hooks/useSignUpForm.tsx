import { TextField } from "@/components/TextField";
import { schemas } from "@/lib/zod/schemas";
import { SignUpForm } from "@/types/signUpForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export function useSignUpForm() {
  const defaultValues = {
    company: undefined,
    cnpj: undefined,
    phone: undefined,
    owner: undefined,
    email: undefined,
    password: undefined,
    passwordConfirmation: undefined,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schemas.signUp),
    defaultValues,
  });

  const handleEditForm: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
  };

  const onSubmit = handleSubmit(handleEditForm);

  const fields = [
    {
      isFullWidth: true,
      hasMask: false,
      id: "company",
      label: "Empresa",
      placeholder: "ACME inc.",
    },
    {
      isFullWidth: true,
      hasMask: true,
      id: "cnpj",
      label: "CNPJ",
      mask: "00.000.000/0000-00",
      placeholder: "68.310.435/0001-76",
    },
    {
      isFullWidth: true,
      hasMask: false,
      id: "owner",
      label: "Responsável",
      placeholder: "Joana Silva",
    },
    {
      isFullWidth: false,
      hasMask: false,
      id: "email",
      label: "Email",
      placeholder: "joana.silva@acme.com",
    },
    {
      isFullWidth: false,
      hasMask: true,
      id: "phone",
      label: "Telefone",
      mask: "(00) 0 0000-0000",
      placeholder: "(99) 9 9999-9999",
    },
    {
      isFullWidth: false,
      hasMask: false,
      id: "password",
      label: "Senha",
      placeholder: "",
    },
    {
      isFullWidth: false,
      hasMask: false,
      id: "confirmPassword",
      label: "Confirmar senha",
      placeholder: "",
    },
  ] as const;

  const renderFields = (field: (typeof fields)[number]) => {
    const { id, label, hasMask, placeholder } = field;

    const hasNumericInput = ["phone", "cnpj"].includes(id);
    const isPasswordField = id.toLowerCase().includes("password");

    const inputMode = hasNumericInput ? "tel" : "text";
    const type = isPasswordField ? "password" : "text";
    const hasError = !!errors[id];

    const commonProps = {
      hasError,
      id,
      inputMode,
      placeholder,
      type,
    } as const;

    return (
      <TextField
        key={id}
        label={label}
        htmlFor={id}
        errorMessage={errors[id]?.message}
      >
        {hasMask ? (
          <TextField.MaskedInput
            mask={field.mask}
            {...commonProps}
            {...register(id)}
          />
        ) : (
          <TextField.Input {...commonProps} {...register(id)} />
        )}
      </TextField>
    );
  };

  return {
    fields,
    onSubmit,
    renderFields,
  };
}
