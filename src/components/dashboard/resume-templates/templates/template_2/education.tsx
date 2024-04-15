"use client";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import { crossIcon1 } from "@/helpers/iconsProvider";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useHandler from "@/hooks/useHandler";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import React, { useState } from "react";

type Props = {
  i: number;
  education: any;
};

const Education = ({ i, education }: Props) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const { handlers } = useHandler();

  return (
    <React.Fragment key={education?.id || i}>
      <div className="relative px-4 py-2 bg-gray-300 border-2 border-transparent rounded-md group hover:border-dashed hover:border-gray-500">
        <li className="flex items-center justify-between text-base font-semibold uppercase hover:shadow-md hover:cursor-move parent hover:border-2 hover:bg-gray-100 ">
          <EditableField
            value={education?.educationLevel}
            onSave={(value: string) => {
              handlers.handleSaveEductionDetail({ educationLevel: value }, i);
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
              handlers.handleSaveEductionDetail({ fieldOfStudy: value }, i);
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
                  handlers.handleSaveEductionDetail({ fromMonth: value }, i);
                }}
              />
            )}
            {education.fromMonth && <span>&nbsp;</span>}
            {education.fromYear && (
              <EditableField
                value={`${education?.fromYear}`}
                onSave={(value: string) => {
                  handlers.handleSaveEductionDetail({ fromYear: value }, i);
                }}
              />
            )}
            {education.fromYear && <span>&nbsp; - &nbsp;</span>}
            {education.toMonth && !education.isContinue && (
              <EditableField
                value={`${education?.toMonth}`}
                onSave={(value: string) => {
                  handlers.handleSaveEductionDetail({ toMonth: value }, i);
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
                  handlers.handleSaveEductionDetail({ isContinue: false }, i);
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
  );
};

export default Education;
