"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "@/helpers/toast";
import { RootState } from "@/store/store";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ViewJobPage({ params }: { params: { id: string } }) {
  const [singleJob, setSingleJob] = useState<any>();
  const userData = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/deo/?findOne=${params.id}`, {
        method: "GET",
      }).then(async (response) => {
        const res = await response.json();
        if (res.success) {
          setSingleJob(res.data);
        }
      });
    }
  }, [params]);

  const jobProfileToDb = (jobId) => {
    if (
      userData._id &&
      singleJob?.applicationProfiles.some(
        (profile) => profile.profileLink === `/profile/${userData._id}`
      )
    ) {
      showInfoToast("Already Applied to this Job");
      return;
    }
    if (userData._id && userData.role !== "employer") {
      axios
        .put(`/api/deo?jobId=${jobId}`, {
          applicationProfiles: [
            ...singleJob?.applicationProfiles,
            {
              name: `${userData.firstName} ${userData.lastName}`,
              profileLink: `/profile/${userData._id}`,
              appliedDate: getFormattedDate(new Date()),
            },
          ],
          noOfProposals: singleJob.noOfProposals + 1,
        })
        .then((response) => {
          setSingleJob((prev) => {
            return {
              ...prev,
              applicationProfiles: [
                ...singleJob?.applicationProfiles,
                {
                  name: `${userData.firstName} ${userData.lastName}`,
                  profileLink: `/profile/${userData._id}`,
                  appliedDate: getFormattedDate(new Date()),
                },
              ],
              noOfProposals: prev.noOfProposals + 1,
            };
          });

          showSuccessToast("Applied Successfully");
        })
        .catch((err) => console.log("Error occured", err));
    } else {
      showErrorToast("Please Login as User to Apply");
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 md:mx-10 xs:mx-2 rounded-md shadow-lg dark:border dark:border-gray-100 dark:bg-black bg-gray-100 md:mt-40 xs:mt-20 mb-10 md:p-10 xs:p-4">
        <h2 className="text-gray-950 dark:text-gray-100 font-extrabold text-2xl md:text-left xs:text-center">
          {singleJob?.jobTitle}
        </h2>
        <div className="md:flex-row xs:flex-col flex md:text-left xs:text-center  w-full border-b-[1px] border-white pb-4">
          <div className=" md:w-3/4 xs:w-full md:justify-between flex md:flex-row xs:flex-col md:items-center md:gap-10 xs:gap-2 text-base ">
            <div className="">
              Employer :{" "}
              <span className="font-medium"> {singleJob?.employer}</span>{" "}
            </div>
            <div className="">
              Date Posted :{" "}
              <span className="font-medium">
                {" "}
                {getFormattedDate(singleJob?.updatedAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 md:mx-0 xs:mx-auto ">
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
          <div className="md:w-1/4 xs:w-fit flex gap-4 justify-end md:ml-auto xs:mt-4 md:mx-0 xs:mx-auto">
            {singleJob?.link && (
              <Link
                target="_blank"
                href={singleJob?.link}
                className=" text-base rounded-md px-4 py-1 border-2 dark:border-gray-100 !text-gray-950 dark:hover:!text-gray-100 bg-white hover:bg-transparent"
              >
                Apply now
              </Link>
            )}
            {singleJob?.addedBy === "employer" && (
              <button
                onClick={() => jobProfileToDb(singleJob._id)}
                className=" text-base rounded-md px-4 py-1 border-2 dark:border-gray-100 !text-gray-950 dark:hover:!text-gray-100 bg-white hover:bg-transparent"
              >
                Easy Apply
              </button>
            )}
          </div>
        </div>
        <div
          className="md:text-left xs:text-center  text-gray-950 dark:text-gray-100"
          dangerouslySetInnerHTML={{
            __html: singleJob?.jobDescription,
          }}
        ></div>
        <div className="my-8 xs:mx-auto md:mx-0">
          {singleJob?.link && (
            <Link
              target="_blank"
              href={singleJob?.link}
              className=" text-base rounded-md px-4 py-2 border-2 dark:border-gray-100 !text-gray-950 dark:hover:!text-gray-100 bg-white hover:bg-transparent"
            >
              Apply now
            </Link>
          )}
          {singleJob?.link && userData._id && (
            <Link
              target="_blank"
              href={`/resume-builder?jobId=${params.id}`}
              className=" text-base rounded-md px-4 py-2 border-2 dark:border-gray-100 !text-gray-950 dark:hover:!text-gray-100 bg-white hover:bg-transparent ml-4"
            >
              Create My Resume For This Job
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
