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
} from "@/helpers/iconsProvider";
import "@/app/(private_route)/dashboard.css";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const items = [
  { icon: homeIcon, text: "Dashboard", url: "/dashboard" },
  { icon: clipboard, text: "Resumes", url: "/resume-builder" },
  { icon: deviceTablet, text: "Cover Letters", url: "/cover-letter-generator" },
  { icon: userGroup, text: "LinkedIn Tool", url: "/linkedin-generator" },
  { icon: inboxArrowDown, text: "Email Bot", url: "/email-bot" },
  { icon: dollarIcon, text: "Consulting Bot", url: "/consulting-bids-bot" },
  { icon: userCircle, text: "Profile", url: "/profile-review" },
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

  // useEffect(() => {
  //   const fullURL = document.referrer; // Assuming document.referrer contains the full URL

  //   // Create a URL object from the full URL
  //   const urlObject = new URL(fullURL);

  //   // Extract the pathname from the URL object
  //   const pathName = urlObject.pathname; // This will give you '/subscribe' or any other path

  //   // If you specifically want to remove the leading slash, you can do:
  //   const trimmedPath = pathName.startsWith("/") ? pathName.slice(1) : pathName;

  //   console.log(trimmedPath); // This will log 'subscribe' without the leading slash

  //   if (trimmedPath === "subscribe") {
  //     window.location.reload();
  //   }
  // }, []);
  // const pathname: any = usePathname();
  // if (!pagesArray?.includes(pathname)) return <></>;
  return (
    <>
      {/* Mobile Menu Button */}

      <div
        className={`sidebarTop sidebar  fixed px-6 top-0  w-[244px]  pb-[10px]  bg-zinc-900 flex items-center transition-all duration-200   ${
          isOpen ? " " : "bg-opacity-0 lg:bg-opacity-100 "
        }`}
      >
        <Image src={logo} alt="" className="w-35 h-14" />
        <div
          className="w-5 h-5 text-zinc-600 lg:hidden ml-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Use your icon here for mobile menu toggle */}
          {isOpen ? xMark : menuIcon}
        </div>
      </div>
      <div
        className={`sidebar fixed pb-20 w-[244px] top-0  mt-16 h-screen bg-zinc-900 overflow-y-auto  transition-all ${
          isOpen
            ? "translate-x-0 lg:translate-x-0"
            : "-translate-x-full lg:translate-x-0 " // Apply opacity only on small screens
        }`}
      >
        <div className="block">
          <div>
            <div className="px-7 py-2 flex">
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
                <h1 className="text-gray-200 text-base gap-1 font-semibold mb-0 ">
                  {userData.firstName + " " + userData.lastName}
                </h1>
                <Link
                  href="/profile-review"
                  className="text-[14px] text-[#B324D7] p-.5 hover:text-[#E6F85E] hover:opacity-80"
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
            <ul className="pb-10 pt-[8px] pl-0">
              {items?.map((item, index) => (
                <li
                  key={index}
                  className="py-[11px] inline-block cursor-pointer transition-all text-neutral-500 hover:text-white"
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
                          hoveredItem === index
                            ? "white"
                            : "rgb(115, 115, 115)",
                        textDecoration: "none",
                      }}
                    >
                      <div
                        className={`w-6 h-6 inline-block pr-2 hover:text-white 
                        ${
                          pathname === item.url
                            ? "text-white"
                            : "text-neutral-500"
                        }
                         `}
                      >
                        {item.icon}
                      </div>
                      <h2
                        className={`text-base ml-3 mb-0 hover:text-white font-normal ${
                          pathname === item.url
                            ? "text-white "
                            : "text-neutral-500"
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
                      <div className="w-6 h-6 inline-block pr-2">
                        {item.icon}
                      </div>
                      <h2 className="text-base ml-3 mb-0 font-normal">
                        {item.text}
                      </h2>
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="w-[190px] h-[210px] sm:mb-10 mx-7 flex flex-col justify-center items-center rounded-xl bg-gradient-to-b from-fuchsia-600 to-indigo-500">
              <p className="text-white px-8 mb-4 text-xl text-center font-semibold">
                Upgrade to Pro version to get hired faster
              </p>
              <Button
                onClick={() => {
                  router.push("/subscribe");
                }}
                btnText="Upgrade"
                textColor={`text-white`}
                bgColor="bg-zinc-900"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
