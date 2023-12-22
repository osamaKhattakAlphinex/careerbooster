"use client";
import ThemeToggler from "@/components/Themetoggler";
import ThemeChanger from "@/components/themeSwitcher";
import { IconUsersicon, antIcon } from "@/helpers/iconsProvider";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

type SidebarItemsType = {
  training: boolean;
  prompts: boolean;
  users: boolean;
};

const AdminSidebar = () => {
  const [sidebarToggler, setSideBarToggler] = useState<SidebarItemsType>({
    training: false,
    prompts: false,
    users: false,
  });

  return (
    <div className="w-full">
      <div className="p-4 text-center">
        <h1 className="text-2xl text-white">CareerBooster.AI</h1>
        <div className="flex flex-row justify-center items-center gap-2">
          <Link href="/">
            <div className="h-8 w-8 bg-indigo-700 rounded-md shadow-md grid place-content-center">
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
          <div className="h-8 w-8 bg-green-700 rounded-md shadow-md grid place-content-center">
            {/* <ThemeToggler /> */}
            <ThemeChanger />
          </div>
          <div className="h-8 w-8 bg-rose-700 rounded-md shadow-md grid place-content-center">
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
      <ul className="flex-col flex p-0">
        <li className="mb-1 p-4">
          <Link
            href="/admin"
            className="text-white no-underline hover:no-underline  hover:text-white/80"
          >
            <span className="cursor-pointer text-white flex flex-row gap-2 justify-start items-center">
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

        {/* Training Model */}

        <li className="mb-1 p-4 ">
          <span
            onClick={() =>
              setSideBarToggler({
                ...sidebarToggler,
                training: !sidebarToggler.training,
              })
            }
            className="flex flex-row items-center justify-between cursor-pointer text-white/80"
          >
            <span className="flex flex-row items-center">
              <span className="mr-2">{antIcon}</span>
              <span>Training Model</span>
            </span>
            {sidebarToggler.training ? (
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
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <span className=" self-end">
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            )}
          </span>
          <ul
            className={`${
              sidebarToggler.training ? "flex" : "hidden"
            } p-0 flex-col ml-4 mt-2`}
          >
            <li className="px-5 py-2">
              <Link
                href="/admin/trained-models"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Trained Models
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/admin/train-bot"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Start Training Model (new)
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/admin/fine-tuning"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Fine-Tuning Models
              </Link>
            </li>
          </ul>
        </li>

        {/* Prompts */}
        <li className="mb-1 p-4">
          <span
            className="flex flex-row items-center justify-between cursor-pointer text-white/80"
            onClick={() =>
              setSideBarToggler({
                ...sidebarToggler,
                prompts: !sidebarToggler.prompts,
              })
            }
          >
            <span className="flex flex-row items-center">
              <span className="mr-2">
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
                    d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </span>
              <span>Configure Prompts</span>
            </span>
            {sidebarToggler.prompts ? (
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
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <span className=" self-end">
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            )}
          </span>
          <ul
            className={`${
              sidebarToggler.prompts ? "flex" : "hidden"
            } p-0 flex-col ml-4 mt-2`}
          >
            <li className="px-5 py-2">
              <Link
                href="/linkedin-prompts-configuration"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                linkedIn
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/linkedin-tools-prompts-configuration"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                linkedIn Tools
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/resume-prompts-configuration"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Resume
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/review-resume-configuration"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Review Resume
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/cover-letter-prompt-configuration"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Cover Letter
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/biography-prompts-configuration"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Biography
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/consulting-bid-prompt-configuration"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Consulting Bids
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/email-prompt-configuration"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Personalized Emails
              </Link>
            </li>
          </ul>
        </li>

        {/* Users */}
        <li className="mb-1 p-4">
          <span
            className="flex flex-row items-center justify-between cursor-pointer text-white/80"
            onClick={() =>
              setSideBarToggler({
                ...sidebarToggler,
                users: !sidebarToggler.users,
              })
            }
          >
            <span className="flex flex-row items-center">
              <span className="mr-2">
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
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </span>
              <span>Users</span>
            </span>
            {sidebarToggler.users ? (
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
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <span className=" self-end">
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            )}
          </span>
          <ul
            className={`${
              sidebarToggler.users ? "flex" : "hidden"
            } p-0 flex-col ml-4 mt-2`}
          >
            <li className="px-5 py-2">
              <Link
                href="/admin/users"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                Users
              </Link>
            </li>
            <li className="px-5 py-2">
              <Link
                href="/admin/leads"
                className=" text-white no-underline hover:no-underline  hover:text-white/80"
              >
                LinkedIn Users (leads)
              </Link>
            </li>
          </ul>
        </li>

        {/* Other Menu Items */}
        <li className="mb-1 p-4">
          <Link
            href="/admin/user-packages"
            className="text-white no-underline hover:no-underline  hover:text-white/80"
          >
            <span className="cursor-pointer text-white flex flex-row gap-2 justify-start items-center">
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
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
              Packages
            </span>
          </Link>
        </li>
        <li className="mb-1 p-4">
          <Link
            href="/admin/coupons"
            className="text-white no-underline hover:no-underline  hover:text-white/80"
          >
            <span className="cursor-pointer text-white flex flex-row gap-2 justify-start items-center">
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
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                />
              </svg>
              Coupons
            </span>
          </Link>
        </li>
        <li className="mb-1 p-4">
          <Link
            href="/admin/notifications"
            className="text-white no-underline hover:no-underline  hover:text-white/80"
          >
            <span className="cursor-pointer text-white flex flex-row gap-2 justify-start items-center">
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
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              Noifications
            </span>
          </Link>
        </li>
        <li className="mb-1 p-4">
          <Link
            href="/admin/payments"
            className="text-white no-underline hover:no-underline  hover:text-white/80"
          >
            <span className="cursor-pointer text-white flex flex-row gap-2 justify-start items-center">
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
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Payments
            </span>
          </Link>
        </li>
        <li className="mb-1 p-4">
          <Link
            href="/admin/contacts"
            className="text-white no-underline hover:no-underline  hover:text-white/80"
          >
            <span className="cursor-pointer text-white flex flex-row gap-2 justify-start items-center">
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
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                />
              </svg>
              Contacts (emails)
            </span>
          </Link>
        </li>
      </ul>
      <div className="text-center">
        <hr />
        <span>&copy; careerbooster.ai</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
