"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import { crossIcon1, emailIcon, phoneIcon } from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import Toolbar from "@/components/dashboard/Toolbar";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import { ColorResult } from "react-color";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
const ResumeTemplate16 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const [streamedSummaryData, setStreamedSummaryData] = useState("");

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { saveResumeToDB } = useSaveResumeToDB();
  // const [color, setColor] = useState("#1F1E1E");
  // const [color_second, setColor_second] = useState("#383636");
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();
  const userData = useSelector((state: any) => state.userData);
  const [primarySkill, setPrimarySkill] = useState<string>("");

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
  // const saveColor = (color: ColorResult) => {
  //   setColor(color.hex);

  // };
  // const saveColor_second = (color: ColorResult) => {
  //   setColor_second(color.hex);

  // };
  return (
    <div className="relative w-full text-gray-900 first-page">
      <div className="flex">
        <div
          className=" w-3/12 xs:w-4/12 md:w-4/12 flex flex-col  bg-[#1F1E1E]  px-4  xs:px-1 md:px-9 pt-[2rem] "
          // style={{ backgroundColor: color }}
        >
          <div className="flex justify-center">
            <div className=" w-32 h-32 xs:w-24 xs:h-24 md:w-40 md:h-40 border-[2px] xs:border-[2px] md:border-[.5rem] border-[##F1F1F1]   text-gray-800 bg-[#FFFFFF]  text-center flex justify-center items-center  rounded-full ">
              <div
                className=" w-28 relative h-28 xs:h-[88px] xs:w-[] bg-[#383636] md:w-36 md:h-36 text-[#F1F1F1] flex justify-center items-center    rounded-full "
                // style={{ backgroundColor: color_second }}
              >
                <span className="text-4xl font-semibold xs:text-lg md:text-4xl text-bold hover:shadow-md hover:text-black hover:bg-gray-100">
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
                  defaultColor="#1F1E1E"
                  resetColor="#383636"
                  styles_pin="absolute text-white top-5 right-5"
                  styles_div="absolute top-3 -left-1"
                  setColor={setColor}
                  secondDefaultColor="#383636"
                  setColor_second={setColor_second}
                  saveColor={saveColor_second}
                /> */}
              </div>
            </div>
          </div>
          {/* <div className="absolute top-0 -left-12 xs:w-4/12">
            <div className="flex justify-end">
              <ColorPicker
                defaultColor="#1F1E1E"
                resetColor="#1F1E1E"
                setColor={setColor}
                styles_pin="relative text-white top-[6px]  -left-9"
                styles_div="absolute top-3 left-0"
                secondDefaultColor="#383636"
                setColor_second={setColor_second}
                saveColor={saveColor}
              />
            </div>
          </div> */}
          {/* contacts */}
          <span className="w-full h-0 my-3 border-stylee"></span>
          <h3 className="flex flex-row items-center w-full gap-2 my-1 text-base font-semibold text-white uppercase  rounded-sm border-2 border-transparent hover:border-dashed hover:border-gray-500">
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
          <span className="w-full border-b-2 border-white mb-4"></span>
          <ul className="flex flex-col w-full gap-3 pl-0 mb-4 text-xs text-gray-300 break-all ">
            <li className="flex flex-row items-start justify-start gap-3 hover:shadow-md hover:text-black hover:bg-gray-100 ">
              <span className="w-7 h-7 xs:w-5 xs:p-[2px] md:px-0 xs:h-5 md:w-7 md:h-7  flex items-center justify-center border-[1px] border-gray-300 rounded-full">
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
            <li className="flex flex-row items-start justify-start gap-3 hover:shadow-md hover:text-black hover:bg-gray-100 ">
              <span className="w-9 h-7 xs:w-5 xs:p-[2px] md:px-0 xs:h-5 md:w-8 md:h-7  flex items-center justify-center border-[1px] border-gray-300 rounded-full">
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
            <li className="flex flex-row items-start justify-start gap-2 text-gray-300 hover:shadow-md hover:text-black group hover:bg-gray-100 ">
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M5.83889 13V7.54545H6.47454V13H5.83889ZM6.16204 6.60795C6.03183 6.60795 5.92056 6.56416 5.82823 6.47656C5.7359 6.3866 5.68974 6.27888 5.68974 6.15341C5.68974 6.02794 5.7359 5.9214 5.82823 5.83381C5.92056 5.74384 6.03183 5.69886 6.16204 5.69886C6.29225 5.69886 6.40352 5.74384 6.49585 5.83381C6.58817 5.9214 6.63434 6.02794 6.63434 6.15341C6.63434 6.27888 6.58817 6.3866 6.49585 6.47656C6.40352 6.56416 6.29225 6.60795 6.16204 6.60795ZM9.67834 9.59091V13H9.04624V7.54545H9.66058V8.40128H9.7174C9.84524 8.12192 10.0441 7.8982 10.314 7.73011C10.5862 7.55966 10.9224 7.47443 11.3225 7.47443C11.6895 7.47443 12.0114 7.55137 12.2884 7.70526C12.5678 7.85677 12.7844 8.08049 12.9383 8.37642C13.0945 8.67235 13.1727 9.03575 13.1727 9.46662V13H12.5406V9.50568C12.5406 9.05824 12.4151 8.70431 12.1641 8.44389C11.9156 8.18348 11.5817 8.05327 11.1627 8.05327C10.8763 8.05327 10.6218 8.11482 10.3992 8.23793C10.1767 8.36103 10.0003 8.53859 9.8701 8.7706C9.74226 9.00024 9.67834 9.27367 9.67834 9.59091Z"
                    fill="black"
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
              <span className="w-full h-0 my-1 border-stylee"></span>
              <h3 className="flex flex-row items-center w-full gap-2 my-1 text-base font-semibold text-white uppercase rounded-sm border-2 border-transparent hover:border-dashed hover:border-gray-500">
                <EditableField
                  value={
                    resume?.headings?.primarySkills
                      ? resume.headings.primarySkills
                      : "work experience"
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
              <span className="w-full border-b-2 border-white mb-4"></span>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className="flex flex-col w-full gap-1 pl-0 mb-4 text-xs text-gray-300 border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
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
                        <div className="flex flex-row items-center justify-between w-full">
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
        <div className="xs:w-full w-9/12 flex flex-col xs:bg-[#F1F1F1] md:bg-[#F1F1F1] px-4 md:px-8 pt-[1rem] md:pt-[1rem] ">
          <div className="flex flex-col justify-start pb-6 ">
            <h2 className="text-4xl font-bold text-center xs:text-2xl md:text-4xl hover:shadow-md hover:bg-gray-100 border-2 border-transparent hover:border-dashed hover:border-gray-500">
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
            <h3 className="text-xl xs:text-[16px] md:text-xl text-center   hover:shadow-md mt-2 hover:bg-gray-100 border-2 border-transparent hover:border-dashed hover:border-gray-500">
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

          <span className="w-full h-0 border-stylee xs:my-0 md:my-1"></span>
          <h3 className="uppercase text-base font-semibold    rounded-sm text-gray-900 w-full my-1 border-2 border-transparent hover:border-dashed hover:border-gray-500">
            <EditableField
              value={
                resume?.headings?.summary
                  ? resume.headings.summary
                  : "executive summary"
              }
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.headings?.summary) {
                  updateSaveHook.updateAndSaveHeadings({
                    summary: value,
                  });
                }
              }}
            />
          </h3>
          <span className="border-[#444440] border-b-2 w-full"></span>
          <Toolbar regenrateSummary={getSummary}>
            <div className="text-xs text-justify border-2 border-transparent hover:shadow-md hover:border-gray-500 hover:border-dashed ">
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

          <h3 className="uppercase text-base  font-semibold   rounded-sm text-gray-900 w-full my-1 border-2 border-transparent hover:border-dashed hover:border-gray-500">
            <EditableField
              value={
                resume?.headings?.workExperienceArray
                  ? resume.headings.workExperienceArray
                  : "work experience"
              }
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.headings?.workExperienceArray) {
                  updateSaveHook.updateAndSaveHeadings({
                    workExperienceArray: value,
                  });
                }
              }}
            />
          </h3>
          <span className="w-full border-[#444440] border-b-2 "></span>
          {/* <span className="border-stylee w-full h-0 border-[1px] border-[#444440] relative -left-7 my-2"></span> */}

          {resume?.workExperienceArray &&
          resume?.workExperienceArray.length > 0 ? (
            <>
              {resume?.workExperienceArray.map((rec: any, i: number) => {
                return (
                  <Toolbar
                    key={i}
                    addAchivement={() => setNewWorkExperience(i)}
                    deleteExperience={() => handlers.handleDeleteExperience(i)}
                    regenrateAchivements={() => handleRegenrate(rec, i)}
                    addNewLine={() => {
                      handlers.handleAddSpace(i, newAchievement);
                      setNewAchievement("");
                    }}
                  >
                    <div
                      key={i}
                      className={`flex justify-start items-start 
                        `}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <div className="flex">
                          <div>
                            <h2 className="text-base font-bold hover:shadow-md hover:cursor-text hover:bg-gray-100">
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
                            <h2 className="hover:cursor-default text-xs font-semibold flex gap-2">
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
                              ,
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
                            <ul className="flex flex-col gap-1 pl-0 text-xs">
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
                                      className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                                    >
                                      <div
                                        className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
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
                              <div className="w-full gap-1  flex flex-wrap mt-4">
                                <input
                                  className="w-full py-[4px] border-2 rounded-md  text bg-transparent " // Apply Tailwind CSS classes
                                  onChange={(e) =>
                                    setNewAchievement(e.target.value)
                                  }
                                  value={newAchievement}
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
                                <div className="my-2 w-full flex gap-2">
                                  <button
                                    className="bg-green-500  w-2/12 xs:w-full md:w-2/12 lg:w-2/12 rounded-md  h-9 text-white "
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
                                  <button
                                    onClick={() => {
                                      setNewAchievement("");
                                      setNewWorkExperience(-1);
                                    }}
                                    className="bg-red-500  w-2/12 xs:w-full md:w-2/12 lg:w-2/12 rounded-md py-1 text-white"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
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
          {resume?.education.length > 0 && (
            <>
              <h3 className="uppercase text-base  font-semibold flex items-center gap-2  border-[#444440] border-b-2  rounded-sm text-gray-900 w-full my-1 border-2 border-transparent hover:border-dashed hover:border-gray-500">
                <EditableField
                  value={
                    resume?.headings?.education
                      ? resume.headings.education
                      : "Eduaction"
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
              <span className="w-full border-[#444440] border-b-2"></span>
              <ul className="pl-0 flex justify-between  flex-wrap  text-gray-800  w-[100%]">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[45%] xs:w-[45%]  bg-gray-200 p-2 rounded-md md:m-2 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li
                        className=" hover:shadow-md hover:cursor-move 
                  parent 
                   hover:bg-gray-100 font-semibold  hover:text-black flex uppercase text-[16px]   items-center "
                      >
                        {/* <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mr-3"></span> */}
                        <div className="flex flex-row items-center justify-between w-full">
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
                        </div>
                      </li>
                      <div
                        onClick={() => setConfirmationModal(true)}
                        className="absolute z-10 hidden w-4 h-4 cursor-pointer group-hover:block right-2 top-2 child"
                      >
                        {crossIcon1}
                      </div>
                      <li className="hover:shadow-md text-xs font-medium hover:text-black text-gray-800 hover:tet-black hover:bg-gray-100 ">
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
                      <li className="text-xs italic text-gray-800 hover:shadow-md hover:text-black hover:bg-gray-100 ">
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
                        <li className="mb-4 text-xs flex italic text-gray-800">
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
                      {/* <li className="mb-4 text-xs italic text-gray-800 ">
                        {education?.fromMonth + " " + education.fromYear} -{" "}
                        {education?.isContinue
                          ? "Present"
                          : education?.toMonth + " " + education.toYear}
                      </li> */}
                    </div>
                    {confirmationModal && (
                      <DeleteConfirmationModal
                        onCancel={() => setConfirmationModal(false)}
                        message="Are you sure you want to delete ?"
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
export default memo(ResumeTemplate16);
