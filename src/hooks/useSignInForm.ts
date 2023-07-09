import { schemas } from "@/lib/zod/schemas";
import { SignInForm } from "@/types/signInForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function useSignInForm() {
  const defaultValues = { email: "", password: "" };

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
    resolver: zodResolver(schemas.signIn),
    defaultValues,
  });

  const [responseError, setResponseError] = useState("");
  const router = useRouter();

  const signInMutation = useMutation({
    mutationFn: async (data: SignInForm) => {
      setResponseError("");
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.status === 401) {
        setResponseError("Usuário e/ou senha incorretos");
        return;
      }
      router.push("/");
    },
  });

  const handleSignInForm: SubmitHandler<SignInForm> = async (data) => {
    signInMutation.mutate(data);
  };

  const onSubmit = handleSubmit(handleSignInForm);

  return {
    isLoading: signInMutation.isLoading,
    errors,
    fields,
    onSubmit,
    register,
    responseError,
  };
}
