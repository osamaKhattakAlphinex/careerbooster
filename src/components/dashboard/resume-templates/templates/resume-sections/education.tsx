"use client";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import { crossIcon1, resumeEductionIcon } from "@/helpers/iconsProvider";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";

import React, { useState } from "react";
import { Education as EducationType } from "@/store/userDataSlice";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

type Props = {
  heading: any;
  educations: any;
  customStyle?: any;
};

const Education = ({ heading, educations, customStyle }: Props) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const { handlers } = useHandler();
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <span
        className={` ${
          customStyle.borderTopBottom ? "!block" : "hidden"
        }  border-stylee w-full h-0 border-[1px] mt-6 !border-gray-900`}
      ></span>
      <h3
        className={`flex flex-row items-center gap-2 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500  ${
          customStyle.centeredHeading ? "justify-center" : "justify-normal"
        }`}
      >
        {resumeEductionIcon}

        <EditableField
          value={heading ? heading : "education"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading) {
              updateSaveHook.updateAndSaveHeadings({
                education: value,
              });
            }
          }}
        />
      </h3>
      <span
        className={` ${
          customStyle.borderTopBottom ? "!block" : "hidden"
        }  border-stylee w-full h-0 border-[1px] !border-gray-900 mb-3`}
      ></span>
      <ul className="grid grid-cols-3 gap-2 xs:grid-cols-3 md:grid-cols-3 ">
        {educations.map((education: EducationType, i: number) => (
          <React.Fragment key={education?.id || i}>
            <div className="relative px-4 py-2 bg-gray-300 border-2 border-transparent rounded-md group hover:border-dashed hover:border-gray-500">
              <li className="flex items-center justify-between text-base font-semibold uppercase hover:shadow-md hover:cursor-move parent hover:border-2 hover:bg-gray-100 ">
                <EditableField
                  value={education?.educationLevel}
                  onSave={(value: string) => {
                    handlers.handleSaveEductionDetail(
                      { educationLevel: value },
                      i
                    );
                  }}
                />
              </li>
              <div
                onClick={() => setConfirmationModal(true)}
                className="absolute z-10 hidden w-4 h-4 cursor-pointer group-hover:block right-2 top-2 child"
              >
                {crossIcon1}
              </div>
              <li className="text-xs font-semibold hover:shadow-md hover:bg-gray-100">
                <EditableField
                  value={`${education?.fieldOfStudy}`}
                  style={{ width: "100%" }}
                  onSave={(value: string) => {
                    handlers.handleSaveEductionDetail(
                      { fieldOfStudy: value },
                      i
                    );
                  }}
                />{" "}
              </li>
              <li className="text-xs italic text-gray-800 hover:shadow-md hover:bg-gray-100">
                <EditableField
                  value={`${education?.schoolName}`}
                  onSave={(value: string) => {
                    handlers.handleSaveEductionDetail({ schoolName: value }, i);
                  }}
                />
              </li>
              {(education.fromYear !== "" || education.toYear !== "") && (
                <li className="flex mb-4 text-xs italic text-gray-700">
                  {education.fromMonth && (
                    <EditableField
                      value={`${education?.fromMonth}`}
                      onSave={(value: string) => {
                        handlers.handleSaveEductionDetail(
                          { fromMonth: value },
                          i
                        );
                      }}
                    />
                  )}
                  {education.fromMonth && <span>&nbsp;</span>}
                  {education.fromYear && (
                    <EditableField
                      value={`${education?.fromYear}`}
                      onSave={(value: string) => {
                        handlers.handleSaveEductionDetail(
                          { fromYear: value },
                          i
                        );
                      }}
                    />
                  )}
                  {education.fromYear && <span>&nbsp; - &nbsp;</span>}
                  {education.toMonth && !education.isContinue && (
                    <EditableField
                      value={`${education?.toMonth}`}
                      onSave={(value: string) => {
                        handlers.handleSaveEductionDetail(
                          { toMonth: value },
                          i
                        );
                      }}
                    />
                  )}
                  {education.toMonth && <span>&nbsp;</span>}
                  {education.toYear && !education.isContinue && (
                    <EditableField
                      value={`${education?.toYear}`}
                      onSave={(value: string) => {
                        handlers.handleSaveEductionDetail({ toYear: value }, i);
                      }}
                    />
                  )}
                  {education.isContinue && (
                    <EditableField
                      value={`${education?.isContinue && "Present"}`}
                      onSave={(value: string) => {
                        handlers.handleSaveEductionDetail({ toYear: value }, i);
                        handlers.handleSaveEductionDetail(
                          { isContinue: false },
                          i
                        );
                      }}
                    />
                  )}
                </li>
              )}
            </div>
            {confirmationModal && (
              <DeleteConfirmationModal
                message="Are you sure you want to delete ?"
                onConfirm={() => {
                  setConfirmationModal(false);
                  handlers.handleDeleteEductionDetail(i);
                }}
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default Education;
