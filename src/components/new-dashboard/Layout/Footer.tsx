import { memo } from "react";
import AppleLogo from "@/../public/icon/AppleLogo.svg";
import AndroidLogo from "@/../public/icon/AndroidLogo.svg";
import FacebookIcon from "@/../public/icon/FacebookLogo.svg";
import LinkedinLogo from "@/../public/icon/LinkedinLogo.svg";

import Image from "next/image";
import Link from "next/link";
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

const Footer = () => (
  <div className="ml-[244px] pb-7 w-4/5 px-3 text-center ">
    <div className="flex justify-between h-[52px] items-end border-t border-[#312E37]">
      <p className="text-[#959595] text-[14px]">
        2023 © CareerAi | Design by AlyStudio
      </p>
      <div className="flex gap-[22px] items-center">
        <Link
          href={"/terms-and-conditions"}
          className="text-[#959595] text-[14px]"
        >
          Terms use
        </Link>
        <Link href={"/privacy-policy"} className="text-[#959595] text-[14px]">
          Privacy Policy
        </Link>
        <div className="flex gap-[21px]">
          {tabOption.map((item, i) => (
            <a href={item.href} key={i}>
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default memo(Footer);
