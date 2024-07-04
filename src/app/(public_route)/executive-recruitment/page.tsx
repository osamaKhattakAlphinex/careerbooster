import React from "react";
import PageHeader from "@/components/PageHeader";
import ExecutiveRecruitment from "@/components/public-pages/Homepage/ExecutiveRecruitment";

function page() {
  return (
    <>
      <main className="bg-[#fff] dark:bg-[#171825]">
        <PageHeader title="Executive Recruitment Service" />
        <ExecutiveRecruitment />
      </main>
    </>
  );
}

export default page;
