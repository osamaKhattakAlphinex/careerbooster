"use client";

import React from "react";
import { Fjalla_One } from "next/font/google";
const fjalla_One = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

const HeroArea = () => {
  return (
    <div className="md:pt-10 lg:pt-20 xs:px-6 xs:pt-6 md:px-10  lg:px-[4rem] xl:px-36">
      <h1 className="md:pt-2 text-center xs:text-[25px] md:text-[45px] lg:text-[65px]  mt-3 text-[#4f31f0]  dark:text-[#6350c8]">
        <strong
          className={`${fjalla_One.className} lg:leading-[5rem] xs:leading-[3rem] `}
        >
          Transform Your LinkedIn Profile into a Magnet for Senior-Level
          Opportunities & Skyrocket Your Career Progression!
        </strong>
      </h1>

      <div className="linkedinPdfButton flex justify-center mt-11 md:mt-11">
        <label
          className=" py-[12px] lg:py-[20px] text-white lg:px-[40px]  px-[28px] cursor-pointer  rounded-xl bg-gradient-to-r to-violet-500 from-fuchsia-500 hover:scale-75 hover:transition-all hover:duration-300 hover:ease-in-out"
          onClick={() => {
            const targetElement = document.querySelector(".serviceForm");
            const topOffset = 300; // Adjust this value as needed
            if (targetElement) {
              const targetTop =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                topOffset;
              window.scrollTo({
                top: targetTop,
                behavior: "smooth",
              });
            }
          }}
        >
          <div className="flex gap-2 ">
            <div className="text-center ">
              <p className="m-0 font-semibold whitespace-nowrap lg:text-[20px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                Order Now! Unlock Elite Opportunities
              </p>
              <p className="lg:text-[14px] text-[10px] lg:leading-[17px] leading-[14px] pt-2">
                Click Here to Place Your Order
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default HeroArea;
