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

  return (
    <div className="w-full first-page  text-gray-900 flex flex-col justify-start space-y-4 items-start px-6">
      {/* Name and Title */}
      <div className="flex flex-col w-full text-center bg-gray-100 rounded-3xl  p-8">
        <h2 className="text-4xl xs:text-2xl md:4xl lg:text-6xl font-bold hover:shadow-md hover:bg-gray-100">
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
        <h3 className="text-sm xs:text-sm md:text-lg lg:text-lg  hover:shadow-md hover:bg-gray-100">
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
      {/* contacts */}
      <div className="w-full py-3">
        <ul className="flex flex-row xs:flex-col md:flex-row justify-around items-center p-4  bg-black rounded-2xl">
          <li className="hover:shadow-md text-white hover:bg-gray-700 text-sm xs:text-sm md:text-lg lg:text-lg flex flex-row gap-1  items-center">
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
          <li className="hover:shadow-md text-sm xs:text-sm md:text-lg lg:text-lg text-white hover:bg-gray-700 flex flex-row gap-1  items-center">
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
          <li className="hover:shadow-md text-white text-sm xs:text-sm md:text-lg lg:text-lg hover:bg-gray-700 flex flex-row gap-1  items-center">
            {linkedInIcon}
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
      </div>
      {/* summary objective */}
      <div className="w-full space-y-3 ">
        <h2 className="uppercase text-sm xs:text-sm md:text-lg pb-2 lg:text-lg font-bold">
          About Me
        </h2>
        <Toolbar regenrateSummary={getSummary}>
          <div className="text-sm xs:text-sm md:text-lg lg:text-lg hover:shadow-md border-2 border-transparent hover:border-gray-500 hover:border-dashed ">
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
                    className=" px-4 py-2 bg-slate-100 border-transparent border-[1px] rounded-full hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 flex justify-between items-center"
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
                    <h2 className="hover:cursor-default text-center bg-transparent xs:bg-slate-100 p-0 col-span-1 xs:col-span-6 md:col-span-1 xs:p-2 md:p-0 md:bg-transparent  text-sm xs:text-sm md:text-lg lg:text-lg font-semibold">
                      {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                      {rec?.isContinue
                        ? "Present"
                        : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                    </h2>

                    <div className=" col-span-5 xs:col-span-6 md:col-span-5">
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
                            <div className="w-full gap-1 rounded-md flex flex-wrap h-9.5">
                              <textarea
                                className="w-9/12 xs:w-full md:w-9/12 rounded-l-md border-2  text bg-transparent p-2" // Apply Tailwind CSS classes
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
                                className="bg-green-500 w-2/12 xs:w-full md:w-2/12 uppercase h-9 px-2 text-white rounded-r-md"
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
                              className="bg-red-500 w-2/12 xs:w-full md:w-2/12 py-1 px-2 mt-2 text-white rounded-full"
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
      </div>
      {/* Education */}
      <div className="w-full space-y-3">
        {resume?.education.lenghth > 0 && (
          <>
            <h3 className="uppercase text-sm md:text-lg font-semibold flex flex-row gap-2 items-center">
              {educationIcon}
              Education
            </h3>
            <ul className="grid grid-cols-3 xs:grid-cols-1 md:grid-cols-3 gap-2">
              {resume?.education.map((education: Education, ind: number) => (
                <React.Fragment key={education?.id || ind}>
                  <div className="bg-gray-100 px-4 py-2">
                    <li className="hover:shadow-md hover:cursor-move border-transparent border-2 parent hover:border-dashed hover:border-gray-500 hover:border-2 hover:bg-gray-100 font-semibold flex uppercase text-sm xs:text-sm md:text-lg lg:text-lg  justify-between items-center ">
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
                      <div
                        onClick={() => handlers.handleDeleteEductionDetail(ind)}
                        className="w-4 h-4  cursor-pointer child"
                      >
                        {crossIcon1}
                      </div>
                    </li>
                    <li className="hover:shadow-md uppercase hover:bg-gray-100 text-base">
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
                    <li className="hover:shadow-md hover:bg-gray-100 text-sm xs:text-sm md:text-lg lg:text-lg text-gray-800">
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
                    <li className="mb-4 text-xs text-gray-700 ">
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
  );
};
export default memo(ResumeTemplate2);
