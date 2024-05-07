import { Fjalla_One, Roboto, Montserrat } from "next/font/google";
import Link from "next/link";

const fjalla_One_r = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const montserrat_e = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const montserrat_thin_e = Montserrat({
  weight: "500",
  subsets: ["latin"],
});
const montserrat_p_e = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

const HeroArea = () => {
  return (
    <div className="w-full ">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 dark:from-[#01010D80] dark:via-[#000A6380] dark:to-purple-900 overflow-x-hidden md:px-0 pt-[72px]  lg:pt-[90px] lg:npt-10">
        <div className="px-[5px] md:px-[15px] text-center lg:pt-12 lg:pb-8 ">
          <div className="md:px-6">
            <h1
              className={`md:pt-2 text-center xs:text-[25px] md:text-[45px] lg:text-[65px]  mt-3 text-[#4f31f0]  dark:text-[#6350c8]`}
            >
              <strong className={`${fjalla_One_r.className} font-bold`}>
                Effortlessly Manage Your Job Search Communication
              </strong>
            </h1>
            <p className="text-center text-[25px] md:text-[45px] lg:text-[65px]  relative  md:-top-4 text-[#4f31f0]  dark:text-[#6350c8] ">
              <strong className={`${fjalla_One_r.className} font-bold`}>
                AI-Powered Email Assistant for Landing Your Dream Job
              </strong>
            </p>
          </div>

          <h2
            className={` xs:text-[12px] md:text-[18px] lg:text-[30px] xs:pt-3 md:pt-0 text-gray-800 dark:text-gray-300 px-[8px] md:px-32 font-thin ${montserrat_e.className}`}
          >
            The job search process can be demanding, and crafting compelling
            emails to hiring managers takes valuable time
          </h2>
        </div>
        <div className="px-[5px] md:px-[15px] lg:pb-8">
          <h2
            className={`xs:text-[16px] md:text-[27px] lg:text-[45px] px-[5px] xs:px-[10px] md:px-[25px] text-gray-800 dark:text-gray-300 xs:pt-3 md:pt-4 lg:px-28  text-center ${montserrat_e.className} `}
          >
            <strong>
              Our AI-powered email assistant simplifies communication, helping
              you present yourself professionally and increase your chances of
              landing the interview.
            </strong>
          </h2>
          <div className="md:px-10  xs:px-4 ">
            <div className="w-full mb-3  flex flex-col justify-center items-center rounded-2xl mt-4 md:mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-500  border-gray-800 lg:px-10">
              <div className="lg:w-10/12 flex justify-center items-center flex-col lg:my-4 my-[28px] lg:mx-0 mx-5 ">
                <h3 className="lg:text-[35px] text-[16px] text-normal text-center font-bold md:mt-2">
                  Free AI Email Assistant
                </h3>
                <p className="text-[12px] md:text-xl text-normal text-center">
                  Simply Upload your Existing Resume
                </p>
                <Link
                  href="/register"
                  className="bg-yellow-400 bg-opacity-80 mt-6 md:w-56 text-center rounded-full font-semibold text-[14px] md:text-lg hover:bg-yellow-600 text-gray-800 py-2 px-9"
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
                  className={`xs:text-[14px] md:text-[22px] lg:text-[32px] text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin_e.className}`}
                >
                  Here{"'"}s how our email assistant streamlines your job search
                  communication:
                </h3>

                <ul
                  className={`xs:text-[10px] list-disc md:text-[13px] lg:text-[18px] flex flex-col xs:gap-2 lg:gap-2 my-2 md:my-4 text-gray-800 dark:text-gray-300 ${montserrat_p_e.className}`}
                >
                  <li>
                    <strong>Personalized Application Emails: &nbsp; </strong>
                    Craft impactful cover letters with the help of AI
                    suggestions. Tailor your message to highlight relevant
                    skills and experience for each specific role.
                  </li>
                  <li>
                    <strong>Confident Follow-Ups: &nbsp; </strong>
                    Craft timely and professional follow-up emails to hiring
                    managers after applying or interviewing. Our AI suggests the
                    right tone and content to keep your application top-of-mind.
                  </li>
                  <li>
                    <strong>Thank You Notes That Impress: &nbsp; </strong>
                    Express your gratitude for interview opportunities with
                    personalized thank you emails drafted with AI assistance.
                    Emphasize your interest and qualifications for the position.
                  </li>
                  <li>
                    <strong>Automated Reminders: &nbsp; </strong>
                    Never miss a deadline again! Set reminders for follow-ups
                    and thank you notes to ensure timely communication.
                  </li>
                </ul>
              </li>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[32px] text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin_e.className}`}
                >
                  Additionally, our AI assistant helps you with:
                </h3>
                <ul
                  className={`text-[10px] list-disc md:text-[13px] lg:text-[18px] text-gray-800 dark:text-gray-300 flex flex-col xs:gap-2 md:gap-4 xs:my-2 md:my-4 ${montserrat_p_e.className}`}
                >
                  <li>
                    <strong>Professional Tone & Language: &nbsp;</strong>
                    Ensure your emails are clear, concise, and professional,
                    making a strong first impression.
                  </li>
                </ul>
              </li>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[28px] mb-2 mt-2 md:mt-10 text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin_e.className}`}
                >
                  Focus on what matters most – your career goals! Let our AI
                  assistant handle the communication details.
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
