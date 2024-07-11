import Image from "next/image";
import React from "react";

function Employers() {
  return (
    <div className="flex w-full md:px-20 xs:px-2 md:mt-16">
      <div className="w-1/2  xs:hidden md:block">
        <Image
          className=""
          src="/assets/images/bg/home-banner-2.png"
          width={238}
          height={423}
          alt="img"
        />
      </div>
      <div className="flex flex-col md:w-1/2 xs:w-full gap-2 xs:text-center md:text-left">
        <h1 className="md:text-[26px] xs:text-[20px] font-medium">
          For Employers
        </h1>
        <h3 className="md:text-[36px] xs:text-[24px] font-semibold">
          Find Exceptional Leaders Quickly and Efficiently
        </h3>
        <p className="md:text-[20px] xs:text-[16px]">
          CareerBooster.ai helps employers connect with top-tier executive
          talent. Our AI-Powered Job Board features vetted, high-caliber
          candidates ready to drive your business forward. Utilize advanced
          filtering options, detailed candidate profiles, and our employer
          dashboard to streamline your recruitment process. Benefit from
          AI-driven insights and real-time updates to secure the best leaders
          for your organization. Trust CareerBooster.ai to make hiring seamless
          and effective.
        </p>
      </div>
    </div>
  );
}

export default Employers;
