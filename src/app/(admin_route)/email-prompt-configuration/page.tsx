"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PromptEditor from "@/components/admin/prompt-editor/PromptEditor";
import { Prompt } from "../biography-prompts-configuration/page";

const PersonalizedEmailPromptsConfiguration = () => {
  const [promptsLoading, setPromptsLoading] = useState<boolean>(true);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [updating, setUpdating] = useState<string>("");

  useEffect(() => {
    setPromptsLoading(true);
    // get all prompts
    axios.get("/api/prompts?type=email").then((res) => {
      setPromptsLoading(false);

      setPrompts(res.data.result);
    });
  }, []);

  const handleSave =async (name: string, val: string) => {
    if (name) {
      setUpdating(name);
      await axios.post("/api/prompts", {
        type: "email",
        name: name,
        value: val,
        active: true,
      });
      setUpdating("");
    }
  };
  return (
    <div className="">
      
      <div className="flex gap-4">
        <div className="flex w-full">
          <h2 className="text-lg">
            <div className="flex flex-row gap-2 mb-3">
              <span className="text-semibold">
                Personalized Email Prompt Configuration
              </span>
            </div>
          </h2>
        </div>
      </div>
      {promptsLoading ? (
        <h1 className="text-2xl text-center ">Loading...</h1>
      ) : (
        <>
          <div className="flex gap-4">
            <PromptEditor
              name="emailWriter"
              title="Personalized Email Prompt"
              type="email"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
            <PromptEditor
              name="emailWriterFirstFollowUp"
              title="Personalized Email First Follow Up Prompt"
              type="email"
              prompts={prompts}
              promptsLoading={promptsLoading}
              handleSave={handleSave}
              updating={updating}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <PromptEditor
              name="emailWriterSecondFollowUp"
              title="Personalized Email Second Follow Up Prompt"
              type="email"
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

export default PersonalizedEmailPromptsConfiguration;
