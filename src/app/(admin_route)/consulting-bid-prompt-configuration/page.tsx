"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PromptEditor from "@/components/admin/prompt-editor/PromptEditor";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";

const ConsultingBidPromptsConfiguration = () => {
  const [promptsLoading, setPromptsLoading] = useState<boolean>(true);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [updating, setUpdating] = useState<string>("");

  useEffect(() => {
    setPromptsLoading(true);
    axios.get("/api/prompts?type=bid").then((res) => {
      setPromptsLoading(false);
      setPrompts(res.data.result);
    });
  }, []);
  const handleSave = async (name: string, val: string) => {
    if (name) {
      setUpdating(name);
      await axios.post("/api/prompts", {
        type: "bid",
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
                Consulting Bid Prompt Configuration
              </span>
            </div>
          </h2>
        </div>
      </div>
      {promptsLoading ? (
        <h1 className="text-center text-2xl ">Loading...</h1>
      ) : (
        <>
          <div className="flex gap-4">
            <PromptEditor
              name="consulting"
              title="Consulting Bid Prompt"
              type="bid"
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

export default ConsultingBidPromptsConfiguration;
