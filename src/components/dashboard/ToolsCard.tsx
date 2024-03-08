"use client";
import { useTourContext } from "@/context/TourContext";
import { chevronRight } from "@/helpers/iconsProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteConfirmationModal from "../common/ConfirmationModal";

const ToolsCard = ({
  title,
  description,
  link,
  icon,
  bgColor1,
  bgColor2,
  isActive,
  action,
}: {
  title: string;
  description: string;
  link: string;
  icon: any;
  bgColor1: string;
  bgColor2: string;
  isActive: boolean;
  action: string;
}) => {
  const {
    resumeElementRef,
    coverLetterElementRef,
    linkedinElementRef,
    emailElementRef,
    bidElementRef,
    coachElementRef,
    reviewElementRef,
    finderElementRef,
    atsElementRef,
  } = useTourContext();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const getRef = (title: any, ref: any) => {
    switch (title) {
      case "Resume Builder":
        resumeElementRef.current = ref;
        break;
      case "Generator Cover Letters":
        coverLetterElementRef.current = ref;
        break;
      case "Keyword Optimize Your LinkedIn":
        linkedinElementRef.current = ref;
        break;
      case "Personalized Email Generator":
        emailElementRef.current = ref;
        break;
      case "Consulting Bids Generator":
        bidElementRef.current = ref;
        break;
      case "Career Coach":
        coachElementRef.current = ref;
        break;
      case "Review Resume by AI":
        reviewElementRef.current = ref;
        break;
      case "AI Job Finder":
        finderElementRef.current = ref;
        break;
      case "ATS Scan Your Resume":
        atsElementRef.current = ref;
        break;
      default:
        return null;
    }
  };
  const handleOpenConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
  };
  return (
    <div
      ref={(ref) => getRef(title, ref)}
      className="dark:bg-transparent dark:border-none dark:rounded-none rounded-md bg-[#ffffff94] border-[#b6b8b6]"
    >
      {action === "coming soon" ? (
        <div className="flex flex-row items-start justify-between gap-2 p-3 text-white no-underline">
          <div className="">
            <div
              className={`rounded-full flex justify-center items-center bg-gradient-to-b ${bgColor1} ${bgColor2} w-12 h-12 `}
            >
              <Image
                width={
                  title !== "Resume Builder" &&
                  title !== "AI Job Finder" &&
                  title !== "ATS Scan Your Resume"
                    ? 48
                    : 36
                }
                height={
                  title !== "Resume Builder" &&
                  title !== "AI Job Finder" &&
                  title !== "ATS Scan Your Resume"
                    ? 48
                    : 36
                }
                className="p-1 text-white"
                src={icon}
                alt="Not Found"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-base font-semibold dark:text-white text-gray-950">
              {title}
            </h2>
            <p className=" flex-1 dark:text-[#959595]  text-gray-950 mt-[6px] font-normal text-sm ">
              {description}
            </p>
            <div className="align-bottom ">
              <button
                className={`no-underline text-sm mt-[11px] flex items-center uppercase text-[#959595] dark:hover:text-gray-300 hover:text-gray-950 font-semibold`}
                onClick={handleOpenConfirmationModal}
              >
                {action} <i className="ml-2">{chevronRight}</i>
              </button>
              {confirmationModal && (
                <div
                  id="default-modal"
                  onClick={() => {
                    setConfirmationModal(!confirmationModal);
                  }}
                  tabIndex={-1}
                  aria-hidden="true"
                  className=" overflow-y-auto overflow-x-hidden fixed !top-20 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full m-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* <!-- Modal header --> */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Feature In Development
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="default-modal"
                          onClick={() => {
                            setConfirmationModal(!confirmationModal);
                          }}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      {/* <!-- Modal body --> */}
                      <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500   dark:text-gray-400">
                          This particular feature is still under construction
                          and will be available soon. We appreciate your
                          patience and enthusiasm. Stay tuned for updates and
                          thank you for choosing us to enhance your career
                          journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Link
          href={link}
          className="flex flex-row items-start justify-between gap-2 p-3 text-white no-underline"
        >
          <div className="">
            <div
              className={`rounded-full flex justify-center items-center bg-gradient-to-b ${bgColor1} ${bgColor2} w-12 h-12 `}
            >
              <Image
                width={
                  title !== "Resume Builder" &&
                  title !== "AI Job Finder" &&
                  title !== "ATS Scan Your Resume"
                    ? 48
                    : 36
                }
                height={
                  title !== "Resume Builder" &&
                  title !== "AI Job Finder" &&
                  title !== "ATS Scan Your Resume"
                    ? 48
                    : 36
                }
                className="p-1 text-white"
                src={icon}
                alt="Not Found"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-base font-semibold dark:text-white text-gray-950">
              {title}
            </h2>
            <p className=" flex-1 dark:text-[#959595]  text-gray-950 mt-[6px] font-normal text-sm ">
              {description}
            </p>
            <div className="align-bottom ">
              <Link
                href={link}
                className={`no-underline text-sm mt-[11px] flex items-center uppercase text-[#959595] dark:hover:text-gray-300 hover:text-gray-950 font-semibold`}
              >
                {action} <i className="ml-2">{chevronRight}</i>
              </Link>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ToolsCard;
