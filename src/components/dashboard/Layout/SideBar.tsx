"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/logo.svg";
import {
  userCircle,
  dollarIcon,
  homeIcon,
  powerIcon,
  userGroup,
  clipboard,
  xMark,
  emailBotSidebarIcon,
  coverLetterSidebarIcon,
} from "@/helpers/iconsProvider";
import "@/app/(private_route)/dashboard.css";

import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Button from "../Button";
import ProfileImageModal from "../ProfileImageModal";
import AvailableCredits from "../AvailableCredits";
import { useTourContext } from "@/context/TourContext";


const pagesArray = ["/subscribe", "/subscribed"];
const SideBar = () => {
  const pathname: any = usePathname();
  const userData = useSelector((state: any) => state.userData);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const imageRef = useRef<any>();
  const [image, setImage] = useState<any>(null);
  const { availableCreditsRef } = useTourContext();
  const items = [
    { icon: homeIcon, text: "My Dashboard", url: "/dashboard" },
    { icon: clipboard, text: "My Resumes", url: "/resume-builder" },
    {
      icon: coverLetterSidebarIcon,
      text: "Cover Letters",
      url: "/cover-letter-generator",
    },
    { icon: userGroup, text: "LinkedIn Optimizer", url: "/linkedin-optimizer" },
    {
      icon: emailBotSidebarIcon,
      text: "Email Assistant",
      url: "/email-assistant",
    },
    { icon: dollarIcon, text: "Billing Details", url: "/billing" },
    // { icon: bid, text: "Consulting Bot", url: "/consulting-bids-bot" },
    { icon: userCircle, text: "Profile", url: `/profile/${userData._id}` },
    { icon: powerIcon, text: "Sign Out", url: "/dashboard" },
  ];
  const imageCroperRef = useRef<any>();

  if (pagesArray?.includes(pathname)) return <></>;
  const handleMouseOver = (index: any) => {
    setHoveredItem(index);
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };
  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1048576) {
        // Check if file size is more than 1MB
        alert("File size exceeds the limit of 1MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image: any = reader.result; // Convert the image blob to base64
        setImage(base64Image); // Set the base64 image in the state
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL (base64)
      imageCroperRef.current.openModal(true);
    }
  };

  const triggerInputClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}

      <ProfileImageModal ref={imageCroperRef} image={image} />

      <div
        className={`dark:bg-[#18181B] bg-[e4E9F7] fixed px-2 top-0 w-[234px] z-30 flex items-center transition-all duration-200    ${
          isOpen
            ? "dark:bg-[rgb(24,24,27)] bg-gray-100 "
            : "dark:lg:bg-[#18181B] dark:bg-transparent lg:bg-gray-100 bg-[E4E9F7]"
        }`}
      >
        <div
          className="flex w-5 h-5 cursor-pointer text-zinc-600 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Use your icon here for mobile menu toggle */}
          {isOpen ? (
            xMark
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          )}
        </div>
        <Link href="/">
          <Image src={logo} alt="" className="h-16 w-35 md:ml-4" />
        </Link>
      </div>
      <div
        className={`fixed w-[234px] h-screen z-30 top-0 flex justify-center dark:bg-[#18181B] bg-gray-100  mt-16  transition-all  ${
          isOpen
            ? "translate-x-0 lg:translate-x-0"
            : "-translate-x-full lg:translate-x-0 " // Apply opacity only on small screens
        }`}
      >
        <div className="pb-4 overflow-auto ">
          <div className="px-7 py-[6px] flex">
            <div className="mr-4">
              <div
                onClick={triggerInputClick}
                className="flex items-center justify-center w-10 h-10 text-center text-white bg-gray-800 rounded-full "
              >
                {userData.profileImage ? (
                  <div className="flex items-center justify-center w-10 h-10 overflow-hidden text-base text-gray-600 uppercase bg-gray-300 rounded-full">
                    <Image
                      src={
                        userData.profileImage !== ""
                          ? userData.profileImage
                          : image
                      }
                      width={100}
                      height={100}
                      alt="Uploaded"
                      className="overflow-hidden cursor-pointer "
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 text-base text-gray-600 uppercase bg-gray-300 rounded-full">
                    {userData.firstName[0]}
                    {userData.lastName[0]}
                  </div>
                )}
                <span className="text-4xl rounded-full cursor-pointer hover:shadow-md hover:bg-gray-100">
                  <input
                    ref={imageRef}
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </span>
              </div>
              <button onClick={triggerInputClick}>
                <input
                  ref={imageRef}
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  onClick={(e: any) => {
                    e.target.value = null; // Reset file input value when clicked
                  }}
                />
              </button>
            </div>
            <div>
              <h1 className="gap-1 mb-0 text-base font-semibold dark:text-white text-gray-950 ">
                {userData.firstName + " " + userData.lastName}
              </h1>
              <Link
                href="/profile-review"
                className="text-[14px] no-underline text-[#B324D7] hover:text-[#D66EE6]  p-.5 sideBar_p_text"
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
                  {item.text !== "Sign Out" ? (
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
                            : "dark:text-[#959595] text-gray-950 group-hover:text-[#b324d7] dark:group-hover:text-[#b324d7] no-underline	"
                        }
                         `}
                      >
                        {item.icon}
                      </div>
                      <h2
                        className={`text-base ml-3 mb-0 font-normal ${
                          pathname === item.url
                            ? "dark:text-[#b324d7] text-[#b324d7] font-bold group-hover:text-[#b324d7] dark:hover:text-[#b324d7] no-underline	"
                            : "dark:text-[#959595] text-gray-950 group-hover:text-[#b324d7] dark:group-hover:text-[#b324d7] no-underline	"
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
                      onClick={() => {
                        localStorage.clear();
                        signOut();
                      }}
                     
                    >
                      <div className="w-6 h-6  pr-2 dark:text-[#959595] text-gray-950 group-hover:text-[#b324d7] dark:group-hover:text-[#b324d7] no-underline		">
                        {item.icon}
                      </div>
                      <h2 className="text-base ml-3 mb-0 dark:text-[#959595] text-gray-950 group-hover:text-[#b324d7] dark:group-hover:text-[#b324d7] no-underline	 font-normal	">
                        {item.text}
                      </h2>
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div
              ref={(ref: any) => (availableCreditsRef.current = ref)}
              className="flex  flex-col justify-center mx-auto mt-6 p-2 rounded-md"
            >
              <AvailableCredits />

              <div className="flex items-center justify-center">
                <Button
                  onClick={() => {
                    router.push("/subscribe");
                  }}
                  btnText="Buy Credits"
                  className={`bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-fuchsia-600 to-indigo-500 !text-gray-100 `}
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
