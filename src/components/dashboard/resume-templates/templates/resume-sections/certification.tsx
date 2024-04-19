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
  certificates: any;
};

const Certification = ({ heading, certificates }: Props) => {
  const [certificationIndex, setCertificationIndex] = useState<number>();
  const { handlers } = useHandler();
  const [newCertification, setNewCertification] = useState("");
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
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
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
          value={heading ? heading : "certifications"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                certifications: value,
              });
            }
          }}
        />
      </h3>
      <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
      {certificates.map((rec: any, i: number) => {
        return (
          <Toolbar
            key={i}
            addAchivement={() => {
              setCertificationIndex(i);
              setNewBulletSection("Certifications");
            }}
            deleteExperience={() =>
              handlers.handleDeleteOthers(i, "certifications")
            }
            // regenrateAchivements={() => handleRegenrate(rec, i)}
            addNewLine={() => {
              handlers.handleAddOthersSpace(
                i,
                newCertification,
                "certifications"
              );
              setNewCertification("");
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

                {certificationIndex === i &&
                newBulletSection === "Certifications" ? (
                  <>
                    <div className="flex flex-wrap w-full gap-1 mt-4">
                      <input
                        className="w-full py-[4px] border-2 rounded-md  text bg-transparent " // Apply Tailwind CSS classes
                        onChange={(e) => setNewCertification(e.target.value)}
                        value={newCertification}
                        name="newCertification"
                        id="newCertification"
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent the default Enter key behavior (typically adding a new line)
                            // Save the new achievement to the state and possibly the database
                            handlers.handleAddOthersAchivement(
                              i,
                              newCertification,
                              "certifications"
                            );
                            setNewCertification("");
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
                              newCertification,
                              "certifications"
                            );
                            setNewCertification("");
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setNewCertification("");
                            setCertificationIndex(-1);
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
      <AddItemToCustomSection recName="certifications" />
    </>
  );
};

export default Certification;
