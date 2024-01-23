import React, { ReactNode } from "react";

type ToolbarType = {
  addAchivement?: any;
  regenrateAchivements?: any;
  regenrateSummary?: any;
  addSkill?: any;
  regenerateSkills?: any;
  addNewLine?: any;
  children: ReactNode;
};

const Toolbar = ({
  regenrateAchivements,
  addAchivement,
  addNewLine,
  regenrateSummary,
  addSkill,
  regenerateSkills,
  children,
}: ToolbarType) => {
  return (
    <div className=" relative group">
      <div className="group-hover:flex hidden flex-row justify-center items-center rounded-md absolute right-0  -top-8 transition-opacity ease-in duration-300">
        {addAchivement &&
          <button
            onClick={addAchivement}
            className=" hover:bg-gray-500 p-2 bg-gray-600 text-white overflow-hidden"
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
        }
        {
          regenrateAchivements &&
          <button
            onClick={regenrateAchivements}
            className=" hover:bg-gray-500 p-2 bg-gray-600 text-white overflow-hidden"
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
        }
        {addNewLine &&
          <button
            onClick={addNewLine}
            className=" hover:bg-gray-500 p-2 bg-gray-600 text-white overflow-hidden"
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
        }
        {
          addSkill && <button
            onClick={addSkill}
            className=" hover:bg-gray-500 p-2 bg-gray-600 text-white overflow-hidden"
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
        }
        {
          regenerateSkills &&
          <button
            onClick={regenerateSkills}
            className=" hover:bg-gray-500 p-2 bg-gray-600 text-white overflow-hidden"
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
        }
        {
          regenrateSummary &&
          <button
            onClick={regenrateSummary}
            className=" hover:bg-gray-500 p-2 bg-gray-600 text-white overflow-hidden"
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
        }
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Toolbar;
