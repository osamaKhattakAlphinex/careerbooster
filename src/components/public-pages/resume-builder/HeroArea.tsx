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
                Uncover Hidden Job Opportunities
              </strong>
            </h1>
            <p className="text-center text-[25px] md:text-[45px] lg:text-[65px]  relative  md:-top-4 text-[#4f31f0]  dark:text-[#6350c8] ">
              <strong className={`${fjalla_One.className} font-bold`}>
                Unleash the Power of Confidential Recruitment
              </strong>
            </p>
          </div>

          <h2
            className={` xs:text-[12px] md:text-[18px] lg:text-[30px] xs:pt-3 md:pt-0 text-gray-800 dark:text-gray-300 px-[8px] md:px-32 font-thin ${montserrat.className}`}
          >
            Are you a seasoned professional seeking the next big challenge in
            your career?
          </h2>
        </div>
        <div className="px-[5px] md:px-[15px] lg:pb-8">
          <h2
            className={`xs:text-[16px] md:text-[27px] lg:text-[45px] px-[5px] xs:px-[10px] md:px-[25px] text-gray-800 dark:text-gray-300 xs:pt-3 md:pt-4 lg:px-28  text-center ${montserrat.className} `}
          >
            <strong>
              Top companies frequently fill senior-level positions through
              confidential recruitment channels, keeping their ideal candidates
              informed discreetly.
            </strong>
          </h2>
          <div className="md:px-10  xs:px-4 ">
            <div className="w-full mb-3 lg:h-80 flex flex-col justify-center items-center rounded-2xl mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-500  border-gray-800 lg:px-10">
              <div className="lg:w-10/12 flex justify-center items-center flex-col lg:my-4 my-[28px] lg:mx-0 mx-5 ">
                <h3 className="lg:text-[35px] text-[24px] text-normal text-center font-bold mt-3">
                  Free AI Resume Generator
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
                  Our guide unveils the secrets of the confidential job market,
                  empowering you to:
                </h3>

                <ul
                  className={`list-disc xs:text-[10px] md:text-[13px] lg:text-[18px] flex flex-col xs:gap-2 lg:gap-2 my-2 md:my-4 text-gray-800 dark:text-gray-300 ${montserrat_p.className}`}
                >
                  <li>
                    <strong>Navigate the Strategic Landscape: &nbsp;  </strong>
                    Understand how high-level recruitment functions as a
                    strategic chess game, where companies meticulously plan
                    their next move before making it public.
                  </li>
                  <li>
                    <strong>Explore Discreetly: &nbsp;  </strong>
                    Discover the advantages of confidential job listings,
                    allowing you to explore new possibilities without
                    jeopardizing your current role.
                  </li>

                  <li>
                    <strong>See What{"'"}s Hidden:  &nbsp; </strong>
                    Go beyond the limited scope of job boards. This guide equips
                    you with the tools to navigate the vast, unseen market where
                    the most enticing opportunities reside.
                  </li>
                </ul>
              </li>
              <li>
                <h3
                className={`xs:text-[14px] md:text-[22px] lg:text-[28px] mt-10 text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin.className}`}
                >
                Additionally, our Free AI Resume Generator helps you craft a
                compelling resume that gets noticed by recruiters. Simply upload
                your existing resume and let our AI technology optimize it for
                maximum impact.
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
