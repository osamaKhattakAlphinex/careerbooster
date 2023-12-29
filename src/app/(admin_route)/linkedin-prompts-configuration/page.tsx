"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PromptEditor from "@/components/admin/linkedin-prompts/PromptEditor";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";

const LinkedInPromptsConfiguration = () => {
  const [promptsLoading, setPromptsLoading] = useState<boolean>(true);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [updating, setUpdating] = useState<string>("");

  useEffect(() => {
    setPromptsLoading(true);
    // get all prompts
    axios.get("/api/prompts?type=linkedin").then((res) => {
      setPromptsLoading(false);
      setPrompts(res.data.result);
    });
  }, []);
  const handleSave = (name: string, val: string) => {
    if (name) {
      setUpdating(name);
      axios
        .post("/api/prompts", {
          type: "linkedin",
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
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>
      </div> */}
      <div className="flex gap-4 mb-3">
        <div className="w-full flex">
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
                LinkedIn Prompts Configuration
              </span>
            </div>
          </h2>
        </div>
      </div>
      {promptsLoading ? (
        <h1 className="text-center text-2xl ">Loading...</h1>
      ) : (
        <>
          <div className="flex gap-4 lg:!flex-row flex-col ">
            {/* Keywords Genrator Card */}
            <PromptEditor
              name="keyword"
              title="Keywords Generator"
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            {/* Headline Generator Card */}
            <PromptEditor
              name="headline"
              title="Headline Generator"
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>

          <div className="flex gap-4 lg:!flex-row flex-col">
            {/* About Generator */}
            <PromptEditor
              name="about"
              title="About Generator"
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            {/* Job Description Generator */}
            <PromptEditor
              name="jobDescription"
              title="Job Description Generator (for individual job)"
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>

          <div className="flex gap-4 lg:!flex-row flex-col">
            <PromptEditor
              name="headline"
              title="Headline Prompt"
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            <PromptEditor
              name="aboutdefault"
              title="About Prompt"
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>
          <div className="flex gap-4 lg:!flex-row flex-col">
            <PromptEditor
              name="aboutPersona"
              title="About Prompt (Persona)"
              type="linkedinTool"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            <PromptEditor
              name="aboutShort"
              title="About Prompt (Short)"
              type="linkedinTool"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>
          <div className="flex gap-4 lg:!flex-row flex-col">
            <PromptEditor
              name="aboutInstructions"
              title="About Prompt (Instructions)"
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
            <PromptEditor
              name="aboutStory"
              title="About Prompt (Story)"
              type="linkedinTool"
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

export default LinkedInPromptsConfiguration;
