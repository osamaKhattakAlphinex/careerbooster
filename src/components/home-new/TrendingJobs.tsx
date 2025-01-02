import React from "react";

function TrendingJobs() {
  const jobs = [
    {
      title: "Strategic Sales and Business Development Partner",
      location: "Los Angeles, CA",
      description:
        "Cultivate and strengthen client partnerships to drive sales growth and profitability. Ensure long-term success through strategic collaboration and exceptional service.",
    },
    // Add as many job entries as needed
    {
      title: "Strategic Sales and Business Development Partner",
      location: "Los Angeles, CA",
      description:
        "Cultivate and strengthen client partnerships to drive sales growth and profitability. Ensure long-term success through strategic collaboration and exceptional service.",
    },
    {
      title: "Strategic Sales and Business Development Partner",
      location: "Los Angeles, CA",
      description:
        "Cultivate and strengthen client partnerships to drive sales growth and profitability. Ensure long-term success through strategic collaboration and exceptional service.",
    },
    {
      title: "Strategic Sales and Business Development Partner",
      location: "Los Angeles, CA",
      description:
        "Cultivate and strengthen client partnerships to drive sales growth and profitability. Ensure long-term success through strategic collaboration and exceptional service.",
    },
    {
      title: "Strategic Sales and Business Development Partner",
      location: "Los Angeles, CA",
      description:
        "Cultivate and strengthen client partnerships to drive sales growth and profitability. Ensure long-term success through strategic collaboration and exceptional service.",
    },
    {
      title: "Strategic Sales and Business Development Partner",
      location: "Los Angeles, CA",
      description:
        "Cultivate and strengthen client partnerships to drive sales growth and profitability. Ensure long-term success through strategic collaboration and exceptional service.",
    },
    {
      title: "Strategic Sales and Business Development Partner",
      location: "Los Angeles, CA",
      description:
        "Cultivate and strengthen client partnerships to drive sales growth and profitability. Ensure long-term success through strategic collaboration and exceptional service.",
    },
  ];
  return (
    <div className=" min-h-[1190px] bg-[#0a1620] rounded-2xl mt-[-330px] mx-6">
      <div className="">
        <h1 className="text-center text-white text-[32px] font-semibold font-['Outfit'] uppercase leading-7 tracking-[2.56px] py-[60px]">
          Trending Jobs
        </h1>

        <div className="w-full  space-y-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className={`${
                index !== jobs.length - 1 ? "border-b-[#2D3945] border-b" : ""
              } mb-2 py-[40px] px-6 mx-4 flex justify-between items-center`}
            >
              <div className="flex flex-col gap-5">
                <h3 className="text-[#2797f2] text-base font-normal font-['Outfit'] leading-none tracking-wide">
                  {job.location}
                </h3>
                <h2 className="opacity-90 text-white text-xl font-medium font-['Outfit'] leading-normal tracking-wide">
                  {job.title}
                </h2>

                <p className="w-[709px] opacity-50 text-white text-base font-light font-['Outfit'] leading-relaxed tracking-wide">
                  {job.description}
                </p>
                <div className="text-[#2797f2] text-[22px] font-normal font-['Outfit'] leading-snug tracking-wider blur-sm	">
                  GrowthPlus
                </div>
              </div>
              <button className="cursor-pointer hover:bg-[#2797f2] hover:text-white hover:border-none hover:ease-in-out hover:duration-100 w-[180px] h-[54px]  rounded-[32px] border border-[#2797f2] justify-center items-center gap-2.5 inline-flex text-center text-[#2797f2] text-lg  font-['Outfit'] leading-[18px]">
                View Job
              </button>
            </div>
          ))}
          <div className="w-full  flex justify-center pb-[56px] pt-[20px]">
            <button className="text-center text-white text-lg  font-['Outfit'] leading-[18px]  w-[292px] h-14 px-[35px] py-[18px] hover:text-[#2797f2] hover:border-[#2797f2] hover:border hover:bg-transparent bg-[#2797f2] rounded-[32px] justify-center items-center gap-2.5 inline-flex mx-auto">
              Explore More Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingJobs;
