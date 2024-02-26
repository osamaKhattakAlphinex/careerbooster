"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useSelector } from "react-redux";

import {
  crossIcon1,
  educationIcon,
  emailIcon,
  linkedInIcon,
  phoneIcon,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import Toolbar from "@/components/dashboard/Toolbar";
import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import { ColorResult } from "react-color";

const ResumeTemplate2 = () => {
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [regenerating, setRegenerating] = useState(false);
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const [color, setColor] = useState("#e9e8e8");
  const [color_second, setColor_second] = useState("#e9e8e8");
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();
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
  const saveColor = (color: ColorResult) => {
    // Access the selected color value from the 'color' parameter
    setColor(color.hex);

    // You can do whatever you need with the selected color here
  };
  const saveColor_second = (color: ColorResult) => {
    // Access the selected color value from the 'color' parameter
    setColor_second(color.hex);

    // You can do whatever you need with the selected color here
  };

  return (
    <div className="w-full first-page  text-gray-900 flex flex-col justify-start space-y-4 items-start px-6">
      {/* Name and Title */}
      <div
        className="flex flex-col w-full text-center bg-gray-100 rounded-xl py-4 mt-1 px-8"
        style={{ backgroundColor: color }}
      >
        <h2 className="text-4xl xs:text-2xl md:4xl lg:text-xl font-bold hover:shadow-md hover:bg-gray-100">
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
        <h3 className="text-lg xs:text-sm md:text-2xl lg:text-2xl  hover:shadow-md hover:bg-gray-100">
          <EditableField
            value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
            onSave={(value: string) => {
              if (value !== resume?.jobTitle) {
                updateSaveHook.updateAndSaveJobTitle(value);
              }
            }}
          />
        </h3>
        <div className="absolute top-0 left-12">
          <ColorPicker
            defaultColor="#e9e8e8"
            resetColor="#e9e8e8"
            setColor={setColor}
            styles_pin="relative top-[6px]  -left-5"
            styles_div="absolute top-3 left-0"
            secondDefaultColor="#e9e8e8"
            setColor_second={setColor_second}
            saveColor={saveColor}
          />
        </div>
      </div>
      {/* contacts */}
      <div className="w-full py-1 relative">
        <ul
          className="flex flex-row  md:flex-row justify-around items-center px-4 py-2 rounded-xl "
          style={{ backgroundColor: color_second }}
        >
          <li className="hover:shadow-md text-gray-950  hover:bg-gray-100 text-sm xs:text-sm md:text-lg lg:text-lg flex flex-row gap-1  items-center">
            {phoneIcon}
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
          <li className=" text-sm xs:text-sm md:text-lg lg:text-lg text-gray-950 hover:shadow-md hover:bg-gray-100 flex flex-row gap-1  items-center">
            {emailIcon}
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
          <li className=" text-gray-950 text-sm xs:text-sm md:text-lg lg:text-lg hover:shadow-md hover:bg-gray-100 flex flex-row gap-1 items-center justify-center">
            <div className="">
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
              // overrideValue={resume?.name ? resume?.name : "Full Name"}
              onSave={(value: string) => {
                if (value !== resume.contact.linkedIn) {
                  updateSaveHook.updateAndSaveBasicInfo({ linkedIn: value });
                }
              }}
            />
          </li>
        </ul>
        <div className="absolute top-0 left-12">
          <ColorPicker
            defaultColor="#e9e8e8"
            resetColor="#e9e8e8"
            setColor={setColor}
            styles_pin="relative top-[18px]  -left-9"
            styles_div="absolute top-3 left-0"
            secondDefaultColor="#e9e8e8"
            setColor_second={setColor_second}
            saveColor={saveColor_second}
          />
        </div>
      </div>
      {/* summary objective */}
      <div className="w-full space-y-3 ">
        <h2 className="uppercase text-sm xs:text-sm md:text-lg  lg:text-lg font-bold">
          About Me
        </h2>
        <Toolbar regenrateSummary={getSummary}>
          <div className="text-sm xs:text-sm md:text-lg lg:text-lg text-justify hover:shadow-md border-2 border-transparent hover:border-gray-500 hover:border-dashed ">
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
      </div>
      {/* Skills  */}
      <div className=" w-full space-y-3">
        {resume?.primarySkills && resume?.primarySkills.length > 0 && (
          <h2 className="uppercase text-sm xs:text-sm md:text-lg lg:text-lg pb-2 font-bold">
            Skills
          </h2>
        )}
        {resume?.primarySkills &&
        resume?.primarySkills.length > 0 &&
        !regenerating ? (
          <>
            <Toolbar
              addSkill={handleAddSkills}
              regenerateSkills={getPrimarySkills}
            >
              <ul className="flex border-2 border-transparent hover:border-dashed hover:border-gray-500 flex-row flex-wrap gap-1 text-sm xs:text-sm md:text-lg lg:text-lg">
                {resume?.primarySkills.map((skill: string, i: number) => (
                  <li
                    className=" px-4 py-2 bg-[#e9e8e8] border-transparent border-[1px] rounded-full hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 flex justify-between items-center"
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
                      className="w-4 h-4   cursor-pointer child"
                    >
                      {crossIcon1}
                    </div>
                  </li>
                ))}
                {newPrimarySkill ? (
                  <>
                    <div className="w-full rounded-2xl  border-[1px] border-black flex h-9.5">
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
          </>
        ) : (
          <div className="text-center">
            <div role="status">
              <Loader />
            </div>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className="w-full flex flex-col space-y-3">
        <h2 className="uppercase text-sm xs:text-sm md:text-lg lg:text-lg bp-2 font-bold">
          WORK EXPERIENCE
        </h2>
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
                    className={`${
                      i === resume?.workExperienceArray.length - 1
                        ? ""
                        : "border-b border-gray-200"
                    } grid border-transparent border-2 grid-cols-6 gap-6  hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2`}
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", i.toString())
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropExperience(e, i)}
                    draggable
                  >
                    {/* start end */}
                    <h2 className="hover:cursor-default text-center bg-transparent  p-0 col-span-1   text-sm  font-semibold">
                      {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                      {rec?.isContinue
                        ? "Present"
                        : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                    </h2>

                    <div className=" col-span-5 ">
                      {/* Title */}
                      <h2 className="hover:shadow-md hover:cursor-text hover:bg-gray-100 text-base font-bold">
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
                      <span className="hover:shadow-md hover:cursor-text hover:bg-gray-100 text-sm xs:text-sm md:text-lg lg:text-lg">
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
                      <div className="p-4">
                        {rec?.achievements && i !== regeneratedRecordIndex ? (
                          <ul className="pl-0 flex flex-col gap-1 text-sm xs:text-sm md:text-lg lg:text-lg">
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
                                        handlers.handleRemoveExtraSpace(i, ind);
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
                                        handlers.handleDeleteAchivement(i, ind)
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
                                  className="bg-green-500 w-1/12 xs:w-full md:w-1/12 lg:w-1/12 rounded-md  h-9 text-white "
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
                                  className="bg-red-500 w-1/12 xs:w-full md:w-1/12 lg:w-1/12 rounded-md py-1 text-white"
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
      </div>
      {/* Education */}
      <div className="w-full space-y-3 ">
        {resume?.education.length > 0 && (
          <>
            <h3 className="uppercase text-sm md:text-lg font-semibold flex flex-row gap-2 items-center">
              {educationIcon}
              Education
            </h3>
            <ul className="grid grid-cols-3 xs:grid-cols-3 md:grid-cols-3 gap-2 ">
              {resume?.education.map((education: Education, ind: number) => (
                <React.Fragment key={education?.id || ind}>
                  <div className=" bg-[#e9e8e8] px-4 py-2 relative  group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                    <li className="hover:shadow-md hover:cursor-move  parent  hover:border-2 hover:bg-gray-100 font-semibold flex uppercase text-sm xs:text-sm md:text-lg lg:text-lg  justify-between items-center ">
                      <EditableField
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
                    <li className="hover:shadow-md font-semibold hover:bg-gray-100 text-base">
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
                      <li className="mb-4 text-xs text-gray-700 italic">
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
                  </div>
                </React.Fragment>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
export default memo(ResumeTemplate2);
