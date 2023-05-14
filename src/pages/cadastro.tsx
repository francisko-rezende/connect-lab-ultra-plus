import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedOutLayout } from "@/components/LoggedOutLayout";
import { SignUp } from "@/templates/SignUp";

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />;
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <LoggedOutLayout>{page}</LoggedOutLayout>;
};

export default SignUpPage;
