import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedInLayout } from "@/layouts/LoggedInLayout";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <h2 className="text-xl font-semibold">Campo de Soja</h2>
      <section className=" grid max-w-[1373px] grid-cols-overview grid-rows-[repeat(auto-fill,_325px)] gap-5">
        <div className="h-[325px] border-[1.5px] border-gray-200 bg-fuchsia-300"></div>
        <div className="h-[325px] border-[1.5px] border-gray-200 bg-fuchsia-300"></div>
        <div className="h-[325px] border-[1.5px] border-gray-200 bg-fuchsia-300"></div>
        <div className="h-[325px] border-[1.5px] border-gray-200 bg-fuchsia-300"></div>
      </section>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Page;
