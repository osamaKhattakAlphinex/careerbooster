"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PromptEditor from "@/components/admin/linkedin-prompts/PromptEditor";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";

const ResumePromptsConfiguration = () => {
  const [promptsLoading, setPromptsLoading] = useState<boolean>(true);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [updating, setUpdating] = useState<string>("");

  useEffect(() => {
    setPromptsLoading(true);
    // get all prompts
    axios.get("/api/prompts?type=resume").then((res) => {
      setPromptsLoading(false);
      setPrompts(res.data.result);
    });
  }, []);
  const handleSave = (name: string, val: string) => {
    if (name) {
      setUpdating(name);
      axios
        .post("/api/prompts", {
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
    <div className="">
      {/* <div className="my-5 ml-10">
        <Link
          href="/admin"
          className="flex flex-row items-center gap-2 transition-all hover:font-semibold"
        >
          {leftArrowIcon}
          Dashboard
        </Link>
      </div> */}
      <div className="flex gap-4 mb-3">
        <div className="flex w-full">
          <h2 className="text-lg">
            <div className="flex flex-row gap-2">
              {/* <svg
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
              </svg> */}

              <span className="text-semibold">
                Resume Prompts Configuration
              </span>
            </div>
          </h2>
        </div>
      </div>
      {promptsLoading ? (
        <h1 className="text-2xl text-center ">Loading...</h1>
      ) : (
        <>
          <div className="flex gap-4 my-4">
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

            <PromptEditor
              name="summary-for-specific-jd"
              title="Summary (Job Description)"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
            {/* Primary Skills Generator */}
          </div>

          <div className="flex gap-4 my-4">
            <PromptEditor
              name="oneLineSlogan"
              title="One Line Slogan"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            {/* Job Description Simple Generator */}
            <PromptEditor
              name="jdSingle"
              title="Job Description Generator (for rewriting work experience)"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>

          <div className="flex gap-4 my-4">
            {/* Job Description Quantifying Generator */}
            <PromptEditor
              name="QuantifyingjdSingle"
              title="Job Description Generator (for quantifying work experience)"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
            <PromptEditor
              name="writePublicationSingle"
              title="Publication Generator"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>
          <div className="flex gap-4 my-4">
            <PromptEditor
              name="primarySkills"
              title="Primary skills"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            <PromptEditor
              name="primarySkills-for-specific-jd"
              title="Primary skills for job description"
              type="resume"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ResumePromptsConfiguration;
