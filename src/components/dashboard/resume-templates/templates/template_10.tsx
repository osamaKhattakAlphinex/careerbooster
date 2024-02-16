"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import { crossIcon1, emailIcon, phoneIcon } from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

import useGetSummary from "@/hooks/useGetSummary";
import Toolbar from "@/components/dashboard/Toolbar";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
const ResumeTemplate10 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const [primarySkill, setPrimarySkill] = useState<string>("");

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
    <div className="first-page relative">
      <div className="flex flex-row absolute top-[30px] h-28 z-10  bg-[#043382] items-center justify-center    w-full ">
        {/* <div className="  z-50 w-40 h-40 xs:w-[120px] xs:h-[80px] sm:w-[120px] sm:h-[80px] border-2 border-[#042B6B] md:w-48 md:h-48 lg:w-48 lg:h-48  text-white bg-gray-800 text-center flex justify-center   rounded-full mx-4  md:mt-0 md:mr-8 items-center ">
          <span className="text-4xl md:text-3xl  hover:shadow-md hover:bg-gray-500">
            <EditableField
              value={resume?.shortName ? resume?.shortName : "CPH"}
              style={{ width: "60px" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "shortName", value: value }));
                saveResumeToDB({ ...resume, shortName: value });
              }}
            />
          </span>
        </div> */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold xs:font-medium text-gray-100 md:text-4xl hover:shadow-md hover:bg-gray-500">
            <EditableField
              className={`md:w-auto xs:w-fit`}
              value={resume?.name ? resume?.name : "FULL NAME"}
              // style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.name) {
                  updateSaveHook.updateAndSaveName(value);
                }
              }}
            />
          </h2>
          <h3 className="text-lg xs:text-[16px] md:text-xl text-gray-100 hover:shadow-md hover:bg-gray-500">
            <EditableField
              className={` xs:w-fit md:w-[600px] lg:w-[600px]`}
              // style={{ width: "600px" }}
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                if (value !== resume?.jobTitle) {
                  updateSaveHook.updateAndSaveJobTitle(value);
                }
              }}
            />
          </h3>
        </div>
      </div>
      <div className=" flex">
        {/* sidebar */}
        <div className="z-5    xs:w-4/12 w-3.5/12 flex flex-col pl-3 xs:pl-0 sm:pl-0 md:pl-0 lg:pl-3 xs:pr-4 sm:pr-4 md:pr-4 lg:pr-6 bg-gray-950 text-gray-100  pr-6  pb-8  pt-[160px]  h-[1080px] xs:h-auto">
          {/* contacts */}
          <div className="rounded-3xl border-2 border-blue-900 xs:py-2 py-[6px] flex justify-center ">
            <h3 className="uppercase text-[16px] text-center mb-0 xs:text-sm sm:text-sm md:text-md lg:text-[16px] font-semibold flex flex-row gap-2 items-center">
              Contact
            </h3>
          </div>

          <ul className=" flex flex-col gap-2 text-sm break-all pl-0 mt-4">
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-xs flex flex-row gap-1  items-start justify-start">
              <div className="bg-[#043382] rounded-full p-2 mr-3">
                {phoneIcon}
              </div>

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
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 flex flex-row gap-1 justify-start  items-start text-xs">
              <div className="bg-[#043382] rounded-full p-2 mr-3">
                {" "}
                {emailIcon}
              </div>

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

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row justify-start gap-1  items-start text-xs">
              <div className="bg-[#043382] rounded-full p-2 mr-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 192 192"
                >
                  {
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                    >
                      <path d="M0,192v-192h192v192z" fill="none"></path>
                      <g fill="#ffffff">
                        <g id="surface1">
                          <path d="M156,0h-120c-19.875,0 -36,16.125 -36,36v120c0,19.875 16.125,36 36,36h120c19.875,0 36,-16.125 36,-36v-120c0,-19.875 -16.125,-36 -36,-36zM59.36539,162.98077h-29.82693l-0.17307,-89.30769h29.82692zM43.70192,61.99038h-0.17308c-9.75,0 -16.03846,-6.72115 -16.03846,-15.08653c0,-8.56731 6.49039,-15.0577 16.41347,-15.0577c9.92308,0 16.00961,6.49038 16.21153,15.0577c0,8.36538 -6.31731,15.08653 -16.41346,15.08653zM162.77885,162.98077h-30.08654v-48.51923c0,-11.74039 -3.11538,-19.73077 -13.61538,-19.73077c-8.01923,0 -12.34615,5.39423 -14.42308,10.61538c-0.77885,1.875 -0.98077,4.44231 -0.98077,7.06731v50.56731h-30.23077l-0.17308,-89.30769h30.23077l0.17308,12.60577c3.86538,-5.97116 10.29808,-14.42308 25.70192,-14.42308c19.09616,0 33.37501,12.46154 33.37501,39.25961v51.86539z"></path>
                        </g>
                      </g>
                    </g>
                  }
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
              <div className="rounded-3xl border-2 border-blue-900 xs:py-2 py-[6px] my-3  flex justify-center">
                <h3 className="uppercase text-[16px] mb-0 xs:text-sm sm:text-sm md:text-md lg:text-[16px] font-semibold flex flex-row gap-2 items-center ">
                  Skills
                </h3>
              </div>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className=" border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-4 flex  flex-col gap-1 mb-4 text-[14px]">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex gap-2 items-center   "
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <span
                          className="bg-gray-100 w-[6px]
                     h-[6px] rounded-full"
                        ></span>
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
                          className="bg-red-500  py-1 px-2 text-white rounded-full"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      " "
                    )}
                  </ul>
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
        <div className="w-full flex flex-wrap flex-col px-4 sm:px-2 xs:px-2 md:px-8 lg:px-8  text-gray-950 pb-10 pt-[140px] ">
          {/* Executive Summary */}
          <div className="rounded-3xl xs:-mx-1 md:mx-0 bg-blue-900 py-2 px-6 mt-6 mb-3 xs:px-2 sm:px-2 md:px-6 lg:px-6 w-[230px] xs:w-auto md:w-[230px] lg:w-[230px]">
            <h3 className="uppercase text-[16px] mb-0 font-semibold text-gray-100 xs:text-sm sm:text-sm md:text-md lg:text-[16px]">
              EXECUTIVE SUMMARY
            </h3>
          </div>

          <Toolbar regenrateSummary={getSummary}>
            <div className="text-sm hover:shadow-md border-2 border-transparent hover:border-gray-500 hover:border-dashed">
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
          <div className="rounded-3xl  bg-blue-900 xs:-mx-1  md:mx-0 py-2 px-6 mt-6 mb-3 xs:px-2 sm:px-2 md:px-6 lg:px-6 w-[200px] xs:w-auto md:w-[200px] lg:w-[200px]">
            <h3 className="uppercase text-[16px] mb-0 font-semibold text-gray-100 xs:text-sm sm:text-sm md:text-md lg:text-[16px]">
              WORK EXPERIENCE
            </h3>
          </div>

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
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
                      className={`flex justify-start items-start ${
                        i > 0
                          ? " ml-[-170px] xs:ml-0 "
                          : "xs:min-h-fit min-h-[340px]"
                      }`}
                    >
                      <div
                        key={i}
                        className="hover:border-dashed hover:border-gray-500  border-transparent border-2 hover:cursor-move hover:border-2  flex flex-col w-full  "
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <h2 className="text-[1rem] font-bold xs:text-lg sm:text-lg md:text-[1rem] lg:text-[1rem] hover:shadow-md hover:cursor-text hover:bg-gray-100 ">
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
                        <h2 className="hover:cursor-default text-[15px] xs:text-sm sm:text-sm md:text-[15px] lg:text-[15px]  ">
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
                        <div className="px-4 py-2">
                          {rec?.achievements && i !== regeneratedRecordIndex ? (
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
                              <div className="w-full gap-1 rounded-md flex flex-wrap    xs:ml-0">
                                <textarea
                                  className="w-full md:w-9/12 rounded-l-md border-2  text bg-transparent p-2" // Apply Tailwind CSS classes
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
                                  className="bg-green-500 w-full md:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
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
                                className="bg-red-500 w-full md:w-2/12 py-1 px-2 mt-2 text-white rounded-full"
                              >
                                Cancel
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Toolbar>
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
            <div className="ml-[-180px] xs:ml-0">
              <div className="rounded-3xl  bg-blue-900 py-2 px-4 my-6  w-[140px]">
                <h3 className="uppercase text-[16px] mb-0 font-semibold text-gray-100 xs:text-sm sm:text-sm md:text-[16px] lg:text-[16px] ">
                  Education
                </h3>
              </div>

              <ul className="pl-0 flex  md:flex-row lg:flex-row w-full  flex-wrap xs:gap-2">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="flex flex-col w-[28%] mr-4   xs:w-[48%]  md:m-2 xs:m-0 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li
                        className=" hover:shadow-md hover:cursor-move 
                  parent  
                   hover:bg-gray-100 font-bold flex uppercase text-sm xs:text-sm md:text-lg justify-between items-center "
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
                      <li className="hover:shadow-md font-semibold  hover:bg-gray-100 text-base">
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
                      <li className="hover:shadow-md hover:bg-gray-100 italic ">
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
                        <li className="mb-4 text-xs text-gray-700 italic ">
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
                          {education.fromMonth && <span>&nbsp;</span>}
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
                          {education.fromYear && <span>&nbsp; - &nbsp;</span>}
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
                          {education.toMonth && <span>&nbsp;</span>}
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
                      {/* <li className="mb-4 text-xs text-gray-700 italic ">
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
export default memo(ResumeTemplate10);
