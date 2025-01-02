import Image from "next/image";
import React from "react";

function TopExecutivetalent() {
  const services = [
    { title: "Senior Management Placement", icon: "/bg/6.svg" },
    { title: "AI-Driven Talent Matching", icon: "/bg/5.svg" },
    { title: "Confidential Job Posting", icon: "/bg/3.svg" },
    { title: "Leadership Development", icon: "/bg/1.svg" },
    { title: "Confidential Executive Search", icon: "/bg/2.svg" },
    { title: "Board and CEO Services", icon: "/bg/4.svg" },
  ];
  return (
    <div
      className="px-6 min-h-[768px] opacity-95 bg-[#000c17] bg-[url('/bg/top-talent.png
        ')]"
    >
      <div className="text-center text-[#2797f2] text-[32px] font-semibold font-['Outfit'] leading-loose tracking-wide pt-[75px] pb-[60px]">
        Seeking Top Executive Talent? We've got you covered!
      </div>
      <div className="flex w-full flex-wrap gap-10 justify-center items-center">
        {services.map((ser) => {
          return (
            <div className="w-[340px] flex flex-col gap-8 justify-center items-center py-4 h-[220px]  rounded-[9px] bg-[#051829] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] border-2 border-[#2797f2]/20">
              <Image width={68} height={68} src={ser.icon} alt="service" />
              <div className="w-[186px] text-center text-white text-[15px] font-normal font-['Outfit'] leading-[15px] tracking-wide">
                {ser.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center py-14">
        <div className="w-[292px] h-14 px-[35px] py-[18px] bg-[#2797f2] rounded-[32px] justify-center items-center gap-2.5 inline-flex text-center text-white text-lg font-['Outfit'] leading-[18px] tracking-wide mx-auto">
          Explore Employer Site
        </div>
      </div>
    </div>
  );
}

export default TopExecutivetalent;
