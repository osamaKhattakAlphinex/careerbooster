"use client";
import Link from "next/link";
import React from "react";
import ThemeChanger from "../common/themeSwitcher";
import { signOut } from "next-auth/react";

const DeoNavbar = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-12 py-4">
      <div>
        <Link href="/"> CareerBooster.AI</Link>
      </div>

      <div className="flex flex-row items-center justify-between gap-3">
        <div className="grid w-6 h-6 rounded-md shadow-md sm:w-8 sm:h-8 place-content-center">
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
  );
};

export default DeoNavbar;
