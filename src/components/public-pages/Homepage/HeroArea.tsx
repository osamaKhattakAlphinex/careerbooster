"use client";
import UploadPDFResume from "@/components/UploadPDFResume";
import { Fade, Zoom } from "react-awesome-reveal";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroArea = () => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentString, setCurrentString] = useState("");
  const strings = [
    "Find Your Dream Job Faster.",
    "Get More Interviews.",
    "Access Confidential Opportunities with the Right Keywords.",
    "Get the Attention You Deserve from Recruiters.",
    "Get Past the ATS and Increase Your Visibility.",
    "A Top-Notch Resume Will Bo ost Your Confidence.",
    "Expect a Document That Stands Out from the Competition.",
  ];

  useEffect(() => {
    const typeString = () => {
      setCurrentString(
        strings[currentStringIndex].substring(0, currentString.length + 1)
      );
    };

    const deleteString = () => {
      setCurrentString(
        strings[currentStringIndex].substring(0, currentString.length - 1)
      );
    };

    const typingTimeout = setTimeout(() => {
      if (currentString === strings[currentStringIndex]) {
        setTimeout(() => {
          setCurrentString("");
          setCurrentStringIndex((currentStringIndex + 1) % strings.length);
        }, 1500); // Pause before next string starts typing
      } else if (currentString.length === 0) {
        typeString();
      } else if (currentString.length < strings[currentStringIndex].length) {
        typeString();
      } else {
        deleteString();
      }
    }, 100);

    return () => clearTimeout(typingTimeout);
  }, [currentString, currentStringIndex, strings]);
  return (
    <section
      className={`dark:bg-[url('/assets/images/bg/bg-4.png')] bg-[url('/assets/images/bg/1.jpg')] md:pt-40 xs:pt-[120px] xs:pb-[50px] pb-10  md:pb-18 bg-auto bg-no-repeat bg-center overflow-hidden `}
    >
      <Fade duration={2000}>
        <div className="mx-auto w-full sm:container xs:max-w-full xs:px-2  ">
          <div className="flex justify-center px-2">
            <div className="flex flex-col lg:w-9/12">
              <div className="text-center">
                <div className="relative z-1 animate-in duration-300">
                  <p className=" text-[#0000ff9c] dark:text-[#e6f85e] xs:text-base md:text-xl ">
                    Unlock Your Career Potential
                  </p>
                  <h1 className="text-gray-950 dark:text-gray-100 mb-8 md:text-4xl text-[24px] font-semibold">
                    Your Free AI Resume Writer & LinkedIn Optimization Tool to
                    Turbocharge Your Career!
                    <br />
                    {/* <span
                    className="font-bold md:text-[40px] mt-8 text-[24px] text-transparent bg-clip-text bg-gradient-to-r from-[#b324d7] to-[#fe577f] dark:bg-gradient-to-r dark:from-[#58ebff] dark:to-[#e6f85e] typed-animation text-wrap"
                    data-strings='["Find Your Dream Job Faster.", "Get More Interviews.", 
                        "Access Confidential Opportunities with the Right Keywords.", "Get the Attention You Deserve from Recruiters.",
                        "Get Past the ATS and Increase Your Visibility.",
                        "A Top-Notch Resume Will Boost Your Confidence.",
                        "Expect a Document That Stands Out from the Competition"]'
                  ></span> */}
                    <span className=" flex justify-center items-center font-bold md:text-3xl min-h-[56px]   text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#b324d7] to-[#fe577f] dark:bg-gradient-to-r dark:from-[#58ebff] dark:to-[#e6f85e] typed-animation ">
                      <p>{currentString}</p>
                    </span>
                  </h1>
                  <UploadPDFResume />
                </div>
                <div>
                  <div className="relative flex justify-center">
                    <Image
                      width={811}
                      height={341}
                      src="/assets/images/shapes/blurry-shape-1.svg"
                      alt=""
                      className=" animate-scale absolute lg:top-[-12rem] lg:left-[-9rem] lg:w-[700px] h-auto z-[-1] sm:w-[1000px] sm:-top-[25rem] sm:-left-[18rem]"
                    />
                    <Zoom duration={1200}>
                      <div className="mt-12 p-4 rounded-2xl border-[1px] border-[#E6F85E] shadow-lg overflow-hidden relative z-1 dark:block hidden ">
                        <Image
                          width={810}
                          height={793}
                          className="rounded-md"
                          src="/assets/images/screens/dashboard.png"
                          alt=""
                        />
                      </div>
                      <div className="mt-12 p-4 rounded-2xl border-[1px] border-[#E6F85E] shadow-lg overflow-hidden position-relative z-1 dark:hidden block lg:hover:animate-shake motion-reduce:animate-none">
                        <Image
                          width={810}
                          height={793}
                          className="rounded-md"
                          src="/assets/images/screens/dashboard-lite-2.png"
                          alt=""
                        />
                      </div>
                    </Zoom>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-4 md:gap-8 lg:gap-10 items-center justify-center mt-8 mb-0 dark:text-gray-100 text-gray-950">
                  <li>Write Resumes 100x Faster</li>
                  <li>Write Keyword-Optimized LinkedIn Profile</li>
                </ul>
                <div className="dark:flex dark:lg:flex-row dark:md:flex-row dark:xs:flex-col hidden gap-8 items-center justify-center mt-12 review-badges">
                  <Image
                    width={185}
                    height={38}
                    className="img-fluid "
                    src="/assets/images/review-logos/trustpilot_reviews.svg"
                    alt=""
                  />
                  <Image
                    width={185}
                    height={38}
                    className="img-fluid "
                    src="/assets/images/review-logos/capterra_reviews.svg"
                    alt=""
                  />
                </div>
                <div className="dark:hidden flex lg:flex-row md:flex-row xs:flex-col gap-8 items-center justify-center mt-12 review-badges">
                  <Image
                    width={185}
                    height={38}
                    className="img-fluid "
                    src="/assets/images/review-logos/trustpilot_reviews_2.svg"
                    alt=""
                  />
                  <Image
                    width={185}
                    height={38}
                    className="img-fluid "
                    src="/assets/images/review-logos/capterra_reviews_2.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};
export default HeroArea;
