import { chevronRight } from "@/helpers/iconsProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ToolsCard = ({
  title,
  description,
  link,
  icon,
  bgColor1,
  bgColor2,
  isActive,
  action,
}: {
  title: string;
  description: string;
  link: string;
  icon: any;
  bgColor1: string;
  bgColor2: string;
  isActive: boolean;
  action: string;
}) => {
  return (
    <div className="lg:w-[32%] flex mb-8 ">
      <Link href={link} className="flex no-underline text-white">
        <div className="mr-4">
          <div
            className={`rounded-full flex justify-center items-center bg-gradient-to-b ${bgColor1} ${bgColor2} w-[60px] h-[60px] `}
          >
            <Image
              width={title !== "Resume Builder" ? 55 : 35}
              height={title !== "Resume Builder" ? 55 : 35}
              src={icon}
              alt="Not Found"
            />
          </div>
        </div>
        <div className="">
          <h2 className="text-[16px] text-white font-semibold">{title}</h2>
          <p className="text-[#959595] mt-[6px] font-normal text-[14px]">
            {description}
          </p>
          <Link
            href={link}
            className={`text-[14px] mt-[11px] flex items-center uppercase text-[#959595] hover:text-white font-semibold`}
          >
            {action} <i className="ml-2">{chevronRight}</i>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default ToolsCard;