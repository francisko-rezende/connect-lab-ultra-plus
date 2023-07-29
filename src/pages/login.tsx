import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedOutLayout } from "@/layouts/LoggedOutLayout";
import { SignIn } from "@/templates/SignIn";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Page: NextPageWithLayout = () => {
  return <SignIn />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LoggedOutLayout>{page}</LoggedOutLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Page;
