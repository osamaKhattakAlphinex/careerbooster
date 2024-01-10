"use client";
import React, { useEffect, useRef, useState } from "react";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import ResumeTemplateSlider from "./ResumeTemplateSlider";
import PreviewResume from "./PreviewResume";
export type Template = {
  id: number;
  title: string;
  tags: string[];
  template: (props: any) => React.ReactNode;
  category: "premium" | "freemium";
  preview: string;
};

type Tabs = {
  tab: string;
  title: string;
  description: string;
};

const tabs: Tabs[] = [
  {
    tab: "all-templates",
    description:
      "A comprehensive collection catering to various professional styles and preferences, ensuring there's something for everyone",
    title: "All Templates",
  },
  {
    tab: "classic-executive",
    description:
      "Perfect for showcasing a traditional yet refined professional profile, emphasizing experience and leadership skills",
    title: "Classic Executive",
  },
  {
    tab: "one-page",
    description:
      "A concise and impactful format for those looking to present their career succinctly, perfect for time-conscious industries",
    title: "One Page",
  },
  {
    tab: "creative-colorful",
    description:
      "Unleash your creativity with vibrant designs, ideal for professions that value innovation and originality",
    title: "Creative/Colorful",
  },
];

const TemplatesShowing = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(tabs[0]);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const filterTemplates = () => {
    if (activeTab.tab === "all-templates") {
      setTemplates(ALL_TEMPLATES);
    } else {
      let _templates: Template[] = ALL_TEMPLATES.filter((template) =>
        template.tags.includes(activeTab.tab)
      );
      setTemplates(_templates);
    }
  };
  useEffect(() => {
    setTemplates(ALL_TEMPLATES);
  }, []);
  useEffect(() => {
    filterTemplates();
  }, [activeTab]);

  return (
    <div className="flex">
      <div className="w-4/12 border-r h-[100%]  bg-gray-700">
        <div className=" p-4 flex flex-row flex-wrap items-center gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm rounded-full border border-gray-600  ${
                activeTab.tab === tab.tab ? "dark:bg-black text-white" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className=" text-center "> {activeTab.description}</div>
        {templates.length > 0 && (
          <ResumeTemplateSlider
            templates={templates}
            setSelectedTemplate={setSelectedTemplate}
          />
        )}
      </div>

      <div className="w-8/12 p-4  bg-gray-300 h-screen flex flex-col justify-start items-center gap-2">
        {selectedTemplate && (
          <PreviewResume selectedTemplate={selectedTemplate} />
        )}
      </div>
    </div>
  );
};

export default TemplatesShowing;
