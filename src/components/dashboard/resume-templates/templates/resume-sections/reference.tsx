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
  styles: any;
  customStyle?: any;
};

const Reference = ({ heading, references, styles, customStyle }: Props) => {
  const { handleDropOthers } = useDragAndDrop();
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <span
        className={` ${styles?.span1} ${
          customStyle?.borderTopBottom ? "!block" : "hidden"
        }`}
      ></span>
      <h3
        className={`references ${styles?.reference_h3} ${
          customStyle?.centeredHeading ? "justify-center" : ""
        }
          ${styles?.bgColor}
        `}
      >
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
      <span
        className={`${styles?.span2} ${
          customStyle?.borderTopBottom || customStyle?.borderBottom
            ? "!block"
            : "hidden"
        }`}
      ></span>
      <ul className={`${styles?.reference_ul}`}>
        {references.map((rec: any, i: number) => {
          return (
            <li key={i} className={`${styles?.reference_li} group`}>
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
                  className={styles?.reference_div}
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", i.toString())
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropOthers(e, i, "references")}
                  draggable
                >
                  <h2 className={`${styles?.reference_h2}`}>
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
                  <h2 className={`${styles?.reference_h2_1}`}>
                    {rec?.position && (
                      <span className={`${styles?.reference_date}`}>
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
                    <span className={`${styles?.reference_date}`}>
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
                  <h2 className={`${styles?.reference_h2_1}`}>
                    Contact Info:
                    {rec?.contactInformation && (
                      <span className={`${styles?.reference_date}`}>
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
      <AddItemToCustomSection recName="references" />
    </>
  );
};

export default Reference;
