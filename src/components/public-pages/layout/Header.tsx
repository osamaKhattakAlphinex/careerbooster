"use client";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import ThemeToggler from "../../Themetoggler";

import Image from "next/image";
import "@/app/(private_route)/dashboard.css";
import ThemeChanger from "@/components/common/themeSwitcher";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";
  const role = data?.user?.role;

  const userData = useSelector((state: any) => state.userData);
  console.log("userData", userData);

  return (
    <nav
      // className={`navbar navbar-expand-lg fixed-top ${
      //   theme === "dark" ? "bg-dark" : "bg-white"
      // }`}
      className={`py-5 translate-y-[0%] opacity-[1] fixed top-0 left-0 right-0 z-50 dark:bg-gray-950 bg-gray-100 on-over shadow-lg  dark:text-gray-100 text-gray-900`}
    >
      <div className="container flex justify-between xs:w-full items-center xs:mx-auto">
        {/* <!-- Logo --> */}

        <Link
          className="xs:flex xs:justify-between  xs:w-full  m-0 xs:ease-in-out xs:duration-300 xs:transition-all "
          href="/"
        >
          <div className="flex justify-center items-center ">
            <Image
              width={80}
              height={74}
              src="/trans-icon1.png"
              alt="icon"
              className="w-[42px] lg:w-[80px]  sm:m-0"
            />
            <span className="lg:ml-[-15px] logo-text lg:font-semibold dark:text-[#e6f85e] text-gray-950">
              CareerBooster
            </span>
          </div>
          <div className="flex xs:flex-row  xs:justify-between items-center gap-4">
            <span className="lg:hidden">
              <ThemeChanger />
            </span>
            {!mobileMenuOpen ? (
              <button
                className={`lg:hidden block xs:ease-in-out xs:duration-300 xs:transition-all`}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className="">
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
                </div>
              </button>
            ) : (
              <button
                className="xs:ease-in-out xs:duration-300 xs:transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </Link>

        {/* <!-- Navbar content --> */}
        <div className="ml-auto lg:block xs:hidden">
          <div className=" mt-2 flex flex-row items-center gap-10  p-2 ">
            <ul
              className={`flex lg:gap-2 xl:gap-5  dark:text-[#fff] text-gray-900 `}
            >
              <li className="  mt-0 px-3 ">
                <Link
                  className=" dark:text-gray-100 text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className=" mt-0 px-3 ">
                <Link
                  className=" dark:text-gray-100 whitespace-nowrap text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	"
                  href="/use-cases"
                >
                  Use cases
                </Link>
              </li>
              <li className=" mt-0 px-3 ">
                <Link
                  className=" dark:text-gray-100 text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li className=" mt-0 px-3 ">
                <Link
                  className=" dark:text-gray-100 text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              {!isAuth && (
                <Link
                  className="dark:text-gray-100 text-gray-900 no-underline hover:text-[0#000ff9c] dark:hover:text-[#e6f85e dark:focus:text-[#e6f85e] focus:text-[#0000ff9c] px-3"
                  href="/login"
                >
                  Login
                </Link>
              )}
            </ul>
            <div className="visible">
              {isAuth ? (
                <>
                  <div className="relative inline-block text-left">
                    {/* if the screen is on mobile */}
                    {typeof window !== "undefined" &&
                    /Mobile/.test(navigator.userAgent) ? (
                      <div>
                        {userData.firstName + " " + userData.lastName}
                        <Link
                          href={role === "admin" ? "/admin" : "/dashboard"}
                          className=" block px-4 py-2 text-sm no-underline dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                          role="menuitem"
                          id="menu-item-0"
                        >
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          className=" block w-full px-4 py-2 text-left text-sm dark:hover:bg-gray-600 hover:bg-blue-100"
                          role="menuitem"
                          id="menu-item-3"
                          onClick={() => signOut()}
                        >
                          Log out
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <button
                            type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-1   font-semibold   text-xs"
                            id="menu-button"
                            // onMouseOver={() => setDropdownOpen(true)}
                            // onMouseLeave={() => setDropdownOpen(false)}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                          >
                            {/* <svg
                              className="-mr-1 h-5 w-5 dark:text-gray-100 text-gray-950"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </button>
                        </div>
                        {/* {dropdownOpen && (
                          <div
                            className="absolute right-0 z-10 mt-0 bg-gray-100  dark:bg-gray-950 w-56 origin-top-right rounded-md  shadow-lg "
                            role="menu"
                            onMouseOver={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                          >
                            <div className="py-1" role="none">
                              <Link
                                href={
                                  role === "admin" ? "/admin" : "/dashboard"
                                }
                                className=" block px-4 py-2 text-sm no-underline dark:text-gray-100 text-gray-950"
                                role="menuitem"
                                id="menu-item-0"
                              >
                                Dashboard
                              </Link>
                              <Link
                                href="/profile-review"
                                className=" block px-4 py-2 text-sm no-underline dark:text-gray-100 text-gray-950"
                                role="menuitem"
                                id="menu-item-1"
                              >
                                Edit Profile
                              </Link>
                              <button
                                type="button"
                                className=" block w-full px-4 py-2 text-left text-sm dark:text-gray-100 text-gray-950"
                                role="menuitem"
                                id="menu-item-3"
                                onClick={() => signOut()}
                              >
                                Log out
                              </button>
                            </div>
                          </div>
                        )} */}
                      </>
                    )}

                    {dropdownOpen && (
                      <div
                        className="absolute !border dark:!border-gray-500  !border-gray-300 bg-gray-100 text-gray-950  right-0 z-10 dark:bg-gray-950 w-44 origin-top-right rounded-md mt-3  shadow-2xl"
                        role="menu"
                        onMouseOver={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <div className="py-1 px-1 rounded-lg" role="none">
                          <Link
                            href="#"
                            className=" block px-2 py-2 cursor-default text-sm no-underline rounded-sm dark:text-gray-400 text-gray-400 "
                            role="menuitem"
                            id="menu-item-0"
                          >
                            {userData.firstName + " " + userData.lastName}
                          </Link>
                          <Link
                            href={role === "admin" ? "/admin" : "/dashboard"}
                            className="block px-2 py-2 text-sm no-underline dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 rounded-sm hover:bg-blue-100"
                            role="menuitem"
                            id="menu-item-0"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/profile-review"
                            className=" block px-2 py-2 text-sm no-underline rounded-sm dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                            role="menuitem"
                            id="menu-item-1"
                          >
                            Edit Profile
                          </Link>
                          <button
                            type="button"
                            className=" block w-full px-2 py-2 text-left rounded-sm text-sm dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                            role="menuitem"
                            id="menu-item-3"
                            onClick={() => signOut()}
                          >
                            Log out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="no-underline whitespace-nowrap px-[1rem] font-[500] text-[1rem] py-[.85rem] rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c]"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          {/* <!-- Navbar toggler button --> */}
          <span className="hidden lg:block xl:block ml-2">
            <ThemeChanger />
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={` container  lg:hidden  mx-auto   justify-between xs:w-full items-center     w-full ${
          mobileMenuOpen ? "xs:flex  " : "hidden"
        }`}
      >
        {/* <!-- Navbar content --> */}
        <div className="p-0">
          <div className="  flex    py-4 px-2 items-start  gap-10 mt-6">
            <ul
              className={`flex flex-col gap-4   dark:text-[#fff] text-gray-900`}
            >
              <li className="  mt-0 px-3 ">
                <Link
                  className=" dark:text-gray-100 text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className=" mt-0 px-3 ">
                <Link
                  className=" dark:text-gray-100 text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	"
                  href="/use-cases"
                >
                  Use cases
                </Link>
              </li>
              <li className=" mt-0 px-3 ">
                <Link
                  className=" dark:text-gray-100 text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li className=" mt-0 px-3 ">
                <Link
                  className=" dark:text-gray-100 text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              {!isAuth && (
                <Link
                  className="dark:text-gray-100 text-gray-900 no-underline hover:text-[0#000ff9c] dark:hover:text-[#e6f85e dark:focus:text-[#e6f85e] focus:text-[#0000ff9c] px-3"
                  href="/login"
                >
                  Login
                </Link>
              )}
            </ul>
            <div className="visible">
              {isAuth ? (
                <>
                  <div className="relative inline-block text-left">
                    {/* if the screen is on mobile */}
                    {typeof window !== "undefined" &&
                    /Mobile/.test(navigator.userAgent) ? (
                      <div>
                        {userData.firstName + " " + userData.lastName}
                        <Link
                          href={role === "admin" ? "/admin" : "/dashboard"}
                          className=" block px-4 py-2 text-sm no-underline dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                          role="menuitem"
                          id="menu-item-0"
                        >
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          className=" block w-full px-4 py-2 text-left text-sm dark:hover:bg-gray-600 hover:bg-blue-100"
                          role="menuitem"
                          id="menu-item-3"
                          onClick={() => signOut()}
                        >
                          Log out
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <button
                            type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-1 border-[1px] py-2  font-semibold   text-xs"
                            id="menu-button"
                            onMouseOver={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                          >
                            {userData.firstName + " " + userData.lastName}
                            <svg
                              className="-mr-1 h-5 w-5 dark:text-gray-100 text-gray-950"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        {dropdownOpen && (
                          <div
                            className="absolute right-0 z-10 mt-0 bg-gray-100  dark:bg-gray-950 w-56 origin-top-right rounded-md  shadow-lg "
                            role="menu"
                            onMouseOver={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                          >
                            <div className="py-1" role="none">
                              {/* <!-- Active: "bg-gray-100 ", Not Active: "text-gray-700" --> */}
                              <Link
                                href={
                                  role === "admin" ? "/admin" : "/dashboard"
                                }
                                className=" block px-4 py-2 text-sm no-underline dark:text-gray-100 text-gray-950"
                                role="menuitem"
                                id="menu-item-0"
                              >
                                Dashboard
                              </Link>
                              <Link
                                href="/profile-review"
                                className=" block px-4 py-2 text-sm no-underline dark:text-gray-100 text-gray-950"
                                role="menuitem"
                                id="menu-item-1"
                              >
                                Edit Profile
                              </Link>
                              <button
                                type="button"
                                className=" block w-full px-4 py-2 text-left text-sm dark:text-gray-100 text-gray-950"
                                role="menuitem"
                                id="menu-item-3"
                                onClick={() => signOut()}
                              >
                                Log out
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {dropdownOpen && (
                      <div
                        className="absolute border-2 border-gray-100 dark:border-gray-950 bg-gray-100 text-gray-950  right-0 z-10 mt-0 dark:bg-gray-950 w-56 origin-top-right rounded-md  shadow-lg "
                        role="menu"
                        onMouseOver={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <div className="py-1 " role="none">
                          {/* <!-- Active: "bg-gray-100 ", Not Active: "text-gray-700" --> */}
                          <Link
                            href={role === "admin" ? "/admin" : "/dashboard"}
                            className=" block px-4 py-2 text-sm no-underline dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                            role="menuitem"
                            id="menu-item-0"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/profile-review"
                            className=" block px-4 py-2 text-sm no-underline dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                            role="menuitem"
                            id="menu-item-1"
                          >
                            Edit Profile
                          </Link>
                          <button
                            type="button"
                            className=" block w-full px-4 py-2 text-left text-sm dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                            role="menuitem"
                            id="menu-item-3"
                            onClick={() => signOut()}
                          >
                            Log out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="no-underline px-[.85rem] font-[500] text-[.75rem] py-[.6rem] rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c]"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
