"use client";
import ProfileResume from "@/components/public-pages/ProfileResume";
import { RootState } from "@/store/store";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
const Page = ({ params }: { params: { id: string } }) => {
  const [active, setActive] = useState("education-card");
  const userDetails = useSelector((state: RootState) => state.userData);
  const [userData, setUserData] = useState(userDetails);
  const [userFetched, setUserFetched] = useState<boolean>(false);

  useEffect(() => {
    if (params.id && !userDetails._id && userDetails._id !== params.id) {
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
        .catch((error) => console.log(error));
    }
  }, [params]);

  const downloadPdf = async () => {
    const fileName = "test.pdf";
    const blob = await pdf(<ProfileResume userData={userData} />).toBlob();
    saveAs(blob, fileName);
  };

  return (
    <div className=" flex flex-col xs:mt-[90px] lg:mt-52 md:mt-28 md:px-20 xs:px-4 xs:text-center md:text-left">
      {/* <PDFViewer width="100%" height="600">
        <ProfileResume userData={userData} />
      </PDFViewer> */}

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
              {/* <Image
            className="rounded-[200px] mx-auto xs:block md:hidden"
            src={`${userData?.profileImage}`}
            width={200}
            height={200}
            alt="profile-image"
          /> */}
              <h1 className="md:text-[36px] xs:text-[30px] font-bold text-[#BE4A86]">
                {userData?.experience?.[0]?.jobTitle}
              </h1>
              <button
                className="rounded-full w-fit px-4 py-2 text-[18px] dark:hover:bg-transparent dark:hover:border dark:hover:border-[#E0E360] dark:hover:text-gray-100 hover:bg-transparent hover:border hover:border-blue-400 hover:text-gray-900 mt-2 dark:text-gray-900  dark:bg-[#E0E360] bg-blue-500 text-gray-100"
                onClick={downloadPdf}
              >
                Download My Profile
              </button>

              {/* <ul className="flex flex-col gap-3 ">
            <li>
              {userData.contact?.country +
                " , " +
                userData.contact?.cityState}
            </li>
            <li>{userData.email}</li>
            <li>
              <Link className="underline" href={`${userData.linkedin}`}>
                {userData.linkedin}
              </Link>
            </li>
            <li>{userData.phone}</li>
          </ul> */}
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
                className="md:mt-8 rounded-md shadow-2xl md:p-10 xs:p-4 lg:w-1/2 xs:w-full dark:bg-gray-900 bg-gray-200"
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
              <div
                className="w-1/2 m-auto xs:hidden lg:block
      "
              >
                <Image
                  className=" ml-auto align-middle"
                  src="/assets/images/exp-1.png"
                  alt="education"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          )}
          {/* Experience Cards */}
          {active === "experience-card" && (
            <div className={` w-full flex`}>
              <div
                className="w-1/2 m-auto xs:hidden lg:block
      "
              >
                <Image
                  className=" align-middle"
                  src="/assets/images/Education.png"
                  alt="education"
                  width={400}
                  height={600}
                />
              </div>
              <ul
                id="education-card "
                className="md:mt-8 rounded-md shadow-2xl md:p-10 xs:p-4 xs:w-full lg:w-1/2 dark:bg-gray-900 bg-gray-200"
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
          <span className=" text-[#6a4dff] dark:text-[#e6f85e]">
            User doesn't exist
          </span>
        </div>
      )}
    </div>
  );
};

export default Page;
