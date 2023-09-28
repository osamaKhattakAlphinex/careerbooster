"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import ReactToPrint from "react-to-print";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";

import CoverLetterFileUploader from "@/components/dashboard/cover-letter-bot/CoverLetterFileUploader";
import CoverLetterResumeSelector from "@/components/dashboard/cover-letter-bot/CoverLetterResumeSelector";
import Button from "@/components/utilities/form-elements/Button";
import LimitCard from "@/components/dashboard/LimitCard";

const PersonalizedEmailBot = () => {
  const componentRef = useRef<any>(null);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(""); // type
  const [streamedData, setStreamedData] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<string>("");
  const [setSelectedResumeId, setSetSelectedResumeId] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");

  // limit bars
  const [availablePercentageCoverLetter, setAvailablePercentageCoverLetter] =
    useState<number>(0);
  const [percentageCalculatedCoverLetter, setPercentageCalculatedCoverLetter] =
    useState<boolean>(false);
  const [availablePercentageEmail, setAvailablePercentageEmail] =
    useState<number>(0);
  const [percentageCalculatedEmail, setPercentageCalculatedEmail] =
    useState<boolean>(false);

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;

  const handleGenerate = async () => {
    // await getUserDataIfNotExists();
    if (
      session?.user?.email &&
      aiInputUserData &&
      !isNaN(availablePercentageEmail) &&
      availablePercentageEmail !== 0
    ) {
      setMsgLoading(true);
      setShow(true);
      setStreamedData("");

      const obj: any = {
        type: selectedOption,
        email: session?.user?.email,
        jobDescription,
      };
      if (selectedOption === "file") {
        obj.file = selectedFile;
      } else if (selectedOption === "aiResume") {
        const foundResume = resumes.find(
          (resume: any) => resume.id === setSelectedResumeId
        );
        obj.userData = {
          jobTitle: foundResume.jobTitle,
          name: foundResume.name,
          primarySkills: foundResume.primarySkills,
          professionalSkills: foundResume.professionalSkills,
          secondarySkills: foundResume.secondarySkills,
          education: foundResume.secondarySkills,
          workExperienceArray: foundResume.workExperienceArray,
        };
      } else {
        obj.userData = aiInputUserData;
      }
      // Fetch keywords
      fetch("/api/emailBot/emailGenerator", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              const text = new TextDecoder().decode(value);
              setStreamedData((prev) => prev + text);
            }
            fetch("/api/users/updateUserLimit", {
              method: "POST",
              body: JSON.stringify({
                email: session?.user?.email,
                type: "email_generation",
              }),
            }).then(async (resp: any) => {
              const res = await resp.json();
              if (res.success) {
                const updatedObject = {
                  ...userData,
                  userPackageUsed: {
                    ...userData.userPackageUsed,
                    email_generation: res.user.userPackageUsed.email_generation,
                  },
                };
                dispatch(setUserData({ ...userData, ...updatedObject }));
              }
            });
          } else {
            setStreamedData("Error! Something went wrong");
          }
        })
        .finally(() => {
          setMsgLoading(false);
        });
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (
      session?.user?.email &&
      aiInputUserData &&
      !isNaN(availablePercentageCoverLetter) &&
      availablePercentageCoverLetter !== 0
    ) {
      setMsgLoading(true);
      setShow(true);
      setStreamedData("");

      const obj: any = {
        type: selectedOption,
        email: session?.user?.email,
        jobDescription,
      };
      if (selectedOption === "file") {
        obj.file = selectedFile;
      } else if (selectedOption === "aiResume") {
        const foundResume = resumes.find(
          (resume: any) => resume.id === setSelectedResumeId
        );

        obj.userData = {
          jobTitle: foundResume.jobTitle,
          name: foundResume.name,
          primarySkills: foundResume.primarySkills,
          professionalSkills: foundResume.professionalSkills,
          secondarySkills: foundResume.secondarySkills,
          education: foundResume.secondarySkills,
          workExperienceArray: foundResume.workExperienceArray,
        };
      } else {
        obj.userData = aiInputUserData;
      }
      // Fetch keywords
      fetch("/api/coverLetterBot/coverLetterGenerator", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              const text = new TextDecoder().decode(value);
              setStreamedData((prev) => prev + text);
            }

            fetch("/api/users/updateUserLimit", {
              method: "POST",
              body: JSON.stringify({
                email: session?.user?.email,
                type: "cover_letter_generation",
              }),
            }).then(async (resp: any) => {
              const res = await resp.json();
              if (res.success) {
                const updatedObject = {
                  ...userData,
                  userPackageUsed: {
                    ...userData.userPackageUsed,
                    cover_letter_generation:
                      res.user.userPackageUsed.cover_letter_generation,
                  },
                };
                dispatch(setUserData({ ...userData, ...updatedObject }));
              }
            });
          } else {
            setStreamedData("Error! Something went wrong");
          }
        })
        .finally(() => {
          setMsgLoading(false);
        });
    }
  };

  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.contact,
        email: userData?.contact,
        experience: userData?.contact,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
  }, [userData]);
  return (
    <>
      <div className="w-[95%] my-5 ml-10 flex items-center justify-between mt-10">
        <Link
          href="/dashboard"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>

        <LimitCard
          title="Email Availble"
          limit={userData?.userPackageData?.limit?.email_generation}
          used={userData?.userPackageUsed?.email_generation}
          setPercentageCalculated={setPercentageCalculatedEmail}
          availablePercentage={availablePercentageEmail}
          setAvailablePercentage={setAvailablePercentageEmail}
        />
        <LimitCard
          title="Cover Letter Availble"
          limit={userData?.userPackageData?.limit?.cover_letter_generation}
          used={userData?.userPackageUsed?.cover_letter_generation}
          setPercentageCalculated={setPercentageCalculatedCoverLetter}
          availablePercentage={availablePercentageCoverLetter}
          setAvailablePercentage={setAvailablePercentageCoverLetter}
        />
      </div>
      <div className="flex m-10 mt-2 gap-4">
        <div className="w-full flex flex-col p-4  border border-gray-200 rounded-lg shadow sm:p-6 ">
          <h2 className="text-2xl mr-10 mb-6">Personalized Email Generator</h2>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="profile"
                name="default-radio"
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium  cursor-pointer"
              >
                use my profile date to write Personalized Email
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-2"
                type="radio"
                value="file"
                name="default-radio"
                onChange={(e) => {
                  setSelectedFile("");
                  setSelectedOption(e.target.value);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium  cursor-pointer"
              >
                Upload File and use that to write Personalized Email
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-3"
                type="radio"
                value="aiResume"
                name="default-radio"
                onChange={(e) => {
                  setSelectedFile("");
                  setSelectedOption(e.target.value);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
              />
              <label
                htmlFor="default-radio-3"
                className="ml-2 text-sm font-medium  cursor-pointer"
              >
                Choose one of existing Resume (Generated by AI)
              </label>
            </div>
          </div>
          {selectedOption === "file" && (
            <CoverLetterFileUploader
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          )}

          {selectedOption === "aiResume" && (
            <CoverLetterResumeSelector
              setSelectedResumeId={setSelectedResumeId}
              setSetSelectedResumeId={setSetSelectedResumeId}
            />
          )}

          <div className="">
            <h2 className="text-2xl mr-10 mb-4 mt-6">
              Paste Job Description *
            </h2>
            <textarea
              name="jobDescription"
              id="jD"
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full mb-4 bg-transparent text-white p-4 border rounded-lg"
            ></textarea>
          </div>

          <div className="flex flex-row gap-4">
            {!isNaN(availablePercentageEmail) &&
              availablePercentageEmail !== 0 && (
                <div>
                  <Button
                    type="button"
                    disabled={
                      msgLoading ||
                      !session?.user?.email ||
                      !aiInputUserData ||
                      selectedOption === "" ||
                      (selectedOption === "file" && selectedFile === "") ||
                      (selectedOption === "aiResume" &&
                        setSelectedResumeId === "") ||
                      jobDescription === ""
                    }
                    onClick={() => handleGenerate()}
                    className="btn btn-outline-primary-dark"
                  >
                    <div className="flex flex-row gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`w-4 h-4 ${
                          msgLoading ? "animate-spin" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      <span>
                        {msgLoading ? "Please wait..." : "Generate Email"}
                      </span>
                    </div>
                  </Button>
                </div>
              )}

            {!isNaN(availablePercentageCoverLetter) &&
              availablePercentageCoverLetter !== 0 && (
                <div>
                  <Button
                    type="button"
                    disabled={
                      msgLoading ||
                      !session?.user?.email ||
                      !aiInputUserData ||
                      selectedOption === "" ||
                      (selectedOption === "file" && selectedFile === "") ||
                      (selectedOption === "aiResume" &&
                        setSelectedResumeId === "") ||
                      jobDescription === ""
                    }
                    onClick={() => handleGenerateCoverLetter()}
                    className="btn btn-outline-primary-dark"
                  >
                    <div className="flex flex-row gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`w-4 h-4 ${
                          msgLoading ? "animate-spin" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      <span>
                        {msgLoading
                          ? "Please wait..."
                          : "Generate Cover Letter"}
                      </span>
                    </div>
                  </Button>
                </div>
              )}

            <ReactToPrint
              trigger={() => (
                <Button
                  type="button"
                  disabled={!show || msgLoading || !session?.user?.email}
                  className="btn btn-outline-primary-dark"
                >
                  <div className="flex flex-row gap-2">
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
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    <span>Print / Download in PDF</span>
                    {/* <span>
                            To download choose destination "save as PDF"
                          </span> */}
                  </div>
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>
          {/* <div className="">Download PDF</div> */}
        </div>
      </div>

      {show && (
        <div
          className={`w-[95%] text-gray-800  bg-white border border-gray-200 rounded-lg shadow  m-10 ${
            msgLoading ? "animate-pulse" : ""
          }`}
        >
          <div className="p-12" ref={componentRef}>
            <div dangerouslySetInnerHTML={{ __html: streamedData }}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default PersonalizedEmailBot;
