import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedOutLayout } from "@/components/LoggedOutLayout";
import { SignUp } from "@/templates/SignUp";

const Page: NextPageWithLayout = () => {
  return <h1>Login</h1>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LoggedOutLayout>{page}</LoggedOutLayout>;
};

export default Page;
