import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { LoggedInLayout } from "@/layouts/LoggedInLayout";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <SectionTitle>Campo de Soja</SectionTitle>
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
