"use client";
import { ALL_TEMPLATES } from "@/components/new-dashboard/dashboard/resume-templates";
import { useSearchParams } from "next/navigation";
import React from "react";

const Template = () => {
  const params = useSearchParams();

  const templateId: number = parseInt(params.get("templateId") || "0");

  return (
    <div className="ml-[234px] bg-white">
      {ALL_TEMPLATES[templateId - 1].template({})}
    </div>
  );
};

export default Template;
