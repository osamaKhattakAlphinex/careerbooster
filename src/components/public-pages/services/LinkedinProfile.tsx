import { Content, Montserrat } from "next/font/google";
import React from "react";
import b1 from "@/../public/assets/images/services/b1.webp";
import b2 from "@/../public/assets/images/services/b2.webp";
import f1 from "@/../public/assets/images/services/f1.webp";
import f2 from "@/../public/assets/images/services/f2.webp";
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
export const LinkedinProfile = () => {
  return (
    <div className="pb-12 ">
      <div
        className={`bg-[#1b4972] text-[40px] text-center  px-[18.5rem] py-12 ${montserrat.className} `}
      >
        "LinkedIn Profiles We Have Crafted for Executives"
      </div>
      <div className="pt-5 md:px-10 lg:px-[4rem] xl:px-36 flex flex-wrap justify-between gap-2 ">
        {user &&
          user.map((user, index) => (
            <div className="mt-12">
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
                  className="ml-4 mt-2"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
