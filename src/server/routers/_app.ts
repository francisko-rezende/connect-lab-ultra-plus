import { z } from "zod";
import { authedProcedure, procedure, router } from "../trpc";
import { schemas } from "@/lib/zod/schemas";
import { prisma } from "@/lib/prisma/prismaClient";
import * as bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

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

    const hasCNPJBeenUsed = await prisma.company.findFirst({ where: { cnpj } });

    if (hasCNPJBeenUsed) {
      throw new TRPCError({
        code: "CONFLICT",
        message:
          "Conflict: CNPJ must be unique but already exists in the database.",
      });
    }

    const hasEmailBeenUsed = await prisma.company.findFirst({
      where: { email },
    });

    if (hasEmailBeenUsed) {
      throw new TRPCError({
        code: "CONFLICT",
        message:
          "Conflict: Email must be unique but already exists in the database.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCompanyData = {
      cnpj,
      company,
      password: hashedPassword,
      email,
      phone,
      responsible,
      salt,
    };

    const newCompany = await prisma.company.create({ data: newCompanyData });

    return newCompany;
  }),
  me: authedProcedure.query(({ ctx }) => {
    // console.log({ctx});
    // console.log(ctx);
    const loggedInCompany = prisma.company.findFirst({
      where: {
        email: ctx.session?.user?.email!,
      },
    });

    return loggedInCompany;
  }),
  // test: procedure.query(({ ctx }) => {
  //   console.log(ctx);
  // }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
