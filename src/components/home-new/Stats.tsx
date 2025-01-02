import Image from "next/image";
import React from "react";

function Stats() {
  const stats = [
    {
      icon: "/bg/man-icon.svg", // Replace this with an actual icon (e.g., from FontAwesome or Heroicons)
      value: "22,344+",
      description: "Executives on CareerBooster.ai",
      highlight: true,
    },
    {
      icon: "/bg/dollar.svg", // Replace with actual icon
      value: "$250,000",
      description: "Average Annual Compensation",
      highlight: false,
    },
    {
      icon: "/bg/bag.svg", // Replace with actual icon
      value: "22,562+",
      description: "Active Jobs",
      highlight: false,
    },
  ];
  return (
    <div className="w-full h-[752px] relative pt-[140px] bg-[url('/bg/Maskgroup.png')]">
      {/* <div className="w-[261px] h-[181.77px] left-[1077px] top-0 absolute bg-[#2797f2] rounded-full blur-[107px]" />
             <div className="w-[254px] h-[140px] left-0 top-[412px] absolute bg-[#8937cd] rounded-full blur-[107px]" /> */}
      <div className="flex items-center w-full  mx-8">
        <div className="w-1/2">
          {" "}
          <Image
            src={`/bg/stats.png`}
            width={510}
            height={410}
            alt="stats"
            className="ml-auto"
          />
        </div>

        <div className="w-1/2  p-6 flex flex-col gap-4 max-w-md mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col  w-[460px] min-h-[140px]  p-4 rounded-3xl px-[38px] ${
                stat.highlight
                  ? "bg-[#2797F3]  text-white"
                  : "bg-[#1c2630] text-[#2797f2]"
              }`}
            >
              {stat.highlight && (
                <Image
                  src="/bg/cb-icon.svg"
                  className="ml-auto text-white"
                  width={22}
                  height={22}
                  alt="stats"
                />
              )}
              <div className="flex items-center">
                {/* Icon Section */}
                <div
                  className={`text-2xl  flex items-center justify-center  rounded-full mr-[35px] ${
                    stat.highlight
                      ? " text-[#2797f2] px-3 pt-0 pb-4"
                      : " text-gray-300 p-3"
                  }`}
                >
                  <Image src={stat.icon} width={63} height={63} alt="stats" />
                </div>

                {/* Text Section */}
                <div>
                  <h3
                    className={`text-[26px] font-bold font-['Outfit'] leading-relaxed tracking-[2.60px]${
                      stat.highlight ? "text-white" : "text-[#2797f2]"
                    }`}
                  >
                    {stat.value}
                  </h3>
                  <p className="opacity-80 text-white text-[17px] font-normal font-['Outfit'] leading-[17px] ">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;
