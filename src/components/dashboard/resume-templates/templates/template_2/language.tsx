"use client";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import React from "react";
import EditableField from "../../../EditableField";
import Toolbar from "../../../Toolbar";

type Props = {
  i: number;
  rec: any;
};

const Language = ({ rec, i }: Props) => {
  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();
  const { handlers } = useHandler();

  return (
    <Toolbar
      // addAchivement={() => setNewWorkExperience(i)}
      deleteExperience={() => handlers.handleDeleteOthers(i, "languages")}
      // regenrateAchivements={() => handleRegenrate(rec, i)}
      // addNewLine={() => {
      //   handlers.handleAddSpace(i, newAchievement);
      //   setNewAchievement("");
      // }}
    >
      <div
        className="border-2 border-transparent md:w-full hover:cursor-move"
        onDragStart={(e) => e.dataTransfer.setData("text/plain", i.toString())}
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
  );
};

export default Language;
