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
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
const ResumeTemplate14 = () => {
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

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [primarySkill, setPrimarySkill] = useState<string>("");

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
    <div className="w-full first-page relative p-4  text-gray-900">
      <div className="flex xs:items-center absolute w-[85%] xs:w-[77%] md:w-[85%] lg:w-[85%]  top-10 xs:top-14 md:top-12 lg:top-12  left-[15%] xs:left-[22%] md:left-[22%] lg:left-[13%] py-8 xs:py-2 md:py-6 lg:py-8 bg-[#FAF6F1]">
        <div>
          <div className="w-36 h-36 xs:w-24 md:w-36 relative border-[.5rem] xs:border-[2.5px] md:border-[.5rem] lg:border-[.5rem] border-white -left-[4.5rem] md:-left-[4.5rem] lg:-left-[4.5rem] xs:-left-12  xs:h-24 md:h-36 text-white bg-[#745237] text-center flex justify-center items-center  rounded-full ">
            <span className="text-4xl  hover:shadow-md hover:bg-gray-100">
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
        </div>
        <div className="flex flex-col -ml-10 xs:ml-0  md:ml-0 lg:ml-0 px-4 xs:px-2 md:px-8  py-8 xs:py-2 md:py-4 lg:py-8 xs:w-12/12 md:w-12/12 lg:w-10/12">
          <h2 className="text-2xl md:text-2xl font-bold hover:shadow-md hover:bg-gray-100">
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
          <h3 className="text-xl md:text-xl hover:shadow-md mt-2 hover:bg-gray-100">
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
      <div className="flex">
        <div className="w-3/12 xs:w-3/12 md:w-3/12 flex flex-col bg-[#E3DBCC] pl-3 md:pl-8 pr-6 pt-[15rem]  xs:pt-[14rem] md:pt-[15rem]  h-[1070px] xs:h-auto lg:pt-[15rem]  ">
          {/* contacts */}
          <span className="border-stylee w-full h-0  my-3"></span>
          <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
            Contact
          </h3>
          <span className="border-stylee w-full h-0 my-3"></span>
          <ul className=" flex flex-col gap-3 mb-4 text-sm break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-100 text-sm flex flex-row gap-1  items-start justify-start">
              <div>{phoneIcon}</div>
              <span className="h-6 xs:hidden md:block border-[1px] border-[#745237] bg-black  mx-3"></span>
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
            <li className="hover:shadow-md hover:bg-gray-100 flex flex-row gap-1  items-start justify-start text-sm">
              <div>{emailIcon}</div>
              <span className="h-6 border-[1px] xs:hidden md:block border-[#745237] bg-black  mx-3"></span>
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
            <li className="hover:shadow-md w-12/12  hover:bg-gray-100 flex flex-row gap-1  items-start justify-start text-sm">
              <div>
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
              </div>
              <span className="h-6 border-[1px] xs:hidden md:block  border-[#745237] bg-black  mx-1.5"></span>
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
            </li>
          </ul>

          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <span className="border-stylee w-full h-0  my-1"></span>
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                Skills
              </h3>
              <span className="border-stylee w-full h-0  my-1"></span>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className="border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex  flex-col gap-1 mb-4 text-sm">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex justify-start items-center"
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <span className="w-1 h-1 xs:hidden md:block bg-[#745237] rounded-full mr-3"></span>
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
        <div className="w-9/12 md:w-9/12  flex flex-col px-4 xs:px-2 md:px-8 pt-[15rem] xs:pt-[14rem] md:pt-[15rem] lg:pt-[15rem] ">
          {/* Executive Summary */}
          <span className="border-stylee w-full h-0 my-3"></span>
          <h3 className="uppercase text-lg font-semibold">EXECUTIVE SUMMARY</h3>
          <span className="border-stylee w-full h-0  my-2"></span>
          <Toolbar regenrateSummary={getSummary}>
            <div className="text-sm hover:shadow-md min-h-[350px] xs:min-h-fit border-2 border-transparent hover:border-gray-500 hover:border-dashed ">
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
          <span
            className="border-stylee w-full h-0 
           my-3"
          ></span>
          <h3 className="uppercase text-xl font-bold">WORK EXPERIENCE</h3>
          <span
            className="border-stylee w-full h-0 
           my-2"
          ></span>

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
                          ? "w-[100vw] ml-[-210px] xs:ml-0 xs:w-full"
                          : "xs:min-h-fit  min-h-[420px]"
                      }`}
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
                        <div className="flex">
                          <div className="flex xs:flex md:flex lg:flex ">
                            <span className="w-4 h-4 bg-[#745237] rounded-full"></span>
                            <span className="h-13 w-[2.5px] bg-[#745237] mx-2 mt-1 relative -left-[17px]"></span>
                          </div>

                          <div>
                            <h2 className="hover:shadow-md ml-0 xs:-ml-3 md:ml-0 hover:cursor-text text-[16px] font-bold hover:bg-gray-100">
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
                            <h2 className="hover:cursor-default ml-0 xs:-ml-3 md:ml-0 text-sm leading-6">
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
                              <div role="status">
                                <Loader />
                              </div>
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
          {/* education */}
          <div className=" ml-[-150px]  xs:ml-0">
            <span className="w-full h-0 my-1 page-break"></span>
            <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
              Education
            </h3>
            <span className="border-stylee w-full h-0  my-1"></span>
            <ul className="pl-0  flex xs:flex-col md:flex-row w-full flex-wrap">
              {resume?.education.map((education: Education, ind: number) => (
                <React.Fragment key={education?.id || ind}>
                  <div className="w-[28%] mr-4 xs:w-full md:w-[28%] md:m-2 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                    <li
                      className=" hover:shadow-md hover:cursor-move  
                  parent  
                   hover:bg-gray-100 font-bold flex text-[16px] items-center capitalize"
                    >
                      {/* <span className="w-2.5 h-2.5 xs:hidden md:block bg-[#745237] rounded-full mr-3"></span> */}
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
                    <li className="hover:shadow-md uppercase hover:bg-gray-100 text-[15px] font-medium">
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
                    <li className="hover:shadow-md italic hover:bg-gray-100 text-sm text-gray-800">
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
                    {(education.fromYear !== "" || education.toYear !== "") && (
                      <li className="mb-4 italic text-xs text-gray-700">
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
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate14);
