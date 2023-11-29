"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/logo.svg";
import profile from "@/../public/profile/man.jpg";
import {
  arrowLeft,
  menuIcon,
  dollarIcon,
  flagIcon,
  homeIcon,
  linkIcon,
  powerIcon,
  settingIcon,
  starIcon,
  ticketIcon,
} from "@/helpers/iconsProvider";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const items = [
  { icon: homeIcon, text: "Dashboard", url: "/dashboard" },
  { icon: dollarIcon, text: "My Billing", url: "/dashboard" },
  { icon: flagIcon, text: "User Guide", url: "/dashboard" },
  { icon: ticketIcon, text: "My Tickets", url: "/dashboard" },
  { icon: starIcon, text: "Write Review", url: "/dashboard" },
  { icon: linkIcon, text: "Affiliate Program", url: "/dashboard" },
  { icon: settingIcon, text: "Settings", url: "/dashboard" },
  { icon: powerIcon, text: "Logout", url: "/dashboard" },
];

const SideBar = () => {
  const userData = useSelector((state: any) => state.userData);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const pagesArray = [
    "/dashboard",
    "/cover-letter-generator",
    "/resume-builder",
    "/linkedin-generator",
  ];
  const handleMouseOver = (index: any) => {
    setHoveredItem(index);
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };
  // const pathname: any = usePathname();
  // if (!pagesArray?.includes(pathname)) return <></>;
  return (
    <div
      className={`fixed pb-10 top-0 w-[244px] bg-zinc-900 overflow-y-auto z-100000 transition-all ${
        isOpen
          ? "lg:bg-opacity-100 bg-opacity-100 "
          : "lg:bg-opacity-100 bg-opacity-0 " // Apply opacity only on small screens
      }`}
    >
      {/* Mobile Menu Button */}
      <div className=" px-6 py-[10px] flex justify-between items-center">
        <Image src={logo} alt="" className="w-35 h-14" />
        <div
          className="w-5 h-5 text-zinc-600 lg:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Use your icon here for mobile menu toggle */}
          {isOpen ? arrowLeft : menuIcon}
        </div>
      </div>
      <div className={`lg:block ${isOpen ? "block" : "hidden"} `}>
        <div>
          <div className="px-7 py-2 flex">
            <div className="mr-4">
              <Image
                src={profile}
                alt=""
                className="w-10 h-10 object-cover border-[1px] border-fuchsia-600 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-gray-200 text-base gap-1 font-semibold ">
                {userData.firstName + " " + userData.lastName}
              </h1>
              <Link
                href="/profile-review"
                className="text-[14px] text-[#B324D7] p-.5"
              >
                Edit Profile
              </Link>
            </div>
          </div>
          <div className="px-7 py-[8px]">
            <Button
              btnText="Resume Review"
              textColor={`text-white`}
              isActive={true}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <ul className="pb-20 pt-[8px] pl-0">
            {items?.map((item, index) => (
              <li
                key={index}
                className="py-[11px] inline-block cursor-pointer transition-all text-neutral-500 hover:text-white"
              >
                {item.text !== "Logout" ? (
                  <Link
                    href={item.url}
                    className="px-7 text-base flex capitalize items-center "
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={handleMouseOut}
                    style={{
                      opacity: hoveredItem === index ? 1 : 0.7,
                      color:
                        hoveredItem === index ? "white" : "rgb(115, 115, 115)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="w-6 h-6 inline-block pr-2">{item.icon}</div>
                    <h2 className="text-base ml-3">{item.text}</h2>
                  </Link>
                ) : (
                  <button
                    className="px-7 text-base flex capitalize items-center "
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={handleMouseOut}
                    onClick={() => signOut()}
                    style={{
                      opacity: hoveredItem === index ? 1 : 0.7,
                      color:
                        hoveredItem === index ? "white" : "rgb(115, 115, 115)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="w-6 h-6 inline-block pr-2">{item.icon}</div>
                    <h2 className="text-base ml-3">{item.text}</h2>
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="w-[190px] h-[210px] mx-7 mt-5 flex flex-col justify-center items-center rounded-xl bg-gradient-to-b from-fuchsia-600 to-indigo-500">
            <p className="text-white px-8 mb-4 text-xl text-center font-semibold">
              Upgrade to Pro version to get hired faster
            </p>
            <Button
              btnText="Upgrade"
              textColor={`text-white`}
              bgColor="bg-zinc-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
