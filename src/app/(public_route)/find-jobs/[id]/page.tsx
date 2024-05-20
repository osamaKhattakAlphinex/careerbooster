"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ViewJobPage({ params }: { params: { id: string } }) {
  const [singleJob, setSingleJob] = useState<any>({});
  useEffect(() => {
    if (params.id) {
      fetch(`/api/deo/?findOne=${params.id}`, {
        method: "GET",
      }).then(async (response) => {
        const res = await response.json();
        if (res.success) {
          setSingleJob(res.data);
          console.log(res.data);
        }
      });
    }
  }, [params]);
  return (
    <>
      <div className="flex  items-center justify-center py-40 ">
        <h1 className="text-gray-100 font-extrabold text-4xl">
          FIND YOUR NEXT CAREER GIG
        </h1>
      </div>
      <div className="flex flex-col gap-4 mx-10 rounded-md shadow-md text-gray-100 bg-black mt-[-100px] mb-10 p-10">
        <h2 className="text-gray-100 font-extrabold text-2xl">
          {singleJob?.jobTitle}
        </h2>
        <div className="flex w-full border-b-[1px] border-white pb-4">
          <div className=" w-3/4 flex items-center gap-10 text-base ">
            <div className="w-[60%]">
              Employer :{" "}
              <span className="font-medium"> {singleJob?.employer}</span>{" "}
            </div>
            <div className="w-[30%]">
              Date Posted :{" "}
              <span className="font-medium">
                {" "}
                {getFormattedDate(singleJob?.updatedAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 w-[25%]">
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
              : <span className="font-medium">{singleJob?.location}</span>
            </div>
          </div>
          <div className="w-1/4 flex justify-end ml-auto ">
            {singleJob?.link && (
              <Link
                target="_blank"
                href={singleJob?.link}
                className=" text-base rounded-md px-4 py-2 !text-gray-950 hover:!text-gray-100 bg-white hover:bg-transparent"
              >
                Apply now
              </Link>
            )}
          </div>
        </div>
        <div className="content text-gray-100">{singleJob?.jobDescription}</div>
        <div className="my-8 ">
          {singleJob?.link && (
            <Link
              target="_blank"
              href={singleJob?.link}
              className=" text-base rounded-md px-4 py-2 !text-gray-950 hover:!text-gray-100 bg-white hover:bg-transparent"
            >
              Apply now
            </Link>
          )}
        </div>
      </div>
    </>
  );
}