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
    axios.get("/api/prompts?type=biography").then((res) => {
      setPromptsLoading(false);
      setPrompts(res.data.result);
    });
  }, []);
  const handleSave =async (name: string, val: string) => {
    if (name) {
      setUpdating(name);
      await axios.post("/api/prompts", {
        type: "biography",
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
              <span className="text-semibold text-lg">
                Biography Prompts Configuration
              </span>
            </div>
          </h2>
        </div>
      </div>
      {promptsLoading ? (
        <h1 className="text-center text-2xl ">Loading...</h1>
      ) : (
        <>
          <div className="flex gap-4 mt-3">
            <PromptEditor
              name="biographyWriter"
              title="Biography Prompt"
              type="biography"
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
