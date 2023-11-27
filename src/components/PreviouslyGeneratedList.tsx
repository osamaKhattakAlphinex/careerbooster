"use client"
import { searchIcon } from "@/helpers/iconsProvider";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  Component: any;
};

const PreviouslyGeneratedList = ({Component }: Props) => {
  const userData = useSelector((state: any) => state.userData);
  if (!userData) return;

  return (

       <div className="text-white bg-[#18181B] rounded-[20px]  mb-7 px-[30px] py-[35px]">
        <div className="flex justify-between items-center ">
          <h1 className="uppercase text-[14px] font-semibold">
          Your AI Generated Cover Letters
          </h1>
          <div className="relative flex justify-end">
            <input
              className="w-full pl-5 py-2 rounded-full border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:border-zinc-600 bg-transparent text-[14px]"
              type="text"
              placeholder="Search Here"
            />
            <div className="absolute inset-y-0 mr-4  flex items-center">
              {searchIcon}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
        {userData &&
            userData?.coverLetters.map((item: any, key: number) => {
              return <Component key={key} {...item} />;
            })}
        </div>
       
        
      </div>
  
  );
};

export default PreviouslyGeneratedList;
