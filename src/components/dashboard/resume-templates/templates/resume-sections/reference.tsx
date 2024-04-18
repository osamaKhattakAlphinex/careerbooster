"use client";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import AddItemToCustomSection from "@/components/dashboard/resume-builder/AddItemToCustomSection";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React from "react";

type Props = {
  heading: any;
  references: any;
};

const Reference = ({ heading, references }: Props) => {
  const { handleDropOthersAchievement, handleDropOthers } = useDragAndDrop();
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();

  return (
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
          value={heading ? heading : "references"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                references: value,
              });
            }
          }}
        />
      </h3>
      <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
      <ul className="flex flex-wrap w-full pl-0 md:flex-row lg:flex-row ">
        {references.map((rec: any, i: number) => {
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
      <AddItemToCustomSection recName="refrence" />
    </>
  );
};

export default Reference;
