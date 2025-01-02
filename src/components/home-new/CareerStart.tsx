import Image from "next/image";
import React from "react";

function CareerStart() {
  return (
    <div className=" h-[677px] relative bg-[url('/bg/career-start-bg.png')] px-6 font-liga-off">
      <div className="flex w-full gap-4 pt-[100px] bg-[url('/bg/career-start-col-bg.png')] bg-cover bg-center px-4">
        <div className="w-1/2">
          <div className="w-[67px] h-[30px] flex items-center gap-1  bg-gradient-to-b from-[#ab6ade] to-[#5433ae] rounded-md  px-2">
            <Image src="/bg/star.svg" width={10} height={11} alt="star" />
            <div className="opacity-90 text-white text-sm  font-['Outfit'] leading-[14px] tracking-wide">
              NEW
            </div>
          </div>
          <h1 className="text-white/90 text-[40px] font-semibold font-['Outfit'] leading-10 mt-4">
            JumpStart your Career
          </h1>
          <h3 className="mt-[14px]">
            <span className="text-white/80 text-xl font-medium font-['Outfit'] leading-tight tracking-wide">
              A Unique Service for
            </span>
            <span className="text-white text-[28px] font-medium font-['Outfit'] leading-7 tracking-wide">
              {" "}
            </span>
            <span className="text-[#8937cd] text-2xl font-bold font-['Outfit'] leading-normal tracking-wide">
              $200K+ Executives
            </span>
          </h3>
          <p className="w-[560px] opacity-80 text-white text-base font-light font-['Outfit'] leading-[30px]  mt-[25px] font-liga-off">
            Career JumpStart is designed specifically for high-earning
            executives seeking their next big opportunity. Our expert team
            handles the entire job search process—connecting you with
            decision-makers, securing interviews, and accelerating your path to
            the executive role you deserve.
          </p>
          <div className="opacity-90 text-white text-xl font-medium font-['Outfit'] leading-tight  mt-[48px]">
            Ready to JumpStart Your Career?
          </div>
          <div className="w-[200px] h-14 px-[25px] bg-[#8937cd] rounded-[32px] justify-center items-center inline-flex mt-[30px]">
            <div className="text-center text-white text-lg font-semibold font-['Outfit'] leading-[18px] ">
              Find a Job4Me
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Image
            width={524}
            height={421}
            src="/bg/career-start-img.png"
            alt="career"
          />
        </div>
      </div>
    </div>
  );
}

export default CareerStart;
