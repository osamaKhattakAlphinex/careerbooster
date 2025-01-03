"use client";
import { Montserrat } from "next/font/google";
import React from "react";
import b1 from "@/../public/assets/images/services/b1.webp";
import b2 from "@/../public/assets/images/services/b2.webp";
import f1 from "@/../public/assets/images/services/f1.webp";
import f2 from "@/../public/assets/images/services/f2.webp";
import b4 from "@/../public/assets/images/services/b4.webp";
import f3 from "@/../public/assets/images/services/f3.webp";
import f4 from "@/../public/assets/images/services/f4.webp";
import l1 from "@/../public/assets/images/services/l1.webp";
import l2 from "@/../public/assets/images/services/l2.webp";
import l3 from "@/../public/assets/images/services/l3.webp";
import l4 from "@/../public/assets/images/services/l4.webp";
import Image from "next/image";
const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});
const user = [
  {
    title: "before",
    image: b1,
  },
  {
    title: "after",
    image: f1,
  },
  {
    title: "before",
    image: b2,
  },
  {
    title: "after",
    image: f2,
  },
];
const user2 = [
  {
    image: b4,
  },
  {
    image: f3,
  },
  {
    image: f4,
  },
];
const user3 = [
  {
    image: l1,
  },
  {
    image: l2,
  },
  {
    image: l3,
  },
  {
    image: l4,
  },
];

export const LinkedinProfile = () => {
  return (
    <div className="pb-12 ">
      <div
        className={`bg-[#1b4972] text-white lg:text-[40px] md:text-[32px] sm:text-[24px] xs:py-4 md:py-8 text-center  lg:px-[18.5rem] lg:py-12 ${montserrat.className} `}
      >
        {'"'}LinkedIn Profiles We Have Crafted for Executives{'"'}
      </div>
      <div className="pt-5 md:w-full flex-wrap flex md:flex-row xs:flex-col justify-center gap-2 xs:px-4 ">
        {user &&
          user.map((user, index) => (
            <div
              key={index}
              className="lg:mt-12 md:w-[38%] xs:w-full flex flex-col"
            >
              <h2
                className={`${montserrat.className} text-[25px] capitalize ${
                  user?.title === "before" ? "text-red-700" : "text-green-700"
                } `}
              >
                {user.title}
              </h2>
              <div className="">
                <Image
                  src={user?.image}
                  alt=""
                  width={510}
                  height={510}
                  className="md:ml-4 md:mt-2"
                />
              </div>
            </div>
          ))}
      </div>
      <div className=" mx-auto flex flex-col justify-center items-center md:mt-20 xs:mt-8 w-full gap-10 xs:px-4">
        {user2.map((items, index) => {
          return (
            <Image
              key={index}
              src={items.image}
              width={833}
              height={571}
              alt="linkedin"
              className="border-2 border-[#E1E362] rounded-lg"
            />
          );
        })}
      </div>
      <div className="pt-5 justify-center flex flex-wrap  gap-8 lg:mt-20 md:mt-8 xs:px-4">
        {user3 &&
          user3.map((user, index) => (
            <div className="md:w-[40%] xs:w-full" key={index}>
              <Image
                src={user?.image}
                alt=""
                width={520}
                height={507}
                className="md:ml-4 md:mt-2 shadow-xl border-2 border-[#E1E362]"
              />
            </div>
          ))}
      </div>

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
                Unlock Your Profile&apos;s Potential Now
              </p>
              <p className="lg:text-[14px] text-[10px] lg:leading-[17px] leading-[14px] pt-2">
                Click here to optimize your Linkedin profile
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};
