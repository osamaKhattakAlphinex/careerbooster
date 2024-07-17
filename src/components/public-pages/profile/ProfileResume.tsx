"use client";
import {
  emailIconFilled,
  homeIconFilled,
  linkedInIconFilled,
  phoneIconFilled,
} from "@/helpers/iconsProvider";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const ProfileResume = () => {
  const userData = useSelector((state: RootState) => state.userData);
  return (
    <>
      <h1 className="text-gray-950 text-3xl font-semibold self-center">
        {userData.firstName + " " + userData.lastName}
      </h1>
      <ul className="text-gray-950 flex justify-between w-full mt-3">
        <li className="flex items-center">
          {phoneIconFilled}&nbsp;{userData.phone}
        </li>
        <li className="flex items-center">
          {emailIconFilled}&nbsp;{userData.email}
        </li>
        <li>
          <a href={userData.linkedin} className="flex items-center">
            {linkedInIconFilled}&nbsp;{userData.linkedin}
          </a>
        </li>
        <li className="flex items-center">
          {homeIconFilled}&nbsp;
          {userData.contact?.street +
            " " +
            userData.contact?.cityState +
            " " +
            userData.contact?.country +
            " " +
            userData.contact?.postalCode}
        </li>
      </ul>
      <div className="mt-4 flex flex-col justify-start items-start w-full">
        <h2 className="text-gray-950 font-semibold text-xl underline mb-2">
          Skills
        </h2>
        <ul className="pl-4 w-full grid grid-cols-4 gap-4 text-gray-950">
          {userData?.skills?.map((skill, index) => (
            <li key={index} className="list-disc">
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex flex-col justify-start items-start w-full">
        <h2 className="text-gray-950 font-semibold text-xl underline mb-2">
          Work Experience
        </h2>
        {userData?.experience?.map((experience) => (
          <div
            key={experience.id}
            className="flex flex-col gap-2 text-gray-950"
          >
            <h1 className="text-lg font-medium">{experience.jobTitle}</h1>
            <div className="flex items-center gap-1">
              <h2 className="text-base font-medium ">
                {experience.company + ", " + experience.cityState}
              </h2>
              |
              <h3 className="text-sm font-medium">
                <span>{experience.fromMonth}</span>
                <span> {experience.fromYear}</span> -
                <span className={`${experience.isContinue ? "" : "hidden"}`}>
                  &nbsp;Present
                </span>
                <span> {experience.toMonth}</span>
                <span> {experience.toYear}</span>
              </h3>
            </div>
            <p className="mb-4">{experience.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileResume;
