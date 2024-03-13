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
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import Toolbar from "@/components/dashboard/Toolbar";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import { ColorResult } from "react-color";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
const ResumeTemplate15 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);

  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const userData = useSelector((state: any) => state.userData);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { saveResumeToDB } = useSaveResumeToDB();
  const { getSummary } = useGetSummary(setStreamedSummaryData);

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();
  // const [color, setColor] = useState("#F4F4F4");
  // const [color_second, setColor_second] = useState("#444440");
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
          className=" w-5/12 xs:w-5/12  flex flex-col  bg-[#F4F4F4]    px-4  md:px-9    pt-[2rem]  "
          // style={{ backgroundColor: color }}
        >
          {/* <div className="absolute top-0 left-0 xs:w-4/12">
            <div className="flex justify-end">
              <ColorPicker
                defaultColor="#F4F4F4"
                resetColor="#F4F4F4"
                setColor={setColor}
                styles_pin="relative top-[6px]  -left-9"
                styles_div="absolute top-3 left-0"
                secondDefaultColor="#444440"
                setColor_second={setColor_second}
                saveColor={saveColor}
              />
            </div>
          </div> */}
          <div className="flex justify-center">
            <div
              className=" w-36 h-36 md:w-36 md:h-36 relative lg:h-36 lg:w-36 border-[.5rem]  md:border-[.5rem] border-[#ffff]   text-white bg-[#444440]  text-center flex justify-center items-center  rounded-full "
              // style={{ backgroundColor: color_second }}
            >
              <span className="text-4xl font-semibold hover:shadow-md hover:bg-gray-400">
                <EditableField
                  value={resume?.shortName ? resume?.shortName : "CPH"}
                  style={{ width: "60px" }}
                  onSave={(value: string) => {
                    dispatch(setField({ name: "shortName", value: value }));
                    saveResumeToDB({ ...resume, shortName: value });
                  }}
                />
                {/* <ColorPicker
                  defaultColor="#F4F4F4"
                  resetColor="#444440"
                  styles_pin="absolute  top-4 right-7"
                  styles_div="absolute top-3 -left-1"
                  setColor={setColor}
                  secondDefaultColor="#444440"
                  setColor_second={setColor_second}
                  saveColor={saveColor_second}
                /> */}
              </span>
            </div>
          </div>
          {/* contacts */}

          <span className="w-full h-0 my-3 border-stylee"></span>
          <h3
            className="uppercase text-base  xs:px-2 font-semibold bg-[#444440] text-white w-full xs:w-full md:w-full lg:w-full py-1 rounded-sm flex justify-center xs:justify-center md:justify-center  flex-row gap-2 items-center border-2 border-transparent hover:border-dashed hover:border-gray-500 "
            // style={{ backgroundColor: color_second }}
          >
            <EditableField
              value={
                resume?.headings?.contact ? resume.headings.contact : "Contact"
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
          <span className="w-full h-0 my-3 border-stylee"></span>
          <ul className="flex flex-col w-full gap-3 pl-0 mb-4 text-xs break-all ">
            <li className="flex flex-row items-start justify-start gap-3 text-xs hover:shadow-md hover:bg-gray-100 ">
              <div>{phoneIcon}</div>
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
            <li className="flex flex-row items-start justify-start gap-3 text-xs hover:shadow-md hover:bg-gray-100">
              <div>{emailIcon}</div>

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
            <li className="flex flex-row items-start justify-start gap-2 text-xs hover:shadow-md hover:bg-gray-100 text-gray-950">
              <div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
                    stroke="black"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M6.15572 13V7.54545H6.99379V13H6.15572ZM6.58185 6.63636C6.4185 6.63636 6.27764 6.58073 6.15927 6.46946C6.04326 6.35819 5.98526 6.22443 5.98526 6.06818C5.98526 5.91193 6.04326 5.77817 6.15927 5.6669C6.27764 5.55563 6.4185 5.5 6.58185 5.5C6.74521 5.5 6.88488 5.55563 7.00089 5.6669C7.11926 5.77817 7.17844 5.91193 7.17844 6.06818C7.17844 6.22443 7.11926 6.35819 7.00089 6.46946C6.88488 6.58073 6.74521 6.63636 6.58185 6.63636ZM9.36683 9.71875V13H8.52876V7.54545H9.33842V8.39773H9.40945C9.53729 8.12074 9.73142 7.8982 9.99183 7.73011C10.2522 7.55966 10.5884 7.47443 11.0004 7.47443C11.3697 7.47443 11.6928 7.55019 11.9698 7.7017C12.2468 7.85085 12.4622 8.07812 12.6161 8.38352C12.77 8.68655 12.8469 9.07008 12.8469 9.53409V13H12.0089V9.59091C12.0089 9.16241 11.8976 8.8286 11.6751 8.58949C11.4525 8.34801 11.1471 8.22727 10.7589 8.22727C10.4914 8.22727 10.2522 8.28527 10.0415 8.40128C9.83321 8.51728 9.66868 8.68655 9.54794 8.90909C9.4272 9.13163 9.36683 9.40152 9.36683 9.71875Z"
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
            </li>
            <li className="flex flex-row items-start justify-start gap-2 text-xs hover:shadow-md hover:bg-gray-100 text-gray-950 ">
              <div className="">
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
                value={
                  resume?.contact?.country ? resume?.contact?.country : "abc"
                }
                // overrideValue={resume?.name ? resume?.name : "Full Name"}
                onSave={(value: string) => {
                  if (value !== resume.contact.country) {
                    updateSaveHook.updateAndSaveBasicInfo({ country: value });
                  }
                }}
              />
              {resume?.contact?.country ? "," : ""}
              <EditableField
                value={
                  resume?.contact?.cityState
                    ? resume?.contact?.cityState
                    : "https://www.linkedin.com/"
                }
                // overrideValue={resume?.name ? resume?.name : "Full Name"}
                onSave={(value: string) => {
                  if (value !== resume.contact.cityState) {
                    updateSaveHook.updateAndSaveBasicInfo({ cityState: value });
                  }
                }}
              />
              {resume.contact.postalCode ? "," : ""}
              <EditableField
                value={
                  resume?.contact?.postalCode
                    ? resume?.contact?.postalCode
                    : "1122"
                }
                // overrideValue={resume?.name ? resume?.name : "Full Name"}
                onSave={(value: string) => {
                  if (value !== resume.contact.postalCode) {
                    updateSaveHook.updateAndSaveBasicInfo({
                      postalCode: value,
                    });
                  }
                }}
              />
            </li>
          </ul>

          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <>
              <span className="w-full h-0 my-1 border-stylee"></span>
              <h3
                className="uppercase text-base bg-[#444440] xs:px-2 font-semibold text-white w-full xs:w-full md:w-full lg:w-full py-1 rounded-sm flex justify-center xs:justify-center md:justify-center  flex-row gap-2 items-center border-2 border-transparent hover:border-dashed hover:border-gray-500  "
                // style={{ backgroundColor: color_second }}
              >
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
              <span className="w-full h-0 my-3 border-stylee"></span>
              {resume?.primarySkills &&
              resume?.primarySkills.length > 0 &&
              !regenerating ? (
                <Toolbar
                  addSkill={handleAddSkills}
                  regenerateSkills={getPrimarySkills}
                >
                  <ul className="flex flex-col w-full gap-1 pl-0 mb-4 text-xs border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
                    {resume?.primarySkills.map((skill: string, i: number) => (
                      <li
                        className="hover:shadow-md hover:cursor-move px-0 xs:px-2 md:px-0 parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex justify-between "
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
                          className="w-4 h-4 cursor-pointer child"
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
        <div className="w-full flex flex-col  px-8 xs:mt-[25px]  xs:px-8 lg:px-8 pt-[1rem] xs:pt-[1rem] ">
          <div className="flex flex-col justify-center py-4 xs:px-0">
            <h2 className="text-4xl font-bold text-center border-2 border-transparent xs:text-4xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500">
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
            <h3 className="my-2 text-xl leading-none text-center border-2 border-transparent hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500">
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
          <span className="w-full h-0 my-3 border-stylee"></span>
          <h3
            className="border-2 border-transparent hover:border-dashed hover:border-gray-500 w-full px-4 py-1 text-base bg-[#444440] font-semibold text-white uppercase rounded-sm "
            // style={{ backgroundColor: color_second }}
          >
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
          <span className="w-full h-0 my-3 border-stylee xs:my-3"></span>
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
          <span className="w-full h-0 my-3 border-stylee"></span>
          <h3
            className=" border-2 border-transparent hover:border-dashed hover:border-gray-500 w-full px-4 py-1 text-base bg-[#444440] font-semibold text-white uppercase rounded-sm"
            // style={{ backgroundColor: color_second }}
          >
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
          <span className="w-full h-0 my-2 border-stylee"></span>

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
                        className="border-2 border-transparent hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <div className="flex flex-col">
                          <h2 className="text-[16px] font-bold hover:shadow-md hover:cursor-text hover:bg-gray-100">
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
                          <h2 className="flex w-full gap-2 text-xs font-semibold hover:cursor-default">
                            {/* {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                            {rec?.isContinue
                              ? "Present"
                              : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                            |{" "} */}
                            {rec.fromMonth && (
                              <EditableField
                                rows={2}
                                value={`${rec?.fromMonth}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { fromMonth: value },
                                    i
                                  );
                                }}
                              />
                            )}
                            {rec.fromMonth && <span>&nbsp;</span>}
                            {rec.fromYear && (
                              <EditableField
                                rows={2}
                                value={`${rec?.fromYear}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { fromYear: value },
                                    i
                                  );
                                }}
                              />
                            )}
                            {rec.fromYear && <span>&nbsp; - &nbsp;</span>}
                            {rec.toMonth && !rec.isContinue && (
                              <EditableField
                                rows={2}
                                value={`${rec?.toMonth}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { toMonth: value },
                                    i
                                  );
                                }}
                              />
                            )}
                            {rec.toMonth && <span>&nbsp;</span>}
                            {rec.toYear && !rec.isContinue && (
                              <EditableField
                                rows={2}
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
                                rows={2}
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
                              <div className="flex flex-wrap w-full gap-1 mt-4">
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
          {/* education */}
          {resume?.education.length > 0 && (
            <>
              <span className="w-full h-0 my-1 page-break"></span>
              <h3
                className="flex flex-row items-center w-full bg-[#444440] gap-2 px-4 py-1 mb-4 text-base font-semibold text-white uppercase rounded-sm border-2 border-transparent hover:border-dashed hover:border-gray-500"
                // style={{ backgroundColor: color_second }}
              >
                <EditableField
                  value={
                    resume?.headings?.education
                      ? resume.headings.education
                      : "Education"
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
              <span className="w-full h-0 my-1 border-stylee"></span>
              <ul className="flex flex-wrap justify-between w-full pl-0 md:flex-row">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="w-[45%] xs:w-[45%]  bg-gray-200 p-2 rounded-md  md:m-2">
                      <li className=" hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border hover:bg-gray-100 font-semibold flex uppercase text-[16px]  px-0 xs:px-4 md:px-0  items-center ">
                        {/* <span className="w-2 h-2 bg-[#444440] rounded-full mr-3"></span> */}
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
                        onClick={() => setConfirmationModal(true)}
                        className="absolute z-10 hidden w-4 h-4 cursor-pointer group-hover:block right-2 top-2 child"
                      >
                        {crossIcon1}
                      </div>
                      <li className="px-0 text-xs font-semibold uppercase hover:shadow-md hover:bg-gray-100 xs:px-2 md:px-0">
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
                      <li className="px-0 text-xs italic text-gray-800 hover:shadow-md hover:bg-gray-100 xs:px-2 md:px-0">
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
                        <li className="flex px-0 mb-4 text-xs italic text-gray-700 xs:px-2 md:px-0 ">
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

                      {/* <li className="px-0 mb-4 text-xs italic text-gray-700 xs:px-2 md:px-0 ">
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
export default memo(ResumeTemplate15);
