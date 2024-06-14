"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PromptEditor from "@/components/admin/linkedin-prompts/PromptEditor";

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
  const handleSave =async (name: string, val: string) => {
    if (name) {
      setUpdating(name);
      await axios.post("/api/prompts", {
        type: "linkedin",
        name: name,
        value: val,
        active: true,
      });

      setUpdating("");
    }
  };
  return (
    <div className="">
     
      <div className="flex gap-4 mb-3">
        <div className="w-full flex">
          <h2 className="text-lg">
            <div className="flex flex-row gap-2">
             
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

          <h2>For Frontend Tool (Without Signed In)</h2>

          <div className="flex gap-4 lg:!flex-row flex-col">
            <PromptEditor
              name="aboutInstructions"
              title="About Prompt Default"
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
            <PromptEditor
              name="aboutStory"
              title="About Prompt (Story)"
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
              type="linkedin"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />

            <PromptEditor
              name="aboutShort"
              title="About Prompt (Short)"
              type="linkedin"
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
