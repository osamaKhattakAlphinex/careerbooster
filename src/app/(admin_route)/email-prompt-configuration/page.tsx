"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PromptEditor from "@/components/admin/linkedin-prompts/PromptEditor";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";

const PersonalizedEmailPromptsConfiguration = () => {
  const [promptsLoading, setPromptsLoading] = useState<boolean>(true);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [updating, setUpdating] = useState<string>("");

  useEffect(() => {
    setPromptsLoading(true);
    // get all prompts
    axios.get("/api/prompts?type=email").then((res) => {
      setPromptsLoading(false);

      setPrompts(res.data.result);
    });
  }, []);

  const handleSave = (name: string, val: string) => {
    if (name) {
      setUpdating(name);
      axios
        .post("/api/prompts", {
          type: "email",
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
      <div className="flex gap-4">
        <div className="flex w-full">
          <h2 className="text-lg">
            <div className="flex flex-row gap-2 mb-3">
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
