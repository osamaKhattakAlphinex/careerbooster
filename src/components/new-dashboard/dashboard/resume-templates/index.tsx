"use client";

import React, { useEffect, useRef, useState } from "react";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { crownIcon } from "@/helpers/newIconsProviders";
import { chevronRight } from "@/helpers/iconsProvider";

import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import TemplateSlider from "./templateSlider";
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
    <div className="ml-0 lg:ml-[234px]  ">
      <div className="p-4 flex flex-row justify-center items-center gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm rounded-full border border-gray-600 ${
              activeTab.tab === tab.tab ? "dark:bg-black text-white" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className=" text-center "> {activeTab.description}</div>
      <TemplateSlider templates={templates} />
    </div>
  );
};

export default Templates;
