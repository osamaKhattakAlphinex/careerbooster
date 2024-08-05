"use client";
import { formatStringWithCommas } from "@/helpers/DateRangeFilter";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { refreshIconRotating } from "@/helpers/iconsProvider";
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
type JobProfile = {
  userId: string;
  score: number;
  firstName: string;
  lastName: string;
  desiredJobTitle: string;
  expectedSalary: string;
  locationPreference: string;
  jobTitle: string;
};

const SingleJob = ({ singleJobId, employer = false }) => {
  const [singleJob, setSingleJob] = useState<any>();
  const [talentLoading, setTalentLoading] = useState<boolean>(false);
  const [showTalentProfiles, setShowTalentProfiles] = useState<boolean>(false);
  const [jobProfiles, setJobProfiles] = useState<JobProfile[] | []>([]);
  const userData = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (singleJobId) {
      fetch(`/api/deo/?findOne=${singleJobId}`, {
        method: "GET",
      }).then(async (response) => {
        const res = await response.json();
        if (res.success) {
          setSingleJob(res.data);
        }
      });
    }
  }, [singleJobId]);

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

  const findingTalent = async (jobDesc: string) => {
    try {
      setTalentLoading(true);
      const resp = await axios.post("/api/find-talent", {
        jobDescription: jobDesc,
      });
      if (resp.status === 200) {
        setJobProfiles(resp.data.result);
        setTalentLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTalentLoading(false);
      setShowTalentProfiles(true);
    }
  };
  return (
    <>
      <div
        className={`flex flex-col gap-4 md:mx-10 xs:mx-2 rounded-md shadow-lg dark:border dark:border-gray-100 dark:bg-black bg-gray-100 ${
          employer ? "md:mt-0 xs:mt-0" : "md:mt-40 xs:mt-20"
        } mb-10 md:p-10 xs:p-4`}
      >
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
            {singleJob?.link && !employer && (
              <Link
                target="_blank"
                href={singleJob?.link}
                className=" text-base rounded-md px-4 py-1 border-2 dark:border-gray-100 !text-gray-950 dark:hover:!text-gray-100 bg-white hover:bg-transparent"
              >
                Apply now
              </Link>
            )}
            {singleJob?.addedBy === "employer" && !employer && (
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
          className="text-left text-gray-950 dark:text-gray-100"
          dangerouslySetInnerHTML={{
            __html: singleJob?.jobDescription,
          }}
        ></div>
        <div className="my-8 xs:mx-auto md:mx-0">
          {singleJob?.link && !employer && (
            <Link
              target="_blank"
              href={singleJob?.link}
              className=" text-base rounded-md px-4 py-2 border-2 dark:border-gray-100 !text-gray-950 dark:hover:!text-gray-100 bg-white hover:bg-transparent"
            >
              Apply now
            </Link>
          )}
          {singleJob?.link && userData._id && userData.role !== "employer" && (
            <Link
              target="_blank"
              href={`/resume-builder?jobId=${singleJobId}`}
              className=" text-base rounded-md px-4 py-2 border-2 dark:border-gray-100 !text-gray-950 dark:hover:!text-gray-100 bg-white hover:bg-transparent ml-4"
            >
              Create My Resume For This Job
            </Link>
          )}
          {employer && (
            <button
              onClick={() => findingTalent(singleJob.jobDescription)}
              className=" text-base rounded-md px-4 py-2 border-2 dark:border-gray-100 !text-gray-950 dark:hover:!text-gray-100 bg-white hover:bg-transparent ml-4"
            >
              {talentLoading
                ? refreshIconRotating
                : "Find Top Candidates for this Job Using AI"}
            </button>
          )}
        </div>
      </div>
      {employer && showTalentProfiles && (
        <div className="flex flex-col gap-4 md:mx-10 xs:mx-2 rounded-md shadow-lg dark:border dark:border-gray-100 dark:bg-black bg-gray-100 mb-10 md:p-10 xs:p-4">
          <h2 className="text-gray-950 dark:text-gray-100 text-2xl md:text-left xs:text-center">
            Top Candidates for {singleJob?.jobTitle}
          </h2>
          {jobProfiles.length
            ? jobProfiles.map((profile: JobProfile) => (
                <div
                  key={profile.userId}
                  className="bg-white text-gray-950 shadow-md rounded-lg p-6"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-gray-600">
                    <strong>{profile.jobTitle}</strong>
                  </p>
                  <br />
                  <p className="text-gray-600 mb-1">
                    <strong>Desired Job Title:</strong>{" "}
                    {profile.desiredJobTitle}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Expected Salary:</strong> $
                    {formatStringWithCommas(profile.expectedSalary)}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Location Preference:</strong>{" "}
                    {profile.locationPreference}
                  </p>
                  <Link
                    href={`/profile/${profile.userId}`}
                    target="_blank"
                    className="text-xs bg-blue-600 rounded hover:bg-blue-800 px-2 py-1.5 mt-2 text-gray-100"
                  >
                    View Profile
                  </Link>
                </div>
              ))
            : "No Profiles to Show"}
        </div>
      )}
    </>
  );
};

export default SingleJob;
