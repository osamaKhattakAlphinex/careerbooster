"use client";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Image from "next/image";
import "@/app/(private_route)/dashboard.css";
import ThemeChanger from "@/components/common/themeSwitcher";
import { Fade, Slide } from "react-awesome-reveal";
import { usePathname } from "next/navigation";
import { RootState } from "@/store/store";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";
  const [active, setActive] = useState<string>("");
  const role = data?.user?.role;

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setActive("");
    } else {
      const segments = pathname.split("/");
      if (segments) {
        setActive(segments[1]);
      }
    }
  }, [pathname]);

  const userData = useSelector((state: RootState) => state.userData);

  return (
    <nav
      className={`translate-y-[0%] xs:h-[68.88px] lg:h-[90.06px] opacity-[1] fixed top-0 left-0 w-full right-0 z-50 dark:bg-gray-950 bg-gray-100  on-over shadow-lg  dark:text-gray-100 text-gray-900`}
    >
      <div className="flex items-center justify-between mx-auto pt-1 lg:pt-4 dark:shadow-sm  sm:container xs:max-w-full xs:px-2">
        {/* <!-- Logo --> */}

        <Link
          className="m-0 xs:flex xs:justify-between xs:w-full xs:ease-in-out xs:duration-300 xs:transition-all "
          href="/"
        >
          <div className="flex items-center justify-center ">
            <Image
              width={200}
              height={200}
              src="/dark_logo.png"
              alt="icon"
              className="sm:m-0  dark:block hidden"
            />
            <Image
              width={200}
              height={200}
              src="/white_logo.png"
              alt="icon"
              className="sm:m-0  dark:hidden block"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4 lg:hidden xs:flex-row xs:justify-between">
          <span className="lg:hidden">
            <ThemeChanger />
          </span>
          {!mobileMenuOpen ? (
            <button
              className={`lg:hidden block xs:ease-in-out xs:duration-300 xs:transition-all`}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
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
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          ) : (
            <button
              className="xs:ease-in-out xs:duration-300 xs:transition-all"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
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

        {/* <!-- Navbar content --> */}
        {/* For desktop */}
        <div className="hidden ml-auto lg:block">
          <div className="flex flex-row items-center gap-4 p-2">
            <ul
              className={`flex lg:gap-2 xl:gap-5  dark:text-[#fff] text-gray-900 py-2`}
            >
              <li className="px-3 mt-0 ">
                <Link
                  className={` ${
                    active === ""
                      ? "text-[#6A4DFF] font-bold dark:text-[#e6f85e] "
                      : " dark:text-gray-100 text-gray-900 font-semibold "
                  }  capitalize  text-sm  no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]`}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="px-3 mt-0 ">
                <Link
                  className={` ${
                    active === "career-boost-ai-suite"
                      ? "text-[#6A4DFF] font-bold dark:text-[#e6f85e] "
                      : " dark:text-gray-100 text-gray-900 font-semibold "
                  }  capitalize  text-sm  no-underline whitespace-nowrap hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]`}
                  href="/career-boost-ai-suite"
                >
                  CareerBoost AI Suite
                </Link>
              </li>
              <li className="px-3 mt-0 ">
                {/* <Link
                  className={` ${
                    active === "about"
                      ? "text-[#6A4DFF] font-bold dark:text-[#e6f85e] "
                      : " dark:text-gray-100 text-gray-900 font-semibold "
                  }  capitalize  text-sm  no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]`}
                  href="/about"
                >
                  About
                </Link> */}
                <Link
                  className={` ${
                    active === "executive-recruitment"
                      ? "text-[#6A4DFF] font-bold dark:text-[#e6f85e] "
                      : " dark:text-gray-100 text-gray-900 font-semibold "
                  }  capitalize  text-sm  no-underline whitespace-nowrap hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]`}
                  href="/executive-recruitment"
                >
                  Executive Recruitment
                </Link>
              </li>
            
              <li className="px-3 mt-0 ">
                <Link
                  className={`
                         ${
                           active === "find-job4me"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  capitalize font-semibold text-sm whitespace-nowrap no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/find-job4me"
                >
                  Find Job4Me
                </Link>
              </li>
              <li
                className="px-3 mt-0 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === "job-board"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                   text-sm capitalize no-underline whitespace-nowrap hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/job-board"
                >
                  AI-Powered Job Board
                </Link>
              </li>
              {/* <li className="px-3 mt-0 ">
                <Link
                  className={`
                         ${
                           active === "use-cases"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  capitalize font-semibold text-sm whitespace-nowrap no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/use-cases"
                >
                  Use cases
                </Link>
              </li> */}
              {/* <li className="px-3 mt-0 ">
                <Link
                  className={`
                         ${
                           active === "find-jobs"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  capitalize font-semibold text-sm whitespace-nowrap no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/find-jobs"
                >
                  Find Jobs
                </Link>
              </li> */}
              {/* <li className="px-3 mt-0 ">
                <Link
                  className={`
                         ${
                           active === "pricing"
                             ? "text-[#6A4DFF] font-bold  dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  capitalize font-semibold text-sm no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li className="px-3 mt-0 ">
                <Link
                  className={` 
                         ${
                           active === "contact"
                             ? "text-[#6A4DFF] font-bold dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  capitalize font-semibold text-sm no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/contact"
                >
                  Contact
                </Link>
              </li> */}
              {!isAuth && (
                <Link
                  className={`
                         ${
                           active === "login"
                             ? "text-[#6A4DFF] font-bold dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  capitalize font-semibold text-sm no-underline hover:text-[0#000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c] px-3`}
                  href="/login"
                >
                  Login
                </Link>
              )}
            </ul>
            <div className="visible">
              {isAuth ? (
                <div className="relative inline-block text-left lg:block xs:hidden">
                  <button
                    type="button"
                    className="grid place-content-center w-full justify-center gap-x-1.5 rounded-md px-1  font-semibold   text-xs"
                    id="menu-button"
                    // onMouseOver={() => setDropdownOpen(true)}
                    // onMouseLeave={() => setDropdownOpen(false)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute !border dark:!border-gray-500  !border-gray-300 bg-gray-100 text-gray-950  right-0 z-10 dark:bg-gray-950 w-44 origin-top-right rounded-md mt-3  shadow-2xl"
                      role="menu"
                      onMouseOver={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <div className="px-1 py-1 rounded-lg" role="none">
                        <Link
                          href="#"
                          className="block px-2 py-2 text-lg text-gray-400 no-underline rounded-sm cursor-default dark:text-gray-400"
                          role="menuitem"
                          id="menu-item-0"
                        >
                          {userData.firstName + " " + userData.lastName}
                        </Link>
                        <Link
                          href={
                            role === "admin" || role === "deo"
                              ? role === "admin"
                                ? "/admin"
                                : "/deo"
                              : "/dashboard"
                          }
                          className="block px-2 py-2 text-lg no-underline rounded-sm dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                          role="menuitem"
                          id="menu-item-0"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/profile-review"
                          className="block px-2 py-2 text-lg no-underline rounded-sm dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
                          role="menuitem"
                          id="menu-item-1"
                        >
                          Edit Profile
                        </Link>
                        <button
                          type="button"
                          className="block w-full px-2 py-2 text-lg text-left rounded-sm dark:text-gray-100 text-gray-950 dark:hover:bg-gray-600 hover:bg-blue-100"
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
              ) : (
                <Link
                  href="/register"
                  className="no-underline whitespace-nowrap px-2 py-2 text-lg leading-none rounded-md text-[#6a4dff]  dark:text-[#e6f85e] border capitalize border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff]  hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e]  dark:hover:text-[#11121c]"
                >
                  Get started
                </Link>
              )}
            </div>
            <div>
              {/* <!-- Navbar toggler button --> */}
              <span className="hidden ml-2 lg:block xl:block">
                <ThemeChanger />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={` max-h-fit min-h-screen xs:overflow-y-auto   lg:hidden  mx-auto max-w-full justify-between xs:w-full items-center dark:bg-gray-950/95 bg-gray-100/95  w-full ${
          mobileMenuOpen ? "xs:flex  " : "hidden"
        }`}
      >
        {/* <!-- Navbar content --> */}
        <div className="w-full p-0">
          <Slide duration={800} direction="right">
            <ul
              className={`flex flex-col gap-8 justify-center items-center   dark:text-[#fff] text-gray-900`}
            >
              <li
                className="px-3 mt-0 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === ""
                             ? "text-[#6A4DFF] font-bold  dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                   text-lg capitalize no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]  `}
                  href="/"
                >
                  Home
                </Link>
              </li>
              {isAuth && (
                <li
                  className="px-3 mt-0 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link
                    className=" dark:text-gray-100 text-lg capitalize text-gray-900 no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]"
                    href={role === "admin" ? "/admin" : "/dashboard"}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li
                className="px-3 mt-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === "career-boost-ai-suite"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                   text-lg  capitalize no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/career-boost-ai-suite"
                >
                  CareerBoost AI Suite
                </Link>
              </li>
              <li
                className="px-3 mt-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* <Link
                  className={`
                         ${
                           active === "about"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                   text-xl  capitalize no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/about"
                >
                  About
                </Link> */}
                <Link
                  className={`
                         ${
                           active === "executive-recruitment"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                   text-lg  capitalize no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/executive-recruitment"
                >
                  Executive Recruitment
                </Link>
              </li>

              <li
                className="px-3 mt-0 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === "find-job4me"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  text-lg  capitalize no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/find-job4me"
                >
                  Find Job4Me
                </Link>
              </li>
              <li
                className="px-3 mt-0 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === "job-board"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                   text-lg capitalize no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/job-board"
                >
                  AI-Powered Job Board
                </Link>
              </li>
              {/* <li
                className="px-3 mt-0 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === "use-cases"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                   text-xl  capitalize no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/use-cases"
                >
                  Use cases
                </Link>
              </li> */}
              {/* <li
                className="px-3 mt-0 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === "find-jobs"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                   text-xl  capitalize no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/find-jobs"
                >
                  Find Jobs
                </Link>
              </li> */}
              {/* <li
                className="px-3 mt-0 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === "pricing"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  
                   capitalize text-xl no-underline hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li
                className="px-3 mt-0 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className={`
                         ${
                           active === "contact"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                  
                   capitalize no-underline text-xl hover:text-[#0000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c]	`}
                  href="/contact"
                >
                  Contact
                </Link>
              </li> */}

              {isAuth ? (
                <li
                  className="px-3 mt-0 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-lg text-left capitalize dark:text-gray-100 text-gray-950"
                    role="menuitem"
                    id="menu-item-3"
                    onClick={() => signOut()}
                  >
                    Log out
                  </button>
                </li>
              ) : (
                <li
                  className="px-3 mt-0 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link
                    className={`
                         ${
                           active === "login"
                             ? "text-[#6A4DFF] font-bold   dark:text-[#e6f85e]  "
                             : " dark:text-gray-100 text-gray-900 font-semibold "
                         }
                    capitalize no-underline text-lg hover:text-[0#000ff9c] dark:hover:text-[#e6f85e] dark:focus:text-[#e6f85e] focus:text-[#0000ff9c] px-3`}
                    href="/login"
                  >
                    login
                  </Link>
                </li>
              )}
              {!isAuth && (
                <li
                  className="px-3 mt-0 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link
                    href="/register"
                    // className="no-underline  capitalize font-[500] text-[.75rem] py-[.6rem] rounded-md text-[#6a4dff] dark:text-[#e6f85e] border-[1px] border-[#6a4dff] hover:border-[#6a4dff] hover:bg-[#6a4dff] hover:border-none hover:text-gray-100 dark:bg-[#11121c] dark:border-[#e6f85e]  dark:hover:bg-[#e6f85e] dark:hover:border-none dark:hover:text-[#11121c]"
                    className="dark:text-gray-100 text-gray-900 capitalize no-underline text-lg hover:text-[0#000ff9c] dark:hover:text-[#e6f85e dark:focus:text-[#e6f85e] focus:text-[#0000ff9c] px-3"
                  >
                    Get started
                  </Link>
                </li>
              )}
            </ul>
          </Slide>
        </div>
      </div>
    </nav>
  );
};

export default Header;
