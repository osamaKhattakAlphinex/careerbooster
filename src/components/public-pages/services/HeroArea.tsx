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
    <div className="pt-20 md:px-10  lg:px-[4rem] xl:px-36">
      <h1 className="text-6xl text-center">
        <strong className={`${fjalla_One.className} font-bold leading-[5rem]`}>
          Transform Your LinkedIn Profile into a Magnet for Senior-Level
          Opportunities & Skyrocket Your Career Progression!
        </strong>
      </h1>
      <div className="flex justify-center py-14 ">
        <button className="flex flex-col items-center bg-gradient-to-r to-fuchsia-600 from-indigo-500 w-fit p-4 mx-auto  hover:scale-75 hover:transition-all hover:duration-300 hover:ease-in-out  rounded-md border border-white/40 px-5 py-1.5">
          <span className={`text-[30px] font-bold ${montserrat.className}`}>
            Order Now! Unlock Elite Opportunities
          </span>
          <span className="text-[20px] font-sans">
            Click Here to Place Your Order
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroArea;
