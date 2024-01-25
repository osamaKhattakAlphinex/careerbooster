"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import { crossIcon1, emailIcon, phoneIcon } from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

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
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { saveResumeToDB } = useSaveResumeToDB();

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();
  const [insideIndex, setInsideIndex] = useState<number>(0);

  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

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

  return (
    <div className="first-page ">
      <div className=" flex">
        <div className=" w-3/12 xs:w-1/3 md:w-3/12 flex flex-col pl-3 md:pl-4 bg-[#323B4C] text-gray-100  pr-6 md:pr-4  py-8 h-[1080px] xs:h-auto">
          <div className=" w-32 h-32  xs:w-[72px] xs:h-[72px] sm:w-24 sm:h-24 md:w-32 md:h-32 text-white bg-gray-800 text-center flex  items-center  rounded-full mx-auto xs:mx-0 md:mx-auto mt-0  md:mt-0 mb-4 justify-center md:mb-2">
            <span className="text-3xl xs:text-2xl md:text-3xl hover:shadow-md hover:bg-gray-500">
              <EditableField
                value={resume?.shortName ? resume?.shortName : "CPH"}
                style={{ width: "60px" }}
                onSave={(value: string) => {
                  dispatch(setField({ name: "shortName", value: value }));
                  saveResumeToDB({ ...resume, shortName: value });
                }}
              />
            </span>
          </div>
          {/* contacts */}

          <h3 className="uppercase text-lg border-white pb-2  -mr-6 md:-mr-6 border-b-2  xs:text-sm sm:text-sm md:text-md lg:text-lg font-semibold xs:font-medium flex flex-row gap-2 items-center md:mt-4">
            Contact
          </h3>
          <span className=" w-[110%] h-0 mb-3"></span>
          <ul className=" flex flex-col gap-2 mb-4 text-sm break-all pl-0">
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500  flex flex-row gap-2  justify-start items-start">
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

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 flex flex-row gap-2  justify-start items-start">
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

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row gap-2  justify-start items-start ">
              <div className="p-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    stroke="white"
                    stroke-width="0.8"
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
          </ul>

          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              {resume?.primarySkills && resume?.primarySkills.length > 0 && (
                <>
                  <h3 className="uppercase text-lg xs:text-sm sm:text-sm -mr-6 md:-mr-6  md:text-md lg:text-lg border-b-2 pb-2 border-white font-semibold flex flex-row gap-2 items-center ">
                    Skills
                  </h3>
                  <span className="border-stylee w-full h-0 mb-3"></span>
                </>
              )}
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ol className="border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex list-styled flex-col gap-3 mb-4 text-sm xs:text-[12px] md:text-sm">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex justify-between items-center"
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <EditableField
                          value={skill}
                          onSave={(value: string) => {
                            handlers.handleUpdateSkill(value, i);
                          }}
                        />
                        <div
                          onClick={() => handlers.handleDeleteSkill(i)}
                          className="w-4 h-4  cursor-pointer child"
                        >
                          {crossIcon1}
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
                            className="bg-white outline-none rounded-2xl px-2 w-full"
                            autoFocus
                            onChange={(e) => setPrimarySkill(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSaveSkills();
                              }
                            }}
                          />
                          <button
                            className="bg-green-500 uppercase h-9 px-2 text-white rounded-r-2xl"
                            onClick={handleSaveSkills}
                          >
                            save
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setNewPrimarySkill(false);
                          }}
                          className="bg-red-500 py-1 px-2 text-white rounded-full"
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
        <div className="w-9/12 flex flex-wrap flex-col px-4 md:px-8 text-gray-950 pb-10 pt-16">
          <div className="flex flex-col ">
            <h2 className="text-2xl font-bold xs:text-xl md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100">
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
            <h3 className="text-lg font-medium xs:text-[14px] md:text-xl hover:shadow-md hover:bg-gray-100">
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

          <h3 className="uppercase text-lg xs:text-sm sm:text-sm md:text-md lg:text-lg font-semibold mt-6 md:mt-14">
            EXECUTIVE SUMMARY
          </h3>
          <span className="w-full h-0 border-[1px] !border-gray-500 mt-2 mb-4"></span>

          <Toolbar regenrateSummary={getSummary}>
            <div className="text-sm hover:shadow-md min-h-[420px] pr-4 xs:min-h-fit border-2 border-transparent hover:border-gray-500 hover:border-dashed ">
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
                        <Loader />
                      </div>
                    </div>
                  )
                }
                onSave={(value: string) => {
                  updateSaveHook.updateAndSaveSummary(value);
                }}
              />
            </div>
          </Toolbar>

          {/* Work Experience */}

          <h3 className="uppercase text-lg xs:text-sm sm:text-sm md:text-md lg:text-lg font-semibold mt-7">
            WORK EXPERIENCE
          </h3>
          <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 my-3"></span>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <>
                    <div
                      key={i}
                      className={`flex justify-start  ${
                        i > 0
                          ? "w-[100vw] ml-[-204px] xs:ml-0 xs:w-full"
                          : "xs:min-h-fit min-h-[380px]"
                      }`}
                    >
                      <div className="w-[5%] pr-5 mt-1 xs:pr-0 md:pr-5   pt-2   h-full flex flex-col items-center  gap-1">
                        <div className="p-1 rounded-full bg-gray-100 border-2 border-gray-500 "></div>
                        {resume?.workExperienceArray.length - 1 !== i && (
                          <span className="h-full w-[2px] bg-gray-500 border-b border-gray-500"></span>
                        )}
                      </div>
                      <Toolbar
                        key={i}
                        addAchivement={() => setNewWorkExperience(i)}
                        regenrateAchivements={() => handleRegenrate(rec, i)}
                        addNewLine={() => {
                          handlers.handleAddSpace(i, newAchievement);
                          setNewAchievement("");
                        }}
                      >
                        <div
                          key={i}
                          className="hover:border-dashed hover:border-gray-500  border-transparent border-2 hover:cursor-move hover:border-2"
                          onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", i.toString())
                          }
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDropExperience(e, i)}
                          draggable
                        >
                          <h2 className="hover:shadow-md hover:cursor-text text-[1rem] font-bold leading-8 hover:bg-gray-100">
                            <EditableField
                              value={rec?.title}
                              style={{ width: "100%" }}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { title: value },
                                  i
                                );
                              }}
                            />
                          </h2>
                          <h2 className="hover:cursor-default text-[15px] leading-relaxed  ">
                            {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                            {rec?.isContinue
                              ? "Present"
                              : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                            |{" "}
                            <span className="hover:shadow-md hover:cursor-text hover:bg-gray-100">
                              <EditableField
                                value={rec?.company}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { company: value },
                                    i
                                  );
                                }}
                              />
                            </span>{" "}
                            |{" "}
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={rec?.cityState}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { cityState: value },
                                    i
                                  );
                                }}
                              />
                            </span>{" "}
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={rec?.country}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { country: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          </h2>
                          <div className="p-4">
                            {rec?.achievements &&
                            i !== regeneratedRecordIndex ? (
                              <ul className="pl-0 flex flex-col gap-1 text-sm">
                                {rec?.achievements.map(
                                  (achievement: any, ind: number) =>
                                    achievement === "" ? (
                                      <li
                                        key={ind}
                                        onDragStart={(e) => {
                                          setInsideIndex(ind);
                                        }}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                          handleDropAchievement(
                                            i,
                                            ind,
                                            insideIndex
                                          );
                                        }}
                                        draggable
                                        className="h-8 hover:bg-slate-200 group flex flex-row justify-center items-center"
                                      >
                                        <div
                                          className="group-hover:block hidden font-medium text-xs uppercase   text-gray-500 cursor-pointer"
                                          onClick={() => {
                                            handlers.handleRemoveExtraSpace(
                                              i,
                                              ind
                                            );
                                          }}
                                        >
                                          Remove This Extra Space
                                        </div>
                                      </li>
                                    ) : (
                                      <li
                                        onDragStart={(e) => {
                                          setInsideIndex(ind);
                                        }}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                          handleDropAchievement(
                                            i,
                                            ind,
                                            insideIndex
                                          );
                                        }}
                                        draggable
                                        className="list-disc hover:border-dashed hover:cursor-move hover:border-gray-500 border-[1px] hover:border-[1px] border-transparent hover:shadow-md relative parent hover:bg-gray-100"
                                        key={ind}
                                      >
                                        <EditableField
                                          type="textarea"
                                          rows={2}
                                          value={achievement}
                                          onSave={(value: string) => {
                                            handlers.handleUpdateAchivement(
                                              i,
                                              ind,
                                              value
                                            );
                                          }}
                                        />
                                        <div
                                          onClick={() =>
                                            handlers.handleDeleteAchivement(
                                              i,
                                              ind
                                            )
                                          }
                                          className="w-4 h-4 absolute right-0.5 top-0.5 text-red-500 cursor-pointer child"
                                        >
                                          {crossIcon1}
                                        </div>
                                      </li>
                                    )
                                )}
                              </ul>
                            ) : streamedJDData ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: streamedJDData,
                                }}
                              ></div>
                            ) : (
                              <div className="text-center">
                                <div role="status">
                                  <Loader />
                                </div>
                              </div>
                            )}
                            {newWorkExperience === i ? (
                              <>
                                <div className="w-full gap-1 rounded-md flex flex-wrap h-9.5">
                                  <textarea
                                    className="w-9/12 xs:w-full md:w-9/12 lg:w-9/12 rounded-l-md border-2  text bg-transparent p-2" // Apply Tailwind CSS classes
                                    onChange={(e) =>
                                      setNewAchievement(e.target.value)
                                    }
                                    value={newAchievement}
                                    rows={1}
                                    cols={1}
                                    name="newAchievement"
                                    id="newAchievement"
                                    autoComplete="off"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                                        // Save the new achievement to the state and possibly the database
                                        handlers.handleAddAchivement(
                                          i,
                                          newAchievement
                                        );
                                        setNewAchievement("");
                                      }
                                    }}
                                  />
                                  <button
                                    className="bg-green-500 w-2/12 xs:w-full md:w-2/12 lg:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
                                    onClick={() => {
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddAchivement(
                                        i,
                                        newAchievement
                                      );
                                      setNewAchievement("");
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                                <button
                                  onClick={() => {
                                    setNewAchievement("");
                                    setNewWorkExperience(-1);
                                  }}
                                  className="bg-red-500 w-2/12 xs:w-full md:w-2/12 lg:w-2/12 py-1 px-2 mt-2 text-white rounded-full"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </Toolbar>
                    </div>
                  </>
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
          {/* Education */}

          {resume?.education.length > 0 && (
            <div className=" ml-[-180px]  xs:ml-0">
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center ">
                Education
              </h3>
              <span className="border-stylee block h-0 border-[1px] !border-gray-500 my-3"></span>
              <ul className="flex xs:flex-col md:flex-row lg:flex-row w-full  flex-wrap pl-0 ">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[28%] xs:w-full md:w-[30%] mx-2 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li
                        className=" hover:shadow-md hover:cursor-move 
                  parent  
                   hover:bg-gray-100 font-bold flex uppercase text-[15px]  justify-between items-center "
                      >
                        <EditableField
                          type="textarea"
                          rows={2}
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
                        onClick={() => handlers.handleDeleteEductionDetail(ind)}
                        className="w-4 hidden h-4 group-hover:block absolute right-2 top-2 z-10  cursor-pointer child"
                      >
                        {crossIcon1}
                      </div>
                      <li className="hover:shadow-md  hover:bg-gray-100 text-[15px] font-medium">
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
                      <li className="hover:shadow-md hover:bg-gray-100 text-sm italic text-gray-800">
                        <EditableField
                          type="textarea"
                          rows={2}
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
                        <li className="mb-4 italic text-xs text-gray-700 ">
                          {education.fromMonth && (
                            <EditableField
                              rows={2}
                              value={`${education?.fromMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { fromMonth: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.fromYear && (
                            <EditableField
                              rows={2}
                              value={`${education?.fromYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { fromYear: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {(education.toMonth || education.toYear) && (
                            <span>&nbsp; - &nbsp;</span>
                          )}
                          {education.toMonth && !education.isContinue && (
                            <EditableField
                              rows={2}
                              value={`${education?.toMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveEductionDetail(
                                  { toMonth: value },
                                  ind
                                );
                              }}
                            />
                          )}
                          {education.toYear && !education.isContinue && (
                            <EditableField
                              rows={2}
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
                              rows={2}
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
                      <li className="mb-4 italic text-xs text-gray-700 ">
                        {education?.fromMonth + " " + education.fromYear} -{" "}
                        {education?.isContinue
                          ? "Present"
                          : education?.toMonth + " " + education.toYear}
                      </li> */}
                    </div>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate4);
