"use client";
import React, { useEffect, useState } from "react";
import ResumeTemplate1 from "./templates/template_1";
import ResumeTemplate2 from "./templates/template_2";
import ResumeTemplate3 from "./templates/template_3";
import ResumeTemplate4 from "./templates/template_4";
import ResumeTemplate5 from "./templates/template_5";
import ResumeTemplate6 from "./templates/template_6";
import ResumeTemplate7 from "./templates/template_7";
import ResumeTemplate8 from "./templates/template_8";
import ResumeTemplate9 from "./templates/template_9";
import ResumeTemplate14 from "./templates/template_14";
import ResumeTemplate15 from "./templates/template_15";

import Link from "next/link";
import Image from "next/image";

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

export const ALL_TEMPLATES: Template[] = [
  {
    id: 1,
    title: "classic-executive",
    tags: ["classic-executive"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate1 {...props} />,
  },
  {
    id: 2,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate2 {...props} />,
  },
  {
    id: 3,
    title: "classic-executive",
    tags: ["classic-executive", "creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate3 {...props} />,
  },
  {
    id: 4,
    title: "",
    tags: ["classic-executive", "one-page"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate4 {...props} />,
  },
  {
    id: 5,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate5 {...props} />,
  },
  {
    id: 6,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate6 {...props} />,
  },
  {
    id: 7,
    title: "",
    tags: ["creative-colorful", "one-page"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate7 {...props} />,
  },
  {
    id: 8,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate8 {...props} />,
  },
  {
    id: 9,
    title: "",
    tags: ["one-page"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 10,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 11,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 12,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 13,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 14,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate14 {...props} />,
  },
  {
    id: 15,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate15 {...props} />,
  },
];

const Templates = ({ props }: any) => {
  const [activeTab, setActiveTab] = useState<Tabs>(tabs[0]);
  const [templates, setTemplates] = useState<Template[]>(ALL_TEMPLATES);
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
    filterTemplates();
  }, [activeTab]);

  return (
    <div className="ml-[234px] ">
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
            <Link
              className=""
              href={{
                pathname: "/resume-builder/templates/template",
                query: {
                  templateId: template.id,
                },
              }}
            >
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
