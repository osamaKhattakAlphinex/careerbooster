"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Tabs = {
  tab: string;
  title: string;
  description: string;
};

const tabs: Tabs[] = [
  {
    tab: "all-templates",
    description:
      "All templates An excellent choice for those with an extensive work history and clear career trajectory",
    title: "All Templates",
  },
  {
    tab: "classic-executive",
    description:
      " classic exective An excellent choice for those with an extensive work history and clear career trajectory",
    title: "Classic Executive",
  },
  {
    tab: "creative-colorful",
    description:
      "Cretaeive Colorfull An excellent choice for those with an extensive work history and clear career trajectory",
    title: "Creative/Colorful",
  },
  {
    tab: "one-page",
    description:
      " One Page An excellent choice for those with an extensive work history and clear career trajectory",
    title: "One Page",
  },
];

const TemplatePreviews = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(tabs[0]);
  const templates = [
    { prviewImage: "/assets/images/templates/resume-1.png", templateId: "1" },
    { prviewImage: "/assets/images/templates/resume-2.png", templateId: "2" },
    { prviewImage: "/assets/images/templates/resume-1.png", templateId: "3" },
    { prviewImage: "/assets/images/templates/resume-2.png", templateId: "4" },
    { prviewImage: "/assets/images/templates/resume-2.png", templateId: "5" },
    { prviewImage: "/assets/images/templates/resume-2.png", templateId: "6" },
  ];

  return (
    <div className="ml-[234px] ">
      <div className="p-4 flex flex-row justify-center items-center gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className="px-4 py-2 text-sm rounded-full border border-gray-600"
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
                  templateId: template.templateId,
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
                src={template.prviewImage}
                alt={`template-${index}`}
                height={400}
                width={300}
              />
            </Link>

            {/* <div className="flex  bg-white flex-col justify-start  p-2">
            <div className=" flex flex-row justify-between items-center">
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-sm">Full Name</h1>
                <h2 className="text-xs">Headline</h2>
              </div>
              <div className="h-8 w-8 bg-black aspect-square rounded-full grid place-content-center">
                <span className="text-white text-xs">NA</span>
              </div>
            </div>
            <div className="grid grid-cols-12">
            <div className=" col-span-4"></div>
            <div className=" col-span-8"></div>
            </div>
          </div>*/}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePreviews;
