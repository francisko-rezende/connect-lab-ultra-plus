import { Button } from "@/components/Button";
import { ErrorText } from "@/components/ErrorText";
import { TextField } from "@/components/TextField";
import { useSignInForm } from "@/hooks/useSignInForm";
import Link from "next/link";

export function SignIn() {
  const { errors, fields, onSubmit, register, isLoading, responseError } =
    useSignInForm();

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <section className="mb-6 rounded bg-white px-8 pb-7 pt-16 sm:px-12">
        <h2 className="mb-3 text-center text-2xl font-semibold text-gray-900">
          Sign In
        </h2>
        <p className="mb-12 text-center text-gray-500">
          Insira suas credenciais para acessar sua conta
        </p>
        <form onSubmit={onSubmit} className="grid gap-5">
          {fields.map(({ id, label, placeholder }) => {
            return (
              <TextField
                key={id}
                label={label}
                htmlFor={id}
                errorMessage={errors[id]?.message}
              >
                <TextField.Input
                  type={id}
                  formNoValidate
                  hasError={!!errors[id]}
                  id={id}
                  placeholder={placeholder}
                  {...register(id)}
                />
              </TextField>
            );
          })}
          {responseError && (
            <ErrorText className="text-center">{responseError}</ErrorText>
          )}
          <Button
            isLoading={isLoading}
            type="submit"
            variant="primary"
            className="mt-9"
          >
            Entrar
          </Button>
        </form>
      </section>
      <div className="mt-10 space-y-5">
        <p className="text-center text-gray-500">
          Esqueceu sua senha?{" "}
          <Link className="text-blue-600" href="/redefinir-senha">
            Redefinir senha
          </Link>
        </p>
        <p className="text-center text-gray-500">
          Ainda não tem uma conta?{" "}
          <Link className="text-blue-600" href="/cadastro">
            Cadastra-se
          </Link>
        </p>
      </div>
    </div>
  );
}
