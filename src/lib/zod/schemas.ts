import { isCNPJ, isPhone } from "brazilian-values";
import * as z from "zod";
import { errorMessages } from "./errorMessages";

export const schemas = {
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
  signIn: z.object({
    email: z
      .string()
      .nonempty(errorMessages.required)
      .email(errorMessages.invalidEmail),
    password: z
      .string()
      .nonempty(errorMessages.required)
      .min(8, errorMessages.passwordTooShort),
  }),
  editProfile: z
    .object({
      company: z.string().or(z.literal("")),
      cnpj: z
        .string()
        .refine((value) => isCNPJ(value), errorMessages.invalidCNPJ)
        .transform((value) => value.replace(/\D/g, ""))
        .or(z.literal("")),
      owner: z.string().or(z.literal("")),
      email: z
        .string()

        .email(errorMessages.invalidEmail)
        .or(z.literal("")),
      phone: z
        .string()
        .refine(
          (value) => isPhone(value) || value === undefined,
          errorMessages.invalidPhone
        )
        .transform((value) => value.replace(/\D/g, ""))
        .or(z.literal("")),
      password: z
        .string()
        .min(8, errorMessages.passwordTooShort)
        .or(z.literal("")),
      confirmPassword: z.string(),
    })
    .refine(
      (data) => {
        const hasEnteredPassword = !!data.password;
        const hasEnteredConfirmPassword = !!data.confirmPassword;
        const shouldMakeConfirmPasswordRequired =
          hasEnteredPassword && !hasEnteredConfirmPassword;

        return shouldMakeConfirmPasswordRequired ? false : true;
      },
      {
        message: "Campo obrigatório",
        path: ["confirmPassword"],
      }
    )
    .refine(
      (data) => {
        const hasEnteredPassword = !!data.password;
        const hasEnteredConfirmPassword = !!data.confirmPassword;
        const hasEnteredBothPasswords =
          hasEnteredPassword && hasEnteredConfirmPassword;

        if (hasEnteredBothPasswords) {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "As senhas precisam ser iguais",
        path: ["confirmPassword"],
      }
    ),
};
