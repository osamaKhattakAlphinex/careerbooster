"use client";
//v1.1 upadted
import linkedImage_1 from "@/../public/assets/images/linkedImage_1.png";
import linkedImage_2 from "@/../public/assets/images/linkedImage_2.png";

import Image from "next/image";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyInvisibleCaptcha } from "@/ServerActions";

const saveToLocalStorage = (text: any, fileName: any) => {
  localStorage.setItem("linkedin-content", text);
  localStorage.setItem("linkedin-fileName", fileName);
};
import { Fjalla_One, Roboto, Montserrat } from "next/font/google";
import Link from "next/link";
const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});
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
  const router = useRouter();
  const signUp = () => {
    router.push("/register");
  };

  return (
    <div className="w-full ">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r  from-[#01010D80] via-[#000A6380] to-purple-900 overflow-x-hidden md:px-0 pt-24  lg:pt-[100px] lg:npt-10">
        <div className=" text-center lg:pt-12 lg:pb-8 pt-15 ">
          <h2
            className={`xs:text-sm md:text-[20px] lg:text-[30px] text-gray-800 dark:text-gray-300  ${montserrat_thin.className}`}
          >
            Finally Revealed!
          </h2>
          <div>
            <h1
              className={`md:pt-2 text-center xs:text-[25px] md:text-[45px] lg:text-[65px]  mt-3 text-[#4f31f0]  dark:text-[#6350c8]`}
            >
              <strong className={`${fjalla_One.className} font-bold`}>
                How To Access Senior Level
              </strong>
            </h1>
            <p className="text-center text-[25px] md:text-[45px] lg:text-[65px]  relative  md:-top-4 text-[#4f31f0]  dark:text-[#6350c8] ">
              <strong className={`${fjalla_One.className} font-bold`}>
                Confidential Jobs on LinkedIn
              </strong>
            </p>
          </div>

          <h2
            className={` xs:text-[12px] md:text-[18px] lg:text-[30px] xs:pt-3 md:pt-0 text-gray-800 dark:text-gray-300 px-[8px] md:px-32 font-thin ${montserrat.className}`}
          >
            Little-known job search secrets on LinkedIn, crucial for
            senior-level job seekers.
          </h2>
        </div>
        <div className="px-[5px] md:px-[15px] lg:pb-8">
          <h2
            className={`xs:text-[16px] md:text-[27px] lg:text-[45px] px-[5px] xs:px-[10px] md:px-[25px] text-gray-800 dark:text-gray-300 xs:pt-3 md:pt-4 lg:px-28  text-center ${montserrat.className} `}
          >
            <strong>
              Why Top Jobs Stay Off the Radar? The Confidential Job Market
              Explained…
            </strong>
          </h2>
          <div className="xs:mt-5 md:mt-4 lg:mt-10 container mx-auto">
            <ul>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[32px] text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin.className}`}
                >
                  Chess Not Checkers:{" "}
                </h3>

                <ul
                  className={`xs:text-[10px] md:text-[13px] lg:text-[18px] flex flex-col xs:gap-2 lg:gap-2 my-2 md:my-4 text-gray-800 dark:text-gray-300 ${montserrat_p.className}`}
                >
                  <li>
                    Think of high-stakes job placements as strategic chess
                    moves.
                  </li>
                  <li>
                    Companies wait for the perfect moment to shout {"'"}
                    checkmate{"'"}
                    before revealing their next big move.
                  </li>
                  <li>
                    This hushhush approach keeps the market{"'"}s prying eyes at
                    bay and the company{"'"}s cards close to its chest.
                  </li>
                  <li>
                    The recent success of OpenAI is a great example; they hired
                    top engineers secretly and announced GPT, which was nothing
                    less than a checkmate to Google.
                  </li>
                </ul>
              </li>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[32px] text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin.className}`}
                >
                  Under the Radar:
                </h3>
                <ul
                  className={`text-[10px] md:text-[13px] lg:text-[18px] text-gray-800 dark:text-gray-300 flex flex-col xs:gap-2 md:gap-4 xs:my-2 md:my-4 ${montserrat_p.className}`}
                >
                  <li>
                    For those already in a top position, job searching is often
                    a covert operation.
                  </li>
                  <li>
                    Confidential job listings serve as a protective veil,
                    enabling you to explore new opportunities without
                    jeopardizing your current position.
                  </li>
                  <li>
                    In essence, the high-level job market is like an
                    iceberg—what you see on job boards is just the tip. The real
                    action happens below the surface, and this guide is your
                    Sonar to see it all.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
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
      </section>
    </div>
  );
};

export default HeroArea;
