"use client";
import { searchIcon } from "@/helpers/iconsProvider";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  dataSource: string;
  Component: any;
};

const PreviouslyGeneratedList = ({ dataSource, Component }: Props) => {
  const userData = useSelector((state: any) => state.userData);

  if (!userData) return;

  return (
    <div className="text-white bg-[#18181B] rounded-[20px]  mb-7 px-4 lg:px-[24px] py-[35px]">
      <div className="flex justify-between items-center ">
        <h1 className="uppercase lg:text-[14px] text-[12px] font-semibold lg:pr-0 pr-4">
          {dataSource === "coverLetters" && "Your AI Generated Cover Letters"}
          {dataSource === "emails" && "Your AI Generated Emails"}
          {dataSource === "consultingBids" && "Your AI Generated Bids"}
        </h1>
        <div className="relative lg:w-[213px] w-[120px] flex">
          <input
            className="w-full pl-4 lg:h-[38px] lg:py-[8px] py-[6px] placeholder:text-[#5B5B5B] rounded-full border border-[#312E37] placeholder-gray-400 text-white lg:text-[14px] text-[10px] focus:outline-none focus:border-zinc-600 bg-transparent"
            type="text"
            placeholder="Search here"
          />
          <div className="absolute inset-y-0 right-3   items-center lg:flex hidden">
            {searchIcon}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {userData &&
          userData?.[dataSource].map((item: any, key: number) => {
            return <Component key={key} {...item} />;
          })}
      </div>
    </div>
  );
};

export default PreviouslyGeneratedList;
