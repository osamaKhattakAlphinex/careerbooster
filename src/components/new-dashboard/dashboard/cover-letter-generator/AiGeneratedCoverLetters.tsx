import { searchIcon } from "@/helpers/iconsProvider";
import Image from "next/image";
import { rocketLaunch, trashIcon } from "@/helpers/iconsProvider";
import PencilLine from "@/../public/icon/PencilLine.png";
// import { useState } from "react";

export default function AiGeneratedCoverLetters() {
  // const [showInstruction, setShowInstruction] = useState<boolean>(false);
  return (
    <>
      <div className="text-white bg-[#18181B] rounded-[20px]   my-7 px-[30px] py-[41px]">
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
        <div className="w-[350px] bg-[#222027] rounded-xl mt-[40px] py-[20px] px-[18px] ">
          <div className="">
            <div className="mx-3 border-gray-600 leading-6">
              <h2 className="text-[15px] capitalize text-white font-semibold  ">
                The passage experienced a surge in popularity during the
                1960s...
              </h2>
              <h4 className="uppercase text-[#959595] font-medium  text-[13px] pt-[8px] pb-[12px]">
                Created on{":"} 17/10/23{","}11{":"}57 PM
              </h4>
            </div>
          </div>
          <div className="flex justify-between ">
            <button className=" w-[36px] flex justify-center items-center rounded-full h-[36px] bg-zinc-900 border-[2px] border-zinc-800">
              <Image src={PencilLine} alt="Image Not Found" />
            </button>
            <button className="w-[36px] flex justify-center items-center rounded-full h-[36px] bg-zinc-900 border-[2px] border-zinc-800">
              {trashIcon}
            </button>
            <button className="text-[14px] w-[217px] h-[32px] rounded-full bg-zinc-900 text-green-500 border border-green-500">
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
