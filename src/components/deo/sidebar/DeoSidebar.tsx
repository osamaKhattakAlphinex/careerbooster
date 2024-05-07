"use client";
import ThemeToggler from "@/components/Themetoggler";
import ThemeChanger from "@/components/common/themeSwitcher";
import {
  IconUsersicon,
  antIcon,
  hamburgerIcon,
  crossIcon,
} from "@/helpers/iconsProvider";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

type SidebarItemsType = {
  training: boolean;
  prompts: boolean;
  users: boolean;
};

const Menu = () => {
  const [sidebarToggler, setSideBarToggler] = useState<SidebarItemsType>({
    training: false,
    prompts: false,
    users: false,
  });
  return (
    <div className="h-screen overflow-y-auto bg-gray-800 no-scrollbar">
      <div className="w-full h-full ">
        <div className="p-3 text-center sm:p-4">
          <h1 className="text-base font-bold text-white sm:text-2xl">
            CareerBooster.AI
          </h1>
          <div className="flex flex-row items-center justify-center gap-2 mt-3">
            <Link href="/">
              <div className="grid w-6 h-6 bg-indigo-700 rounded-md shadow-md sm:w-8 sm:h-8 place-content-center">
                <span className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
              </div>
            </Link>
            <div className="grid w-6 h-6 bg-green-700 rounded-md shadow-md sm:w-8 sm:h-8 place-content-center">
              {/* <ThemeToggler /> */}
              <ThemeChanger />
            </div>
            <div className="grid w-6 h-6 rounded-md shadow-md sm:w-8 sm:h-8 bg-rose-700 place-content-center">
              <button onClick={() => signOut()}>
                <span className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <ul className="flex flex-col h-full p-0 pb-4 overflow-y-scroll text-sm sm:text-base">
          <li className="p-2 mb-1 sm:p-4">
            <Link
              href="/admin"
              className="text-white no-underline hover:no-underline hover:text-white/80"
            >
              <span className="flex flex-row items-center justify-start gap-2 text-white cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-6 sm:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                  />
                </svg>
                Dashboard
              </span>
            </Link>
          </li>

        </ul>
        <div className="text-center">
          <hr />
          <span className="text-white/70">&copy; careerbooster.ai</span>
        </div>
      </div>
    </div>
  );
};

const DeoSidebar = () => {
  const [menuToggler, setMenuToggler] = useState<boolean>(false);

  const handleMenu = () => {
    setMenuToggler(!menuToggler);
  };

  return (
    <>
      <button
        onClick={handleMenu}
        className="absolute p-2 text-gray-200 rounded-full sm:hidden top-3 right-3"
      >
        {menuToggler ? crossIcon : hamburgerIcon}
      </button>

      <div
        className={`absolute sm:relative max-h-screen sm:hidden w-9/12 ${
          menuToggler
            ? "transition-left transition-all duration-500 left-0"
            : "-left-[100%]"
        }`}
      >
        <Menu />
      </div>
      <div className="relative max-h-screen xs:hidden sm:block sm:col-span-3 ">
        <Menu />
      </div>
    </>
  );
};

export default DeoSidebar;
