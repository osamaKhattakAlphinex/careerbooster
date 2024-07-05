"use client";
import UploadPDFResume from "@/components/UploadPDFResume";
import { Fade, Zoom } from "react-awesome-reveal";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const HeroArea = () => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentString, setCurrentString] = useState("");
  const strings = [
    "Find Your Dream Job Faster.",
    "Get More Interviews.",
    "Access Confidential Opportunities with the Right Keywords.",
    "Get the Attention You Deserve from Recruiters.",
    "Expect a Document That Stands Out from the Competition.",
    "Get Past the ATS and Increase Your Visibility.",
    "A Top-Notch Resume Will Boost Your Confidence.",
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

  const moveToFeatures = () => {
    const featuresSection = document.querySelector(".features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const moveToFeaturesSecond = () => {
    const featuresSection = document.querySelector(".featuresSecond");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      className={`dark:bg-[url('/assets/images/bg/bg-4.png')] bg-[url('/assets/images/bg/1.jpg')] md:pt-40 xs:pt-[90px]  bg-auto bg-no-repeat bg-center overflow-hidden `}
    >
      <Fade duration={2000}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          rewind={true}
          speed={1200}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="xs:!px-4 mb-16"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1080: {
              slidesPerView: 1,
            },

            1440: {
              slidesPerView: 1,
            },
            1920: {
              slidesPerView: 1,
            },
          }}
        >
          <SwiperSlide>
            <div className="mx-auto w-full sm:container xs:max-w-full xs:px-2  lg:py-10">
              <div className="flex justify-center px-2">
                <div className="flex justify-center gap-12 w-full">
                  <div className="md:w-[65%] xs:w-full xs:text-center md:text-left">
                    <h1 className="lg:text-[50px] md:text-[30px] xs:text-[24px] font-bold">
                      Looking for a{" "}
                      <span className="bg-gradient-to-r from-[#B324D7] to-[#615DFF] bg-clip-text text-transparent text-gradient-to-tr   ">
                        {" "}
                        Senior-Level Job?
                      </span>{" "}
                      Get Everything You Need to Land a High-Paying Job, Faster
                    </h1>
                    <button
                      onClick={moveToFeatures}
                      className=" mt-10 inline-flex no-underline justify-center group items-center relative  text-[#6a4dff] dark:text-[#e6f85e] gap-3 dark:after:bg-[#e6f85e] after:bg-[#0000ff9c] hover:text-[#6a4dff] after:content[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:ease-in-out after:duration-300  hover:after:w-[100%]"
                    >
                      <span className=" md:text-[16px] xs:text-sm">
                        Learn More
                      </span>
                      <svg
                        className="w-[1rem] h-[1rem] "
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
                          stroke="currentColor"
                          strokeWidth="1.21"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="md:w-[35%] xs:hidden md:block">
                    <Image
                      alt="banner"
                      width={444}
                      height={400}
                      src="/assets/images/bg/home-banner-1.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="mx-auto w-full sm:container xs:max-w-full xs:px-2  lg:py-10">
              <div className="flex justify-center px-2">
                <div className="flex justify-center gap-12 w-full">
                  <div className="md:w-[65%] xs:w-full xs:text-center md:text-left">
                    <h1 className="lg:text-[50px] md:text-[30px] xs:text-[24px] font-bold">
                      Seeking
                      <span className="bg-gradient-to-r from-[#B324D7] to-[#615DFF] bg-clip-text text-transparent text-gradient-to-tr   ">
                        {" "}
                        Top Executive Talent?
                      </span>{" "}
                      Find Exceptional Leaders to Drive Your Business Forward
                    </h1>
                    <button
                      onClick={moveToFeaturesSecond}
                      className=" mt-10 inline-flex no-underline justify-center group items-center relative  text-[#6a4dff] dark:text-[#e6f85e] gap-3 dark:after:bg-[#e6f85e] after:bg-[#0000ff9c] hover:text-[#6a4dff] after:content[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:ease-in-out after:duration-300  hover:after:w-[100%]"
                    >
                      <span className=" md:text-[16px] xs:text-sm">
                        Learn More
                      </span>
                      <svg
                        className="w-[1rem] h-[1rem] "
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12.6667L12.6667 4M12.6667 4V12.32M12.6667 4H4.34667"
                          stroke="currentColor"
                          strokeWidth="1.21"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="md:w-[35%] xs:hidden md:block">
                    <Image
                      className="md:h-[250px] md:w-[150px] lg:w-[238px] lg:h-[423px]"
                      alt="banner"
                      width={238}
                      height={423}
                      src="/assets/images/bg/home-banner-2.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </Fade>
    </section>
  );
};
export default HeroArea;
