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
  styles: any;
};

const Certification = ({ heading, certificates, styles }: Props) => {
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
      <span className={styles?.span1}></span>
      <h3 className={styles?.certification_h3}>
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
      <span className={styles?.span2}></span>
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
              className={styles?.certification_div}
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", i.toString())
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOthers(e, i, "certifications")}
              draggable
            >
              <h2 className={styles?.certification_h1}>
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
              <h2 className={styles?.certification_h2_1}>
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
                <span className={styles?.certification_date}>
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
                  <ul className={styles?.certification_ul}>
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
                          className={`group ${styles?.certification_li}`}
                        >
                          <div
                            className={styles?.certification_line}
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
                          className={`parent ${styles?.certification_delete1}`}
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
                            className={`${styles?.certification_delete} child`}
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
                    <div className={styles?.certification_div_input}>
                      <input
                        className={styles?.certification_new_input} // Apply Tailwind CSS classes
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
                          className="achievement-save-btn"
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
                          className="achievement-delete-btn"
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
