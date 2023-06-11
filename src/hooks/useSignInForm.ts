import { schemas } from "@/lib/zod/schemas";
import { SignInForm } from "@/types/signInForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export function useSignInForm() {
  const defaultValues = { email: undefined, password: undefined };

  const fields = [
    {
      isFullWidth: true,
      hasMask: false,
      id: "email",
      label: "Email",
      placeholder: "joao.meira@mail.com",
    },
    {
      isFullWidth: true,
      hasMask: false,
      id: "password",
      label: "Senha",
      placeholder: "",
    },
  ] as const;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(schemas.signUp),
    defaultValues,
  });

  const handleSignInForm: SubmitHandler<SignInForm> = (data) => {
    console.log(data);
  };

  const onSubmit = handleSubmit(handleSignInForm);

  return {
    errors,
    fields,
    onSubmit,
    register,
  };
}
