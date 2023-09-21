"use client";
import { checkIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
import { useSelector } from "react-redux";

const ProfileCompletionAlert = () => {
  const userData = useSelector((state: any) => state.userData);
  if (userData?.wizardReviewed) {
    return (
      <div
        className="mb-3 w-[96%] items-center rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800 border"
        role="alert"
      >
        <div className="inline-flex">
          <span className="mr-2">{checkIcon}</span>
          Your profile is completed Now you will get better results
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="mb-3 w-[96%] items-center rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800 border"
        role="alert"
      >
        <div className="inline-flex">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          It Seems that you have not reviewed your profile. &nbsp;
          <Link href="/profileReview">
            To get better Results Please review and make changes to profile
          </Link>
        </div>
      </div>
    );
  }
};
export default ProfileCompletionAlert;
