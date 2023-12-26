"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import iconOfPackageBadge from "@/../public/icon/crown.svg";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { crownIcon } from "@/helpers/newIconsProviders";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
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
      "An excellent choice for those with an extensive work history and clear career trajectory",
    title: "All Templates",
  },
  {
    tab: "classic-executive",
    description:
      "An excellent choice for those with an extensive work history and clear career trajectory",
    title: "Classic Executive",
  },
  {
    tab: "creative-colorful",
    description:
      "An excellent choice for those with an extensive work history and clear career trajectory",
    title: "Creative/Colorful",
  },
  {
    tab: "one-page",
    description:
      "An excellent choice for those with an extensive work history and clear career trajectory",
    title: "One Page",
  },
];

const Templates = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(tabs[0]);
  const [templates, setTemplates] = useState<Template[]>(ALL_TEMPLATES);

  const userData = useSelector((state: any) => state.userData);

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

  const router = useRouter();

  const handleViewTemplate = (template: Template) => {
    router.push(`/resume-builder/templates/template?templateId=${template.id}`);
  };

  useEffect(() => {
    filterTemplates();
  }, [activeTab]);

  return (
    <div className="ml-0 lg:ml-[234px]  ">
      <div className="p-4 flex flex-row justify-center items-center gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm rounded-full border border-gray-600 ${
              activeTab.tab === tab.tab ? "dark:bg-black bg-white" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className=" text-center "> {activeTab.description}</div>

      <div className="p-4 flex flex-row items-start justify-start gap-6 flex-wrap box-border">
        {templates.map((template, index) => (
          <div
            key={`template-${index}`}
            className="box-border group relative rounded-lg overflow-hidden"
          >
            {template.category === "premium" && (
              <div className="absolute rounded-full right-1 top-1 h-10 w-10 grid place-content-center bg-yellow-600">
                {/* <Image
                  src={iconOfPackageBadge}
                  alt="bold icon"
                  height={24}
                  width={24}
                  className=""
                /> */}

                {crownIcon}
              </div>
            )}
            <button className="" onClick={() => handleViewTemplate(template)}>
              <div className=" group-hover:grid hidden bg-slate-600/60 text-white  absolute top-0 left-0 h-full w-full rounded-lg  overflow-hidden  place-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </div>
              <Image
                src={template.preview}
                alt={`template-${index}`}
                height={400}
                width={300}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
