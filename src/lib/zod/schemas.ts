import { isCNPJ, isPhone } from "brazilian-values";
import * as z from "zod";
import { errorMessages } from "./errorMessages";

export const schemas = {
  signUp: z
    .object({
      companyName: z.string().nonempty(errorMessages.required),
      cnpj: z
        .string()
        .nonempty(errorMessages.required)
        .refine((value) => isCNPJ(value), errorMessages.invalidCNPJ)
        .transform((value) => value.replace(/\D/g, "")),
      responsible: z.string().nonempty(errorMessages.required),
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
      responsible: z.string().or(z.literal("")),
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
  linkSensor: z.object({
    sensorTypeId: z.string().nonempty(errorMessages.required),
    sensorName: z.string().nonempty(errorMessages.required),
    macAddress: z.string().refine((value) => {
      const macAddressRegex = /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/;

      return macAddressRegex.test(value);
    }, errorMessages.invalidMACAddress),
    status: z.enum(["true", "false"], {
      errorMap: () => ({ message: errorMessages.required }),
    }),
  }),
  createLocation: z.object({
    locationName: z.string().nonempty(errorMessages.required),
    latitude: z
      .string()
      .nonempty(errorMessages.required)
      .refine((value) => {
        const valueAsFloat = parseFloat(value);
        const isSmallerThan90 = valueAsFloat <= 90.0;
        const isLargerThanNegative90 = valueAsFloat >= -90.0;
        return isSmallerThan90 && isLargerThanNegative90;
      }, errorMessages.outOfRange.latitude),
    longitude: z
      .string()
      .nonempty(errorMessages.required)
      .refine((value) => {
        const valueAsFloat = parseFloat(value);
        const isSmallerThan180 = valueAsFloat <= 180.0;
        const isLargerThanNegative180 = valueAsFloat >= -180.0;
        return isSmallerThan180 && isLargerThanNegative180;
      }, errorMessages.outOfRange.longitude),
  }),
};
