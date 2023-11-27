import React from "react";
import EducationCard from "./EducationCard";
import { useDispatch, useSelector } from "react-redux";
import {
  EditIcon,
  addressIcon,
  deleteIcon,
  plusSimpleIcon,
} from "@/helpers/iconsProvider";
import { setActiveStep, setStepFive } from "@/store/registerSlice";
import { Education, WorkExperience } from "@/store/userDataSlice";
import ExperienceCard from "./ExperienceCard";
import Script from "next/script";
const ProfilePreview = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.register);

  return (
    <div className="">
      <Script type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jum6bniqm4");
        `}
      </Script>
      {/* Google tag (gtag.js) --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NDN7TY5F2W"
      />
      <Script>
        {`

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-NDN7TY5F2W');
        `}
      </Script>
      <h1 className="text-2xl font-semibold mb-2">Review your Resume</h1>
      <p className=" mb-4">Review and make any changes below.</p>
      <hr className="mb-4" />

      {/* Basic */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {data.stepOne.firstName === "" && data.stepOne.lastName === "" ? (
              "[Missing Name]"
            ) : (
              <>{data.stepOne.firstName + " " + data.stepOne.lastName}</>
            )}
          </h3>
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => dispatch(setActiveStep(1))}
            >
              {EditIcon}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm flex flex-col gap-1 ">
            <p className="flex flex-row gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span>
                {data.stepTwo.phoneNumber
                  ? data.stepTwo.phoneNumber
                  : "[Missing Phone Number]"}
              </span>
            </p>
            <p className="flex flex-row gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span>
                {data.stepTwo.Email ? data.stepTwo.Email : "[Missing Email]"}
              </span>
            </p>
          </div>
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => dispatch(setActiveStep(2))}
            >
              {EditIcon}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm flex flex-col gap-1 ">
            <p className="flex flex-row gap-2 items-center">
              {addressIcon}
              {data.stepThree?.country === "" &&
              data.stepThree?.street &&
              data.stepThree?.cityState &&
              data.stepThree?.postalCode ? (
                <span>[Address Missing]</span>
              ) : (
                <span>
                  {data.stepThree?.country && data.stepThree?.country}{" "}
                  {data.stepThree?.street && ", " + data.stepThree?.street}{" "}
                  {data.stepThree?.cityState &&
                    ", " + data.stepThree?.cityState}{" "}
                  {data.stepThree?.postalCode &&
                    ", " + data.stepThree?.postalCode}{" "}
                </span>
              )}
            </p>
          </div>
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => dispatch(setActiveStep(3))}
            >
              {EditIcon}
            </button>
          </div>
        </div>
      </section>

      {/* Summary */}
      {/* <section className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2 ">Summary</h2>
        <p className="mb-2 text-sm  italic">
          Written by AI According to your Resume
        </p>
        <div className="border p-4 rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <p>
              Experienced software engineer with a passion for creating
              efficient and scalable applications.
            </p>
          </div>
        </div>
      </section> */}

      {/* Work Experience */}
      <section className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2 ">
          Work Experience
          <button
            type="button"
            onClick={(e) => {
              dispatch(setActiveStep(5));
            }}
            className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
          >
            {EditIcon}
          </button>
        </h2>
        <div className="flex flex-col gap-3">
          {data.stepFive.list.map(
            (workExperience: WorkExperience, index: number) => (
              <ExperienceCard
                key={index}
                rec={workExperience}
                isShowing={true}
              />
            )
          )}
          {data.stepFive.list.length === 0 && <p>No Experiences Found</p>}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2 ">
          Education
          <button
            type="button"
            onClick={(e) => {
              dispatch(setActiveStep(4));
            }}
            className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
          >
            {EditIcon}
          </button>
        </h2>
        <div className="flex flex-col gap-3">
          {data.stepFour.list.map((education: Education, index: number) => (
            <EducationCard key={index} rec={education} isShowing={true} />
          ))}
          {data.stepFour.list.length === 0 && <p>No Education Found</p>}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2 ">
          Skills
          <button
            type="button"
            onClick={(e) => {
              dispatch(setActiveStep(6));
            }}
            className="text-sm float-right flex flex-row gap-1 items-center hover:bg-gray-50 text-blue-500"
          >
            {EditIcon}
          </button>
        </h2>
        <div className="flex flex-col gap-3">
          <ul className="space-y-2 pl-0">
            {data.stepSix.list.map((skill: string, index: number) => (
              <li
                key={index}
                className="flex items-center justify-between  rounded-md shadow-md border p-3"
              >
                <span>{skill}</span>
              </li>
            ))}
          </ul>
          {data.stepSix.list.length === 0 && <p>No Skills Found</p>}
        </div>
      </section>
    </div>
  );
};

export default ProfilePreview;
