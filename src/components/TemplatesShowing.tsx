"use client";

import React, { useEffect, useRef, useState } from "react";

import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import ResumeTemplateSlider from "./ResumeTemplateSlider";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";
import { setResume } from "@/store/resumeSlice";
import { useSession } from "next-auth/react";
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
        tab: "creative-colorful",
        description:
            "Unleash your creativity with vibrant designs, ideal for professions that value innovation and originality",
        title: "Creative/Colorful",
    },
    {
        tab: "one-page",
        description:
            "A concise and impactful format for those looking to present their career succinctly, perfect for time-conscious industries",
        title: "One Page",
    },
];

const TemplatesShowing = () => {
    const [activeTab, setActiveTab] = useState<Tabs>(tabs[0]);


    const [templates, setTemplates] = useState<Template[]>([]);
    const [showResume, setShowResume] = useState<boolean>(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
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
        console.log("templates")
    }, [templates]);
    useEffect(() => {
        setTemplates(ALL_TEMPLATES);
    }, [])
    useEffect(() => {
        filterTemplates();
    }, [activeTab]);




    return (

        <div className="ml-0   ">
            {!showResume ? (
                <>
                    <div className="p-4 flex flex-row justify-center items-center gap-2">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 text-sm rounded-full border border-gray-600 text-[#000] ${activeTab.tab === tab.tab ? "dark:bg-black text-white" : ""
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    <div className=" text-center  text-[#000]"> {activeTab.description}</div>
                    {templates && !showResume &&

                        <ResumeTemplateSlider templates={templates} setShowResume={setShowResume} setSelectedTemplate={setSelectedTemplate} />
                    }
                </>
            ) :
                <div className="p-4 flex flex-col justify-start items-center gap-2">
                    <button onClick={() => setShowResume(false)} className="text-[#000]">
                        - Select Template
                    </button>
                    {selectedTemplate && (
                        <PreviewResume selectedTemplate={selectedTemplate} />
                    )}
                </div>
            }
        </div>
    );
};

export default TemplatesShowing;
