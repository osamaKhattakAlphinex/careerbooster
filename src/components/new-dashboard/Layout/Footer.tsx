"use client";
import { memo } from "react";
import AppleLogo from "@/../public/icon/AppleLogo.svg";
import AndroidLogo from "@/../public/icon/AndroidLogo.svg";
import FacebookIcon from "@/../public/icon/FacebookLogo.svg";
import LinkedinLogo from "@/../public/icon/LinkedinLogo.svg";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const tabOption = [
  {
    href: "https://www.facebook.com/careerboosterai",
    icon: (
      <Image src={FacebookIcon} alt="FacebookIcon" width={26} height={26} />
    ),
  },
  {
    href: "https://www.linkedin.com/company/careerboosterai/",
    icon: <Image src={LinkedinLogo} alt="linkIcon" width={26} height={26} />,
  },
  {
    href: "/",
    icon: <Image src={AndroidLogo} alt="AndroidLogo" width={26} height={26} />,
  },
  {
    href: "/",
    icon: <Image src={AppleLogo} alt="AppleLogo" width={26} height={26} />,
  },
];
const pagesArray = ["/subscribe"];
const Footer = () => {
  const pathname: any = usePathname();
  // if (pagesArray?.includes(pathname)) return <></>;
  return (
    <div
      className={`pb-7  px-3 text-center ${
        pagesArray?.includes(pathname) ? "" : "lg:ml-[244px]"
      }
    ${pathname === "/subscribed" ? "hidden" : ""}
     `}
    >
      <div className="flex justify-between h-[52px] items-end border-t border-[#312E37]">
        <p className="text-[#959595] lg:text-[14px] text-[10px]">
          2023 © CareerAi
        </p>
        <div className="flex lg:gap-[22px] gap-[10px] items-center">
          <Link
            href={"/terms-and-conditions"}
            className="text-[#959595] lg:text-[14px] text-[10px]"
          >
            Terms use
          </Link>
          <Link
            href={"/privacy-policy"}
            className="text-[#959595] lg:text-[14px] text-[10px]"
          >
            Privacy Policy
          </Link>
          <div className="flex lg:gap-[21px] gap-[8px]">
            {tabOption.map((item, i) => (
              <a
                href={item.href}
                key={i}
                target={
                  item.href === "https://www.facebook.com/careerboosterai" ||
                  item.href ===
                    "https://www.linkedin.com/company/careerboosterai/"
                    ? "_blank"
                    : ""
                }
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
