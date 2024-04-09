"use client";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import { crossIcon1 } from "@/helpers/iconsProvider";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";

type Props = {
  i: number;
  rec: any;
};

const Experience = ({ i, rec }: Props) => {
  const [newAchievement, setNewAchievement] = useState("");
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [insideIndex, setInsideIndex] = useState<number>(0);

  const { handlers } = useHandler();
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);

  const handleRegenrate = (rec: any, i: number) => {
    getOneWorkExperienceNew(rec);
    setRegeneratedRecordIndex(i);
  };

  return (
    <Toolbar
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
        className="border-2 border-transparent hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
        onDragStart={(e) => e.dataTransfer.setData("text/plain", i.toString())}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDropExperience(e, i)}
        draggable
      >
        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
          <EditableField
            value={rec?.title}
            style={{ width: "100%" }}
            onSave={(value: string) => {
              handlers.handleSaveExperienceDetail({ title: value }, i);
            }}
          />
        </h2>
        <h2 className="flex gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
          {/* {rec?.fromMonth + " " + rec?.fromYear} -{" "}
        {rec?.isContinue
          ? "Present"
          : `${rec?.toMonth} ${rec?.toYear}`}{" "}
        |{" "} */}
          {rec.fromMonth && (
            <EditableField
              value={`${rec?.fromMonth}`}
              onSave={(value: string) => {
                handlers.handleSaveExperienceDetail({ fromMonth: value }, i);
              }}
            />
          )}
          {rec.fromYear && (
            <EditableField
              value={`${rec?.fromYear}`}
              onSave={(value: string) => {
                handlers.handleSaveExperienceDetail({ fromYear: value }, i);
              }}
            />
          )}
          {rec.fromYear && <span>-</span>}
          {rec.toMonth && !rec.isContinue && (
            <EditableField
              value={`${rec?.toMonth}`}
              onSave={(value: string) => {
                handlers.handleSaveExperienceDetail({ toMonth: value }, i);
              }}
            />
          )}
          {rec.toMonth && <span>&nbsp;</span>}
          {rec.toYear && !rec.isContinue && (
            <EditableField
              value={`${rec?.toYear}`}
              onSave={(value: string) => {
                handlers.handleSaveExperienceDetail({ toYear: value }, i);
              }}
            />
          )}
          {rec.isContinue && (
            <EditableField
              value={`${rec?.isContinue && "Present"}`}
              onSave={(value: string) => {
                handlers.handleSaveExperienceDetail({ toYear: value }, i);
                handlers.handleSaveExperienceDetail({ isContinue: false }, i);
              }}
            />
          )}
          |{" "}
          <span className="hover:shadow-md hover:cursor-text hover:bg-gray-100">
            <EditableField
              value={rec?.company}
              onSave={(value: string) => {
                handlers.handleSaveExperienceDetail({ company: value }, i);
              }}
            />
          </span>{" "}
          |{" "}
          <span className="hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={rec?.cityState}
              onSave={(value: string) => {
                handlers.handleSaveExperienceDetail({ cityState: value }, i);
              }}
            />
          </span>{" "}
          {rec?.cityState?.length > 0 && ","}
          <span className="hover:shadow-md hover:bg-gray-100">
            <EditableField
              value={rec?.country}
              onSave={(value: string) => {
                handlers.handleSaveExperienceDetail({ country: value }, i);
              }}
            />
          </span>
        </h2>
        <div className="p-4">
          {rec?.achievements && i !== regeneratedRecordIndex ? (
            <ul className="flex flex-col gap-1 pl-0 text-xs">
              {rec?.achievements.map((achievement: any, ind: number) =>
                achievement === "" ? (
                  <li
                    key={ind}
                    onDragStart={(e) => {
                      setInsideIndex(ind);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      handleDropAchievement(i, ind, insideIndex);
                    }}
                    draggable
                    className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                  >
                    <div
                      className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
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
                      handleDropAchievement(i, ind, insideIndex);
                    }}
                    draggable
                    className="list-disc hover:border-dashed hover:cursor-move hover:border-gray-500 border-[1px] hover:border-[1px] border-transparent hover:shadow-md relative parent hover:bg-gray-100"
                    key={ind}
                  >
                    <EditableField
                      type="textarea"
                      value={achievement}
                      onSave={(value: string) => {
                        handlers.handleUpdateAchivement(i, ind, value);
                      }}
                    />
                    <div
                      onClick={() => handlers.handleDeleteAchivement(i, ind)}
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
                  onChange={(e) => setNewAchievement(e.target.value)}
                  value={newAchievement}
                  name="newAchievement"
                  id="newAchievement"
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                      // Save the new achievement to the state and possibly the database
                      handlers.handleAddAchivement(i, newAchievement);
                      setNewAchievement("");
                    }
                  }}
                />
                <div className="flex w-full gap-2 my-2">
                  <button
                    className="w-1/12 text-white bg-green-500 rounded-md xs:w-full md:w-1/12 lg:w-1/12 h-9 "
                    onClick={() => {
                      // Save the new achievement to the state and possibly the database
                      handlers.handleAddAchivement(i, newAchievement);
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
};

export default Experience;
