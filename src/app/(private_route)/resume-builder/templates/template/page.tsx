"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const Template = () => {
  const params = useSearchParams();

  const templateId = params.get("templateId");

  console.log(templateId);

  return <div>{templateId}</div>;
};

export default Template;
