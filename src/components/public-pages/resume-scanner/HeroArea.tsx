import { Fjalla_One, Montserrat } from "next/font/google";

const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const heading_n = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const HeroArea = () => {
  return (
    <div className="w-full ">
      <section className="hero bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 dark:from-[#01010D80] dark:via-[#000A6380] dark:to-purple-900 overflow-x-hidden md:px-0 pt-[72px]  lg:pt-[90px] ">
        <div className=" text-center lg:pt-12 lg:pb-8 pt-15 ">
          <div>
            <h1
              className={`md:pt-2 text-center xs:text-[25px] md:text-[45px] lg:text-[65px]  mt-3 text-[#4f31f0]  dark:text-[#6350c8]`}
            >
              <strong className={`${heading_n.className} font-bold`}>
              Enhance Your Chances
              </strong>
            </h1>
            <p className="text-center text-[25px] md:text-[45px] lg:text-[65px]  relative  md:-top-4 text-[#4f31f0]  dark:text-[#6350c8] ">
              <strong className={`${heading_n.className} font-bold`}>
              Get Your Resume Scored Against the Job Description
              </strong>
            </p>
          </div>

          <h2
            className={` xs:text-[12px] md:text-[18px] lg:text-[30px] xs:pt-3 md:pt-0 text-gray-800 dark:text-gray-300 px-[8px] md:px-32 font-thin ${montserrat_r.className}`}
          >
           It{"'"}s crucial to know how your resume scores against a specific job description.
          </h2>
        </div>
        <div className="px-[5px] md:px-[15px] lg:pb-8">
          <h2
            className={`xs:text-[16px] md:text-[27px] lg:text-[45px] px-[5px] xs:px-[10px] md:px-[25px] text-gray-800 dark:text-gray-300 xs:pt-3 md:pt-4 lg:px-28  text-center ${montserrat_r.className} `}
          >
            <strong>
              Simply upload the job description and your resume to
              receive a detailed analysis that helps you stand out.
            </strong>
          </h2>
        </div>
      </section>
    </div>
  );
};

export default HeroArea;
