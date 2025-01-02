import { crossIconSmall } from "@/helpers/iconsProvider";
import Link from "next/link";
import React from "react";

const ApplicantProfiles = ({ profiles, setShowProfiles }) => {
  return (
    <div className="absolute inset-0 z-30 w-full h-full bg-black/90 overflow-y-scroll">
      <div className="mx-auto text-center w-full h-full pt-12">
        <div className="flex justify-between px-10">
          <h1 className="py-2 text-lg font-semibold text-gray-100 dark:text-gray-100">
            Applicant Profiles
          </h1>
          <div
            className="mt-5 cursor-pointer text-gray-100 dark:text-gray-100"
            onClick={() => setShowProfiles(false)}
          >
            {crossIconSmall}
          </div>
        </div>
        <br />
        <div className="flex flex-wrap justify-center">
          {profiles.length ? (
            profiles.map((profile, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
              >
                <div className=" w-full bg-gray-100 p-3 rounded-md shadow-md flex flex-col justify-center items-start">
                  <h2 className=" text-gray-950">
                    <strong>{profile.name}</strong>
                  </h2>
                  <p className="text-xs text-gray-500">
                    Applied on: <strong>{profile.appliedDate}</strong>
                  </p>
                  <Link
                    href={profile.profileLink}
                    target="_blank"
                    className="text-xs bg-blue-600 rounded hover:bg-blue-800 px-2 py-1.5 mt-2 text-gray-100"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center">No Applications</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfiles;
