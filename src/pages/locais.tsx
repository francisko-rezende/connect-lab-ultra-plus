import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedInLayout } from "@/layouts/LoggedInLayout";

const Page: NextPageWithLayout = () => {
  return <h1>Locais</h1>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Page;
