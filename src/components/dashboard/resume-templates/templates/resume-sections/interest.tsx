"use client";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import { crossIcon1 } from "@/helpers/iconsProvider";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React, { useState } from "react";

type Props = {
  heading: any;
  interests: any;
};
const Interest = ({ heading, interests }: Props) => {
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState("");
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const {
    handleDropOthersAchievement,
    handleDropOthers,
  } = useDragAndDrop();
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
  number | null
>(null);
const [streamedJDData, setStreamedJDData] = useState<any>("");

  return  <>
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
        heading
          ? heading
          : "interests & hobbies"
      }
      style={{ width: "fit-content" }}
      onSave={(value: string) => {
        if (value !== heading) {
          updateSaveHook.updateAndSaveHeadings({
            interests: value,
          });
        }
      }}
    />
  </h3>
  <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
  {interests.map((rec: any, i: number) => {
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
</>;
};

export default Interest;
