"use client";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import { formatDate } from "@/helpers/getFormattedDateTime";
import { crossIcon1 } from "@/helpers/iconsProvider";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import React, { useState } from "react";

type Props = {
  i: number;
  rec: any;
};

const Award = ({ i, rec }: Props) => {
  const [rewardIndex, setRewardIndex] = useState<number>();
  const { handlers } = useHandler();
  const [newReward, setNewReward] = useState("");
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const [newBulletSection, setNewBulletSection] = useState<string | null>(null);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);

  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();

  return (
    <Toolbar
      key={i}
      addAchivement={() => {
        setRewardIndex(i);
        setNewBulletSection("Awards");
      }}
      deleteExperience={() => handlers.handleDeleteOthers(i, "awards")}
      // regenrateAchivements={() => handleRegenrate(rec, i)}
      addNewLine={() => {
        handlers.handleAddOthersSpace(i, newReward, "awards");
        setNewReward("");
      }}
    >
      <div
        key={i}
        className="border-2 border-transparent md:w-full hover:border-dashed hover:border-gray-500 hover:cursor-move hover:border-2"
        onDragStart={(e) => e.dataTransfer.setData("text/plain", i.toString())}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDropOthers(e, i, "awards")}
        draggable
      >
        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
          <EditableField
            value={rec?.title}
            style={{ width: "100%" }}
            onSave={(value: string) => {
              handlers.handleSaveOthersDetail({ title: value }, i, "awards");
            }}
          />
        </h2>
        <h2 className="flex flex-wrap gap-1 text-xs font-semibold leading-relaxed hover:cursor-default ">
          {rec.date && (
            <span className="hover:shadow-md hover:bg-gray-100">
              <EditableField
                value={`${formatDate(rec?.date)}`}
                onSave={(value: string) => {
                  handlers.handleSaveOthersDetail({ date: value }, i, "awards");
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
                        "awards"
                      );
                    }}
                    draggable
                    className="flex flex-row items-center justify-center h-8 hover:bg-slate-200 group"
                  >
                    <div
                      className="hidden text-xs font-medium text-gray-500 uppercase cursor-pointer group-hover:block"
                      onClick={() => {
                        handlers.handleRemoveExtraOthersSpace(i, ind, "awards");
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
                        handlers.handleDeleteOthersAchivement(i, ind, "awards")
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

          {rewardIndex === i && newBulletSection === "Awards" ? (
            <>
              <div className="flex flex-wrap w-full gap-1 mt-4">
                <input
                  className="w-full py-[4px] border-2 rounded-md  text bg-transparent " // Apply Tailwind CSS classes
                  onChange={(e) => setNewReward(e.target.value)}
                  value={newReward}
                  name="newReward"
                  id="newReward"
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                      // Save the new achievement to the state and possibly the database
                      handlers.handleAddOthersAchivement(
                        i,
                        newReward,
                        "awards"
                      );
                      setNewReward("");
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
                        newReward,
                        "awards"
                      );
                      setNewReward("");
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNewReward("");
                      setRewardIndex(-1);
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
};

export default Award;
