"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PromptEditor from "@/components/admin/linkedin-prompts/PromptEditor";
const ResumePromptsConfiguration = () => {
  const [promptsLoading, setPromptsLoading] = useState<boolean>(true);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [updating, setUpdating] = useState<string>("");

  useEffect(() => {
    setPromptsLoading(true);
    // get all prompts
    axios.get("/api/admin/prompts?type=resume").then((res) => {
      setPromptsLoading(false);
      setPrompts(res.data.prompts);
    });
  }, []);
  const handleSave = (name: string, val: string) => {
    if (name) {
      setUpdating(name);
      axios
        .post("/api/admin/prompts", {
          type: "resume",
          name: name,
          value: val,
          active: true,
        })
        .then((res) => {
          setUpdating("");
        });
    }
  };
  return (
    <>
      <div className="flex m-10 gap-4">
        <div className="w-full flex p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl">
            <div className="flex flex-row gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>

              <span className="text-semibold">
                Resume Prompts Configuration
              </span>
            </div>
          </h2>
        </div>
      </div>
      {promptsLoading ? (
        <h1 className="text-center text-2xl ">Loading...</h1>
      ) : (
        <>
          <div className="flex m-10 gap-4">
            {/* Summary Generator */}
            <PromptEditor
              name="summary"
              title="Summary"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            {/* WorkExperience General Description Generator */}
            <PromptEditor
              name="workExperienceGeneralDescription"
              title="Work Experience General Description"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>
          <div className="flex m-10 gap-4">
            {/* WorkExperience Achivement Description Generator */}
            <PromptEditor
              name="workExperienceAchievementDescription"
              title="Work Experience Achievement Description"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            {/* Primary Skills Generator */}
            <PromptEditor
              name="primarySkills"
              title="Primary skills"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>
          <div className="flex m-10 gap-4">
            {/* Professional Skills Generator */}
            <PromptEditor
              name="professionalSkills"
              title="Professional skills"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            {/* Secondary Skills Generator */}
            <PromptEditor
              name="secondarySkills"
              title="Secondary skills"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ResumePromptsConfiguration;
