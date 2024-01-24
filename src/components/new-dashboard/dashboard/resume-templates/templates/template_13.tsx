"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import {
  Loader,
  crossIcon1,
  emailIcon,
  phoneIcon,
} from "@/helpers/iconsProvider";
import useGetSummary from "@/hooks/useGetSummary";
import Toolbar from "@/components/new-dashboard/common/Toolbar";
import EditableField from "@/components/new-dashboard/common/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
const ResumeTemplate16 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);

  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { saveResumeToDB } = useSaveResumeToDB();

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

  useEffect(() => {
    if (streamedJDData === "") {
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
    <div className="w-full first-page relative text-gray-900">
      <div className="w-4/12 h-11 rounded-bl-full absolute right-0 bg-[#1F1E1E] "></div>
      <div className="flex">
        <div className="w-5/12 md:w-3/12 flex flex-col items-center md:bg-[#d9d9d9] pl-9 pt-5 h-[1150px] xs:h-auto">
          <div className=" bg-[#1F1E1E] flex  flex-col md:w-56 h-[100%] rounded-t-full items-center">
            <div className=" w-48 h-48 xs:w-24 md:h-48 md:w-48 xs:h-24  m-3 text-gray-800 bg-[#fff] md:bg-[#d9d9d9]  text-center flex justify-center items-center  rounded-full ">
              <span className="text-4xl text-bold hover:shadow-md hover:text-black hover:bg-gray-100">
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
            <span className="border-stylee w-full h-0 my-3"></span>
            <div className="w-full  bg-[#1F1E1E] pb-2 text-white  py-1 flex   flex-row">
              <h3 className="uppercase text-lg font-semibold py-1 pl-2 rounded-r-full pr-3  gap-2 bg-[#fff] md:bg-[#d9d9d9] text-[#1F1E1E] flex justify-center items-center flex-row">
                Contact
              </h3>
            </div>
            <span className="border-stylee w-full h-0 my-3"></span>
            <ul className=" flex flex-col gap-3 w-full mb-4 ml-3 text-sm text-gray-300 break-all pl-0">
              <li className="hover:shadow-md hover:bg-gray-300 items-center hover:text-black text-[14px]  flex flex-row gap-1 ">
                <span className="w-7 h-7 flex items-center justify-center mr-2 border-[1px] border-gray-300 rounded-full">
                  {phoneIcon}
                </span>
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
              <li className="hover:shadow-md hover:text-black hover:bg-gray-100 flex flex-row gap-1  items-center text-[14px]">
                <span className="w-7 h-7 flex items-center justify-center mr-2 border-[1px] border-gray-300 rounded-full">
                  {emailIcon}
                </span>
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
              <li className="hover:shadow-md hover:text-black group hover:bg-gray-100 flex flex-row gap-1  items-center text-[14px]">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="0.8"
                  width="36"
                  height="36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    stroke-width="0.8"
                  />
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
                      updateSaveHook.updateAndSaveBasicInfo({
                        linkedIn: value,
                      });
                    }
                  }}
                />
                {/* </a> */}
              </li>
            </ul>

            {/* Skills */}
            {resume?.primarySkills && resume?.primarySkills.length > 0 && (
              <>
                <span className="border-stylee w-full h-0 my-3"></span>
                <div className="w-full  bg-[#1F1E1E] pb-2 text-white  py-1 flex   flex-row">
                  <h3 className="uppercase text-lg font-semibold py-1 pl-2 rounded-r-full pr-3  gap-2 bg-[#fff] md:bg-[#d9d9d9] text-[#1F1E1E] flex justify-center items-center flex-row">
                    Skills
                  </h3>
                </div>
                <span className="border-stylee w-full h-0  my-1"></span>
                {resume?.primarySkills &&
                resume?.primarySkills.length > 0 &&
                !regenerating ? (
                  <Toolbar
                    addSkill={handleAddSkills}
                    regenerateSkills={getPrimarySkills}
                  >
                    <ul className="px-3 flex  flex-col gap-1 mb-4 text-gray-300 w-full text-[14px] ">
                      {/* <li className="font-semibold  uppercase">primary</li> */}

                      {resume?.primarySkills.map((skill: string, i: number) => (
                        <li
                          className="hover:shadow-md hover:cursor-move parent hover:text-black hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex items-center  "
                          key={i}
                          onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", i.toString())
                          }
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDropPrimary(e, i)}
                          draggable
                        >
                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>
                          <div className="flex flex-row w-full items-center justify-between">
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
                            }}
                            className="bg-red-500 py-1 px-2 text-white rounded-full"
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
                    <div role="status">{Loader}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-9/12 flex flex-col md:bg-[#d9d9d9] pt-20 ">
          <div className="flex w-8/12 xs:w-[60%] sm:w-[60%] md:w-8/12 lg:w-8/12">
            <div className="flex flex-col px-8">
              <h2 className="text-2xl xs:text-lg sm:text-lg md:text-2xl lg:text-2xl font-bold hover:shadow-md hover:bg-gray-100">
                <EditableField
                  value={resume?.name ? resume?.name : "FULL NAME"}
                  style={{ width: "fit-content" }}
                  onSave={(value: string) => {
                    if (value !== resume?.name) {
                      updateSaveHook.updateAndSaveName(value);
                    }
                  }}
                />
              </h2>
              <h3 className="text-xl  hover:shadow-md mt-2 hover:bg-gray-100 xs:text-sm sm:text-sm md:text-xl lg:text-xl">
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
          </div>
          {/* Executive Summary */}
          <span className="border-stylee w-full h-0  my-3"></span>
          <h3 className="uppercase text-xl bg-[#1F1E1E] font-bold w-fit px-12 mb-2 rounded-r-full text-gray-300  py-1">
            EXECUTIVE SUMMARY
          </h3>
          {/* <span className="border-stylee w-full h-0 border border-[#444440] mb-3"></span> */}
          <span className="border-stylee w-full h-0  my-2"></span>
          <Toolbar regenrateSummary={getSummary}>
            <div className="text-[14px] hover:shadow-md xs:min-h-fit min-h-[350px] px-4 md:px-8 hover:bg-gray-100 group-hover:pb-14 ">
              <EditableField
                type="textarea"
                value={
                  resume?.summary !== "" ? (
                    resume?.summary
                  ) : streamedSummaryData ? (
                    streamedSummaryData
                  ) : (
                    <div className="text-center">
                      <div role="status">{Loader}</div>
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
          <span
            className="border-stylee w-full h-0 
           my-3"
          ></span>
          <h3 className="uppercase text-xl bg-[#1F1E1E] font-bold w-fit px-12 mb-2 rounded-r-full text-gray-300  py-1">
            WORK EXPERIENCE
          </h3>

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
                          ? "w-[100vw] ml-[-200px]  xs:ml-0 xs:w-full "
                          : "xs:min-h-fit  min-h-[430px]"
                      }`}
                    >
                      <div
                        key={i}
                        className="border-transparent border-2 hover:border-dashed mt-1 mx-4 md:mx-8 hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <div className="flex">
                          <div>
                            <h2 className="hover:shadow-md hover:cursor-text hover:bg-gray-100 text-xl xs:text-[1rem] sm:text[1rem] md:text-xl lg:text-xl font-bold">
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
                            <h2 className="hover:cursor-default text-sm">
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
                          </div>
                        </div>
                        <div className="p-4">
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
                              <div role="status">{Loader}</div>
                            </div>
                          )}

                          {newWorkExperience === i ? (
                            <>
                              <div className="w-full gap-1 rounded-md flex flex-wrap h-9.5">
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
          <div className="flex flex-col mb-6  mt-[2px] ml-[-200px] xs:ml-0 ">
            <h3 className="uppercase text-xl bg-[#1F1E1E] font-bold w-fit px-12 mb-2 rounded-r-full text-gray-300  py-1">
              Education
            </h3>
          </div>
          {resume?.education.length > 0 && (
            <div className="px-8 ml-[-200px] xs:ml-0">
              <ul className="flex xs:flex-col md:flex-row lg:flex-row w-full  flex-wrap pl-0">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="flex flex-col w-[30%] xs:w-full md:w-[30%]">
                      <li
                        className=" hover:shadow-md hover:cursor-move border-transparent border-2 
                  parent hover:border-dashed hover:border-gray-500 hover:border-2 
                   hover:bg-gray-100 font-bold flex uppercase text-[16px] justify-between items-center "
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
                        <div
                          onClick={() =>
                            handlers.handleDeleteEductionDetail(ind)
                          }
                          className="w-4 h-4  cursor-pointer child"
                        >
                          {crossIcon1}
                        </div>
                      </li>
                      <li className="hover:shadow-md hover:bg-gray-100  text-[15px] font-medium ">
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
                      <li className="hover:shadow-md hover:bg-gray-100 italic text-sm  text-gray-500">
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
                      <li className="mb-4 text-xs italic text-gray-500 ">
                        {education?.fromMonth + " " + education.fromYear} -{" "}
                        {education?.isContinue
                          ? "Present"
                          : education?.toMonth + " " + education.toYear}
                      </li>
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
export default memo(ResumeTemplate16);
