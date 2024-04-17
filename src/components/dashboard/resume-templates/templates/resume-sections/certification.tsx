"use client";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
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
    </>
  );
};

export default Certification;
