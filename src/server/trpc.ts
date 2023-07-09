import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();

// Base router and procedure helpers

const isAuthed = t.middleware(({ next, ctx }) => {
  const user = ctx.session?.user;

  // console.log({ ctx });

  if (!user?.name) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    // ctx: {
    //   user: {
    //     ...user,
    //     name: user.name,
    //   },
    // },
    ctx,
  });
});

export const router = t.router;
export const procedure = t.procedure;

// export const middleware = t.middleware;

/**
 * Protected base procedure
 */
export const authedProcedure = t.procedure.use(isAuthed);
