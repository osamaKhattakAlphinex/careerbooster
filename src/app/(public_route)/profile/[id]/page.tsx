"use client";
import ProfileResume from "@/components/public-pages/ProfileResume";
import { RootState } from "@/store/store";
import { pdf } from "@react-pdf/renderer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { linkedInIconFilled } from "@/helpers/iconsProvider";
import { formatStringWithCommas } from "@/helpers/DateRangeFilter";
const Page = ({ params }: { params: { id: string } }) => {
  const [active, setActive] = useState("education-card");
  const profileRef = useRef<HTMLDivElement | null>(null);
  const userDetails = useSelector((state: RootState) => state.userData);
  const [userData, setUserData] = useState(userDetails);
  const [userFetched, setUserFetched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userDetails._id) {
      setUserData(userDetails);
      setUserFetched(true);
    }
    if (userDetails._id && params.id === userDetails._id) {
      setLoading(true);
      fetch(`/api/users/${params.id}`, {
        method: "GET",
      })
        .then(async (response) => {
          const res = await response.json();
          if (res.success) {
            setUserFetched(true);
            setUserData(res.user);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userDetails]);
 

  const downloadPdf = async () => {
    const fileName = `${userData.firstName}.pdf`;
    const blob = await pdf(<ProfileResume userData={userData} />).toBlob();
    saveAs(blob, fileName);
  };
  if (!userDetails._id || params.id !== userDetails._id) {
    return (
      <div className=" flex flex-col xs:mt-[90px] lg:mt-52 md:mt-28 md:px-20 xs:px-4 xs:text-center mb-10">
        <span className=" text-[#6a4dff] dark:text-[#e6f85e] text-[20px] ">
          You Don{"'"}t Have Access To This Page
        </span>
      </div>
    );
  }

  return (
    <div className=" flex flex-col xs:mt-[90px] lg:mt-52 md:mt-28 md:px-20 xs:px-4 xs:text-center md:text-left">
      {/* <div
        ref={profileRef}
        className="xs:hidden bg-white flex flex-col items-center justify-center p-8"
      >
        <ProfileResume />
      </div> */}

      {/* {hero-section} */}
      {userFetched ? (
        <>
          <div className="flex md:flex-row xs:flex-col w-full justify-between items-center ">
            <div className="flex flex-col gap-3 xs:w-full md:w-1/2">
              <h2 className="md:text-[28px] xs:text-[24px]">
                HEY, I AM{" "}
                <span className="dark:text-[#E0E360] text-blue-400">
                  {userData?.firstName + " " + userData?.lastName}
                </span>
              </h2>

              <h1 className="md:text-[36px] xs:text-[30px] font-bold text-[#BE4A86]">
                {userData?.experience?.[0]?.jobTitle}
              </h1>

              <ul className="flex items-center gap-3 xs:text-center md:text-left xs:mx-auto md:mx-0 ">
                <li>{userData.email}</li>
                <li>
                  <Link
                    className={`underline${
                      userDetails.linkedin ? "block" : "hidden"
                    }`}
                    href={`${userData.linkedin}`}
                  >
                    {linkedInIconFilled}
                  </Link>
                </li>
                {/* <li>{userData.phone}</li> */}
              </ul>
              <button
                className="rounded-full w-fit px-4 py-2 text-[18px] dark:hover:bg-transparent dark:hover:border dark:hover:border-[#E0E360] dark:hover:text-gray-100 hover:bg-transparent hover:border hover:border-blue-400 hover:text-gray-900 mt-2 dark:text-gray-900  dark:bg-[#E0E360] bg-blue-500 text-gray-100 xs:mx-auto md:mx-0"
                onClick={downloadPdf}
              >
                Download Profile
              </button>
            </div>
            <div className="w-1/2 xs:hidden md:block ">
              {userData.profileImage ? (
                <Image
                  className="rounded-[200px] mx-auto"
                  src={`${userData?.profileImage}`}
                  width={300}
                  height={300}
                  alt="profile-image"
                />
              ) : (
                <Image
                  className="rounded-[200px] mx-auto"
                  src={`/assets/images/default.png`}
                  width={300}
                  height={300}
                  alt="profile-image"
                />
              )}
            </div>
          </div>
          {userDetails.desiredJobTitle && (
            <>
              <div className="py-8 px-4 text-center md:flex-row xs:flex-col  lg:w-[90%] xs:w-full xs:mt-6 md:mt-16 mx-auto flex gap-10 rounded-md bg-gray-900">
                <div className="salary flex md:flex-col xs:flex-row gap-4 md:w-1/3 xs:w-full items-center">
                  <h1 className="text-gray-100 lg:text-[26px] xs:text-[20px] font-semibold">
                    Expected Salary
                  </h1>
                  <h1 className="text-gray-100 lg:text-[20px] md:text-[16px]">
                    {formatStringWithCommas(userData.expectedSalary)} $
                  </h1>
                </div>
                <div className="jobTitle flex md:flex-col xs:flex-row gap-4 md:w-1/3 xs:w-full items-center">
                  <h1 className="text-gray-100 lg:text-[26px] xs:text-[20px] font-semibold">
                    Desired Job Title
                  </h1>
                  <h1 className="text-gray-100 lg:text-[20px] md:text-[16px]">
                    {userData.desiredJobTitle}
                  </h1>
                </div>
                <div className="Location flex md:flex-col xs:flex-row gap-4 md:w-1/3 xs:w-full items-center">
                  <h1 className="text-gray-100 lg:text-[26px] xs:text-[20px] font-semibold">
                    Preferred Location
                  </h1>
                  <h1 className="text-gray-100 lg:text-[20px] md:text-[16px]">
                    {userData.locationPreference}
                  </h1>
                </div>
              </div>
            </>
          )}
          {/* skills-section */}
          <div className="flex w-full flex-col md:py-16 xs:py-6">
            <h1 className="md:text-[36px] xs:text-[30px] font-bold text-center mb-6">
              Skills
            </h1>
            <div className="flex flex-row items-center flex-wrap gap-3 md:w-[75%] xs:w-full mx-auto text-center justify-center">
              {userData?.skills
                ? userData?.skills.map((skill: string) => {
                    return (
                      <>
                        <span className=" rounded-xl xs:text-[16px] md:text-[18px] capitalize w-fit md:py-3 md:px-5 xs:p-2 dark:bg-gray-400 bg-gray-200 text-gray-900">
                          {skill}
                        </span>
                      </>
                    );
                  })
                : "No Skill Found In your resume"}
            </div>
          </div>
          {/* Education and Experience tabs */}

          <div className="md:text-[26px] xs:text-[22px] font-medium text-center text-gray-500 border border-gray-200 dark:text-gray-400 dark:border-gray-700 md:w-[80%] mx-auto md:my-10 xs:mb-10 rounded-lg xs:w-full">
            <ul className="flex  w-full justify-between  -mb-px">
              <li className="me-2 md:w-1/2  md:ml-auto">
                <button
                  onClick={() => {
                    setActive("education-card");
                  }}
                  className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    active === "education-card"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  Experience
                </button>
              </li>
              <li className="me-2 md:w-1/2 ">
                <button
                  onClick={() => {
                    setActive("experience-card");
                  }}
                  className={`inline-block p-4  rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    active !== "education-card"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  } `}
                  aria-current="page"
                >
                  Education
                </button>
              </li>
            </ul>
          </div>

          {/* Education Cards */}
          {active === "education-card" && (
            <div className={` w-full flex`}>
              <ul
                id="education-card "
                className="md:my-8 rounded-md shadow-2xl md:p-10 xs:p-4 lg:full xs:w-full dark:bg-gray-900 bg-gray-200"
              >
                {userData?.experience?.map((experience) => {
                  return (
                    <>
                      <li className="mb-6 flex gap-4 ">
                        <div className="relative md:flex md:flex-col items-center mt-[10px] xs:hidden">
                          <div className="absolute w-[2px] dark:bg-[#E0E360] bg-blue-400 h-[115%]"></div>
                          <div className="flex items-center justify-center w-4 h-4 dark:bg-[#E0E360] bg-blue-400 rounded-full">
                            <span className="text-white"></span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="md:text-[28px] xs:text-[22px] font-medium">
                            {experience.jobTitle}
                          </h1>
                          <h2 className="md:text-[18px] xs:text-[15px]  font-medium ">
                            {experience.company + ", " + experience.cityState}
                          </h2>

                          <h3 className="md:text-[18px] xs:text-[15px] font-medium">
                            <span>{experience.fromMonth}</span>
                            <span> {experience.fromYear}</span> -
                            <span
                              className={`${
                                experience.isContinue ? "" : "hidden"
                              }`}
                            >
                              &nbsp;Present
                            </span>
                            <span> {experience.toMonth}</span>
                            <span> {experience.toYear}</span>
                          </h3>
                          <p className="md:text-[16px] xs:text-[14px]">
                            {experience.description}
                          </p>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          )}
          {/* Experience Cards */}
          {active === "experience-card" && (
            <div className={` w-full flex`}>
              <ul
                id="education-card "
                className="md:my-8 rounded-md shadow-2xl md:p-10 xs:p-4 xs:w-full lg:w-full dark:bg-gray-900 bg-gray-200"
              >
                {userData?.education?.map((education) => {
                  return (
                    <>
                      <li className="mb-4 flex gap-4 ">
                        <div className="relative md:flex md:flex-col items-center mt-[10px] xs:hidden">
                          <div className="absolute w-[2px] dark:bg-[#E0E360] bg-blue-400 h-[115%]"></div>
                          <div className="flex items-center justify-center w-4 h-4 dark:bg-[#E0E360] bg-blue-400 rounded-full">
                            <span className="text-white"></span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="md:text-[28px] xs:text-[22px] font-medium">
                            {education.educationLevel +
                              " In " +
                              education.fieldOfStudy}
                          </h1>
                          <h2 className="md:text-[18px] xs:text-[15px] font-medium">
                            {education.schoolName +
                              ", " +
                              education.schoolLocation}{" "}
                          </h2>
                          <h3 className="md:text-[18px] xs:text-[15px] font-medium">
                            <span>{education.fromMonth}</span>
                            <span> {education.fromYear}</span> -
                            <span
                              className={`${
                                education.isContinue ? "" : "hidden"
                              }`}
                            >
                              &nbsp;Present
                            </span>
                            <span> {education.toMonth}</span>
                            <span> {education.toYear}</span>
                          </h3>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center gap-8 xs:px-2 md:px-0 mt-16 pb-16">
          {loading ? (
            <span className="animate-blink text-[#6a4dff] dark:text-[#e6f85e]">
              Loading ...
            </span>
          ) : (
            <span className=" text-[#6a4dff] dark:text-[#e6f85e]">
              User doesn{"'"}t exist
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
