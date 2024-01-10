"use client";
import { crownIcon } from "@/helpers/newIconsProviders";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Template } from "./TemplatesShowing";

type Props = {
    templates: Template[];
    setShowResume: any
    setSelectedTemplate: any
};

const ResumeTemplateSlider = ({ templates, setShowResume, setSelectedTemplate }: Props) => {
    const params = useSearchParams();
    const templateId: number = parseInt(params.get("templateId") || "0");

    return (
        <div className="p-4 flex flex-row items-center justify-center gap-8 flex-wrap box-border h-[80vh] overflow-y-auto ">
            {templates.map((template, index) => (
                <div
                    key={`template-${index}`}
                    className={`${templateId === index + 1 ? " border-2 p-2 border-indigo-600" : ""
                        } bg-transparent relative overflow-hidden group h-48 w-4/12`}
                >
                    <button onClick={() => {
                        setShowResume(true)
                        setSelectedTemplate(template)
                    }}>
                        <Image
                            src={template.preview}
                            alt={`template-${index}`}
                            width={150}
                            height={250}
                            className="bg-white"
                            style={{ objectFit: "contain", aspectRatio: "auto" }}
                        />
                        <div className="object-cover group-hover:grid hidden bg-slate-600/60 text-white absolute top-0 left-0 h-full w-full rounded-lg overflow-hidden place-content-center">
                            {template.category === "premium" && (
                                <div className="absolute rounded-full right-1 top-1 h-6 w-6 grid place-content-center bg-yellow-600">
                                    {crownIcon}
                                </div>
                            )}
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
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ResumeTemplateSlider;