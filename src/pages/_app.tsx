import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
