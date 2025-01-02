"use clint";
import { Prompt } from "@/app/(admin_route)/biography-prompts-configuration/page";
import { checkIcon } from "@/helpers/iconsProvider";
import { useEffect, useState } from "react";

interface Props {
  promptsLoading: boolean;
  prompts: Prompt[];
  handleSave: (name: string, val: string) => void;
  name: string;
  type: string;
  updating: string;
  title?: string;
}

const PromptEditor = ({
  promptsLoading,
  prompts,
  handleSave,
  name,
  type,
  updating,
  title,
}: Props) => {
  const [prompt, setPrompt] = useState<string>("");

  useEffect(() => {
    if (prompts) {
      const searchedPrompt = prompts.find(
        (prompt: Prompt) => prompt.name === name && prompt.type === type
      );
      if (searchedPrompt) {
        setPrompt(searchedPrompt.value);
      }
    }
  }, prompts);

  return (
    <div className="lg:!w-1/2 w-full p-4  border-[1px] border-gray-200 rounded-lg shadow sm:p-6 ">
      <div className="w-full ">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl">
            {title !== "" ? title : name + " Generator"}
          </h2>
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full p-4  rounded-lg  sm:p-6 outline-none border-none "
              placeholder="Enter Keywords Prompt"
              value={prompt}
              rows={12}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>

            <div>
              <button
                disabled={promptsLoading || updating === name}
                className="bg-gray-900 text-white rounded-lg py-3 px-4 hover:bg-gray-800 inline-block disabled:bg-gray-300 sm:ml-auto"
                onClick={() => handleSave(name, prompt)}
              >
                <div className="flex flex-row gap-2">
                  {updating === name ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-6 h-6 animate-spin`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  ) : (
                    <>{checkIcon}</>
                  )}

                  <span>{updating === name ? "Saving..." : "Save"} </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptEditor;
