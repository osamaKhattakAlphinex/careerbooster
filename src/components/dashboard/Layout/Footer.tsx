"use client";
//v1.3
import FacebookIcon from "@/../public/icon/FacebookLogo.svg";
import LinkedinLogo from "@/../public/icon/LinkedinLogo.svg";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const tabOption = [
  {
    href: "https://www.facebook.com/careerboosterai",
    icon: (
      <Image
        src={FacebookIcon}
        alt="FacebookIcon"
        className="xs:h-6 xs:w-6 md:w-8 md:h-8"
      />
    ),
  },
  {
    href: "https://www.linkedin.com/company/careerboosterai/",
    icon: (
      <Image
        src={LinkedinLogo}
        alt="linkIcon"
        className="xs:w-6 xs:h-6 md:w-8 md:h-8"
      />
    ),
  },
  // {
  //   href: "/",
  //   icon: <Image src={AndroidLogo} alt="AndroidLogo" width={26} height={26} />,
  // },
  // {
  //   href: "/",
  //   icon: <Image src={AppleLogo} alt="AppleLogo" width={26} height={26} />,
  // },
];
const pagesArray = ["/subscribe"];
const Footer = () => {
  const pathname: any = usePathname();
  // if (pagesArray?.includes(pathname)) return <></>;
  return (
    <div
      className={`pb-7  px-3 text-center  ${
        pagesArray?.includes(pathname) ? "" : "lg:ml-[234px]"
      }
    ${pathname === "/subscribed" ? "hidden" : ""}
     `}
    >
      <div className="flex justify-between xs:h-[60px] md:h-[52px] items-end border-t border-[#312E37]">
        <div className="dark:text-gray-100 xs:hidden md:flex whitespace-nowrap text-gray-950 h-7 flex items-center flex-wrap gap-[10px] lg:gap-[22px]  md:text-[14px] text-[10px]">
          2024 © CareerBooster.Ai
        </div>
        <div className="flex xs:flex-wrap xs:w-full md:w-fit md:flex-nowrap md:gap-[22px]  items-center">
          <div className="flex self-center justify-between w-full gap-4 my-2">
            <Link
              href={"/terms-and-conditions"}
              className="dark:text-gray-100 whitespace-nowrap text-gray-950 no-underline md:text-[14px] text-[10px]"
            >
              Terms Of Use
            </Link>
            <Link
              href={"/privacy-policy"}
              className="dark:text-gray-100 whitespace-nowrap text-gray-950 no-underline md:text-[14px] text-[10px]"
            >
              Privacy Policy
            </Link>
            <Link
              href={"/contact"}
              className="dark:text-gray-100 whitespace-nowrap text-gray-950 no-underline md:text-[14px] text-[10px]"
            >
              Contact Us
            </Link>
          </div>
          <div className="xs:hidden md:flex lg:gap-[21px] gap-[8px]">
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
          <div className="flex justify-between w-full md:hidden">
            <div className="dark:text-gray-100 whitespace-nowrap text-gray-950 h-7 flex flex-row items-center flex-wrap gap-[10px] lg:gap-[22px]  md:text-[14px] text-[10px]">
              2024 © CareerBooster.Ai
            </div>
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
    </div>
  );
};

export default Footer;
