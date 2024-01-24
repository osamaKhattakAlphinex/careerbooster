import { searchIcon } from "@/helpers/iconsProvider";
import Image from "next/image";
import { rocketLaunch, trashIcon } from "@/helpers/iconsProvider";
import PencilLine from "@/../public/icon/PencilLine.png";
import CoverLetterCardSingle from "./CoverLetterCardSingle";
// import { useState } from "react";

export default function AiGeneratedCoverLetters() {
  // const [showInstruction, setShowInstruction] = useState<boolean>(false);
  return (
    <>
      <div className="text-white bg-[#18181B] rounded-[20px]  mb-7 px-[30px] py-[35px]">
        <div className="flex justify-between items-center ">
          <h1 className="uppercase lg:text-[14px] text-[12px] font-semibold">
            Your AI Generated Cover Letters
          </h1>
          <div className="relative flex justify-end">
            <input
              className="w-full pl-5 py-2 rounded-full border-[1px] border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:border-zinc-600 bg-transparent text-[14px]"
              type="text"
              placeholder="Search Here"
            />
            <div className="absolute inset-y-0 mr-4  flex items-center">
              {searchIcon}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
