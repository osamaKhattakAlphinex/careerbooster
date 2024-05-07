"use client";
import Link from "next/link";
import { useFormik } from "formik";
import { useRef, useState } from "react";

export default function JobSearchForm() {
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");

  return (
    <>
      <section id="JobSearchForm" className="mb-10">
        <h1 className="dark:text-gray-100 text-gray-950 font-extrabold text-[24px] text-center mb-4">
          Find Your Next Career Job
        </h1>
        <div
          className="form rounded-md dark:bg-black bg-gray-100 shadow-md mx-20 "
          // style={{ width: "max-content" }}
        >
          <form action="" className="flex gap-6 px-10 py-6 mx-auto w-full">
            <div className="group flex flex-row justify-start items-center gap-3 p-3 border-[1px] border-gray-600 rounded-lg w-1/2 dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff]">
              <span className="text-gray-800 dark:text-gray-100">
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
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full text-base text-gray-900 bg-transparent outline-none dark:text-gray-100"
                placeholder="Job title or search keyword"
              />
            </div>
            <div className="group flex flex-row justify-start items-center gap-3 p-3 border-[1px] border-gray-600 rounded-lg w-1/2 dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff]">
              <span className="text-gray-800 dark:text-gray-100">
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
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full text-base text-gray-900 bg-transparent outline-none dark:text-gray-100"
                placeholder="Location"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}