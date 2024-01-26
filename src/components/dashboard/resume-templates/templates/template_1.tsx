"use client";
import { memo, useEffect, useRef, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { useSelector } from "react-redux";
import {
  contactIcon,
  crossIcon1,
  educationIcon,
  emailIcon,
  linkedInIcon,
  phoneIcon,
  sparkleIcon,
} from "@/helpers/iconsProvider";
import Toolbar from "@/components/dashboard/Toolbar";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import Loader from "@/components/common/Loader";

const ResumeTemplate1 = ({
  streamedSummaryData,
  setStreamedSummaryData,
  streamedJDData,
  setStreamedJDData,
}: {
  streamedSummaryData: string;
  streamedJDData: string;
  setStreamedJDData: any;
  setStreamedSummaryData: any;
}) => {
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (streamedJDData === "") {
      setStreamedJDData(null);
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  const imageRef = useRef<any>();
  const [primarySkill, setPrimarySkill] = useState<string>("");

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

  //Reorder Redux PrimarySkills array with drag-drop

  const [image, setImage] = useState<any>(null);

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1048576) {
        // Check if file size is more than 1MB
        alert("File size exceeds the limit of 1MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image: any = reader.result; // Convert the image blob to base64
        setImage(base64Image); // Set the base64 image in the state
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL (base64)
    }
  };

  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();
  //Reorder Redux handleDropExperience array with drag-drop

  const triggerInputClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

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
    <div className="w-full first-page  text-gray-900">
      <div className="flex">
        <div className="flex flex-col w-10/12 p-8">
          <h2 className="text-4xl xs:text-2xl md:4xl lg:text-6xl  hover:shadow-md hover:bg-gray-100">
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
          <h3 className="text-2xl xs:text-[16px] md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100">
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
        <div>
          {/* <div onClick={triggerInputClick} className="  w-32 h-32 xs:w-24 xs:h-24 md:w-32 md:h-32 text-white bg-gray-800 text-center flex justify-center items-center  rounded-full mx-4 my-4 mr-8 xs:mr-4 md:mr-8 ">
            <span className="text-4xl  hover:shadow-md hover:bg-gray-100">
              <input ref={imageRef} className="hidden" type="file" accept="image/*" onChange={handleImageChange} />
              {image && <Image src={image} width={100} height={100} alt="Uploaded" />}

            </span>
          </div> */}
          {/* <button onClick={triggerInputClick} >
            <input ref={imageRef} className="hidden" type="file" accept="image/*" onChange={handleImageChange} />
            Uplaod
          </button> */}
        </div>
      </div>
      <div className="">
        <div className=" w-full flex flex-col pl-8 xs:pl-3 md:pl-8 lg:pl-8 pr-6">
          {/* contacts */}
          <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
            {contactIcon}
            Contact
          </h3>
          <ul className=" flex flex-row xs:flex-col md:flex-row justify-between mb-4 text-lg xs:text-sm md:text-lg lg:text-lg break-all pl-0">
            <li className="hover:shadow-md hover:bg-gray-100  text-sm flex flex-row gap-1  items-center">
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
            <li className="hover:shadow-md hover:bg-gray-100 flex flex-row gap-1  items-center text-sm">
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
            <li className="hover:shadow-md hover:bg-gray-100 text-blue-600 flex flex-row gap-1  items-center text-sm">
              {/* <a
                href={
                  resume?.contact?.linkedIn
                    ? resume?.contact?.linkedIn
                    : "https://www.linkedin.com/"
                }
                target="_blank"
                className="text-blue-600"
              > */}
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
              {/* </a> */}
            </li>
          </ul>

          {/* Skills */}
          {resume?.primarySkills && resume?.primarySkills.length > 0 && (
            <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
              {sparkleIcon}
              Skills
            </h3>
          )}
          {resume?.primarySkills &&
          resume?.primarySkills.length > 0 &&
          !regenerating ? (
            <>
              <Toolbar
                addSkill={handleAddSkills}
                regenerateSkills={getPrimarySkills}
              >
                <ul className="pl-0 flex flex-col gap-1 text-lg xs:text-sm md:text-lg lg:text-lg">
                  {resume?.primarySkills.map((skill: string, i: number) => (
                    <li
                      className="hover:shadow-md hover:cursor-move parent hover:border-dashed border-transparent border-[1px] hover:border-gray-500 hover:border  hover:bg-gray-100 flex justify-between items-center"
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

          {/* Education */}
          {resume?.education.length > 0 && (
            <>
              <h3 className="uppercase text-lg font-semibold flex flex-row gap-2 items-center">
                {educationIcon}
                Education
              </h3>
              <ul className="pl-0 flex flex-col">
                {resume?.education.map((education: Education, ind: number) => (
                  <React.Fragment key={education?.id || ind}>
                    <div className="relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                      <li
                        className=" hover:shadow-md hover:cursor-move 
                  parent  
                   hover:bg-gray-100 font-semibold flex uppercase text-md  justify-between items-center "
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
                      <li className="hover:shadow-md hover:bg-gray-100 text-lg xs:text-sm md:text-lg lg:text-lg text-gray-800">
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
                        <li className="mb-4 text-xs text-gray-700">
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
                      {/* <li className="mb-4 text-xs text-gray-700 ">
                      {education?.fromMonth + " " + education.fromYear} -{" "}
                      {education?.isContinue
                        ? "Present"
                        : education?.toMonth + " " + education.toYear}
                    </li> */}
                    </div>
                  </React.Fragment>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="w-full flex flex-col px-8 xs:px-4 md:px-8 lg:px-8">
          {/* Executive Summary */}
          <h3 className="uppercase text-lg font-semibold">EXECUTIVE SUMMARY</h3>
          <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 my-3"></span>
          <Toolbar regenrateSummary={getSummary}>
            <div className="text-lg xs:text-sm md:text-lg lg:text-lg  hover:shadow-md hover:bg-gray-100">
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
          <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 my-3"></span>
          <h3 className="uppercase text-lg font-semibold">WORK EXPERIENCE</h3>
          <span className="border-stylee w-full h-0 border-[1px] !border-gray-500 my-3"></span>

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
                      className="hover:border-dashed hover:border-gray-500  border-transparent border-2 hover:cursor-move hover:border-2"
                      onDragStart={(e) =>
                        e.dataTransfer.setData("text/plain", i.toString())
                      }
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDropExperience(e, i)}
                      draggable
                    >
                      <h2
                        className="hover:shadow-md hover:cursor-text hover:bg-gray-100"
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          lineHeight: "2rem",
                        }}
                      >
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
                      <h2
                        className="hover:cursor-default"
                        style={{
                          fontSize: "1.1rem",
                          lineHeight: "1.5rem",
                        }}
                      >
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

                      <div className="p-4 ">
                        {rec?.achievements && i !== regeneratedRecordIndex ? (
                          <ul className="pl-0 flex flex-col gap-1 text-lg xs:text-sm md:text-lg lg:text-lg">
                            {rec?.achievements.map(
                              (achievement: any, ind: number) => (
                                <li
                                  onDragStart={(e) => {
                                    setInsideIndex(ind);
                                  }}
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => {
                                    handleDropAchievement(i, ind, insideIndex);
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
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: streamedJDData,
                            }}
                          ></div>
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
                );
              })}
            </>
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
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate1);
