"use client";
import PageHeader from "@/components/PageHeader";
import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const userData = useSelector((state: RootState) => state.userData);
  return (
    <main className="pt-5 bg-[#fff] dark:bg-[#171825]">
      <PageHeader title="CareerBooster Profile" />
      <div className="flex justify-center gap-8 xs:px-2 md:px-0 mt-16 pb-16">
        {userData?._id !== "" ? (
          <Link
            href={`/profile/${userData._id}`}
            className="w-fit inline-flex no-underline justify-center items-center relative text-[#6a4dff] dark:text-[#e6f85e] gap-3 dark:after:bg-[#e6f85e] after:bg-[#0000ff9c] after:content[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:ease-in-out after:duration-300 hover:text-[#6a4dff] hover:after:w-[100%]"
          >
            <span>Go to Your Profile</span>
          </Link>
        ) : (
          <span className="animate-blink text-[#6a4dff] dark:text-[#e6f85e]">
            Getting Your Profile Ready ...
          </span>
        )}
      </div>
    </main>
  );
};

export default Page;
