import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedOutLayout } from "@/layouts/LoggedOutLayout";
import { SignIn } from "@/templates/SignIn";

const Page: NextPageWithLayout = () => {
  return <SignIn />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LoggedOutLayout>{page}</LoggedOutLayout>;
};

export default Page;
