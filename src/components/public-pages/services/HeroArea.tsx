"use client";

import React from "react";
import { Fjalla_One, Roboto, Montserrat } from "next/font/google";
const fjalla_One = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});
const HeroArea = () => {
  return (
    <div className="md:pt-10 lg:pt-20 xs:px-6 xs:pt-6 md:px-10  lg:px-[4rem] xl:px-36">
      <h1 className="lg:text-6xl md:text-4xl xs:text-3xl text-center">
        <strong
          className={`${fjalla_One.className} font-bold lg:leading-[5rem] xs:leading-[3rem] `}
        >
          Transform Your LinkedIn Profile into a Magnet for Senior-Level
          Opportunities & Skyrocket Your Career Progression!
        </strong>
      </h1>
      <div className="flex justify-center lg:py-14 md:py-8 xs:py-6 ">
        <button
          className="flex flex-col items-center bg-gradient-to-r to-fuchsia-600 from-indigo-500 w-fit p-4 mx-auto  hover:scale-75 hover:transition-all hover:duration-300 hover:ease-in-out  rounded-md border border-white/40 px-5 py-1.5"
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
          <span
            className={`lg:text-[30px] md:text-[20px] font-bold ${montserrat.className}`}
          >
            Order Now! Unlock Elite Opportunities
          </span>
          <span className="lg:text-[20px] md:text-[16px] font-sans">
            Click Here to Place Your Order
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroArea;
