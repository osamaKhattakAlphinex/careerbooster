"use client";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import { setField as setFieldRegister } from "@/store/registerSlice";
import { useEffect, useState } from "react";
import ThemeToggler from "../../Themetoggler";

import Image from "next/image";
import "@/app/(private_route)/dashboard.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";
  const role = data?.user?.role;

  const userData = useSelector((state: any) => state.userData);

  return (
    <nav
      // className={`navbar navbar-expand-lg fixed-top ${
      //   theme === "dark" ? "bg-dark" : "bg-white"
      // }`}
      className={`navbar navbar-expand-lg fixed-top  dark:bg-[#11121C] bg-gray-100 on-over  headroom headroom--top headroom--not-bottom `}
    >
      <div className="head_container container">
        {/* <!-- Logo --> */}

        <Link className="navbar-brand flex justify-between m-0" href="/">
          <div className="flex justify-center items-center ">
            <Image
              width={80}
              height={74}
              src="/trans-icon1.png"
              alt="icon"
              className="w-[42px] lg:w-[80px]  sm:m-0"
            />
            <span className="lg:ml-[-15px] logo-text lg:font-semibold">
              CareerBooster
            </span>
          </div>
          <div>
            <span className="lg:hidden">
              <ThemeToggler />
            </span>
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <div className="navbar-toggler-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </Link>

        {/* <!-- Navbar content --> */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-content-inner mt-2 ms-lg-auto d-flex justify-around  flex-lg-row align-lg-center gap-[100px]  gap-lg-10 p-2 p-lg-0">
            <ul className="navbar-nav gap-lg-2 gap-xl-5 visible ">
              <li className="nav-item dropdown mt-0">
                <Link className="nav-link " href="/">
                  Home
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link className={`nav-link`} href="/about">
                  About
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className={`nav-link`} href="/blogs">
                  Blog
                </Link>
              </li> */}
              <li className="nav-item mt-0">
                <Link className="nav-link " href="/use-cases">
                  Use cases
                </Link>
              </li>
              <li className="nav-item mt-0">
                <Link className="nav-link " href="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item mt-0">
                <Link className="nav-link " href="/contact">
                  Contact
                </Link>
              </li>
              {!isAuth && (
                <Link className="nav-link " href="/login">
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
                          className=" block px-4 py-2 text-sm no-underline theme-text-2 dark:hover:bg-gray-600 hover:bg-blue-100"
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
                              className="-mr-1 h-5 w-5 theme-text-2"
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
                            className="absolute right-0 z-10 mt-0  menu-dropdown w-56 origin-top-right rounded-md  shadow-lg "
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
                                className=" block px-4 py-2 text-sm no-underline theme-text-2"
                                role="menuitem"
                                id="menu-item-0"
                              >
                                Dashboard
                              </Link>
                              <Link
                                href="/profile-review"
                                className=" block px-4 py-2 text-sm no-underline theme-text-2"
                                role="menuitem"
                                id="menu-item-1"
                              >
                                Edit Profile
                              </Link>
                              <button
                                type="button"
                                className=" block w-full px-4 py-2 text-left text-sm"
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
                        className="absolute  right-0 z-10 mt-0 menu-dropdown w-56 origin-top-right rounded-md  shadow-lg "
                        role="menu"
                        onMouseOver={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <div className="py-1 " role="none">
                          {/* <!-- Active: "bg-gray-100 ", Not Active: "text-gray-700" --> */}
                          <Link
                            href={role === "admin" ? "/admin" : "/dashboard"}
                            className=" block px-4 py-2 text-sm no-underline theme-text-2 dark:hover:bg-gray-600 hover:bg-blue-100"
                            role="menuitem"
                            id="menu-item-0"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/profile-review"
                            className=" block px-4 py-2 text-sm no-underline theme-text-2 dark:hover:bg-gray-600 hover:bg-blue-100"
                            role="menuitem"
                            id="menu-item-1"
                          >
                            Edit Profile
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
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link href="/register" className="btn theme-outline-btn">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          {/* <!-- Navbar toggler button --> */}
          <span className="hidden lg:block xl:block">
            <ThemeToggler />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;