"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/logo.svg";
import {
  userCircle,
  menuIcon,
  dollarIcon,
  homeIcon,
  powerIcon,
  inboxArrowDown,
  userGroup,
  deviceTablet,
  clipboard,
  xMark,
  keyIcon,
  bid,
} from "@/helpers/iconsProvider";
import "@/app/(private_route)/dashboard.css";

import { useSelector } from "react-redux";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Button from "../Button";

const items = [
  { icon: homeIcon, text: "Dashboard", url: "/dashboard" },
  { icon: clipboard, text: "Resumes", url: "/resume-builder" },
  { icon: deviceTablet, text: "Cover Letters", url: "/cover-letter-generator" },
  { icon: userGroup, text: "LinkedIn Tool", url: "/linkedin-generator" },
  { icon: inboxArrowDown, text: "Email Bot", url: "/email-bot" },
  { icon: dollarIcon, text: "Billing Detail", url: "/billing" },
  { icon: bid, text: "Consulting Bot", url: "/consulting-bids-bot" },
  { icon: userCircle, text: "Profile", url: "/profile-review" },
  { icon: keyIcon, text: "Change Password", url: "/change-current-password" },
  { icon: powerIcon, text: "Logout", url: "/dashboard" },
];
const pagesArray = ["/subscribe", "/subscribed"];
const SideBar = () => {
  const pathname: any = usePathname();
  const userData = useSelector((state: any) => state.userData);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const router = useRouter();
  // const pagesArray = [
  //   "/dashboard",
  //   "/cover-letter-generator",
  //   "/resume-builder",
  //   "/linkedin-generator",
  // ];

  if (pagesArray?.includes(pathname)) return <></>;
  const handleMouseOver = (index: any) => {
    setHoveredItem(index);
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };

  return (
    <>
      {/* Mobile Menu Button */}

      <div
        className={`sidebarTop sidebar fixed px-6 top-0 w-[234px]       flex items-center transition-all duration-200   ${
          isOpen ? "sideBar1" : "sideBar-bg-opacity"
        }`}
      >
        <Image src={logo} alt="" className="w-35 h-16" />
        <div
          className="w-5 h-5 text-zinc-600 lg:hidden ml-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Use your icon here for mobile menu toggle */}
          {isOpen ? xMark : menuIcon}
        </div>
      </div>
      <div
        className={`sidebar fixed w-[234px]  top-0 flex justify-center sideBar2  mt-16 h-[100%] overflow-y-auto  transition-all ${
          isOpen
            ? "translate-x-0 lg:translate-x-0"
            : "-translate-x-full lg:translate-x-0 " // Apply opacity only on small screens
        }`}
      >
        <div className="overflow-auto ">
          <div>
            <div className="px-7 py-[6px] flex">
              <div className="mr-4">
                {/* <Image
                  src={profile}
                  alt=""
                  className="w-10 h-10 object-cover border-[1px] border-fuchsia-600 rounded-full"
                /> */}
                <div className="w-10 h-10 uppercase flex items-center justify-center bg-gray-300 text-gray-600 rounded-full">
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </div>
              </div>
              <div>
                <h1 className="sideBar_text text-base gap-1 font-semibold mb-0 ">
                  {userData.firstName + " " + userData.lastName}
                </h1>
                <Link
                  href="/profile-review"
                  className="text-[14px] no-underline text-[#B324D7] p-.5 sideBar_p_text"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <ul className="pb-3 pt-[8px] pl-0 mb-0">
              {items?.map((item, index) => (
                <li
                  key={index}
                  className="py-[3px] inline-block cursor-pointer transition-all"
                >
                  {item.text !== "Logout" ? (
                    <Link
                      href={item.url}
                      className={`px-7 text-base flex capitalize items-center 
                        `}
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={handleMouseOut}
                      onClick={() => setIsOpen(!isOpen)}
                      style={{
                        opacity: hoveredItem === index ? 1 : 0.7,
                        color:
                          hoveredItem === index ? "red" : "rgb(115, 115, 115)",
                        textDecoration: "none",
                      }}
                    >
                      <div
                        className={`w-6 h-6 inline-block pr-2 
                        ${pathname === item.url ? "li-text-active" : "li-text"}
                         `}
                      >
                        {item.icon}
                      </div>
                      <h2
                        className={`text-base ml-3 mb-0 font-normal ${
                          pathname === item.url ? "li-text-active" : "li-text"
                        }`}
                      >
                        {item.text}
                      </h2>
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
                          hoveredItem === index
                            ? "white"
                            : "rgb(115, 115, 115)",
                        textDecoration: "none",
                      }}
                    >
                      <div className="w-6 h-6 inline-block pr-2 li-text">
                        {item.icon}
                      </div>
                      <h2 className="text-base ml-3 mb-0 font-normal li-text">
                        {item.text}
                      </h2>
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="w-[160px] md:w-[170px] h-[170px] mt-3  mx-7 flex flex-col justify-center items-center rounded-xl bg-gradient-to-b from-fuchsia-600 to-indigo-500">
              <p className="text-white px-4 mb-4 text-[15px] text-center font-semibold">
                Upgrade to Pro version to get hired faster
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    router.push("/subscribe");
                  }}
                  btnText="Upgrade"
                  textColor={`text-white`}
                  // isActive={true}
                  bgColor="bg-zinc-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
