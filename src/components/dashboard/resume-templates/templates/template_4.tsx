"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwitterPicker, ColorResult } from "react-color";
import { setField } from "@/store/resumeSlice";
import {
  crossIcon1,
  emailIcon,
  phoneIcon,
  resumeContactIcon,
  resumeEductionIcon,
  resumeSkillsIcon,
  resumeSummaryIcon,
  resumeWorkExpIcon,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";
import Summary from "./resume-sections/summary";
import Toolbar from "@/components/dashboard/Toolbar";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import AddItemToCustomSection from "../../resume-builder/AddItemToCustomSection";
import Publication from "./resume-sections/publication";
import {
  award,
  certification,
  customStyle_4,
  experience,
  interest,
  language,
  publicationStyles,
  reference,
  summary,
  training,
} from "@/helpers/templateStylesObj";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Experience from "./resume-sections/experience";
// import CustomResumeSection from "../../resume-builder/CustomResumeSection";
const ResumeTemplate4 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();

  const [newAchievement, setNewAchievement] = useState("");
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { saveResumeToDB } = useSaveResumeToDB();

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const [insideIndex, setInsideIndex] = useState<number>(0);

  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();
  // const [color, setColor] = useState("#323B4C");
  // const [color_second, setColor_second] = useState("#1b1f27");

  useEffect(() => {
    if (streamedJDData === "") {
      setStreamedJDData(null);
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  // handle regenrate
  const handleRegenrate = (rec: any, i: number) => {
    getOneWorkExperienceNew(rec);
    setRegeneratedRecordIndex(i);
  };
  const [confirmationModal, setConfirmationModal] = useState(false);
  //add Skills
  const handleAddSkills = () => {
    setNewPrimarySkill(true);
  };

  //save skills
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };
  // const saveColor = (color: ColorResult) => {
  // Access the selected color value from the 'color' parameter
  // setColor(color.hex);

  // You can do whatever you need with the selected color here
  // };
  // const saveColor_second = (color: ColorResult) => {
  // Access the selected color value from the 'color' parameter
  // setColor_second(color.hex);

  // You can do whatever you need with the selected color here
  // };
  return (
    <div className="first-page ">
      <div className="flex ">
        <div
          className="flex flex-col w-3/12 bg-[#323B4C] h-auto pt-6 pb-8 pl-3 pr-6 text-gray-100 xs:w-1/3 md:w-3/12 md:pl-4 md:pr-4 xs:pt-2"
          // style={{ backgroundColor: color }}
        >
          {/* <div className="w-full">
            <ColorPicker
              defaultColor="#323B4C"
              resetColor="#323B4C"
              setColor={setColor}
              styles_pin=" relative  right-0"
              styles_div="absolute top-4 left-48"
              secondDefaultColor="#1b1f27"
              setColor_second={setColor_second}
              saveColor={saveColor}
            />
          </div> */}
          <div
            // style={{ backgroundColor: color_second }}
            className=" w-28 h-28 xs:w-[72px] bg-[#111827] relative xs:h-[72px] sm:w-24 sm:h-24 md:w-28 md:h-28 text-white  text-center flex  items-center border-[1px] border-white  rounded-full mx-auto xs:mx-0 md:mx-auto mt-4  md:mt-5 mb-4 justify-center md:mb-2"
          >
            <span className="text-3xl font-semibold border-2 border-transparent xs:text-2xl md:text-3xl hover:shadow-md hover:bg-gray-500 hover:border-dashed hover:border-gray-500 ">
              <EditableField
                value={resume?.shortName ? resume?.shortName : "CPH"}
                style={{ width: "60px" }}
                onSave={(value: string) => {
                  dispatch(setField({ name: "shortName", value: value }));
                  saveResumeToDB({ ...resume, shortName: value });
                }}
              />
            </span>
            {/* <ColorPicker
              defaultColor="#323B4C"
              resetColor="#1b1f27"
              styles_pin="absolute  top-1 right-1"
              styles_div="absolute top-3 -left-1"
              setColor={setColor}
              secondDefaultColor="#1b1f27"
              setColor_second={setColor_second}
              saveColor={saveColor_second}
            /> */}
          </div>
          {/* contacts */}

          <h3 className="flex flex-row items-center gap-2 mb-2 -mr-6 text-base font-semibold uppercase border-2 border-transparent md:-mr-6 md:mt-4 hover:border-dashed hover:border-gray-500 hover:w-full">
            {resumeContactIcon}

            <EditableField
              value={
                resume?.headings?.contact ? resume.headings.contact : "contact"
              }
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.headings?.contact) {
                  updateSaveHook.updateAndSaveHeadings({
                    contact: value,
                  });
                }
              }}
            />
          </h3>
          <span className="w-full mb-2 border-b-2 border-gray-100 !block"></span>
          <ul className="flex flex-col gap-2 pl-0 mb-4 text-xs break-all ">
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500  flex flex-row gap-2  justify-start items-center">
              <div className="p-1">{phoneIcon}</div>

              <EditableField
                value={
                  resume?.contact?.phone
                    ? resume?.contact?.phone
                    : "(555) 555-1234"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.phone) {
                    updateSaveHook.updateAndSaveBasicInfo({ phone: value });
                  }
                }}
              />
            </li>

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 flex flex-row gap-2  justify-start items-center">
              <div className="p-1">{emailIcon}</div>

              <EditableField
                value={
                  resume?.contact?.email
                    ? resume?.contact?.email
                    : "your@email.com"
                }
                onSave={(value: string) => {
                  if (value !== resume?.contact?.email) {
                    updateSaveHook.updateAndSaveBasicInfo({ email: value });
                  }
                }}
              />
            </li>

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row gap-2  justify-start items-center ">
              <div className="p-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    stroke="white"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M6.15572 13V7.54545H6.99379V13H6.15572ZM6.58185 6.63636C6.4185 6.63636 6.27764 6.58073 6.15927 6.46946C6.04326 6.35819 5.98526 6.22443 5.98526 6.06818C5.98526 5.91193 6.04326 5.77817 6.15927 5.6669C6.27764 5.55563 6.4185 5.5 6.58185 5.5C6.74521 5.5 6.88488 5.55563 7.00089 5.6669C7.11926 5.77817 7.17844 5.91193 7.17844 6.06818C7.17844 6.22443 7.11926 6.35819 7.00089 6.46946C6.88488 6.58073 6.74521 6.63636 6.58185 6.63636ZM9.36683 9.71875V13H8.52876V7.54545H9.33842V8.39773H9.40945C9.53729 8.12074 9.73142 7.8982 9.99183 7.73011C10.2522 7.55966 10.5884 7.47443 11.0004 7.47443C11.3697 7.47443 11.6928 7.55019 11.9698 7.7017C12.2468 7.85085 12.4622 8.07812 12.6161 8.38352C12.77 8.68655 12.8469 9.07008 12.8469 9.53409V13H12.0089V9.59091C12.0089 9.16241 11.8976 8.8286 11.6751 8.58949C11.4525 8.34801 11.1471 8.22727 10.7589 8.22727C10.4914 8.22727 10.2522 8.28527 10.0415 8.40128C9.83321 8.51728 9.66868 8.68655 9.54794 8.90909C9.4272 9.13163 9.36683 9.40152 9.36683 9.71875Z"
                    fill="white"
                  />
                </svg>
              </div>
              <EditableField
                value={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                onSave={(value: string) => {
                  if (value !== resume.contact.linkedIn) {
                    updateSaveHook.updateAndSaveBasicInfo({ linkedIn: value });
                  }
                }}
              />
              {/* </a> */}
            </li>
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row gap-2  justify-start items-center  ">
              <div className="p-1">
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
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <EditableField
                value={resume?.contact?.address ? resume.contact.address : ""}
                onSave={(value: string) => {
                  if (value !== resume.contact.address) {
                    updateSaveHook.updateAndSaveBasicInfo({ address: value });
                  }
                }}
              />
            </li>
          </ul>

          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              {resume?.primarySkills && resume?.primarySkills.length > 0 && (
                <>
                  <h3 className="flex flex-row items-center gap-2 mb-2 -mr-6 text-base font-semibold uppercase border-2 border-transparent md:-mr-6 md:text-md hover:border-dashed hover:border-gray-500 hover:w-full ">
                    {resumeSkillsIcon}

                    <EditableField
                      value={
                        resume?.headings?.primarySkills
                          ? resume.headings.primarySkills
                          : "Skills"
                      }
                      style={{ width: "fit-content" }}
                      onSave={(value: string) => {
                        if (value !== resume?.headings?.primarySkills) {
                          updateSaveHook.updateAndSaveHeadings({
                            primarySkills: value,
                          });
                        }
                      }}
                    />
                  </h3>
                  <span className="border-b-2 border-white w-full h-2 mb-2 !block"></span>
                </>
              )}
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ol className="border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex list-styled flex-col gap-3 mb-4 text-xs xs:text-[12px] md:text-xs">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex  items-center gap-3"
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <div className=" w-1 h-1 rounded-full bg-gray-100"></div>
                        <div className="w-full flex justify-between">
                          <EditableField
                            value={skill}
                            onSave={(value: string) => {
                              handlers.handleUpdateSkill(value, i);
                            }}
                          />
                          <div
                            onClick={() => handlers.handleDeleteSkill(i)}
                            className="w-4 h-4 cursor-pointer child"
                          >
                            {crossIcon1}
                          </div>
                        </div>
                      </li>
                    ))}

                    {newPrimarySkill ? (
                      <>
                        <div className="w-full rounded-2xl border-[1px] border-black flex h-9.5">
                          <input
                            type="text"
                            value={primarySkill}
                            placeholder="Please add Skill"
                            className="w-full px-2 bg-white outline-none rounded-2xl"
                            autoFocus
                            onChange={(e) => setPrimarySkill(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSaveSkills();
                              }
                            }}
                          />
                          <button
                            className="px-2 text-white uppercase bg-green-500 h-9 rounded-r-2xl"
                            onClick={handleSaveSkills}
                          >
                            save
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setNewPrimarySkill(false);
                          }}
                          className="px-2 py-1 text-white bg-red-500 rounded-full"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      " "
                    )}
                  </ol>
                </Toolbar>
              ) : (
                <div className="text-center">
                  <div role="status">
                    <Loader />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col flex-wrap w-9/12 px-4 pt-10 pb-10 md:px-8 text-gray-950 xs:pt-16">
          <div className="flex flex-col ">
            <h2 className="text-4xl font-bold border-2 border-transparent hover:border-dashed hover:border-gray-500 xs:text-2xl md:4xl lg:text-4xl hover:shadow-md hover:bg-gray-100">
              <EditableField
                value={resume?.name ? resume?.name : "FULL NAME"}
                style={{ width: "full" }}
                onSave={(value: string) => {
                  if (value !== resume?.name) {
                    updateSaveHook.updateAndSaveName(value);
                  }
                }}
              />
            </h2>
            <h3 className="text-lg border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500 ">
              <EditableField
                value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
                onSave={(value: string) => {
                  if (value !== resume?.jobTitle) {
                    updateSaveHook.updateAndSaveJobTitle(value);
                  }
                }}
              />
            </h3>
          </div>
          {/* Executive Summary */}
          <div className="w-full mt-4">
            <Summary
              heading={resume.headings.summary}
              summary={resume.summary}
              styles={summary}
              customStyle={customStyle_4}
            />
          </div>

          {/* work experience */}
          <div className="space-y-2">
            <Experience
              heading={resume.headings.workExperienceArray}
              workExperienceArray={resume.workExperienceArray}
              workExperience={resume.workExperience}
              customStyle={customStyle_4}
              styles={experience}
            />
          </div>

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}
          {/* Publications */}
          <div className="w-full">
            {resume?.publications && resume?.publications.length > 0 && (
              <Publication
                heading={resume.headings.publications}
                publications={resume.publications}
                customStyle={customStyle_4}
                styles={publicationStyles}
              />
            )}
          </div>

          {/* Certificates */}
          <div className="w-full">
            {resume?.certifications && resume?.certifications.length > 0 && (
              <Certification
                customStyle={customStyle_4}
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={certification}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {resume?.trainings && resume?.trainings.length > 0 && (
              <Training
                customStyle={customStyle_4}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
                styles={training}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {resume?.awards && resume?.awards.length > 0 && (
              <Award
                customStyle={customStyle_4}
                heading={resume.headings.awards}
                awards={resume.awards}
                styles={award}
              />
            )}
          </div>

          {/* Interests & Hobbies */}
          <div className="w-full">
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                customStyle={customStyle_4}
                heading={resume.headings.interests}
                interests={resume.interests}
                styles={interest}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {resume?.references && resume?.references.length > 0 && (
              <Reference
                customStyle={customStyle_4}
                heading={resume.headings.references}
                references={resume.references}
                styles={reference}
              />
            )}
          </div>

          {/* Languages */}
          <div className="w-full">
            {resume?.languages && resume?.languages.length > 0 && (
              <Language
                customStyle={customStyle_4}
                heading={resume.headings.languages}
                languages={resume.languages}
                styles={language}
              />
            )}
          </div>
          {/* Education */}

          {resume?.education.length > 0 && (
            <>
              <h3 className="flex flex-row items-center gap-2 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
                {resumeEductionIcon}

                <EditableField
                  value={
                    resume?.headings?.education
                      ? resume.headings.education
                      : "Education"
                  }
                  style={{ width: "fit-content" }}
                  onSave={(value: string) => {
                    if (value !== resume?.headings?.education) {
                      updateSaveHook.updateAndSaveHeadings({
                        education: value,
                      });
                    }
                  }}
                />
              </h3>
              <span className="border-stylee  h-0 border-[1px] !border-gray-500 my-3 !block"></span>
              <ul className="flex flex-wrap justify-between w-full pl-0 md:flex-row lg:flex-row ">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[28%] xs:w-[45%] bg-gray-200 rounded-md p-2 m-2 xs:mx-0 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li className="flex items-center justify-between text-base font-semibold uppercase hover:shadow-md hover:cursor-move parent hover:bg-gray-100">
                        <EditableField
                          value={education?.educationLevel}
                          onSave={(value: string) => {
                            handlers.handleSaveEductionDetail(
                              { educationLevel: value },
                              ind
                            );
                          }}
                        />
                      </li>
                      <div
                        onClick={() => setConfirmationModal(true)}
                        className="absolute z-10 hidden w-4 h-4 cursor-pointer group-hover:block right-2 top-2 child"
                      >
                        {crossIcon1}
                      </div>
                      <li className="text-xs font-semibold hover:shadow-md hover:bg-gray-100">
                        <EditableField
                          value={`${education?.fieldOfStudy}`}
                          style={{ width: "100%" }}
                          onSave={(value: string) => {
                            handlers.handleSaveEductionDetail(
                              { fieldOfStudy: value },
                              ind
                            );
                          }}
                        />{" "}
                      </li>
                      <li className="text-xs italic text-gray-800 hover:shadow-md hover:bg-gray-100">
                        <EditableField
                          value={`${education?.schoolName}`}
                          onSave={(value: string) => {
                            handlers.handleSaveEductionDetail(
                              { schoolName: value },
                              ind
                            );
                          }}
                        />
                      </li>

                      {(education.fromYear !== "" ||
                        education.toYear !== "") && (
                        <li className="flex mb-4 text-xs italic text-gray-700 ">
                          {education.fromMonth && (
                            <EditableField
                              value={`${education?.fromMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { fromMonth: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.fromMonth && <span>&nbsp;</span>}
                          {education.fromYear && (
                            <EditableField
                              value={`${education?.fromYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { fromYear: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.fromYear && <span>&nbsp; - &nbsp;</span>}
                          {education.toMonth && !education.isContinue && (
                            <EditableField
                              value={`${education?.toMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { toMonth: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.toMonth && <span>&nbsp;</span>}
                          {education.toYear && !education.isContinue && (
                            <EditableField
                              value={`${education?.toYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { toYear: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.isContinue && (
                            <EditableField
                              value={`${education?.isContinue && "Present"}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { toYear: value },
                                  ind
                                );
                                handlers.handleSaveEductionDetail(
                                  { isContinue: false },
                                  ind
                                );
                              }}
                            />
                          )}
                        </li>
                      )}
                      {/* 
                      <li className="mb-4 text-xs italic text-gray-700 ">
                        {education?.fromMonth + " " + education.fromYear} -{" "}
                        {education?.isContinue
                          ? "Present"
                          : education?.toMonth + " " + education.toYear}
                      </li> */}
                    </div>
                    {confirmationModal && (
                      <DeleteConfirmationModal
                        message="Are you sure you want to delete ?"
                        onCancel={() => setConfirmationModal(false)}
                        onConfirm={() => {
                          setConfirmationModal(false);
                          handlers.handleDeleteEductionDetail(ind);
                        }}
                      />
                    )}
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
export default memo(ResumeTemplate4);
