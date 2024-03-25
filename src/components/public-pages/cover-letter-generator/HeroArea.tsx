import { Fjalla_One, Roboto, Montserrat } from "next/font/google";
import Link from "next/link";

const fjalla_One = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const montserrat_thin = Montserrat({
  weight: "500",
  subsets: ["latin"],
});
const montserrat_p = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

const HeroArea = () => {
  return (
    <div className="w-full ">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r  from-[#01010D80] via-[#000A6380] to-purple-900 overflow-x-hidden md:px-0 pt-24  lg:pt-[100px] lg:npt-10">
        <div className=" text-center lg:pt-12 lg:pb-8 pt-15 ">
          <div>
            <h1
              className={`md:pt-2 text-center xs:text-[25px] md:text-[45px] lg:text-[65px]  mt-3 text-[#4f31f0]  dark:text-[#6350c8]`}
            >
              <strong className={`${fjalla_One.className} font-bold`}>
                Craft Cover Letters That Land Interviews
              </strong>
            </h1>
            <p className="text-center text-[25px] md:text-[45px] lg:text-[65px]  relative  md:-top-4 text-[#4f31f0]  dark:text-[#6350c8] ">
              <strong className={`${fjalla_One.className} font-bold`}>
                Personalized Approach for Senior Roles
              </strong>
            </p>
          </div>

          <h2
            className={` xs:text-[12px] md:text-[18px] lg:text-[30px] xs:pt-3 md:pt-0 text-gray-800 dark:text-gray-300 px-[8px] md:px-32 font-thin ${montserrat.className}`}
          >
            Standing out in today{"'"}s competitive job market requires a targeted
            approach, especially for senior-level positions. Generic cover
            letters often get lost in the shuffle.
          </h2>
        </div>
        <div className="px-[5px] md:px-[15px] lg:pb-8">
          <h2
            className={`xs:text-[16px] md:text-[27px] lg:text-[45px] px-[5px] xs:px-[10px] md:px-[25px] text-gray-800 dark:text-gray-300 xs:pt-3 md:pt-4 lg:px-28  text-center ${montserrat.className} `}
          >
            <strong>
              Our cover letter tool empowers you to create impactful letters
              that resonate with hiring managers
            </strong>
          </h2>
          <div className="md:px-10  xs:px-4 ">
            <div className="w-full mb-3 lg:h-80 flex flex-col justify-center items-center rounded-2xl mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-500  border-gray-800 lg:px-10">
              <div className="lg:w-10/12 flex justify-center items-center flex-col lg:my-4 my-[28px] lg:mx-0 mx-5 ">
                <h3 className="lg:text-[35px] text-[24px] text-normal text-center font-bold mt-3">
                  Free AI Cover letter Generator
                </h3>
                <p className="text-xl text-normal text-center mt-4">
                  Simply Upload your Existing Resume
                </p>
                <Link
                  href="/register"
                  className="bg-yellow-400 bg-opacity-80 mt-4 h-14 w-56 text-center rounded-full font-bold text-xl hover:bg-yellow-600 text-gray-800 py-3 px-9"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="xs:mt-5 md:mt-4 lg:mt-10 container mx-auto">
            <ul>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[32px] text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin.className}`}
                >
                  Here{"'"}s how it works:{" "}
                </h3>

                <ul
                  className={`xs:text-[10px] list-disc md:text-[13px] lg:text-[18px] flex flex-col xs:gap-2 lg:gap-2 my-2 md:my-4 text-gray-800 dark:text-gray-300 ${montserrat_p.className}`}
                >
                  <li>
                    <strong>Highlight Your Achievements: &nbsp; </strong>
                    Focus on quantifiable results and contributions that
                    demonstrate your value to the organization.
                  </li>
                  <li>
                    <strong>Tailor to the Specific Role: &nbsp; </strong>
                    Showcase your skills and experience directly relevant to the
                    job description using keywords and industry-specific
                    language.
                  </li>
                  <li>
                    <strong>Express Your Enthusiasm: &nbsp; </strong>
                    Convey your genuine interest in the company and the
                    position. Let your passion shine through!
                  </li>
                </ul>
              </li>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[28px] mt-10 text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin.className}`}
                >
                  Additionally, our AI technology helps refine your cover letter
                  for clarity, conciseness, and professionalism, ensuring it
                  makes a strong first impression
                </h3>
              </li>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[28px] mt-10 text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin.className}`}
                >
                  Land your dream job with a cover letter that gets noticed!
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroArea;
