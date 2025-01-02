"use client";
import NewsLetter from "@/components/home-new/NewsLetter";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

function page() {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const items = [
    <div className="w-[280px] h-[391px] bg-[linear-gradient(to_bottom,#1E1C4D,#251E47,#514B7E)] rounded-2xl rounded-bl-3xl  flex-shrink-0 relative ">
      <div className="w-[259px] h-[47px] text-white text-xl font-medium font-['Outfit'] leading-7 tracking-tight px-6 py-4">
        What is an Applicant Tracking System (ATS)?
        <br />
        <br />
      </div>
      <div className="relative h-40 w-full pb-8">
        <Image
          width={512}
          height={321}
          src="/bg/card-image-1.png" // Replace with your image
          alt="Card 1"
          className="rounded-xl"
          //   objectFit="cover"
        />
      </div>
      <div className="w-[42.70px] h-[42.70px] left-0  bottom-0 absolute bg-[#19242e] text-white  rounded-full justify-center items-center flex">
        <svg
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 2147201781">
            <g id="Group 2147201326">
              <g id="layer1">
                <path
                  id="path9417"
                  d="M17.5063 14.4926C17.6957 14.2913 17.798 14.0229 17.7916 13.7441L17.7211 6.15837C17.7178 5.87497 17.6024 5.60244 17.4003 5.40031C17.1982 5.19818 16.9257 5.08295 16.6423 5.07964L9.05506 5.00754C8.77018 5.00558 8.49813 5.11672 8.29863 5.31659C8.09913 5.51646 7.98847 5.78871 7.99095 6.07359C7.99343 6.35847 8.10886 6.6327 8.31187 6.83608C8.51488 7.03946 8.78894 7.15541 9.07383 7.15841L14.0658 7.20192L5.36795 15.8998C5.26861 15.9985 5.19001 16.1161 5.13678 16.246C5.08354 16.3759 5.05671 16.5156 5.05772 16.6568C5.05873 16.7981 5.08763 16.9383 5.14273 17.0693C5.19782 17.2004 5.27803 17.3197 5.37879 17.4204C5.47956 17.5212 5.59884 17.6014 5.72988 17.6565C5.86091 17.7116 6.0011 17.7405 6.14236 17.7415C6.28364 17.7425 6.42319 17.7156 6.55311 17.6624C6.68303 17.6091 6.80073 17.5306 6.89944 17.4313L15.6032 8.72754L15.6408 13.7254C15.6383 13.9428 15.7019 14.1569 15.8233 14.3394C15.9446 14.5219 16.118 14.6643 16.3203 14.7475C16.5227 14.8307 16.7444 14.8508 16.9562 14.8053C17.168 14.7598 17.3599 14.6507 17.5063 14.4926Z"
                  fill="white"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>,

    <div className="w-[579px] h-[521px] bg-[#1A2235] rounded-2xl  relative  ">
      <div className="w-[363px] h-32 text-white text-2xl  font-medium font-['Outfit'] leading-[46px] tracking-tight absolute  z-10 ">
        How AI is Transforming Executive Job Hairing Now?
        <br />A Strategic Shift
      </div>
      <div className="relative h-40 w-full">
        <Image
          width={937}
          height={634}
          src="/bg/card-image-2.png" // Replace with your image
          alt="Card 2"
          className="rounded-xl"
          objectFit="cover"
        />
      </div>
      <div className="absolute bottom-2 right-2 text-white bg-[#253240] rounded-full p-2 cursor-pointer">
        ?
      </div>
    </div>,
    <div className="w-[280px] h-[391px] bg-[#1A2235] rounded-2xl p-4  relative ">
      <div className="text-sm text-white font-medium mb-2">
        What a Job Seeker Needs to Know?
      </div>
      <div className="relative h-40 w-full">
        <Image
          width={528}
          height={352}
          src="/bg/card-image-3.png" // Replace with your image
          alt="Card 3"
          //   layout="fill"
          className="rounded-xl"
          objectFit="cover"
        />
      </div>
      <div className="absolute bottom-2 right-2 text-white bg-[#253240] rounded-full p-2 cursor-pointer">
        ?
      </div>
    </div>,
  ];

  const [tab, setTab] = useState("all");

  return (
    <>
      <main className="mt-28 flex-grow-1 overflow-x-hidden bg-[#000c16] px-8">
        <h1 className="text-center text-white text-[28px] font-semibold font-['Outfit'] uppercase leading-7 tracking-[2.80px] mt-[100px] mb-[80px]">
          Blogs
        </h1>

        <div className="w-full mx-auto flex gap-8 items-center">
          {/* <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
            autoPlayStrategy="all"
            autoPlayInterval={1000}
            disableDotsControls
            disableButtonsControls
          /> */}

          <div className="w-[280px] h-[391px] bg-[linear-gradient(to_bottom,#1E1C4D,#251E47,#514B7E)] rounded-2xl rounded-bl-3xl  flex-shrink-0 relative ">
            {/* <div
              className="absolute bottom-0 left-0 w-[100px] h-[100px] bg-[#19242e]"
              style={{
                clipPath: "path('M 0 0 Q 0 100 100 100 L 100 0 Z')",
              }}
            ></div>       */}
            <div className="w-[259px] h-[47px] text-white text-xl font-medium font-['Outfit'] leading-7 tracking-tight px-6 py-4">
              What is an Applicant Tracking System (ATS)?
              <br />
              <br />
            </div>
            <div className="relative h-40 w-full pb-8">
              <Image
                width={512}
                height={321}
                src="/bg/card-image-1.png" // Replace with your image
                alt="Card 1"
                className="rounded-xl"
                //   objectFit="cover"
              />
            </div>
            <div className="w-[42.70px] h-[42.70px] left-0  bottom-0 absolute bg-[#19242e] text-white  rounded-full justify-center items-center flex hover:animate-zoomin animate-jump animate-once animate-ease-in-out">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 2147201781">
                  <g id="Group 2147201326">
                    <g id="layer1">
                      <path
                        id="path9417"
                        d="M17.5063 14.4926C17.6957 14.2913 17.798 14.0229 17.7916 13.7441L17.7211 6.15837C17.7178 5.87497 17.6024 5.60244 17.4003 5.40031C17.1982 5.19818 16.9257 5.08295 16.6423 5.07964L9.05506 5.00754C8.77018 5.00558 8.49813 5.11672 8.29863 5.31659C8.09913 5.51646 7.98847 5.78871 7.99095 6.07359C7.99343 6.35847 8.10886 6.6327 8.31187 6.83608C8.51488 7.03946 8.78894 7.15541 9.07383 7.15841L14.0658 7.20192L5.36795 15.8998C5.26861 15.9985 5.19001 16.1161 5.13678 16.246C5.08354 16.3759 5.05671 16.5156 5.05772 16.6568C5.05873 16.7981 5.08763 16.9383 5.14273 17.0693C5.19782 17.2004 5.27803 17.3197 5.37879 17.4204C5.47956 17.5212 5.59884 17.6014 5.72988 17.6565C5.86091 17.7116 6.0011 17.7405 6.14236 17.7415C6.28364 17.7425 6.42319 17.7156 6.55311 17.6624C6.68303 17.6091 6.80073 17.5306 6.89944 17.4313L15.6032 8.72754L15.6408 13.7254C15.6383 13.9428 15.7019 14.1569 15.8233 14.3394C15.9446 14.5219 16.118 14.6643 16.3203 14.7475C16.5227 14.8307 16.7444 14.8508 16.9562 14.8053C17.168 14.7598 17.3599 14.6507 17.5063 14.4926Z"
                        fill="white"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <div className="w-[579px] h-[521px] bg-[#1A2235] rounded-2xl  relative  ">
            <div className="w-[363px] h-32  text-white text-2xl  font-medium font-['Outfit'] leading-[46px] tracking-tight absolute  z-10 rounded-t-xl ">
              <div className="bg-black rounded-br-lg p-2">
                {" "}
                How AI is Transforming Executive{" "}
              </div>

              <div className="bg-black rounded-br-lg p-2 w-[290px]">
                Job Hairing Now?
              </div>
              <div className="bg-black rounded-br-lg p-2 w-[240px]">
                A Strategic Shift
              </div>
            </div>
            <div className="relative h-40 w-full">
              <Image
                width={937}
                height={634}
                src="/bg/card-image-2.png" // Replace with your image
                alt="Card 2"
                className="rounded-xl"
                objectFit="cover"
              />
            </div>
            <div className="w-[42.70px] h-[42.70px] left-0  bottom-0 absolute bg-[#19242e] text-white  rounded-full justify-center items-center flex  animate-jump animate-once hover:animate-ease-in-out">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 2147201781">
                  <g id="Group 2147201326">
                    <g id="layer1">
                      <path
                        id="path9417"
                        d="M17.5063 14.4926C17.6957 14.2913 17.798 14.0229 17.7916 13.7441L17.7211 6.15837C17.7178 5.87497 17.6024 5.60244 17.4003 5.40031C17.1982 5.19818 16.9257 5.08295 16.6423 5.07964L9.05506 5.00754C8.77018 5.00558 8.49813 5.11672 8.29863 5.31659C8.09913 5.51646 7.98847 5.78871 7.99095 6.07359C7.99343 6.35847 8.10886 6.6327 8.31187 6.83608C8.51488 7.03946 8.78894 7.15541 9.07383 7.15841L14.0658 7.20192L5.36795 15.8998C5.26861 15.9985 5.19001 16.1161 5.13678 16.246C5.08354 16.3759 5.05671 16.5156 5.05772 16.6568C5.05873 16.7981 5.08763 16.9383 5.14273 17.0693C5.19782 17.2004 5.27803 17.3197 5.37879 17.4204C5.47956 17.5212 5.59884 17.6014 5.72988 17.6565C5.86091 17.7116 6.0011 17.7405 6.14236 17.7415C6.28364 17.7425 6.42319 17.7156 6.55311 17.6624C6.68303 17.6091 6.80073 17.5306 6.89944 17.4313L15.6032 8.72754L15.6408 13.7254C15.6383 13.9428 15.7019 14.1569 15.8233 14.3394C15.9446 14.5219 16.118 14.6643 16.3203 14.7475C16.5227 14.8307 16.7444 14.8508 16.9562 14.8053C17.168 14.7598 17.3599 14.6507 17.5063 14.4926Z"
                        fill="white"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <div className="w-[280px] h-[391px] bg-gradient-to-b from-[#203245] to-[#172b3f] rounded-2xl p-4  relative ">
            <div className="w-[239px] h-[47px] text-white text-xl font-medium font-['Outfit'] leading-7 tracking-tight">
              What a Job Seeker Needs to know?
              <br />
            </div>
            <div className="relative h-40 w-full bottom-[-48px]">
              <Image
                width={528}
                height={352}
                src="/bg/card-image-3.png" // Replace with your image
                alt="Card 3"
                //   layout="fill"
                className="rounded-xl"
                // objectFit="cover"
              />
            </div>
            <div className="w-[42.70px] h-[42.70px] left-0  bottom-0 absolute bg-[#19242e] text-white  rounded-full justify-center items-center flex">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 2147201781">
                  <g id="Group 2147201326">
                    <g id="layer1">
                      <path
                        id="path9417"
                        d="M17.5063 14.4926C17.6957 14.2913 17.798 14.0229 17.7916 13.7441L17.7211 6.15837C17.7178 5.87497 17.6024 5.60244 17.4003 5.40031C17.1982 5.19818 16.9257 5.08295 16.6423 5.07964L9.05506 5.00754C8.77018 5.00558 8.49813 5.11672 8.29863 5.31659C8.09913 5.51646 7.98847 5.78871 7.99095 6.07359C7.99343 6.35847 8.10886 6.6327 8.31187 6.83608C8.51488 7.03946 8.78894 7.15541 9.07383 7.15841L14.0658 7.20192L5.36795 15.8998C5.26861 15.9985 5.19001 16.1161 5.13678 16.246C5.08354 16.3759 5.05671 16.5156 5.05772 16.6568C5.05873 16.7981 5.08763 16.9383 5.14273 17.0693C5.19782 17.2004 5.27803 17.3197 5.37879 17.4204C5.47956 17.5212 5.59884 17.6014 5.72988 17.6565C5.86091 17.7116 6.0011 17.7405 6.14236 17.7415C6.28364 17.7425 6.42319 17.7156 6.55311 17.6624C6.68303 17.6091 6.80073 17.5306 6.89944 17.4313L15.6032 8.72754L15.6408 13.7254C15.6383 13.9428 15.7019 14.1569 15.8233 14.3394C15.9446 14.5219 16.118 14.6643 16.3203 14.7475C16.5227 14.8307 16.7444 14.8508 16.9562 14.8053C17.168 14.7598 17.3599 14.6507 17.5063 14.4926Z"
                        fill="white"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-16 items-center">
          <h1 className="text-white text-3xl font-bold font-['Outfit'] leading-[30px] tracking-tight">
            Trending Blogs
          </h1>
          <div className="flex items-center gap-4">
            <div
              onClick={() => {
                setTab("all");
              }}
              className={`w-[125px] flex justify-center items-center h-12 rounded-[30px] border border-white/30 text-opacity-80 text-center text-white text-base font-medium font-['Outfit'] leading-none tracking-tight hover:bg-[#2797f2] hover:border-none hover:ease-in-out hover:text-white hover:cursor-pointer ${
                tab === "all" && "bg-[#2797f2]"
              }`}
            >
              All Time
            </div>
            <div
              onClick={() => {
                setTab("today");
              }}
              className={`w-[125px] flex justify-center items-center h-12 rounded-[30px] border border-white/30 text-opacity-80 text-center text-white text-base font-medium font-['Outfit'] leading-none tracking-tight hover:bg-[#2797f2] hover:border-none hover:ease-in-out hover:text-white hover:cursor-pointer ${
                tab === "today" && "bg-[#2797f2]"
              }`}
            >
              Today
            </div>
            <div
              onClick={() => {
                setTab("week");
              }}
              className={`w-[125px] flex justify-center items-center h-12 rounded-[30px] border border-white/30 text-opacity-80 text-center text-white text-base font-medium font-['Outfit'] leading-none tracking-tight hover:bg-[#2797f2] hover:border-none hover:ease-in-out hover:text-white hover:cursor-pointer ${
                tab === "week" && "bg-[#2797f2]"
              }`}
            >
              This Week
            </div>
            <div
              onClick={() => {
                setTab("month");
              }}
              className={`w-[125px] flex justify-center items-center h-12 rounded-[30px] border border-white/30 text-opacity-80 text-center text-white text-base font-medium font-['Outfit'] leading-none tracking-tight hover:bg-[#2797f2] hover:border-none hover:ease-in-out hover:text-white hover:cursor-pointer ${
                tab === "month" && "bg-[#2797f2]"
              }`}
            >
              This Month
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-6 mx-auto mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => {
            return (
              <div className="w-96 h-[431px] bg-[#19242e] rounded-[13px] p-4 flex flex-col gap-2">
                <Image
                  src="/bg/blog-1.png"
                  width={411}
                  height={274}
                  alt="blog-1"
                  className="rounded-lg"
                />
                <div className="w-[344px] text-white text-lg font-medium font-['Outfit'] leading-[30px] mt-4">
                  12 Expert-Approved Responses to ‘What Makes You Unique?’ in
                  Job Interviews
                </div>
                <div className="w-[346px] opacity-70 text-white text-sm font-light font-['Outfit'] leading-[23px] tracking-tight">
                  Stand out from the crowd with these expert-recommended answers
                  to a common...
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-4 items-center">
                    <Image
                      src="/bg/blog-1-avatar.png"
                      width={40}
                      height={40}
                      alt="blog-1"
                      className="rounded-full"
                    />
                    <h3 className="w-[98px] h-[11px] opacity-80 text-white text-sm font-normal font-['Outfit'] leading-[14px]">
                      Biron Clark
                    </h3>
                  </div>
                  <h4 className="w-[94px] h-4 opacity-70 text-right text-white text-sm font-normal font-['Outfit'] leading-[14px] tracking-wide">
                    15 Sep, 2024
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <NewsLetter />
    </>
  );
}

export default page;
