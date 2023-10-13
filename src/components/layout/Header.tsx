"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import { useEffect, useState } from "react";
import ThemeToggler from "../Themetoggler";
import useTheme from "@/lib/useTheme";
// import useTheme from "@/lib/useTheme";

const Header = () => {
  // const [theme] = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";
  const role = data?.user?.role;
  const [theme, toggleTheme] = useTheme();

  // Session
  const { data: session } = useSession();

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  // when user is authenticated get userdata if not exists
  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      try {
        // Fetch userdata if not exists in Redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );
        const { user } = await res.json();

        dispatch(setUserData(user));
        dispatch(setIsLoading(false));
        dispatch(setField({ name: "isFetched", value: true }));
        // if there is a file in files array of a user then set it as defaultResumeFile
        if (user?.files && user?.files?.length > 0) {
          dispatch(
            setField({ name: "defaultResumeFile", value: user?.files[0] })
          );
        }
        dispatch(
          setField({ name: "wizardCompleted", value: user.wizardCompleted })
        );

        if (user?.userPackage) {
          // get user package details
          const res2 = await fetch(
            `/api/users/getUserPackageDetails?id=${user?.userPackage}`
          );
          const data = await res2.json();
          if (data.success) {
            const { userPackage } = data;
            // set user package details to redux
            dispatch(setField({ name: "userPackageData", value: userPackage }));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);

  // if (pathname === "/login" || pathname === "/register") return null;

  return (
    <nav
      // className={`navbar navbar-expand-lg fixed-top ${
      //   theme === "dark" ? "bg-dark" : "bg-white"
      // }`}
      className={`navbar navbar-expand-lg fixed-top bg-hover-scroll on-over headroom headroom--top headroom--not-bottom`}
    >
      <div className="container">
        {/* <!-- Logo --> */}

        <Link
          className="navbar-brand"
          href="/"
          // style={{
          //   width: "450px",
          // }}
        >
          <img src="/assets/images/logo.png" alt="" />
        </Link>

        {/* <!-- Navbar toggler button --> */}

        {/* <!-- Navbar content --> */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-content-inner ms-lg-auto d-flex flex-column flex-lg-row align-lg-center gap-4 gap-lg-10 p-2 p-lg-0">
            <ul className="navbar-nav gap-lg-2 gap-xl-5 visible ">
              <li className="nav-item dropdown">
                <Link className="nav-link active " href="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link`} href="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link`} href="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " href="/use-cases">
                  Use cases
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " href="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
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
                  {/* <Link
                 href={role === "admin" ? "/admin" : "/dashboard"}
                   className="btn btn-outline-primary-dark"
                 >
                   Dashboard
                 </Link> */}
                  <div className="relative inline-block text-left">
                    {/* if the screen is on mobile */}
                    {typeof window !== "undefined" &&
                    /Mobile/.test(navigator.userAgent) ? (
                      <div>
                        {userData.firstName + " " + userData.lastName}
                        <Link
                          href={role === "admin" ? "/admin" : "/dashboard"}
                          className=" block px-4 py-2 text-sm no-underline theme-text-2 hover:bg-gray-600"
                          role="menuitem"
                          id="menu-item-0"
                        >
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          className=" block w-full px-4 py-2 text-left text-sm hover:bg-gray-600"
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
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2  font-semibold  border text-xs"
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
                                className=" block px-4 py-2 text-sm no-underline theme-text-2 hover:bg-gray-600"
                                role="menuitem"
                                id="menu-item-0"
                              >
                                Dashboard
                              </Link>
                              <Link
                                href="/profile-review"
                                className=" block px-4 py-2 text-sm no-underline theme-text-2 hover:bg-gray-600"
                                role="menuitem"
                                id="menu-item-1"
                              >
                                Edit Profile
                              </Link>
                              <button
                                type="button"
                                className=" block w-full px-4 py-2 text-left text-sm hover:bg-gray-600"
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
                        className="absolute right-0 z-10 mt-0 menu-dropdown w-56 origin-top-right rounded-md  shadow-lg "
                        role="menu"
                        onMouseOver={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <div className="py-1" role="none">
                          {/* <!-- Active: "bg-gray-100 ", Not Active: "text-gray-700" --> */}
                          <Link
                            href={role === "admin" ? "/admin" : "/dashboard"}
                            className=" block px-4 py-2 text-sm no-underline theme-text-2 hover:bg-gray-600"
                            role="menuitem"
                            id="menu-item-0"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/profile-review"
                            className=" block px-4 py-2 text-sm no-underline theme-text-2 hover:bg-gray-600"
                            role="menuitem"
                            id="menu-item-1"
                          >
                            Edit Profile
                          </Link>
                          <button
                            type="button"
                            className=" block w-full px-4 py-2 text-left text-sm hover:bg-gray-600"
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
              {/* <ThemeToggler /> */}
            </div>
          </div>
        </div>
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Header;
