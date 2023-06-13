import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedInLayout } from "@/layouts/LoggedInLayout";
import { Configuration } from "@/templates/Configuration";

const Page: NextPageWithLayout = () => {
  return <Configuration />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Page;
