"use client";
import Button from "@/components/Button";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Button from "./Button";

const Page = ({ params }: { params: { id: string } }) => {
  const [active, setActive] = useState("eduaction-card");

  const userDetails = useSelector((state: RootState) => state.userData);
  console.log(userDetails);
  const [userData, setUserData] = useState(userDetails);
  useEffect(() => {
    if (params.id && !userDetails._id && userDetails._id !== params.id) {
      fetch(`/api/users/${params.id}`, {
        method: "GET",
      }).then(async (response) => {
        const res = await response.json();
        if (res.success) {
          setUserData(res.user);
        }
      });
    }
  }, [params]);
  return (
    <div className=" flex flex-col mt-52 px-20">
      {/* {hero-section} */}
      <div className="flex w-full justify-between items-center ">
        <div className="flex flex-col gap-3 w-1/2">
          <h2 className="text-[28px]">
            HEY, I AM{" "}
            <span className="text-[#E0E360]">
              {userDetails.firstName + " " + userDetails.lastName}
            </span>
          </h2>
          <h1 className="text-[36px] font-bold text-[#BE4A86]">
            {userDetails?.experience?.[0]?.jobTitle}
          </h1>
          {/* <ul className="flex flex-col gap-3 ">
            <li>
              {userDetails.contact?.country +
                " , " +
                userDetails.contact?.cityState}
            </li>
            <li>{userDetails.email}</li>
            <li>
              <Link className="underline" href={`${userDetails.linkedin}`}>
                {userDetails.linkedin}
              </Link>
            </li>
            <li>{userDetails.phone}</li>
          </ul> */}
        </div>
        <div className="w-1/2  ">
          {userDetails.profileImage ? (
            <Image
              className="rounded-[200px] mx-auto"
              src={`${userDetails?.profileImage}`}
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
      <div className="flex w-full flex-col py-16">
        <h1 className="text-[36px] font-bold text-center mb-6">Skills</h1>
        <div className="flex flex-row items-center flex-wrap gap-3 w-[75%] mx-auto text-center justify-center">
          {userDetails.skills
            ? userDetails.skills.map((skill: any) => {
                return (
                  <>
                    <span className=" rounded-xl text-[18px]  w-fit py-3 px-5 bg-gray-400 text-gray-900">
                      {skill}
                    </span>
                  </>
                );
              })
            : "No Skill Found In your resume"}
        </div>
      </div>
      {/* Education and Experience tabs */}

      <div className="text-[26px] font-medium text-center text-gray-500 border border-gray-200 dark:text-gray-400 dark:border-gray-700 w-[80%] mx-auto my-10 rounded-lg">
        <ul className="flex  w-full justify-between  -mb-px">
          <li className="me-2 w-1/2 ml-auto">
            <button
              onClick={() => {
                setActive("education-card");
              }}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                active === "education-card"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
            >
              Experience
            </button>
          </li>
          <li className="me-2 w-1/2">
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
            className="mt-8 rounded-md shadow-2xl p-10 w-1/2 bg-gray-900"
          >
            {userDetails.experience?.map((experience) => {
              return (
                <>
                  <li className="mb-6 flex gap-4 ">
                    <div className="relative flex flex-col items-center mt-[10px]">
                      <div className="absolute w-[2px] bg-[#E0E360] h-[115%]"></div>
                      <div className="flex items-center justify-center w-4 h-4 bg-[#E0E360] rounded-full">
                        <span className="text-white"></span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-[28px] font-medium">
                        {experience.jobTitle}
                      </h1>
                      <h2 className="text-[18px] font-medium ">
                        {experience.company + " In " + experience.cityState}
                      </h2>

                      <h3 className="text-[18px] font-medium">
                        <span>{experience.fromMonth}</span>
                        <span> {experience.fromYear}</span> -<span></span>
                        <span> {experience.toMonth}</span>
                        <span> {experience.toYear}</span>
                      </h3>
                      <p>{experience.description}</p>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
          <div
            className="w-1/2 m-auto
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
            className="w-1/2 m-auto
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
            className="mt-8 rounded-md shadow-2xl p-10 w-1/2 bg-gray-900"
          >
            {userDetails.education?.map((education) => {
              return (
                <>
                  <li className="mb-4 flex gap-4 ">
                    <div className="relative flex flex-col items-center mt-[10px]">
                      <div className="absolute w-[2px] bg-[#E0E360] h-[115%]"></div>
                      <div className="flex items-center justify-center w-4 h-4 bg-[#E0E360] rounded-full">
                        <span className="text-white"></span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-[28px] font-medium">
                        {education.schoolName +
                          " , " +
                          education.schoolLocation}{" "}
                      </h1>
                      <h2 className="text-[24px] font-medium">
                        {education.educationLevel +
                          " In " +
                          education.fieldOfStudy}
                      </h2>

                      <h3 className="text-[20px]">
                        {education.fromYear + "-" + education.toYear}
                      </h3>
                      <p></p>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
