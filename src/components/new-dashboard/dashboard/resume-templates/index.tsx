"use client";

import React, { useEffect, useState } from "react";

import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { crownIcon } from "@/helpers/newIconsProviders";
import { chevronRight } from "@/helpers/iconsProvider";

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

  const nextBtn = useRef<any>(null);
  const prevBtn = useRef<any>(null);
  const swiper = useRef<any>(null);

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

  useEffect(() => {
    if (swiper) {
      console.log(swiper);
      // swiper.params.navigation.prevel = prevref.current;
      // swiper.params.navigation.nextel = nextref.current;
      // swiper.navigation.init();
      // swiper.navigation.update();
    }
  }, []);

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
        <Swiper
          ref={swiper}
          slidesPerView={5}
          spaceBetween={10}
          rewind={true}
          speed={1200}
          navigation={{
            prevEl: prevBtn?.current,
            nextEl: nextBtn?.current,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay, Navigation]}
          className=""
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1080: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex-1"></div>
            <div className="self-end">
              <button
                ref={prevBtn}
                className=" p-2 bg-black text-white rotate-180 hover:bg-white hover:text-black"
              >
                {chevronRight}
              </button>
              <button
                ref={nextBtn}
                className=" p-2 bg-black text-white hover:bg-white hover:text-black"
              >
                {chevronRight}
              </button>
            </div>
          </div>

          {templates.map((template, index) => (
            <SwiperSlide key={`template-${index}`}>
              <div className="box-border group relative rounded-lg overflow-hidden">
                {template.category === "premium" && (
                  <div className="absolute rounded-full right-1 top-1 h-10 w-10 grid place-content-center bg-yellow-600">
                    {crownIcon}
                  </div>
                )}
                <button
                  className=""
                  onClick={() => handleViewTemplate(template)}
                >
                  <div className=" object-cover group-hover:grid hidden bg-slate-600/60 text-white  absolute top-0 left-0 h-full w-full rounded-lg  overflow-hidden  place-content-center">
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
                    height={350}
                    width={200}
                    className="bg-white h-full w-full"
                  />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Templates;
