import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedInLayout } from "@/layouts/LoggedInLayout";
import { Sensors } from "@/templates/Sensors";

const Page: NextPageWithLayout = () => {
  return <Sensors />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Page;
