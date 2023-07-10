import { TextField } from "@/components/TextField";
import { schemas } from "@/lib/zod/schemas";
import { SignUpForm } from "@/types/signUpForm";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export function useSignUpForm() {
  const defaultValues = {
    company: "",
    cnpj: "",
    phone: "",
    responsible: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schemas.signUp),
    defaultValues,
  });
  const router = useRouter();

  const mutation = trpc.signUp.useMutation({
    onError: (error) => {
      const isCNPJinTheDb =
        error.message ===
        "Conflict: CNPJ must be unique but already exists in the database.";

      if (isCNPJinTheDb) {
        setError("cnpj", {
          message:
            "O CNPJ informado já foi cadastrado no nosso banco de dados. Por favor, confira o CNPJ e tente novamente.",
        });
        return;
      }

      const isEmailInTheDb =
        error.message ===
        "Conflict: Email must be unique but already exists in the database.";

      if (isEmailInTheDb) {
        setError("email", {
          message:
            "O Email informado já foi cadastrado no nosso banco de dados. Por favor, confira o email e tente novamente.",
        });
        return;
      }
    },
    onSuccess: () => {
      setTimeout(() => router.push("/login"), 3000);
    },
  });

  const handleCreateAccount: SubmitHandler<SignUpForm> = (data) => {
    toast.promise(
      mutation.mutateAsync(data),
      {
        loading: "Processando...",
        success: "Conta criada!",
        error: "Houve um erro na criação da conta",
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "✅",
        },
        error: {
          duration: 5000,
          icon: "❌",
        },
      }
    );
  };

  const onSubmit = handleSubmit(handleCreateAccount);

  const fields = [
    {
      isFullWidth: true,
      hasMask: false,
      id: "companyName",
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
      id: "responsible",
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
    isLoading: mutation.isLoading,
  };
}
