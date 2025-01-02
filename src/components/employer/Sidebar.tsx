"use client";
import ThemeChanger from "@/components/common/themeSwitcher";
import { hamburgerIcon, crossIcon, userGroup } from "@/helpers/iconsProvider";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Menu = () => {
  
  return (
    <div className="h-screen overflow-y-auto bg-gray-50 dark:bg-gray-800 no-scrollbar">
      <div className="w-full h-full ">
        <div className="p-3 text-center sm:p-4">
          <h1 className="text-base font-bold text-gray-950 dark:text-white sm:text-2xl">
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
        <ul className="flex flex-col p-0 pb-4 h-[calc(100%_-_140px)] text-sm sm:text-base">
          <li className="p-2 mb-1 sm:p-4 hover:bg-gray-200 hover:dark:bg-gray-700 ">
            <Link
              href="/employer"
              className="text-white no-underline hover:no-underline hover:text-white/80"
            >
              <span className="flex flex-row items-center justify-start gap-2 text-gray-950 dark:text-white cursor-pointer">
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

          {/* Other Menu Items */}
          <li className="p-2 mb-1 sm:p-4 hover:bg-gray-200 hover:dark:bg-gray-700">
            <Link
              href="/employer/job-board"
              className="text-white no-underline hover:no-underline hover:text-white/80"
            >
              <span className="flex flex-row items-center justify-start gap-2 text-gray-950 dark:text-white cursor-pointer">
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
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
                Job Board
              </span>
            </Link>
          </li>

          <li className="p-2 mb-1 sm:p-4 hover:bg-gray-200 hover:dark:bg-gray-700">
            <Link
              href="/employer/job-profiles"
              className="text-white no-underline hover:no-underline hover:text-white/80"
            >
              <span className="flex flex-row items-center justify-start gap-2 text-gray-950 dark:text-white cursor-pointer">
                {userGroup}
                Job Seeker Profiles
              </span>
            </Link>
          </li>

          {/* <li className="p-2 mb-1 sm:p-4 hover:bg-gray-200 hover:dark:bg-gray-700">
            <Link
              href="/employer/find-talent"
              // title="Coming Soon"
              className="text-white/40 no-underline hover:no-underline hover:text-white/80"
            >
              <span className="flex flex-row items-center justify-start gap-2 text-gray-950/40 dark:text-white/40 cursor-pointer">
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
                    d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                  />
                </svg>
                Find Talent 🔒
              </span>
            </Link>
          </li> */}
        </ul>
        <div className="text-center">
          <hr/>
          <span className="text-gray-950/70 dark:text-white/70 ">&copy; careerbooster.ai</span>
        </div>
      </div>
    </div>
  );
};

const EmployerSidebar = () => {
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
      <div className="relative max-h-screen xs:hidden sm:block sm:col-span-2 ">
        <Menu />
      </div>
    </>
  );
};

export default EmployerSidebar;
