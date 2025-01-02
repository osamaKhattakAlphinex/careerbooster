import React from "react";
import Image from "next/image";

function HeroArea() {
  return (
    <div className="w-full px-6 h-[848px] relative bg-[url('/bg/hero-bg.png')] flex flex-col ">
      <h1 className="w-[811px] text-center pt-[177px] mx-auto">
        <span className="text-white/90 text-4xl font-semibold font-['Outfit'] leading-[60px] tracking-wider">
          Find Your Next $200K+
        </span>
        <span className="text-white/90 text-4xl font-bold font-['Outfit'] leading-[60px] tracking-wider">
          {" "}
        </span>
        <span className="text-[#8937cd] text-4xl font-extrabold font-['Outfit'] leading-[60px] tracking-wider">
          Executive-Level
        </span>
        <span className="text-white/90 text-4xl font-bold font-['Outfit'] leading-[60px] tracking-wider">
          {" "}
        </span>
        <span className="text-white/90 text-4xl font-semibold font-['Outfit'] leading-[60px] tracking-wider">
          Job Faster with AI-Powered Job Matching
        </span>
      </h1>
      <p className="opacity-80 text-center text-white text-lg font-light font-['Outfit'] leading-[18px] tracking-wide mt-5">
        Effortlessly secure interviews and land your dream job!
      </p>
      <button className="w-60 h-14 px-[35px] py-[18px] bg-[#2797f2] rounded-[32px] justify-center items-center gap-2.5 flex mx-auto mt-[50px]">
        <div className="w-[169px] h-5 text-center text-white text-lg  font-['Outfit'] leading-[18px]">
          Explore Hidden Jobs
        </div>
      </button>
      <div className="flex gap-8 items-center w-full mt-[107px]">
        <div className="w-[328px]  h-[220px] bg-gradient-to-r from-[#0b2335] to-[#081724] rounded-tl-3xl rounded-tr-3xl rounded-bl-xl rounded-br-xl relative">
          <img
            className="w-[223px] h-[108px]   top-[-20px] absolute origin-top-left left-[-35px]"
            src="/bg/bot.png"
          />
          <h3 className="mt-[117px] ml-[70px]">
            <span className="text-[#2797f2] text-[25px] font-normal font-['Outfit'] leading-[25px] tracking-wide">
              I’m
            </span>
            <span className="text-[#2797f2] text-[25px] font-semibold font-['Outfit'] leading-[25px] tracking-wide">
              {" "}
            </span>
            <span className="text-[#2797f2] text-[25px] font-bold font-['Outfit'] leading-[25px] tracking-wide">
              CareerBot
            </span>
            <span className="text-[#2797f2] text-[25px] font-medium font-['Outfit'] leading-[25px] tracking-wide">
              ,
            </span>
            <span className="text-[#2797f2] text-[25px] font-semibold font-['Outfit'] leading-[25px] tracking-wide">
              {" "}
            </span>
          </h3>
          <p className="w-[236px] opacity-80 text-white/90 text-sm font-normal font-['Outfit'] leading-[21px] tracking-wide ml-[70px] mt-4">
            Your AI-powered career assistant.
          </p>
        </div>
        <div className="w-[813px] flex flex-col ml-8 gap-6 ">
          <div className="flex gap-6 items-center">
            <div className="text-center flex items-center justify-center text-[#2797f2] text-[15px] font-medium font-['Outfit'] leading-[15px] tracking-wide w-[135.70px] h-[69px] bg-[#041c30] rounded-xl">
              Director
            </div>{" "}
            <div className="text-center flex items-center justify-center text-[#2797f2] text-[15px] font-medium font-['Outfit'] leading-[15px] tracking-wide w-[175.94px] h-[69px] bg-[#041c30] rounded-xl">
              Vice President
            </div>{" "}
            <div className="text-center flex items-center justify-center text-[#2797f2] text-[15px] font-medium font-['Outfit'] leading-[15px] tracking-wide w-[222.74px] h-[69px] bg-[#041c30] rounded-xl">
              Senior Vice President
            </div>{" "}
            <div className="text-center flex items-center justify-center text-[#2797f2] text-[15px] font-medium font-['Outfit'] leading-[15px] tracking-wide w-[204.02px] h-[69px] bg-[#041c30] rounded-xl">
              C-Suite Executives
            </div>
          </div>
          <div className=" h-[126px] bg-[#081623] rounded-tl-3xl rounded-tr-3xl rounded-bl-xl rounded-br-xl  flex items-center ">
            <div className="flex w-full items-center px-10">
              <div className="opacity-50 text-center text-white text-[15px] font-light font-['Outfit'] leading-[15px] tracking-wide pr-[30px] w-1/4">
                AS SEEN ON
              </div>
              <div className="flex items-center gap-14 w-3/4">
                <Image
                  width={71}
                  height={22}
                  src={`/bg/Business_Insider_Logo.png`}
                  alt="icon-1"
                />
                <Image
                  width={63}
                  height={23}
                  src={`/bg/Yahoo_Finance.png`}
                  alt="icon-1"
                />

                <Image
                  width={76}
                  height={19}
                  src={`/bg/Forbes_logo.png`}
                  alt="icon-1"
                />

                <Image
                  width={91}
                  height={17}
                  src={`/bg/CNBC_logo.png`}
                  alt="icon-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroArea;
