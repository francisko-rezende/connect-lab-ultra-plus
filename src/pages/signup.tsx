import {
  ReactElement,
  RefCallback,
  createRef,
  forwardRef,
  ComponentProps,
} from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedOutLayout } from "@/components/LoggedOutLayout";
import { Card } from "@/components/Card";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IMask from "imask";
import { IMaskInput } from "react-imask";
import { isCNPJ, isPhone } from "brazilian-values";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { Input } from "@/components/Input";
import { twMerge } from "tailwind-merge";
import { MaskedInput } from "@/components/MaskedInput";

const getInvalidFieldValueMessage = (fieldName: string) =>
  `${fieldName} inválido`;

const SignUpPage: NextPageWithLayout = () => {
  const errorMessages = {
    required: "Campo obrigatório",
    invalidPhone: getInvalidFieldValueMessage("Telefone"),
    invalidEmail: getInvalidFieldValueMessage("Email"),
    invalidCNPJ: getInvalidFieldValueMessage("CNPJ"),
    passwordTooShort: "A senha precisa ter no mínimo 8 caracteres",
  };

  const schemas = {
    signUp: z
      .object({
        company: z.string().nonempty(errorMessages.required),
        cnpj: z
          .string()
          .nonempty(errorMessages.required)
          .refine((value) => isCNPJ(value), errorMessages.invalidCNPJ)
          .transform((value) => value.replace(/\D/g, "")),
        owner: z.string().nonempty(errorMessages.required),
        email: z
          .string()
          .nonempty(errorMessages.required)
          .email(errorMessages.invalidEmail),
        phone: z
          .string()
          .nonempty(errorMessages.required)
          .refine((value) => isPhone(value), errorMessages.invalidPhone)
          .transform((value) => value.replace(/\D/g, "")),
        password: z
          .string()
          .nonempty(errorMessages.required)
          .min(8, errorMessages.passwordTooShort),
        confirmPassword: z.string().nonempty(errorMessages.required),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas precisam ser iguais",
        path: ["confirmPassword"],
      }),
  };

  type SignUpForm = z.infer<typeof schemas.signUp>;

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
    setError,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schemas.signUp),
    defaultValues,
  });

  const handleEditForm: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
  };

  const onSubmit = handleSubmit(handleEditForm);

  return (
    <Card>
      <h2 className="text-center text-2xl font-semibold text-gray-900">
        Sign Up
      </h2>
      <p className="text-center text-gray-500">
        Insira seus dados para criar uma conta
      </p>
      <form onSubmit={onSubmit} className="grid gap-5">
        <TextField
          label="Empresa"
          htmlFor="company"
          errorMessage={errors.company?.message}
        >
          <Input
            type="text"
            id="company"
            hasError={!!errors.company}
            {...register("company")}
          />
          {/* <input
            type="text"
            id="company"
            className="rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
            {...register("company")}
          /> */}
        </TextField>
        {/* <div className="grid gap-2">
          <label htmlFor="company" className="font-semibold text-gray-900">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            className="rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
            {...register("company")}
          />
          {!!errors.company && (
            <p className="text-sm text-rose-500">{errors.company.message}</p>
          )}
        </div> */}
        <div className="grid gap-2">
          <label htmlFor="cnpj" className="font-semibold text-gray-900">
            CNPJ
          </label>
          {/* <input type="number" /> */}
          <MaskedInput
            id="cnpj"
            mask="00.000.000/0000-00"
            placeholder="68.310.435/0001-76"
            type="text"
            hasError={!!errors.cnpj}
            // className="rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
            {...register("cnpj")}
          />
          {/* <MaskedInput
            id="cnpj"
            type="text"
            mask={"{AA}:{AA}:{AA}:{AA}:{AA}:{AA}"}
            definitions={{ A: /[a-fA-F0-9]/ }}
            className="rounded-md border border-gray-200 p-4 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 placeholder:text-gray-400"
            {...register("cnpj")}
          /> */}
          {/* <input
            type="text"
            id="company"
            className="rounded-md border border-gray-200 p-4 focus:border-brand-500 focus:ring-brand-500"
            {...register("company")}
          /> */}
          {!!errors.cnpj && (
            <p className="text-sm text-rose-500">{errors.cnpj.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="owner" className="font-semibold text-gray-900">
            Responsável
          </label>
          <input
            id="owner"
            autoComplete="name"
            type="text"
            className="rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
            {...register("owner")}
          />
          {!!errors.owner && (
            <p className="text-sm text-rose-500">{errors.owner.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 items-start gap-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="email" className="font-semibold text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
              {...register("email")}
            />
            {!!errors.email && (
              <p className="text-sm text-rose-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid flex-1 gap-2">
            <label htmlFor="phone" className="font-semibold text-gray-900">
              Telefone
            </label>
            <MaskedInput
              id="phone"
              mask="(00) 0 0000-0000"
              placeholder="(99) 9 9999-9999"
              type="tel"
              className="w-full rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
              {...register("phone")}
            />
            {!!errors.phone && (
              <p className="text-sm text-rose-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 items-start gap-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="password" className="font-semibold text-gray-900">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
              {...register("password")}
            />
            {!!errors.password && (
              <p className="text-sm text-rose-500">{errors.password.message}</p>
            )}
          </div>
          <div className="grid flex-1 gap-2">
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-gray-900"
            >
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-md border border-gray-200 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
              {...register("confirmPassword")}
            />
            {!!errors.confirmPassword && (
              <p className="text-sm text-rose-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        {/* <Controller
          render={({ field, fieldState: { error } }) => (
            <div className="grid gap-2">
              <label htmlFor="cnpj" className="font-semibold text-gray-900">
                CNPJ
              </label>
              <MaskedInput
                mask={[
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ]}
                id="cnpj"
                className="rounded-md border border-gray-200 p-4"
                onChange={field.onChange}
                onBlur={field.onBlur}
                // {...field}
                // render={(ref, props) => (
                //   <input
                //     ref={(el) => {
                //       field.ref(el);
                //       ref(el);
                //     }}
                //     {...props}
                //   />
                // )}
              />
              {!!error && <p>{error.message}</p>}
            </div>
          )}
          name="cnpj"
          control={control}
        /> */}
        {/* <MaskedInput
          mask={[
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            "/",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
          ]}
          id="cnpj"
          className="rounded-md border border-gray-200 p-4"
          // render={(ref, props) => <input ref={ref} />}
        /> */}
        <Button variant="primary">Criar conta</Button>
        <Button variant="outlined">Criar conta</Button>
      </form>
    </Card>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <LoggedOutLayout>{page}</LoggedOutLayout>;
};

export default SignUpPage;
