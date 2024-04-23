"use client";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import AddItemToCustomSection from "@/components/dashboard/resume-builder/AddItemToCustomSection";
import { formatDate } from "@/helpers/getFormattedDateTime";
import { crossIcon1 } from "@/helpers/iconsProvider";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React, { useState } from "react";

type Props = {
  heading: any;
  trainings: any;
  customStyle?: any;
};
const Training = ({ heading, trainings, customStyle }: Props) => {
  const [trainingIndex, setTrainingIndex] = useState<number>();
  const { handlers } = useHandler();
  const [newTraining, setNewTraining] = useState("");
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const { updateSaveHook } = useUpdateAndSave();

  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();

  return (
    <>
      <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
      <h3
        className={`flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500 ${
          customStyle.centeredHeading ? "justify-center" : ""
        }`}
      >
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
          value={heading ? heading : "trainings"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                trainings: value,
              });
            }
          }}
        />
      </h3>
      <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
      {trainings.map((rec: any, i: number) => {
        return (
          <Toolbar
            key={i}
            addAchivement={() => {
              setTrainingIndex(i);
              setNewBulletSection("Trainings");
            }}
            deleteExperience={() => handlers.handleDeleteOthers(i, "trainings")}
            // regenrateAchivements={() => handleRegenrate(rec, i)}
            addNewLine={() => {
              handlers.handleAddOthersSpace(i, newTraining, "trainings");
              setNewTraining("");
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
                    {rec?.description.map((achievement: any, ind: number) =>
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

                {trainingIndex === i && newBulletSection === "Trainings" ? (
                  <>
                    <div className="flex flex-wrap w-full gap-1 mt-4">
                      <input
                        className="w-full py-[4px] border-2 rounded-md  text bg-transparent " // Apply Tailwind CSS classes
                        onChange={(e) => setNewTraining(e.target.value)}
                        value={newTraining}
                        name="newTraining"
                        id="newTraining"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newTraining,
                              "trainings"
                            );
                            setNewTraining("");
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
                              newTraining,
                              "trainings"
                            );
                            setNewTraining("");
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setNewTraining("");
                            setTrainingIndex(-1);
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
      <AddItemToCustomSection recName="trainings" />
    </>
  );
};

export default Training;
