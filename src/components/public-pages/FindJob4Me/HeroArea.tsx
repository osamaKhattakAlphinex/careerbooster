import { Montserrat } from "next/font/google";
import Link from "next/link";
import React from "react";
const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
function HeroArea() {
  return (
    <div className="text-center p-6 lg:w-2/3 xs:w-full flex flex-col gap-2 pb-20">
      <h1
        className={`md:text-[54px] xs:text-[30px] !font-extrabold mb-4 ${montserrat_r.className}`}
      >
        Give Us 30-60 Days & We{"'"}ll Find You a Dream Job!
      </h1>
      <p
        className={`mb-6 ${montserrat_r.className} md:text-[22px] xs:text-[16px] dark:text-gray-200 text-gray-900`}
      >
        Our team of dedicated Virtual Job Search Assistants can make your life
        easier by managing your entire job search. Save time and do what you
        love while we bring you the interviews.
      </p>
      <Link
        target="_blank"
        href="https://api.leadconnectorhq.com/widget/booking/YWUhGhQTqpIH6XVQZBPu"
        className={`${montserrat_r.className} md:text-[20px] xs:text-[14px] bg-[#BD10E0] text-gray-100  md:py-4 md:px-8 xs:py-3 xs:px-4 rounded-full hover:bg-purple-700 transition duration-300 !font-bold mt-4 w-fit mx-auto `}
      >
        Schedule a Free Consultation →
      </Link>
    </div>
  );
}

export default HeroArea;
