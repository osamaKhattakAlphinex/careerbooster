import { Content, Lato, Montserrat } from "next/font/google";
import React from "react";
const montserrat_500 = Montserrat({
  weight: "500",
  subsets: ["latin"],
});
const lato_400 = Lato({
  weight: "400",
  subsets: ["latin"],
});
function Interests() {
  return (
    <div className={`shadow-xl rounded-md flex flex-col gap-8  pt-8`}>
      <h2
        className={`text-gray-300 lg:text-[44px] md:text-[32px] xs:text-[24px] text-center lg:px-20 md:px-10 ${montserrat_500.className}`}
      >
        Imagine being able to attract inquiries from headhunters without
        submitting countless job applications.
      </h2>
      <h1
        className={`${montserrat_500.className} text-center text-[46px] md:text-[34px] xs:text-[26px] xs:px-4`}
      >
        <strong>Does that interest you?</strong>
      </h1>
      <div className="px-20 flex flex-col gap-8">
        <p className={`${lato_400.className} text-gray-300 text-[20px]`}>
          At CareerBooster, we're dedicated to helping ambitious professionals
          like you reach their career goals swiftly and efficiently.
        </p>
        <p className={`${lato_400.className} text-gray-300 text-[20px]`}>
          Our expertise has guided hundreds of professionals in enhancing their
          LinkedIn profiles with ease, bypassing years of trial and error. We've
          mastered the art of transforming LinkedIn profiles into dynamic career
          tools.
        </p>
        <p className={`${lato_400.className} text-gray-300 text-[20px]`}>
          Crafting an impactful LinkedIn profile involves deep understanding of
          the platform's nuances and algorithms, coupled with advanced personal
          branding skills. With CareerBooster by your side, your profile will
          not only stand out but also capture the attention of top recruiters.
        </p>
        <p className={`${lato_400.className} text-[20px] `}>
          <b>Embrace a New Era of Career Advancement:</b>
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          Get ready to experience a world where leading job offers come to you.
          Say goodbye to the grind of endless applications and hello to
          strategic career growth!
        </p>
        <p className={`${lato_400.className} text-[20px]`}>
          <b>Make Your Next Career Move Effortlessly:</b>
        </p>
        <p className={`${lato_400.className} text-[20px] text-gray-300`}>
          Join the ranks of satisfied professionals who have turned their
          LinkedIn profiles into magnets for success. With CareerBooster, your
          career advancement is just a few clicks away.
        </p>
      </div>
    </div>
  );
}

export default Interests;
