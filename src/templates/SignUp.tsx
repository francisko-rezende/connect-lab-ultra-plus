import { Button } from "@/components/Button";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import Link from "next/link";

export function SignUp() {
  const { fields, onSubmit, renderFields, isLoading } = useSignUpForm();

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <section className="mb-6 rounded bg-white px-8 pb-7 pt-16 sm:px-12">
        <h2 className="mb-3 text-center text-2xl font-semibold text-gray-900">
          Sign Up
        </h2>
        <p className="mb-12 text-center text-gray-500">
          Insira seus dados para criar uma conta
        </p>
        <form onSubmit={onSubmit} className="grid gap-5">
          {fields.filter(({ isFullWidth }) => isFullWidth).map(renderFields)}
          <div className="grid grid-cols-2 items-start gap-x-2 gap-y-5">
            {fields.filter(({ isFullWidth }) => !isFullWidth).map(renderFields)}
          </div>
          <Button
            isLoading={isLoading}
            type="submit"
            variant="primary"
            className="mt-9"
          >
            Criar conta
          </Button>
        </form>
      </section>
      <p className="text-center text-gray-500">
        Já possui uma uma conta?{" "}
        <Link className="text-blue-600" href="/login">
          Realizar login
        </Link>
      </p>
    </div>
  );
}
