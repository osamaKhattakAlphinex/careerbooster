"use client";
import { memo, useEffect, useState } from "react";
import { Education } from "@/store/userDataSlice";
import React from "react";
import { TwitterPicker, ColorResult } from "react-color";
import { useSelector } from "react-redux";
import { crossIcon1, emailIcon, phoneIcon } from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";
import useGetSummary from "@/hooks/useGetSummary";
import Toolbar from "@/components/dashboard/Toolbar";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { formatDate } from "@/helpers/getFormattedDateTime";
import Project from "./resume-sections/project";

const ResumeTemplate1 = ({
  streamedSummaryData,
  setStreamedSummaryData,
  streamedJDData,
  setStreamedJDData,
  setOutOfCredits,
}: {
  streamedSummaryData: string;
  streamedJDData: string;
  setStreamedJDData: any;
  setStreamedSummaryData: any;
  setOutOfCredits: any;
}) => {
  const resume = useSelector((state: any) => state.resume);

  const userData = useSelector((state: any) => state.userData);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState("");

  // const [color, setColor] = useState("#e04127");
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [confirmationModal, setConfirmationModal] = useState(false);

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(
    setRegenerating,
    setOutOfCredits
  );
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);

  // const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData, setOutOfCredits);
  // const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { getOneWorkExperienceNew } = useSingleJDGenerate(
    setStreamedJDData,
    setOutOfCredits
  );

  const {
    handleDropPrimary,
    handleDropAchievement,
    handleDropExperience,
    handleDropOthersAchievement,
    handleDropOthers,
  } = useDragAndDrop();

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
  // Access the selected color value from the 'color' parameter
  // setColor(color.hex);
  // You can do whatever you need with the selected color here
  // };

  return (
    <div className="flex flex-row text-gray-900 ">
      <div
        className={`relative flex bg-[#e04127]  w-[5%]`}
        // style={{ backgroundColor: color }}
      >
        {/* <ColorPicker
          defaultColor="#e04127"
          resetColor="#e04127"
          setColor={setColor}
          styles_pin="absolute text-white top-0 right-0 "
          styles_div="absolute top-3 -left-1"
          saveColor={saveColor}
        /> */}
      </div>

      <div className="w-full">
        <div className="flex flex-col xs:py-3 md:py-8 xs:pl-2 md:pl-6 xs:pr-3 md:pr-8 w-12/12">
          <h2 className="font-bold border-2 border-transparent xs:text-xl md:text-4xl md:4xl lg:text-4xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500">
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
          <h3 className="w-full text-lg border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl xs:leading-none hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500 ">
            <EditableField
              value={resume?.jobTitle ? resume?.jobTitle : "JOB TITLE"}
              onSave={(value: string) => {
                if (value !== resume?.jobTitle) {
                  updateSaveHook.updateAndSaveJobTitle(value);
                }
              }}
            />
          </h3>
          <ul className="flex flex-row justify-between pl-0 my-2 text-xs break-all xs:flex-wrap md:flex-nowrap md:gap-3 md:flex-row">
            <li className="xs:w-full md:w-[25%] hover:shadow-md hover:bg-gray-100 xs:text-[8px] md:text-xs flex flex-row gap-1  items-center justify-start ">
              <div className="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="xs:w-2 md:w-4 xs:h-2 md:h-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
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
            <li className="xs:w-full md:w-[25%] hover:shadow-md hover:bg-gray-100 flex flex-row gap-1 items-center justify-start md:text-xs xs:text-[8px]">
              <div className="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="xs:w-2 xs:h-2 md:w-4 md:h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
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
            <li className="xs:-full md:w-[25%] flex flex-row items-center justify-start gap-1 xs:text-[8px] md:text-xs hover:shadow-md hover:bg-gray-100">
              <div className="p-1">
                <svg
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="xs:w-2 md:w-4 xs:h-2 md:h-4"
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
                  resume?.contact?.linkedIn !== ""
                    ? resume.contact.linkedIn
                    : userData?.linkedin
                    ? userData?.linkedin
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
            <li className="xs:w-full md:w-[25%] flex flex-row items-center justify-start gap-1 xs:text-[8px] md:text-xs text-gray-950 hover:shadow-md hover:bg-gray-100">
              <div className="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="xs:h-2 xs:w-2 md:w-4 md:h-4"
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

          <div className="flex flex-col flex-wrap w-full ">
            {/* EXECUTIVE SUMMARY */}
            <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 md:mt-3"></span>
            <h3 className="flex items-center gap-2 font-semibold uppercase border-2 border-transparent md:my-1 xs:text-xs md:text-base hover:border-dashed hover:border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>

              <EditableField
                value={
                  resume?.headings?.summary
                    ? resume.headings.summary
                    : " executive summary"
                }
                style={{ width: "fit-content" }}
                onSave={(value: string) => {
                  if (value !== resume?.headings.summary) {
                    updateSaveHook.updateAndSaveHeadings({ summary: value });
                  }
                }}
              />
            </h3>
            <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>

            <Toolbar regenrateSummary={getSummary}>
              <div className="my-2 text-xs text-justify border-2 border-transparent h-fit hover:shadow-md hover:border-gray-500 hover:border-dashed ">
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

            {/* Skills */}

            {resume?.primarySkills && resume?.primarySkills.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 md:mt-3"></span>
                <h3 className="flex flex-row items-center gap-2 font-semibold uppercase border-2 border-transparent md:my-1 xs:text-xs md:text-base hover:border-dashed hover:border-gray-500 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                      clipRule="evenodd"
                    />
                    <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                    <path
                      fillRule="evenodd"
                      d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.primarySkills
                        ? resume.headings.primarySkills
                        : " skills"
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
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mb-2"></span>
                {resume?.primarySkills &&
                resume?.primarySkills.length > 0 &&
                !regenerating ? (
                  <Toolbar
                    addSkill={handleAddSkills}
                    regenerateSkills={getPrimarySkills}
                  >
                    <ul className="border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex flex-row  flex-wrap gap-1 h-[20%] text-xs ">
                      {" "}
                      {/* <li className="font-semibold uppercase">primary</li> */}
                      {resume?.primarySkills.map((skill: string, i: number) => (
                        <li
                          className="hover:shadow-md  w-[32%]  xs:w-[45%] md:w-[32%]  hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex  items-center"
                          key={i}
                          onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", i.toString())
                          }
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDropPrimary(e, i)}
                          draggable
                        >
                          <span className="!block  !w-1 !h-1 mr-3 !bg-black !rounded-full"></span>
                          <div className="flex items-center justify-between w-full">
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

            {/* Work Experience */}
            <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
                <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
              </svg>

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
            <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>

            {resume?.workExperienceArray &&
            resume?.workExperienceArray.length > 0 ? (
              <>
                {resume?.workExperienceArray.map((rec: any, i: number) => {
                  return (
                    <Toolbar
                      key={i}
                      addAchivement={() => {
                        setNewWorkExperience(i);
                        setNewBulletSection("WorkExperience");
                      }}
                      deleteExperience={() =>
                        handlers.handleDeleteExperience(i)
                      }
                      regenrateAchivements={() => handleRegenrate(rec, i)}
                      addNewLine={() => {
                        handlers.handleAddSpace(i, newAchievement);
                        setNewAchievement("");
                      }}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent md:w-full hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropExperience(e, i)}
                        draggable
                      >
                        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
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
                        <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                          {/* {rec?.fromMonth + " " + rec?.fromYear} -{" "}
                          {rec?.isContinue
                            ? "Present"
                            : `${rec?.toMonth} ${rec?.toYear}`}{" "}
                          |{" "} */}
                          {rec.fromMonth && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.fromMonth}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { fromMonth: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          {rec.fromYear && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.fromYear}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { fromYear: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          {rec.fromYear && <span>-</span>}
                          {rec.toMonth && !rec.isContinue && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.toMonth}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { toMonth: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          {rec.toYear && !rec.isContinue && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${rec?.toYear}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveExperienceDetail(
                                    { toYear: value },
                                    i
                                  );
                                }}
                              />
                            </span>
                          )}
                          {rec.isContinue && (
                            <span className="hover:shadow-md hover:bg-gray-100">
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
                            </span>
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
                        <div className="px-4 py-1">
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

                          {newWorkExperience === i &&
                          newBulletSection === "WorkExperience" ? (
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
                                    className="w-1/12 text-white bg-green-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12 h-9 "
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
                                      setNewBulletSection(null);
                                    }}
                                    className="w-1/12 py-1 text-white bg-red-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
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

            {/* Publications */}
            {resume?.publications && resume?.publications.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v11.75A2.75 2.75 0 0 0 16.75 18h-12A2.75 2.75 0 0 1 2 15.25V3.5Zm3.75 7a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0 3a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM5 5.75A.75.75 0 0 1 5.75 5h4.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 8.25v-2.5Z"
                      clipRule="evenodd"
                    />
                    <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 1 0 2.5 0V8a1.5 1.5 0 0 0-1.5-1.5Z" />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.publications
                        ? resume.headings.publications
                        : "publications"
                    }
                    style={{ width: "fit-content" }}
                    onSave={(value: string) => {
                      if (value !== resume?.headings?.publications) {
                        updateSaveHook.updateAndSaveHeadings({
                          publications: value,
                        });
                      }
                    }}
                  />
                </h3>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
                {resume?.publications.map((rec: any, i: number) => {
                  return (
                    <Toolbar
                      key={i}
                      addAchivement={() => {
                        setNewWorkExperience(i);
                        setNewBulletSection("Publications");
                      }}
                      deleteExperience={() =>
                        handlers.handleDeleteOthers(i, "publications")
                      }
                      // regenrateAchivements={() => handleRegenrate(rec, i)}
                      addNewLine={() => {
                        handlers.handleAddOthersSpace(
                          i,
                          newAchievement,
                          "publications"
                        );
                        setNewAchievement("");
                      }}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent md:w-full hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropOthers(e, i, "publications")}
                        draggable
                      >
                        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
                          <EditableField
                            value={rec?.title}
                            style={{ width: "100%" }}
                            onSave={(value: string) => {
                              handlers.handleSaveOthersDetail(
                                { title: value },
                                i,
                                "publications"
                              );
                            }}
                          />
                        </h2>
                        <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                          {rec.date && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${formatDate(rec?.date)}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveOthersDetail(
                                    { date: value },
                                    i,
                                    "publications"
                                  );
                                }}
                              />
                            </span>
                          )}
                          |
                          <span className="hover:shadow-md hover:bg-gray-100">
                            <EditableField
                              value={rec?.publisher}
                              onSave={(value: string) => {
                                handlers.handleSaveOthersDetail(
                                  { publisher: value },
                                  i,
                                  "publications"
                                );
                              }}
                            />
                          </span>
                        </h2>
                        <div className="px-4 py-1">
                          {rec?.description && i !== regeneratedRecordIndex ? (
                            <ul className="flex flex-col gap-1 pl-0 text-xs">
                              {rec?.description.map(
                                (achievement: any, ind: number) =>
                                  achievement === "" ? (
                                    <li
                                      key={ind}
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "publications"
                                        );
                                      }}
                                      draggable
                                      className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                                    >
                                      <div
                                        className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
                                        onClick={() => {
                                          handlers.handleRemoveExtraOthersSpace(
                                            i,
                                            ind,
                                            "publications"
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
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "publications"
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
                                          handlers.handleUpdateOthersAchivement(
                                            i,
                                            ind,
                                            value,
                                            "publications"
                                          );
                                        }}
                                      />
                                      <div
                                        onClick={() =>
                                          handlers.handleDeleteOthersAchivement(
                                            i,
                                            ind,
                                            "publications"
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

                          {newWorkExperience === i &&
                          newBulletSection === "Publications" ? (
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
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "publications"
                                      );
                                      setNewAchievement("");
                                    }
                                  }}
                                />
                                <div className="flex w-full gap-2 my-2">
                                  <button
                                    className="w-1/12 text-white bg-green-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12 h-9 "
                                    onClick={() => {
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "publications"
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
                                      setNewBulletSection(null);
                                    }}
                                    className="w-1/12 py-1 text-white bg-red-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Toolbar>
                  );
                })}
              </>
            )}

            {/* Certificates */}
            {resume?.certifications && resume?.certifications.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                      clipRule="evenodd"
                    />
                  </svg> */}

                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>certificate-ribbon-solid</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="invisible_box" data-name="invisible box">
                        <rect width="48" height="48" fill="none" />
                      </g>
                      <g id="icons_Q2" data-name="icons Q2">
                        <g>
                          <circle cx="24" cy="18" r="7" />
                          <path d="M40,18A16,16,0,1,0,15,31.2V43.9a2,2,0,0,0,3.1,1.7L24,41l5.9,4.6A2,2,0,0,0,33,43.9V31.2A16,16,0,0,0,40,18ZM12,18A12,12,0,1,1,24,30,12,12,0,0,1,12,18Z" />
                        </g>
                      </g>
                    </g>
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.certifications
                        ? resume.headings.certifications
                        : "certifications"
                    }
                    style={{ width: "fit-content" }}
                    onSave={(value: string) => {
                      if (value !== resume?.headings?.certifications) {
                        updateSaveHook.updateAndSaveHeadings({
                          certifications: value,
                        });
                      }
                    }}
                  />
                </h3>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
                {resume?.certifications.map((rec: any, i: number) => {
                  return (
                    <Toolbar
                      key={i}
                      addAchivement={() => {
                        setNewWorkExperience(i);
                        setNewBulletSection("Certifications");
                      }}
                      deleteExperience={() =>
                        handlers.handleDeleteOthers(i, "certifications")
                      }
                      // regenrateAchivements={() => handleRegenrate(rec, i)}
                      addNewLine={() => {
                        handlers.handleAddOthersSpace(
                          i,
                          newAchievement,
                          "certifications"
                        );
                        setNewAchievement("");
                      }}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent md:w-full hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropOthers(e, i, "certifications")}
                        draggable
                      >
                        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
                          <EditableField
                            value={rec?.title}
                            style={{ width: "100%" }}
                            onSave={(value: string) => {
                              handlers.handleSaveOthersDetail(
                                { title: value },
                                i,
                                "certifications"
                              );
                            }}
                          />
                        </h2>
                        <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                          {rec.date && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${formatDate(rec?.date)}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveOthersDetail(
                                    { date: value },
                                    i,
                                    "certifications"
                                  );
                                }}
                              />
                            </span>
                          )}
                          |
                          <span className="hover:shadow-md hover:bg-gray-100">
                            <EditableField
                              value={rec?.issuingOrganization}
                              onSave={(value: string) => {
                                handlers.handleSaveOthersDetail(
                                  { issuingOrganization: value },
                                  i,
                                  "certifications"
                                );
                              }}
                            />
                          </span>
                        </h2>
                        <div className="px-4 py-1">
                          {rec?.description && i !== regeneratedRecordIndex ? (
                            <ul className="flex flex-col gap-1 pl-0 text-xs">
                              {rec?.description.map(
                                (achievement: any, ind: number) =>
                                  achievement === "" ? (
                                    <li
                                      key={ind}
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "certifications"
                                        );
                                      }}
                                      draggable
                                      className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                                    >
                                      <div
                                        className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
                                        onClick={() => {
                                          handlers.handleRemoveExtraOthersSpace(
                                            i,
                                            ind,
                                            "certifications"
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
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "certifications"
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
                                          handlers.handleUpdateOthersAchivement(
                                            i,
                                            ind,
                                            value,
                                            "certifications"
                                          );
                                        }}
                                      />
                                      <div
                                        onClick={() =>
                                          handlers.handleDeleteOthersAchivement(
                                            i,
                                            ind,
                                            "certifications"
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

                          {newWorkExperience === i &&
                          newBulletSection === "Certifications" ? (
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
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "certifications"
                                      );
                                      setNewAchievement("");
                                    }
                                  }}
                                />
                                <div className="flex w-full gap-2 my-2">
                                  <button
                                    className="w-1/12 text-white bg-green-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12 h-9 "
                                    onClick={() => {
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "certifications"
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
                                      setNewBulletSection(null);
                                    }}
                                    className="w-1/12 py-1 text-white bg-red-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Toolbar>
                  );
                })}
              </>
            )}

            {/* Trainings */}
            {resume?.trainings && resume?.trainings.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.trainings
                        ? resume.headings.trainings
                        : "trainings"
                    }
                    style={{ width: "fit-content" }}
                    onSave={(value: string) => {
                      if (value !== resume?.headings?.trainings) {
                        updateSaveHook.updateAndSaveHeadings({
                          trainings: value,
                        });
                      }
                    }}
                  />
                </h3>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
                {resume?.trainings.map((rec: any, i: number) => {
                  return (
                    <Toolbar
                      key={i}
                      addAchivement={() => {
                        setNewWorkExperience(i);
                        setNewBulletSection("Trainings");
                      }}
                      deleteExperience={() =>
                        handlers.handleDeleteOthers(i, "trainings")
                      }
                      // regenrateAchivements={() => handleRegenrate(rec, i)}
                      addNewLine={() => {
                        handlers.handleAddOthersSpace(
                          i,
                          newAchievement,
                          "trainings"
                        );
                        setNewAchievement("");
                      }}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent md:w-full hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropOthers(e, i, "trainings")}
                        draggable
                      >
                        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
                          <EditableField
                            value={rec?.position}
                            style={{ width: "100%" }}
                            onSave={(value: string) => {
                              handlers.handleSaveOthersDetail(
                                { position: value },
                                i,
                                "trainings"
                              );
                            }}
                          />
                        </h2>
                        <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                          {rec.startDate && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${formatDate(rec?.startDate)}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveOthersDetail(
                                    { startDate: value },
                                    i,
                                    "trainings"
                                  );
                                }}
                              />
                            </span>
                          )}
                          -
                          {rec.endDate && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${formatDate(rec?.endDate)}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveOthersDetail(
                                    { endDate: value },
                                    i,
                                    "trainings"
                                  );
                                }}
                              />
                            </span>
                          )}
                          |
                          <span className="hover:shadow-md hover:bg-gray-100">
                            <EditableField
                              value={rec?.company}
                              onSave={(value: string) => {
                                handlers.handleSaveOthersDetail(
                                  { company: value },
                                  i,
                                  "trainings"
                                );
                              }}
                            />
                          </span>
                        </h2>
                        <div className="px-4 py-1">
                          {rec?.description && i !== regeneratedRecordIndex ? (
                            <ul className="flex flex-col gap-1 pl-0 text-xs">
                              {rec?.description.map(
                                (achievement: any, ind: number) =>
                                  achievement === "" ? (
                                    <li
                                      key={ind}
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "trainings"
                                        );
                                      }}
                                      draggable
                                      className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                                    >
                                      <div
                                        className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
                                        onClick={() => {
                                          handlers.handleRemoveExtraOthersSpace(
                                            i,
                                            ind,
                                            "trainings"
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
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "trainings"
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
                                          handlers.handleUpdateOthersAchivement(
                                            i,
                                            ind,
                                            value,
                                            "trainings"
                                          );
                                        }}
                                      />
                                      <div
                                        onClick={() =>
                                          handlers.handleDeleteOthersAchivement(
                                            i,
                                            ind,
                                            "trainings"
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

                          {newWorkExperience === i &&
                          newBulletSection === "Trainings" ? (
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
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "trainings"
                                      );
                                      setNewAchievement("");
                                    }
                                  }}
                                />
                                <div className="flex w-full gap-2 my-2">
                                  <button
                                    className="w-1/12 text-white bg-green-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12 h-9 "
                                    onClick={() => {
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "trainings"
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
                                      setNewBulletSection(null);
                                    }}
                                    className="w-1/12 py-1 text-white bg-red-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Toolbar>
                  );
                })}
              </>
            )}

            {/* Awards */}
            {resume?.awards && resume?.awards.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 0 0-.552.698 5 5 0 0 0 4.503 5.152 6 6 0 0 0 2.946 1.822A6.451 6.451 0 0 1 7.768 13H7.5A1.5 1.5 0 0 0 6 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 0 0-1.5-1.5h-.268a6.453 6.453 0 0 1-.684-2.202 6 6 0 0 0 2.946-1.822 5 5 0 0 0 4.503-5.152.75.75 0 0 0-.552-.698A31.804 31.804 0 0 0 16 2.562v-.387a.75.75 0 0 0-.629-.74A33.227 33.227 0 0 0 10 1ZM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 0 1-1.855-2.68Zm14.95 0a3.503 3.503 0 0 1-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.awards
                        ? resume.headings.awards
                        : "awards"
                    }
                    style={{ width: "fit-content" }}
                    onSave={(value: string) => {
                      if (value !== resume?.headings?.awards) {
                        updateSaveHook.updateAndSaveHeadings({
                          awards: value,
                        });
                      }
                    }}
                  />
                </h3>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
                {resume?.awards.map((rec: any, i: number) => {
                  return (
                    <Toolbar
                      key={i}
                      addAchivement={() => {
                        setNewWorkExperience(i);
                        setNewBulletSection("Awards");
                      }}
                      deleteExperience={() =>
                        handlers.handleDeleteOthers(i, "awards")
                      }
                      // regenrateAchivements={() => handleRegenrate(rec, i)}
                      addNewLine={() => {
                        handlers.handleAddOthersSpace(
                          i,
                          newAchievement,
                          "awards"
                        );
                        setNewAchievement("");
                      }}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent md:w-full hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropOthers(e, i, "awards")}
                        draggable
                      >
                        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
                          <EditableField
                            value={rec?.title}
                            style={{ width: "100%" }}
                            onSave={(value: string) => {
                              handlers.handleSaveOthersDetail(
                                { title: value },
                                i,
                                "awards"
                              );
                            }}
                          />
                        </h2>
                        <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                          {rec.date && (
                            <span className="hover:shadow-md hover:bg-gray-100">
                              <EditableField
                                value={`${formatDate(rec?.date)}`}
                                onSave={(value: string) => {
                                  handlers.handleSaveOthersDetail(
                                    { date: value },
                                    i,
                                    "awards"
                                  );
                                }}
                              />
                            </span>
                          )}
                          |
                          <span className="hover:shadow-md hover:bg-gray-100">
                            <EditableField
                              value={rec?.awardingOrganization}
                              onSave={(value: string) => {
                                handlers.handleSaveOthersDetail(
                                  { awardingOrganization: value },
                                  i,
                                  "awards"
                                );
                              }}
                            />
                          </span>
                        </h2>
                        <div className="px-4 py-1">
                          {rec?.description && i !== regeneratedRecordIndex ? (
                            <ul className="flex flex-col gap-1 pl-0 text-xs">
                              {rec?.description.map(
                                (achievement: any, ind: number) =>
                                  achievement === "" ? (
                                    <li
                                      key={ind}
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "awards"
                                        );
                                      }}
                                      draggable
                                      className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                                    >
                                      <div
                                        className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
                                        onClick={() => {
                                          handlers.handleRemoveExtraOthersSpace(
                                            i,
                                            ind,
                                            "awards"
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
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "awards"
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
                                          handlers.handleUpdateOthersAchivement(
                                            i,
                                            ind,
                                            value,
                                            "awards"
                                          );
                                        }}
                                      />
                                      <div
                                        onClick={() =>
                                          handlers.handleDeleteOthersAchivement(
                                            i,
                                            ind,
                                            "awards"
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

                          {newWorkExperience === i &&
                          newBulletSection === "Awards" ? (
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
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "awards"
                                      );
                                      setNewAchievement("");
                                    }
                                  }}
                                />
                                <div className="flex w-full gap-2 my-2">
                                  <button
                                    className="w-1/12 text-white bg-green-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12 h-9 "
                                    onClick={() => {
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "awards"
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
                                      setNewBulletSection(null);
                                    }}
                                    className="w-1/12 py-1 text-white bg-red-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Toolbar>
                  );
                })}
              </>
            )}

            {resume?.projects && resume?.projects.length > 0 && (
              <Project
                heading={resume.headings.projects}
                projects={resume.projects}
              />
            )}

            {/* Interests & Hobbies */}
            {resume?.interests && resume?.interests.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.interests
                        ? resume.headings.interests
                        : "interests & hobbies"
                    }
                    style={{ width: "fit-content" }}
                    onSave={(value: string) => {
                      if (value !== resume?.headings?.interests) {
                        updateSaveHook.updateAndSaveHeadings({
                          interests: value,
                        });
                      }
                    }}
                  />
                </h3>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
                {resume?.interests.map((rec: any, i: number) => {
                  return (
                    <Toolbar
                      key={i}
                      // addAchivement={() => {
                      //   setNewWorkExperience(i);
                      //   setNewBulletSection("Interests");
                      // }}
                      deleteExperience={() =>
                        handlers.handleDeleteOthers(i, "interests")
                      }
                      // regenrateAchivements={() => handleRegenrate(rec, i)}
                      addNewLine={() => {
                        handlers.handleAddOthersSpace(
                          i,
                          newAchievement,
                          "interests"
                        );
                        setNewAchievement("");
                      }}
                    >
                      <div
                        key={i}
                        className="border-2 border-transparent md:w-full hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i.toString())
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropOthers(e, i, "interests")}
                        draggable
                      >
                        {/* <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
                          <EditableField
                            value={rec?.name}
                            style={{ width: "100%" }}
                            onSave={(value: string) => {
                              handlers.handleSaveOthersDetail(
                                { name: value },
                                i,
                                "interests"
                              );
                            }}
                          />
                        </h2> */}

                        <div className="px-4 py-1">
                          {rec?.description && i !== regeneratedRecordIndex ? (
                            <ul className="flex flex-col gap-1 pl-0 text-xs">
                              {rec?.description.map(
                                (achievement: any, ind: number) =>
                                  achievement === "" ? (
                                    <li
                                      key={ind}
                                      onDragStart={(e) => {
                                        setInsideIndex(ind);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => {
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "interests"
                                        );
                                      }}
                                      draggable
                                      className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                                    >
                                      <div
                                        className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
                                        onClick={() => {
                                          handlers.handleRemoveExtraOthersSpace(
                                            i,
                                            ind,
                                            "interests"
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
                                        handleDropOthersAchievement(
                                          i,
                                          ind,
                                          insideIndex,
                                          "interests"
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
                                          handlers.handleUpdateOthersAchivement(
                                            i,
                                            ind,
                                            value,
                                            "interests"
                                          );
                                        }}
                                      />
                                      <div
                                        onClick={() =>
                                          handlers.handleDeleteOthersAchivement(
                                            i,
                                            ind,
                                            "interests"
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

                          {newWorkExperience === i &&
                          newBulletSection === "Interests" ? (
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
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "interests"
                                      );
                                      setNewAchievement("");
                                    }
                                  }}
                                />
                                <div className="flex w-full gap-2 my-2">
                                  <button
                                    className="w-1/12 text-white bg-green-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12 h-9 "
                                    onClick={() => {
                                      // Save the new achievement to the state and possibly the database
                                      handlers.handleAddOthersAchivement(
                                        i,
                                        newAchievement,
                                        "interests"
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
                                      setNewBulletSection(null);
                                    }}
                                    className="w-1/12 py-1 text-white bg-red-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Toolbar>
                  );
                })}
              </>
            )}

            {/* References */}
            {resume?.references && resume?.references.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.references
                        ? resume.headings.references
                        : "references"
                    }
                    style={{ width: "fit-content" }}
                    onSave={(value: string) => {
                      if (value !== resume?.headings?.references) {
                        updateSaveHook.updateAndSaveHeadings({
                          references: value,
                        });
                      }
                    }}
                  />
                </h3>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
                <ul className="flex flex-wrap w-full pl-0 md:flex-row lg:flex-row ">
                  {resume?.references.map((rec: any, i: number) => {
                    return (
                      <li
                        key={i}
                        className="w-[45%] md:w-[30%] md m-2  xs:m-0 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500"
                      >
                        <Toolbar
                          // addAchivement={() => {
                          //   setNewWorkExperience(i)
                          //   setNewBulletSection("References")
                          // }}
                          deleteExperience={() =>
                            handlers.handleDeleteOthers(i, "references")
                          }
                          // regenrateAchivements={() => handleRegenrate(rec, i)}
                          // addNewLine={() => {
                          //   handlers.handleAddOthersSpace(i, newAchievement, "references");
                          //   setNewAchievement("");
                          // }}
                        >
                          <div
                            className=""
                            onDragStart={(e) =>
                              e.dataTransfer.setData("text/plain", i.toString())
                            }
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDropOthers(e, i, "references")}
                            draggable
                          >
                            <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
                              <EditableField
                                value={rec?.name}
                                style={{ width: "100%" }}
                                onSave={(value: string) => {
                                  handlers.handleSaveOthersDetail(
                                    { name: value },
                                    i,
                                    "references"
                                  );
                                }}
                              />
                            </h2>
                            <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                              {rec?.position && (
                                <span className="hover:shadow-md hover:bg-gray-100">
                                  <EditableField
                                    value={rec?.position}
                                    onSave={(value: string) => {
                                      handlers.handleSaveOthersDetail(
                                        { position: value },
                                        i,
                                        "references"
                                      );
                                    }}
                                  />
                                </span>
                              )}
                              |
                              <span className="hover:shadow-md hover:bg-gray-100">
                                <EditableField
                                  value={rec?.company}
                                  onSave={(value: string) => {
                                    handlers.handleSaveOthersDetail(
                                      { company: value },
                                      i,
                                      "references"
                                    );
                                  }}
                                />
                              </span>
                            </h2>
                            <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                              Contact Info:
                              {rec?.contactInformation && (
                                <span className="hover:shadow-md hover:bg-gray-100">
                                  <EditableField
                                    value={rec.contactInformation}
                                    onSave={(value: string) => {
                                      handlers.handleSaveOthersDetail(
                                        { contactInformation: value },
                                        i,
                                        "references"
                                      );
                                    }}
                                  />
                                </span>
                              )}
                            </h2>
                          </div>
                        </Toolbar>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {/* Languages */}
            {resume?.languages && resume?.languages.length > 0 && (
              <>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M7.75 2.75a.75.75 0 0 0-1.5 0v1.258a32.987 32.987 0 0 0-3.599.278.75.75 0 1 0 .198 1.487A31.545 31.545 0 0 1 8.7 5.545 19.381 19.381 0 0 1 7 9.56a19.418 19.418 0 0 1-1.002-2.05.75.75 0 0 0-1.384.577 20.935 20.935 0 0 0 1.492 2.91 19.613 19.613 0 0 1-3.828 4.154.75.75 0 1 0 .945 1.164A21.116 21.116 0 0 0 7 12.331c.095.132.192.262.29.391a.75.75 0 0 0 1.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 0 0 2.333-5.332c.31.031.618.068.924.108a.75.75 0 0 0 .198-1.487 32.832 32.832 0 0 0-3.599-.278V2.75Z" />
                    <path
                      fillRule="evenodd"
                      d="M13 8a.75.75 0 0 1 .671.415l4.25 8.5a.75.75 0 1 1-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 1 1-1.342-.67l4.25-8.5A.75.75 0 0 1 13 8Zm2.037 6.5L13 10.427 10.964 14.5h4.073Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.languages
                        ? resume.headings.languages
                        : "languages"
                    }
                    style={{ width: "fit-content" }}
                    onSave={(value: string) => {
                      if (value !== resume?.headings?.languages) {
                        updateSaveHook.updateAndSaveHeadings({
                          languages: value,
                        });
                      }
                    }}
                  />
                </h3>
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
                <ul className="flex flex-wrap w-full pl-0 md:flex-row lg:flex-row ">
                  {resume?.languages.map((rec: any, i: number) => {
                    return (
                      <li
                        key={i}
                        className="w-[45%] md:w-[30%] m-2  xs:m-0 relative group border-2 border-transparent hover:shadow-md hover:border-gray-500 hover:border-dashed "
                      >
                        <Toolbar
                          // addAchivement={() => setNewWorkExperience(i)}
                          deleteExperience={() =>
                            handlers.handleDeleteOthers(i, "languages")
                          }
                          // regenrateAchivements={() => handleRegenrate(rec, i)}
                          // addNewLine={() => {
                          //   handlers.handleAddSpace(i, newAchievement);
                          //   setNewAchievement("");
                          // }}
                        >
                          <div
                            className="border-2 border-transparent md:w-full hover:cursor-move"
                            onDragStart={(e) =>
                              e.dataTransfer.setData("text/plain", i.toString())
                            }
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDropOthers(e, i, "languages")}
                            draggable
                          >
                            <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
                              <EditableField
                                value={rec?.language}
                                style={{ width: "100%" }}
                                onSave={(value: string) => {
                                  handlers.handleSaveOthersDetail(
                                    { language: value },
                                    i,
                                    "languages"
                                  );
                                }}
                              />
                            </h2>
                            <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
                              Proficiency:
                              {rec?.proficiency && (
                                <span className="hover:shadow-md hover:bg-gray-100">
                                  <EditableField
                                    value={rec.proficiency}
                                    onSave={(value: string) => {
                                      handlers.handleSaveOthersDetail(
                                        { proficiency: value },
                                        i,
                                        "languages"
                                      );
                                    }}
                                  />
                                </span>
                              )}
                            </h2>
                          </div>
                        </Toolbar>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {/* <CustomResumeSection /> */}
            {/* Education */}
            {resume?.education.length > 0 && (
              <>
                <span className="!block w-full h-0 border-[1px] border-gray-500 my-t mt-1 page-break"></span>
                <h3 className="flex flex-row items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                  </svg>

                  <EditableField
                    value={
                      resume?.headings?.education
                        ? resume.headings.education
                        : " education"
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
                <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 my-b"></span>
                <ul className="flex flex-wrap w-full pl-0 md:flex-row lg:flex-row ">
                  {resume?.education.map(
                    (education: Education, ind: number) => (
                      <React.Fragment key={education?.id || ind}>
                        <div className="w-[45%] md:w-[30%] md m-2  xs:m-0 relative group border-transparent border-2 hover:border-dashed hover:border-gray-500">
                          <li className="flex items-center justify-between text-base font-semibold uppercase hover:shadow-md hover:cursor-move parent hover:bg-gray-100">
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
                          <li className="text-xs italic text-gray-800 hover:shadow-md hover:bg-gray-100">
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
                            <li className="flex mb-4 text-xs italic text-gray-700">
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
                              {education.fromYear && (
                                <span>&nbsp; - &nbsp;</span>
                              )}
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
                                  value={`${
                                    education?.isContinue && "Present"
                                  }`}
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
                    )
                  )}
                </ul>
              </>
            )}

            {/* <AddSection /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate1);
