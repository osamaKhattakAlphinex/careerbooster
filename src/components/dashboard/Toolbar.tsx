"use client";
import React, { ReactNode, useState } from "react";
import DeleteConfirmationModal from "../common/ConfirmationModal";
import { EditIcon } from "@/helpers/iconsProvider";

type ToolbarType = {
  addAchivement?: any;
  regenrateAchivements?: any;
  regenrateSummary?: any;
  addSkill?: any;
  regenerateSkills?: any;
  addNewLine?: any;
  deleteExperience?: any;
  copyToClipBoard?: any;
  editWorkExperience?: any;
  children: ReactNode;
};

const Toolbar = ({
  regenrateAchivements,
  addAchivement,
  addNewLine,
  regenrateSummary,
  addSkill,
  regenerateSkills,
  deleteExperience,
  editWorkExperience,
  copyToClipBoard,
  children,
}: ToolbarType) => {
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  return (
    <>
      <div className="relative group">
        <div className="absolute right-0 z-10 flex-row items-center justify-center hidden transition-opacity duration-300 ease-in rounded-md -bottom-7 group-hover:flex">
          {deleteExperience && (
            <button
              title="Delete Experience"
              onClick={() => setConfirmationModal(true)}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          )}

          {copyToClipBoard && (
            <button
              title="Copy To Clipboard"
              onClick={copyToClipBoard}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </button>
          )}
          {editWorkExperience && (
            <button
              title="Edit Description"
              onClick={editWorkExperience}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              {EditIcon}
            </button>
          )}

          {addAchivement && (
            <button
              title="Add New Achivement"
              onClick={addAchivement}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
          
          {regenrateAchivements && (
            <button
              title="Regenerate Job Description"
              onClick={regenrateAchivements}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          )}
          {addNewLine && (
            <button
              title="Add New Line"
              onClick={addNewLine}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                />
              </svg>
            </button>
          )}
          {addSkill && (
            <button
              title="Add New Skill"
              onClick={addSkill}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
          {regenerateSkills && (
            <button
              title="Regenerate Skills"
              onClick={regenerateSkills}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          )}
          {regenrateSummary && (
            <button
              title="Regenerate Summary"
              onClick={regenrateSummary}
              className="p-2 overflow-hidden text-white bg-gray-600 hover:bg-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          )}
        </div>
        <div>{children}</div>
      </div>
      {confirmationModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete ?"
          onCancel={() => setConfirmationModal(false)}
          onConfirm={() => {
            deleteExperience();
            setConfirmationModal(false);
          }}
        />
      )}
    </>
  );
};

export default Toolbar;
