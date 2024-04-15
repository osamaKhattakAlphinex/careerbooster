"use client";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import React from "react";

type Props = {
  i: number;
  rec: any;
};

const Reference = ({ rec, i }: Props) => {
  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();
  const { handlers } = useHandler();

  return (
    <Toolbar
      // addAchivement={() => {
      //   setNewWorkExperience(i)
      //   setNewBulletSection("References")
      // }}
      deleteExperience={() => handlers.handleDeleteOthers(i, "references")}
      // regenrateAchivements={() => handleRegenrate(rec, i)}
      // addNewLine={() => {
      //   handlers.handleAddOthersSpace(i, newAchievement, "references");
      //   setNewAchievement("");
      // }}
    >
      <div
        className=""
        onDragStart={(e) => e.dataTransfer.setData("text/plain", i.toString())}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDropOthers(e, i, "references")}
        draggable
      >
        <h2 className="text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-100">
          <EditableField
            value={rec?.name}
            style={{ width: "100%" }}
            onSave={(value: string) => {
              handlers.handleSaveOthersDetail({ name: value }, i, "references");
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
  );
};

export default Reference;
