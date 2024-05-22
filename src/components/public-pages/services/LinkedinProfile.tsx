import { Content, Fjalla_One, Montserrat } from "next/font/google";
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
const fjalla_One = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
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
        className={`bg-[#1b4972] text-[40px] text-center  px-[18.5rem] py-12 ${montserrat.className} `}
      >
        {'"'}LinkedIn Profiles We Have Crafted for Executives{'"'}
      </div>
      <div className="pt-5 md:px-10 lg:px-[4rem] flex flex-wrap justify-between gap-2 ">
        {user &&
          user.map((user, index) => (
            <div key={index} className="mt-12 flex flex-col">
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
      <div className=" mx-auto flex flex-col justify-center items-center mt-20 w-full gap-10">
        {user2.map((items) => {
          return (
            <Image
              src={items.image}
              width={833}
              height={571}
              alt="linkedin"
              className="border-2 border-[#E1E362] rounded-lg"
            />
          );
        })}
      </div>
      <div className="pt-5 justify-center flex flex-wrap  gap-8 mt-20">
        {user3 &&
          user3.map((user) => (
            <div className="">
              <Image
                src={user?.image}
                alt=""
                width={520}
                height={507}
                className="ml-4 mt-2 shadow-xl border-2 border-[#E1E362]"
              />
            </div>
          ))}
      </div>
      <div className="flex flex-col mx-auto w-fit my-20">
        <button className="bg-gradient-to-r to-fuchsia-600 from-indigo-500 w-fit p-4 mx-auto  hover:scale-75 hover:transition-all hover:duration-100 text-white px-4 py-2 hover:ease-in-out">
          <h2 className={`text-[34px] font-bold ${fjalla_One.className}`}>
            Unlock Your Profile&apos;s Potential Now
          </h2>
          <p className={`capitalize text-[24px] text-gray-300`}>
            click here to optimize your linkedin profile
          </p>
        </button>
      </div>
    </div>
  );
};
