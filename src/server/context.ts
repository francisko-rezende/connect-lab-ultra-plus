import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const session = await getServerSession(opts.req, opts.res, authOptions);

  // console.log(opts.req.cookies);

  // console.log("createContext for", session?.user?.name ?? "unknown user");

  return {
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
