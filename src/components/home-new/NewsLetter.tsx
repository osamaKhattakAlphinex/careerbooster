import Image from "next/image";
import React from "react";

function NewsLetter() {
  return (
    <div className="w-full  min-h-[110px] py-4 bg-opacity-5 bg-white px-10">
      <div className="flex items-center gap-16 justify-between w-full">
        <div className=" text-white text-xl font-normal font-['Outfit'] leading-tight tracking-tight">
          Subscribe For Updates
        </div>
        <form>
          <div className="relative flex ">
            <input
              type="search"
              id="search"
              className="w-[480px] h-[54px] rounded-[10px] border border-white/30 pacity-50 placeholder:text-white placeholder:text-[15px] placeholder:font-light placeholder:font-['Outfit'] placeholder:leading-[15px] placeholder:tracking-tight inset-x-3 pl-4"
              placeholder="Enter Your Email"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-['Outfit'] leading-[14px] tracking-wide w-28 h-[42px] bg-[#2797f2] rounded-[30px] mt-2"
            >
              Subscribe
            </button>
          </div>
        </form>
        <div className=" relative flex items-center justify-center   ">
          {/* Envelope (envp 1.png) */}
          <div className="bg-[#0c1e2d] rounded-full w-[85px] h-[85px]">
            <Image
              src="/bg/envp 1.png"
              width={83}
              height={114}
              alt="envelope"
              className="absolute left-6 bottom-[12px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
