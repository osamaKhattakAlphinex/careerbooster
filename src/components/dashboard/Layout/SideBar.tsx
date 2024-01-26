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
        className={`dark:bg-[#18181B] bg-[e4E9F7] fixed px-2 top-0 w-[234px] z-30 flex items-center transition-all duration-200    ${
          isOpen
            ? "dark:bg-[rgb(24,24,27)] bg-gray-100 "
            : "dark:lg:bg-[#18181B] dark:bg-transparent lg:bg-gray-100 bg-[E4E9F7]"
        }`}
      >
        <div
          className="w-5 h-5 text-zinc-600 lg:hidden flex cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Use your icon here for mobile menu toggle */}
          {isOpen ? xMark : menuIcon}
        </div>
        <Image src={logo} alt="" className="w-35 h-16 md:ml-4" />
      </div>
      <div
        className={`fixed w-[234px] h-screen z-30 top-0 flex justify-center dark:bg-[#18181B] bg-gray-100  mt-16  transition-all  ${
          isOpen
            ? "translate-x-0 lg:translate-x-0"
            : "-translate-x-full lg:translate-x-0 " // Apply opacity only on small screens
        }`}
      >
        <div className=" overflow-scroll pb-4 ">
          <div className="px-7 py-[6px] flex">
            <div className="mr-4">
              <div className="w-10 h-10 uppercase flex items-center justify-center bg-gray-300 text-gray-600 rounded-full">
                {userData.firstName[0]}
                {userData.lastName[0]}
              </div>
            </div>
            <div>
              <h1 className="dark:text-white text-gray-950 text-base gap-1 font-semibold mb-0 ">
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

          <div className="flex flex-col">
            <ul className="pb-3 pt-[8px] pl-0 mb-0">
              {items?.map((item, index) => (
                <li
                  key={index}
                  className="py-[3px] group inline-block cursor-pointer transition-all"
                >
                  {item.text !== "Logout" ? (
                    <Link
                      href={item.url}
                      className={`px-7 text-base flex capitalize items-center 
                      dark:group-hover:text-[#b324d7] group-hover:text-[#b324d7] no-underline	 `}
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={handleMouseOut}
                      onClick={() => setIsOpen(!isOpen)}
                      // style={{
                      //   opacity: hoveredItem === index ? 1 : 0.7,
                      //   color:
                      //     hoveredItem === index ? "red" : "rgb(115, 115, 115)",
                      //   textDecoration: "none",
                      // }}
                    >
                      <div
                        className={`w-6 h-6 inline-block pr-2 
                        ${
                          pathname === item.url
                            ? "dark:text-[#b324d7] text-[#b324d7] font-bold dark:group-hover:text-[#b324d7] group-hover:text-[#b324d7] no-underline	"
                            : "dark:text-[#d9d6d6] text-gray-950 group-hover:text-[#b324d7] dark:group-hover:text-[#b324d7] no-underline	"
                        }
                         `}
                      >
                        {item.icon}
                      </div>
                      <h2
                        className={`text-base ml-3 mb-0 font-normal ${
                          pathname === item.url
                            ? "dark:text-[#b324d7] text-[#b324d7] font-bold group-hover:text-[#b324d7] dark:hover:text-[#b324d7] no-underline	"
                            : "dark:text-[#d9d6d6] text-gray-950 hover:text-[#b324d7] dark:group-hover:text-[#b324d7] no-underline	"
                        }`}
                      >
                        {item.text}
                      </h2>
                    </Link>
                  ) : (
                    <button
                      className="px-7 text-base flex capitalize items-center dark:group-hover:text-[#b324d7] group-hover:text-[#b324d7]"
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={handleMouseOut}
                      onClick={() => signOut()}
                      // style={{
                      //   opacity: hoveredItem === index ? 1 : 0.7,
                      //   color:
                      //     hoveredItem === index
                      //       ? "purple"
                      //       : "rgb(115, 115, 115)",
                      //   textDecoration: "none",
                      // }}
                    >
                      <div className="w-6 h-6  pr-2 dark:text-[#d9d6d6] text-gray-950 hover:text-[#b324d7] dark:group-hover:text-[#b324d7] no-underline		">
                        {item.icon}
                      </div>
                      <h2 className="text-base ml-3 mb-0 dark:text-[#d9d6d6] text-gray-950 hover:text-[#b324d7] dark:group-hover:text-[#b324d7] no-underline	 font-normal	">
                        {item.text}
                      </h2>
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="w-[160px] px-2 py-6 md:w-[170px] mb-10  mx-7 flex flex-col justify-center items-center rounded-xl bg-gradient-to-b from-fuchsia-600 to-indigo-500">
              <p className="text-white px-2 mb-3 text-[15px] text-center font-semibold ">
                Buy more credits
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    router.push("/subscribe");
                  }}
                  btnText="Buy Credits"
                  className={`dark:bg-gray-950 bg-gray-100 dark:text-gray-100 text-gray-950`}
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
