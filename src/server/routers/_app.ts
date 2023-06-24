import { z } from "zod";
import { procedure, router } from "../trpc";
import { schemas } from "@/lib/zod/schemas";
import { prisma } from "@/lib/prisma/prismaClient";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  signUp: procedure.input(schemas.signUp).mutation(async (opts) => {
    const { input } = opts;
    const { cnpj, company, password, email, phone, responsible } = input;

    const newCompanyData = {
      cnpj,
      company,
      password,
      email,
      phone,
      responsible,
    };
    const newCompany = await prisma.company.create({ data: newCompanyData });

    return newCompany;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
