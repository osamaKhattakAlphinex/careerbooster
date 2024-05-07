import { eyeIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

export default function JobCard() {
  return (
    <>
      <div className="card flex  border border-gray-100 bg-black mx-14 px-8 py-10 rounded-md mt-4 shadow-lg">
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 items-center">
            <h2 className="text-gray-100 text-xl font-bold">
              Senior Flutter Developer
            </h2>
            <div className="flex gap-4 items-center">
              <div className="remote flex items-center bg-gray-100 px-2 py-1 rounded-md text-gray-950 text-sm font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                Remote
              </div>
              <div className="full_time bg-gray-100 text-gray-950 px-2 py-1 rounded-md text-sm font-bold">
                Full Time
              </div>
            </div>
          </div>
          <div className="flex text-gray-100 gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
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
            <span className="country text-gray-100 font-medium text-base">
              Country
            </span>
            |
            <span className="state text-gray-100 font-medium text-base">
              State
            </span>
          </div>
          <div className="description flex flex-wrap">
            <p className="text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui saepe
              iste inventore consequuntur nemo quam veritatis adipisci? At
              aliquid amet, libero perspiciatis dolor hic, voluptatem, veritatis
              obcaecati accusamus laborum ex?
            </p>
          </div>
          <div className="buttons flex items-center gap-2 ml-auto">
            <Link
              href="#"
              className="flex items-center gap-2 w-fit rounded-md bg-gray-100 text-gray-950 font-semibold px-3 text-base py-1 hover:bg-transparent hover:text-gray-100 "
            >
              {eyeIcon}
              View Job
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 w-fit rounded-md bg-gray-100 text-gray-950 font-semibold px-3 text-base py-1 hover:bg-transparent hover:text-gray-100"
            >
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
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
