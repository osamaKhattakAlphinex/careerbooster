import { memo } from "react";
import AppleLogo from "@/../public/Ai tools/icon/AppleLogo.svg";
import AndroidLogo from "@/../public/Ai tools/icon/AndroidLogo.svg";
import FacebookIcon from "@/../public/Ai tools/icon/FacebookLogo.svg";
import LinkedinLogo from "@/../public/Ai tools/icon/LinkedinLogo.svg";

import Image from "next/image";
const tabOption = [
  {
    href: "/",
    icon: <Image src={AppleLogo} alt="AppleLogo" width={32} height={32} />,
  },
  {
    href: "/",
    icon: <Image src={AndroidLogo} alt="AndroidLogo" width={32} height={32} />,
  },
  {
    href: "/",
    icon: (
      <Image src={FacebookIcon} alt="FacebookIcon" width={32} height={32} />
    ),
  },
  {
    href: "/",
    icon: <Image src={LinkedinLogo} alt="linkIcon" width={32} height={32} />,
  },
];

const Footer = () => (
  <div className="fixed left-64 bottom-0 pb-7 w-4/5 px-3 text-center">
    <div className="flex justify-between h-[52px] items-end border-t-2 border-zinc-900">
      <p className="text-[#959595] text-4">
        2023 © CareerAi | Design by AlyStudio
      </p>
      <div className="flex gap-[22px] items-center">
        <p className="text-[#959595]">Teams use</p>
        <p className="text-[#959595]">Privacy Policy</p>
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
