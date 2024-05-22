import React from "react";
import { Fjalla_One, Montserrat, Content } from "next/font/google";
import image1 from "@/../public/assets/images/services/1.webp";
import image2 from "@/../public/assets/images/services/2.webp";
import image3 from "@/../public/assets/images/services/3.webp";
import image4 from "@/../public/assets/images/services/4.webp";
import Image from "next/image";
const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});
const montserrat_500 = Montserrat({
  weight: "500",
  subsets: ["latin"],
});
const content_font = Content({
  weight: "400",
  subsets: ["khmer"],
});
const recommendUser = [
  {
    name: "Jessica Love",
    position: "Senior Recruiter",
    company: "at Human Capital Inc.",
    url: "https://www.youtube.com/embed/7PIji8OubXU",
  },
  {
    name: "Nick Goodey",
    position: "Creative Director",
    company: "at Young & Rubicam Group",
    url: "https://www.youtube.com/embed/7PIji8OubXU",
  },
  {
    name: "Phillip Clark",
    position: "Developer Relations Manager",
    company: "at NVIDIA",
    url: "https://www.youtube.com/embed/7PIji8OubXU",
  },
  {
    name: "Mani N Subramaniam",
    position: "Advisory Board Member",
    company: "at AdvisoryCloud",
    url: "https://www.youtube.com/embed/7PIji8OubXU",
  },
];
const linked_user = [
  {
    name: "Andy Friedman",
    position: "Chief Marketing Officer",
    company: "at Specifi Global",
    description:
      "After using Moe's LinkedIn optimization service, my profile views skyrocketed, and I was contacted by several recruiters from top marketing agencies. His keyword research on my profile made a massive difference.",
    image: image1,
  },
  {
    name: "Prabhat Mandwani",
    position: "Senior Executive & Board Member",
    company: "at Specifi Global",
    description:
      "Moe Hassan's LinkedIn service is phenomenal. Before, I struggled to get noticed. Post-optimization, I am getting more meaningful connections and an incredible job offers. His service is a career accelerator!",
    image: image2,
  },
  {
    name: "Tim Poland",
    position: "COO Fulfillment",
    company: "at OpsToMarket llc",
    description:
      "I was hitting a wall with my job search, barely getting any responses. Moe Hassan's guide tackled my exact issues – my profile wasn't standing out. With his strategies, I revamped my LinkedIn, and the difference was night and day. I started getting noticed within a month!",
    image: image3,
  },
];
const RecommendArea = () => {
  return (
    <div className="px-10 pb-5">
      <div className="">
        <h1 className="text-center px-20 py-10 leading-[4rem]">
          <strong className={`${montserrat.className} text-5xl text-[#6350C8]`}>
            Senior Executives & Recruiters Recommend Us
          </strong>
        </h1>
        <div className="w-full flex-wrap flex justify-center gap-10 ">
          {recommendUser &&
            recommendUser.map((user, index) => (
              <div
                className="w-[38%] shadow-xl rounded-lg overflow-hidden  bg-black/10"
                key={index}
              >
                <div className="h-[21rem]">
                  <iframe
                    src={user?.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="flex flex-col items-center py-3">
                  <h2
                    className={`${montserrat.className} text-xl text-gray-300`}
                  >
                    {user?.name}
                  </h2>
                  <h1
                    className={`${montserrat.className} text-[25px] text-[#6350C8]`}
                  >
                    {user?.position}
                  </h1>
                  <h2
                    className={`${montserrat_500.className} text-xl text-gray-300`}
                  >
                    {user?.company}
                  </h2>
                </div>
              </div>
            ))}
        </div>
        {/* 3 User */}
        <div className="flex gap-5 items-start py-10 xl:justify-center xl:mx-auto ">
          {linked_user &&
            linked_user.map((user, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-4/12 bg-black/10  p-6 rounded-lg shadow-xl max-w-md"
              >
                <div className="flex items-center justify-center mb-6 ">
                  {/* Replace "Image" with an actual img tag if you have an image URL */}
                  <Image
                    src={user?.image}
                    alt=""
                    width={180}
                    height={180}
                    className="rounded-full object-cover bg-no-repeat p-1 border border-gray-500"
                  />
                </div>
                <div className="text-center">
                  <p className={`text-gray-400 mb-4 text-[19px] font-serif`}>
                    {'"'}
                    {user?.description}
                    {'"'}
                  </p>
                  <h1
                    className={`${montserrat_500.className} text-gray-100 text-[32px] mt-3`}
                  >
                    {user?.name}
                  </h1>
                  <h2
                    className={`${montserrat_500.className} text-[23px] text-[#4b2fff]`}
                  >
                    <strong>{user?.position}</strong>
                  </h2>
                  <h2
                    className={`${montserrat_500.className} text-[23px] text-gray-400`}
                  >
                    {user?.company}
                  </h2>
                </div>
              </div>
            ))}
        </div>
        <div className="p-4 border border-gray-300 ">
          <div className="bg-[#ffcb81] w-full py-3 ">
            <div className="flex items-center justify-center mb-6">
              {/* Replace "Image" with an actual img tag if you have an image URL */}
              <Image
                src={image4}
                alt=""
                width={200}
                height={200}
                className="rounded-full object-cover bg-no-repeat  p-1 border border-gray-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-950 font-serif px-2 text-[19px] text-center">
                {'"'}I secured my new role as Director of Business Development
                at OwlFinancial Technologies in March 2024, a full-time remote
                position, just 30 days after optimization. I highly recommend
                CareerBooster to anyone struggling to find their next role.{'"'}
              </p>
              <h1
                className={`text-gray-950 text-[32px] mt-2 ${montserrat_500.className}`}
              >
                Michael Borrelle
              </h1>
              <h2
                className={`text-[#188bf6] ${montserrat.className} text-[23px]`}
              >
                Director of Business Development
              </h2>
              <h2
                className={`text-gray-950 text-[23px] ${montserrat_500.className}`}
              >
                at OwlFinancial Technologies
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-8">
          <button className="flex flex-col cursor-pointer items-center bg-gradient-to-r to-fuchsia-600 from-indigo-500 w-fit p-4 mx-auto  hover:scale-75 hover:transition-all hover:duration-100 py-3 px-3 hover:ease-in-out">
            <span className="text-[34px] font-serif ">
              Elcevate Your Professional Presence
            </span>
            <span className="font-sans text-[25px] text-gray-300">
              Click Here to optimize your LinkedIn profile.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendArea;
