"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import {
  contactIcon,
  crossIcon1,
  educationIcon,
  emailIcon,
  linkedInIcon,
  newLinkedInIcon,
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";
import useGetSummary from "@/hooks/useGetSummary";
import Regenerate from "@/helpers/regenerate";
import EditableField from "@/components/new-dashboard/common/EditableField";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
const ResumeTemplate19 = ({
  streamedJDData,
  saveResumeToDB,
}: {
  streamedJDData: string;
  saveResumeToDB: (data?: any) => Promise<void>;
}) => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newSecondarySkill, setNewSecondarySkill] = useState(false);
  const [newProfessionalSkill, setNewProfessionalSkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [newEducation, setNewEducation] = useState(false);
  const [primarySkillAddButtonVisible, setPrimarySkillAddButtonVisible] =
    useState(false);
  const [secondarySkillAddButtonVisible, setSecondarySkillAddButtonVisible] =
    useState(false);

  const [streamedSummaryData, setStreamedSummaryData] = useState("");

  const { getSummary } = useGetSummary(setStreamedSummaryData);

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();
  const [
    professionalSkillAddButtonVisible,
    setProfessionalSkillAddButtonVisible,
  ] = useState(false);
  const [workExperienceAddButtonVisible, setWorkExperienceAddButtonVisible] =
    useState<number>();
  const [educationAddButtonVisible, setEducationAddButtonVisible] =
    useState(false);
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [secondarySkill, setSecondarySkill] = useState<string>("");
  const [professionalSkill, setProfessionalSkill] = useState<string>("");

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const {
    updateAndSaveSkill,
    updateAndSaveSummary,
    updateAndSaveWorkExperienceArray,
    updateAndSaveBasicInfo,
    updateAndSaveEducation,
    updateAndSaveName,
    updateAndSaveJobTitle,
  } = useUpdateAndSave();

  return (
    <div className="w-full first-page relative text-gray-900">
      <div className="flex w-full justify-center items-center py-7 xs:py-2 md:py-7">
        <div className="flex flex-col py-3">
          <h2 className="text-2xl md:text-4xl font-serif text-center  font-bold hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={resume?.name ? resume?.name : "FULL NAME"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.name) {
                  updateAndSaveName(value);
                }
              }}
            />
          </h2>
          <h3 className="text-[16px] md:text-2xl text-center text-gray-800  hover:shadow-md mt-2 w-12/12 hover:bg-gray-100">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                dispatch(setField({ name: "jobTitle", value: value }));
                saveResumeToDB({ ...resume, jobTitle: value });
              }}
            />
          </h3>
        </div>
      </div>

      <div className="flex border-t-2 border-gray-900">
        <div className=" w-4/12 xs:w-4/12 md:w-1/3 flex flex-col relative pt-3 inset-0 items-center px-6 xs:px-0 md:px-6  bg-[#f8f8f8] ">
          {/* contacts */}
          <span className="border-stylee w-full h-0 my-1"></span>
          <h3 className="uppercase text-lg xs:text-[14px] xs:px-3 px-0 md:px-0  md:text-lg font-semibold w-full   pb-2 text-gray-800 py-1 rounded-sm flex items-center  flex-row gap-2 ">
            {/* {contactIcon} */}
            Contact
          </h3>
          <span className="border-stylee w-full h-0 my-2"></span>
          <ul className=" flex flex-col px-0 xs:px-3 md:px-0 gap-3 w-full mb-4 text-sm text-gray-800 break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-100 hover:text-black text-sm  text-gray-800  flex flex-row gap-3 ">
              {phoneIcon}
              <EditableField
                value={
                  resume?.contact?.phone
                    ? resume?.contact?.phone
                    : "(555) 555-1234"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.phone) {
                    updateAndSaveBasicInfo({ phone: value });
                  }
                }}
              />
            </li>
            <li className="hover:shadow-md hover:text-black hover:bg-gray-100 flex text-gray-800  flex-row gap-3  items-center text-sm">
              {emailIcon}

              <EditableField
                value={
                  resume?.contact?.email
                    ? resume?.contact?.email
                    : "your@email.com"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.email) {
                    updateAndSaveBasicInfo({ email: value });
                  }
                }}
              />
            </li>
            <li className="hover:shadow-md text-sm hover:text-black hover:bg-gray-100 text-gray-800 flex flex-row gap-2  items-center">
              {/* <a
                href={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                target="_blank"
                className="text-blue-600"
              > */}
              {/* <span className="w-5 h-5 xs:w-5 xs:p-[2px] md:px-0  xs:h-5 md:w-5 md:h-5  flex items-center justify-center border-[1px] border-[#7e7e7e] rounded-full">
                <span className="flex w-4 h-4 justify-center items-center text-gray-3400 font-thin text-sm">
                  in
                </span>
              </span> */}
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="0.8"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z" />
                <path
                  d="M5.83889 13V7.54545H6.47454V13H5.83889ZM6.16204 6.60795C6.03183 6.60795 5.92056 6.56416 5.82823 6.47656C5.7359 6.3866 5.68974 6.27888 5.68974 6.15341C5.68974 6.02794 5.7359 5.9214 5.82823 5.83381C5.92056 5.74384 6.03183 5.69886 6.16204 5.69886C6.29225 5.69886 6.40352 5.74384 6.49585 5.83381C6.58817 5.9214 6.63434 6.02794 6.63434 6.15341C6.63434 6.27888 6.58817 6.3866 6.49585 6.47656C6.40352 6.56416 6.29225 6.60795 6.16204 6.60795ZM9.67834 9.59091V13H9.04624V7.54545H9.66058V8.40128H9.7174C9.84524 8.12192 10.0441 7.8982 10.314 7.73011C10.5862 7.55966 10.9224 7.47443 11.3225 7.47443C11.6895 7.47443 12.0114 7.55137 12.2884 7.70526C12.5678 7.85677 12.7844 8.08049 12.9383 8.37642C13.0945 8.67235 13.1727 9.03575 13.1727 9.46662V13H12.5406V9.50568C12.5406 9.05824 12.4151 8.70431 12.1641 8.44389C11.9156 8.18348 11.5817 8.05327 11.1627 8.05327C10.8763 8.05327 10.6218 8.11482 10.3992 8.23793C10.1767 8.36103 10.0003 8.53859 9.8701 8.7706C9.74226 9.00024 9.67834 9.27367 9.67834 9.59091Z"
                  fill="black"
                />
              </svg>

              <EditableField
                value={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                onSave={(value: string) => {
                  if (value !== resume.contact.linkedIn) {
                    updateAndSaveBasicInfo({ linkedIn: value });
                  }
                }}
              />
              {/* </a> */}
            </li>
          </ul>
          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <span className="border-stylee w-full h-0  my-1"></span>
              <h3 className="uppercase px-0 xs:px-3 md:px-0 text-lg xs:text-[14px] md:text-lg font-semibold w-full  pb-2 text-gray-900  py-1 rounded-sm flex items-center  flex-row gap-2 ">
                {/* {sparkleIcon} */}
                Skills
              </h3>
              <span className="border-stylee w-full h-0  my-1"></span>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <ul
                  className="pl-0 flex  px-0 xs:px-0 md:px-0  flex-col gap-1 mb-4 text-gray-800 w-full text-sm"
                  onMouseEnter={() =>
                    !newPrimarySkill && setPrimarySkillAddButtonVisible(true)
                  }
                  onMouseLeave={() =>
                    !newPrimarySkill && setPrimarySkillAddButtonVisible(false)
                  }
                >
                  {/* <li className="font-semibold  uppercase">primary</li> */}
                  <Regenerate
                    handler={getPrimarySkills}
                    custom_style={"absolute right-0 -bottom-10 "}
                    custom_style_li={"flex flex-col gap-3"}
                  >
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent xs:w-12/12 hover:text-black hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex items-center  "
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <span className="w-1.5 h-1.5 xs:hidden md:block   xs bg-gray-800 rounded-full mr-3 xs:mr-0 md:mr-3"></span>
                        <div className="flex flex-row w-full items-center justify-between text-sm ">
                          <EditableField
                            value={skill}
                            onSave={(value: string) => {
                              if (value !== resume?.primarySkills[i]) {
                                let updatedSkills = [...resume.primarySkills];
                                updatedSkills.splice(i, 1, value);
                                updateAndSaveSkill(updatedSkills);
                              }
                            }}
                          />
                          <div
                            onClick={() => {
                              const removeSkill = [...resume.primarySkills];
                              removeSkill.splice(i, 1);
                              updateAndSaveSkill(removeSkill);
                            }}
                            className="w-4 h-4  cursor-pointer child"
                          >
                            {crossIcon1}
                          </div>
                        </div>
                      </li>
                    ))}
                  </Regenerate>
                  {newPrimarySkill ? (
                    <>
                      <div className="w-full rounded-2xl border-[1px] border-black flex h-9.5">
                        <input
                          type="text"
                          value={primarySkill}
                          placeholder="Please add Skill"
                          className="bg-white outline-none rounded-2xl px-2 w-full"
                          autoFocus
                          onChange={(e) => setPrimarySkill(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              if (primarySkill.trim() !== "") {
                                addPrimarySkill(primarySkill);
                                setPrimarySkill("");
                              }
                            }
                          }}
                        />
                        <button
                          className="bg-green-500 uppercase h-9 px-2 text-white rounded-r-2xl"
                          onClick={() => {
                            if (primarySkill.trim() !== "") {
                              addPrimarySkill(primarySkill);
                              setPrimarySkill(""); // Empty the input field
                            }
                          }}
                        >
                          save
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setNewPrimarySkill(false);
                          setPrimarySkillAddButtonVisible(false);
                        }}
                        className="bg-red-500 py-1 px-2 text-white rounded-full"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    " "
                  )}
                  {primarySkillAddButtonVisible ? (
                    <div
                      className="border-2 w-1/2 xs:w-full justify-center xs:mt-10 flex md:w-1/2 border-gray-400 text-center uppercase text-gray-500 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                      onClick={() => {
                        setNewPrimarySkill(true);
                        setPrimarySkillAddButtonVisible(false);
                      }}
                    >
                      + Add
                    </div>
                  ) : null}
                </ul>
              ) : (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col px-4 md:px-8 pt-6 xs:pt-6 md:pt-6 ">
          <h2 className="uppercase text-xl xs:text-lg md:text-xl font-bold  rounded-sm text-gray-900 w-full py-1">
            EXECUTIVE SUMMARY
          </h2>
          <span className="border-stylee w-full h-0  my-2"></span>

          <Regenerate
            handler={getSummary}
            custom_style={"absolute bottom-3 right-2 "}
          >
            <div className="text-sm hover:shadow-md hover:bg-gray-100 group-hover:pb-14">
              <EditableField
                type="textarea"
                value={
                  resume?.summary !== "" ? (
                    resume?.summary
                  ) : streamedSummaryData ? (
                    streamedSummaryData
                  ) : (
                    <div className="text-center">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )
                }
                onSave={(value: string) => {
                  updateAndSaveSummary(value);
                }}
              />
            </div>
          </Regenerate>

          {/* Work Experience */}
          <span className="border-stylee w-full h-0 my-3"></span>
          <h2 className="uppercase text-xl font-bold   rounded-sm text-gray-900 w-full py-1">
            WORK EXPERIENCE
          </h2>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="hover:border-dashed hover:border-gray-500 my-2  border-transparent border-2 hover:cursor-move hover:border-2"
                    onMouseEnter={() => setWorkExperienceAddButtonVisible(i)}
                    onMouseLeave={() => setWorkExperienceAddButtonVisible(-1)}
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", i.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropExperience(e, i)}
                    draggable
                  >
                    <div className="flex flex-col">
                      {/* <div className="flex ">
                        <span className="w-4 h-4 bg-[#745237] rounded-full"></span>
                        <span className="h-13 border-[1px] border-[#745237] mx-2 relative -left-[17px]"></span>
                      </div> */}

                      <span className="hover:shadow-md text-lg hover:cursor-text hover:bg-gray-100">
                        <EditableField
                          value={rec?.title}
                          style={{ width: "100%" }}
                          onSave={(value: string) => {
                            if (
                              value !== resume?.workExperienceArray[i].title
                            ) {
                              let updatedExp = [...resume.workExperienceArray];
                              updatedExp[i] = {
                                ...updatedExp[i],
                                title: value,
                              };
                              updateAndSaveWorkExperienceArray(updatedExp);
                            }
                          }}
                        />
                      </span>
                      <span className="hover:cursor-default text-sm">
                        {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                        {rec?.isContinue
                          ? "Present"
                          : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                        |{" "}
                        <span className="hover:shadow-md hover:cursor-text hover:bg-gray-100">
                          <EditableField
                            value={rec?.company}
                            onSave={(value: string) => {
                              if (
                                value !== resume?.workExperienceArray[i].company
                              ) {
                                let updatedExp = [
                                  ...resume.workExperienceArray,
                                ];
                                updatedExp[i] = {
                                  ...updatedExp[i],
                                  company: value,
                                };
                                updateAndSaveWorkExperienceArray(updatedExp);
                              }
                            }}
                          />
                        </span>{" "}
                        |{" "}
                        <span className="hover:shadow-md hover:bg-gray-100">
                          <EditableField
                            value={rec?.cityState}
                            onSave={(value: string) => {
                              if (
                                value !==
                                resume?.workExperienceArray[i].cityState
                              ) {
                                let updatedExp = [
                                  ...resume.workExperienceArray,
                                ];
                                updatedExp[i] = {
                                  ...updatedExp[i],
                                  cityState: value,
                                };
                                updateAndSaveWorkExperienceArray(updatedExp);
                              }
                            }}
                          />
                        </span>{" "}
                        <span className="hover:shadow-md hover:bg-gray-100">
                          <EditableField
                            value={rec?.country}
                            onSave={(value: string) => {
                              if (
                                value !== resume?.workExperienceArray[i].country
                              ) {
                                let updatedExp = [
                                  ...resume.workExperienceArray,
                                ];
                                updatedExp[i] = {
                                  ...updatedExp[i],
                                  country: value,
                                };
                                updateAndSaveWorkExperienceArray(updatedExp);
                              }
                            }}
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div
              className="list-disc "
              dangerouslySetInnerHTML={{
                __html:
                  resume?.workExperience !== ""
                    ? resume?.workExperience
                    : streamedJDData,
              }}
            ></div>
          )}
          {/* education */}
          {resume?.education && (
            <>
              <span className="w-full h-0 my-2 page-break"></span>
              <h3 className="uppercase px-0 xs:px-3 md:px-0 text-lg xs:text-[14px] md:text-lg font-semibold w-full   pb-2 text-gray-900  py-1 rounded-sm flex items-center  flex-row gap-2 ">
                {/* {educationIcon} */}
                Education
              </h3>
              <span className="border-stylee w-full h-0  my-1"></span>
              <ul
                className="pl-0 flex xs:flex-col md:flex-row lg:flex-row flex-wrap px-0 xs:px-3 md:px-0 text-gray-800  w-full"
                onMouseEnter={() =>
                  !newEducation && setEducationAddButtonVisible(true)
                }
                onMouseLeave={() =>
                  !newEducation && setEducationAddButtonVisible(false)
                }
              >
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[30%] xs:w-full md:w-[30%] lg:w-[30%] md:m-2 ">
                      <li
                        className=" hover:shadow-md hover:cursor-move border-transparent border-2 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-semibold  hover:text-black flex uppercase text-md   items-center "
                      >
                        <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mr-3"></span>
                        <div className="flex flex-row w-full items-center justify-between">
                          <EditableField
                            type="textarea"
                            rows={2}
                            value={education?.educationLevel}
                            onSave={(value: string) => {
                              if (
                                value !== resume?.education[ind].educationLevel
                              ) {
                                let updatedEducations = [...resume.education];
                                updatedEducations[ind] = {
                                  ...updatedEducations[ind],
                                  educationLevel: value,
                                };
                                updateAndSaveEducation(updatedEducations);
                              }
                            }}
                          />
                          <div
                            onClick={() => {
                              let updatedEducations = [...resume?.education];
                              updatedEducations.splice(ind, 1);
                              updateAndSaveEducation(updatedEducations);
                            }}
                            className="w-4 h-4  cursor-pointer child"
                          >
                            {crossIcon1}
                          </div>
                        </div>
                      </li>
                      <li className="hover:shadow-md font-semibold capitalize hover:text-black text-gray-800 hover:tet-black hover:bg-gray-100 text-base">
                        <EditableField
                          value={`${education?.fieldOfStudy}`}
                          style={{ width: "100%" }}
                          onSave={(value: string) => {
                            if (value !== resume?.education[ind].fieldOfStudy) {
                              let updatedEducations = [...resume.education];
                              updatedEducations[ind] = {
                                ...updatedEducations[ind],
                                fieldOfStudy: value,
                              };
                              updateAndSaveEducation(updatedEducations);
                            }
                          }}
                        />{" "}
                      </li>
                      <li className="hover:shadow-md italic text-gray-800 hover:text-black hover:bg-gray-100 text-sm ">
                        <EditableField
                          type="textarea"
                          rows={2}
                          value={`${education?.schoolName}`}
                          onSave={(value: string) => {
                            if (value !== resume?.education[ind].schoolName) {
                              let updatedEducations = [...resume.education];
                              updatedEducations[ind] = {
                                ...updatedEducations[ind],
                                schoolName: value,
                              };
                              updateAndSaveEducation(updatedEducations);
                            }
                          }}
                        />
                      </li>
                      <li className="mb-4 text-xs italic text-gray-800 ">
                        {education?.fromMonth + " " + education.fromYear} -{" "}
                        {education?.isContinue
                          ? "Present"
                          : education?.toMonth + " " + education.toYear}
                      </li>
                    </div>
                  </React.Fragment>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate19);
function addPrimary(): any {
  throw new Error("Function not implemented.");
}
