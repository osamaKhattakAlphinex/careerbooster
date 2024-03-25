"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { ColorResult } from "react-color";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { useColorContext } from "@/context/ResumeColorContext";
const ResumeTemplate10 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const {color,setColor,color_second,setColor_second} = useColorContext()
  // const [color, setColor] = useState("#043382");
  // const [color_second, setColor_second] = useState("#1a202c");
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const userData = useSelector((state: any) => state.userData);
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [confirmationModal, setConfirmationModal] = useState(false);
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
  // useEffect(() => {}, [color, color_second]);
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
  // // Access the selected color value from the 'color' parameter
  // setColor(color.hex);

  // // You can do whatever you need with the selected color here
  // };
  // const saveColor_second = (color: ColorResult) => {
  // // Access the selected color value from the 'color' parameter
  // setColor_second(color.hex);

  // // You can do whatever you need with the selected color here
  // };
  return (
    <div className="relative first-page">
      <div
        className="flex  flex-row absolute top-[30px] bg-[#043382] h-28 z-10 items-center justify-center w-full "
        // style={{ backgroundColor: color }}
      >
        {/* <ColorPicker
          defaultColor="#043382"
          setColor={setColor}
          resetColor="#043382"
          styles_pin="absolute top-2  left-2"
          styles_div="relative top-5 -left-6 "
          secondDefaultColor="#1a202c"
          setColor_second={setColor_second}
          saveColor={saveColor}
        />  */}
        {/* <div className="  z-50 w-40 h-40 xs:w-[120px] xs:h-[80px] sm:w-[120px] sm:h-[80px] border-2 border-[#042B6B] md:w-48 md:h-48 lg:w-48 lg:h-48  text-white bg-gray-800 text-center flex justify-center   rounded-full mx-4  md:mt-0 md:mr-8 items-center ">
          <span className="text-4xl md:text-3xl hover:shadow-md hover:bg-gray-500">
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
        <div className="flex flex-col ">
          <h2 className="text-4xl font-bold text-gray-100 border-2 border-transparent hover:shadow-md hover:bg-gray-500 hover:border-dashed hover:border-gray-500 flex justify-center">
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
          <h3 className="flex items-center justify-center text-lg text-gray-100 border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-500 hover:border-dashed hover:border-gray-500">
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
      <div className="flex ">
        {/* sidebar */}
        <div
          className="z-5 xs:w-4/12 w-3.5/12 bg-[#030712] flex flex-col pl-3 xs:pl-0 sm:pl-0 md:pl-0 lg:pl-3 xs:pr-4 sm:pr-4 md:pr-4 lg:pr-6  text-gray-100  pr-6  pb-8  pt-[160px] h-auto"
          // style={{ backgroundColor: color_second }}
        >
          {/* <div className="absolute top-0 left-0 z-20 xs:w-3/12 ">
            <ColorPicker
              defaultColor="#043382"
              resetColor="#1a202c"
              setColor={setColor}
              styles_pin="relative top-[6px]  left-0"
              styles_div="absolute top-3 left-56 "
              secondDefaultColor="#1a202c"
              setColor_second={setColor_second}
              saveColor={saveColor_second}
            />
          </div>  */}
          {/* contacts */}
          <div
            className="rounded-3xl border-2  border-[#043382] xs:py-2 py-[6px] flex justify-center "
            // style={{ borderColor: color }}
          >
            <h3 className="flex flex-row items-center gap-2 mb-0 text-base font-semibold text-center uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
              {resumeContactIcon}
              <EditableField
                value={
                  resume?.headings?.contact
                    ? resume.headings.contact
                    : "Contact"
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
          </div>

          <ul className="flex flex-col gap-2 pl-0 mt-4 text-xs break-all ">
            <li className="flex items-center hover:shadow-md mb-[8px] hover:bg-gray-500 text-xs flex-row gap-1 justify-start">
              <div
                className="bg-[#043382] rounded-full p-2 mr-3"
                // style={{ backgroundColor: color }}
              >
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
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 flex flex-row gap-1 justify-start  items-center text-xs">
              <div
                className="p-2 mr-3 bg-[#043382] rounded-full "
                // style={{ backgroundColor: color }}
              >
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

            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row justify-start gap-1  items-center text-xs">
              <div
                className="p-2 mr-3  flex justify-center items-center  bg-[#043382] rounded-full"
                // style={{ backgroundColor: color }}
              >
                <span className="block w-4 h-4 text-center text-white">in</span>
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
            <li className="hover:shadow-md mb-[8px] hover:bg-gray-500 text-gray-100 flex flex-row justify-start gap-1  items-center text-xs ">
              <div className="p-2 mr-3 text-white bg-[#043382] rounded-full" 
                // style={{ backgroundColor: color }}
              >
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
              <div
                className="rounded-3xl border-2 border-[#043382] xs:py-2 py-[6px] my-3  flex justify-center"
                // style={{ borderColor: color }}
              >
                <h3 className="flex flex-row items-center gap-2 mb-0 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
                  {resumeSkillsIcon}
                  <EditableField
                    value={
                      resume?.headings?.primarySkills
                        ? resume.headings.primarySkills
                        : "skills"
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
              </div>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className="flex flex-col gap-3 mb-4 text-xs border-2 border-transparent hover:border-dashed hover:border-gray-500">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move parent border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex gap-2  items-center "
                        key={i}
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropPrimary(e, i)}
                        draggable
                      >
                        <span className="bg-gray-100 !block w-1 h-1 rounded-full"></span>
                        <div className="flex justify-between w-full">
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
        <div className="w-full flex flex-wrap flex-col px-4 sm:px-2 xs:px-2 md:px-8 lg:px-8  text-gray-950 pb-10 pt-[140px] ">
          {/* Executive Summary */}
          <div
            className="rounded-3xl xs:-mx-1 md:mx-0 bg-[#043382] py-2 px-6 mt-6 mb-3 xs:px-2 sm:px-2 md:px-6 lg:px-6 w-fit"
            // style={{ backgroundColor: color }}
          >
            <h3 className="flex items-center gap-2 mb-0 text-base font-semibold text-gray-100 uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500">
              {resumeSummaryIcon}
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
          </div>

          <Toolbar regenrateSummary={getSummary}>
            <div className="text-xs text-justify border-2 border-transparent hover:shadow-md hover:border-gray-500 hover:border-dashed">
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
          <div
            className="rounded-3xl xs:-mx-1 bg-[#043382] md:mx-0 py-2 px-6 mt-6 mb-3 xs:px-2 sm:px-2 md:px-6 lg:px-6 w-fit"
            // style={{ backgroundColor: color }}
          >
            <h3 className="flex items-center gap-2 mb-0 text-base font-semibold text-gray-100 uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500">
              {resumeWorkExpIcon}
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
          </div>

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
                    <div key={i} className={`flex justify-start items-start `}>
                      <div
                        key={i}
                        className="flex flex-col w-full border-2 border-transparent hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2 "
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <h2 className="flex gap-2 text-base font-semibold hover:shadow-md hover:cursor-text hover:bg-gray-100">
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
                        <h2 className="flex gap-1 text-xs font-semibold hover:cursor-default ">
                          {/* {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                          {rec?.isContinue
                            ? "Present"
                            : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                          |{" "} */}
                          {rec.fromMonth && (
                            <EditableField
                              value={`${rec?.fromMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { fromMonth: value },
                                  i
                                );
                              }}
                            />
                          )}
                          {rec.fromYear && (
                            <EditableField
                              value={`${rec?.fromYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { fromYear: value },
                                  i
                                );
                              }}
                            />
                          )}
                          {rec.fromYear && <span>-</span>}
                          {rec.toMonth && !rec.isContinue && (
                            <EditableField
                              value={`${rec?.toMonth}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { toMonth: value },
                                  i
                                );
                              }}
                            />
                          )}
                          {rec.toYear && !rec.isContinue && (
                            <EditableField
                              value={`${rec?.toYear}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { toYear: value },
                                  i
                                );
                              }}
                            />
                          )}
                          {rec.isContinue && (
                            <EditableField
                              value={`${rec?.isContinue && "Present"}`}
                              onSave={(value: string) => {
                                handlers.handleSaveExperienceDetail(
                                  { toYear: value },
                                  i
                                );
                                handlers.handleSaveExperienceDetail(
                                  { isContinue: false },
                                  i
                                );
                              }}
                            />
                          )}
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
                          {rec?.cityState?.length > 0 && ","}
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
                              <div className="flex flex-wrap w-full gap-1 mt-4">
                                <input
                                  className="w-full py-[4px] border-2 rounded-md text bg-transparent" // Apply Tailwind CSS classes
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
                                <div className="flex w-full gap-2 my-2">
                                  <button
                                    className="w-2/12 text-white bg-green-500 rounded-md xs:w-full md:w-2/12 lg:w-2/12 h-9 "
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
                                    className="w-2/12 py-1 text-white bg-red-500 rounded-md xs:w-full md:w-2/12 lg:w-2/12"
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
          {/* Education */}
          {resume?.education.length > 0 && (
            <div className="">
              <div
                className="rounded-3xl bg-[#043382] py-2 px-4 my-6 w-fit"
                // style={{ backgroundColor: color }}
              >
                <h3 className="flex items-center gap-2 mb-0 text-base font-semibold text-gray-100 uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500">
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
              </div>

              <ul className="flex flex-row justify-between w-full pl-0 md:flex-row lg:flex-row xs:flex-wrap xs:gap-2">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="flex flex-col mr-4 w-[45%] bg-gray-200 rounded-md p-2 md:m-2 xs:m-0 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li className="flex items-center justify-between text-base font-semibold uppercase hover:shadow-md hover:cursor-move parent hover:bg-gray-100 ">
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
                      <li className="text-xs italic hover:shadow-md hover:bg-gray-100 ">
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
                      {/* <li className="mb-4 text-xs italic text-gray-700 ">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate10);
