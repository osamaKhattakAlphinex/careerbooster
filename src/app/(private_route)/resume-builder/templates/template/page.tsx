"use client";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import RecentResumeCard from "@/components/new-dashboard/dashboard/resume-builder/RecentResumeCard";
import { useSelector } from "react-redux";
import { crownIcon } from "@/helpers/newIconsProviders";
import UpgradeModal from "@/components/upgradeModal";
import TemplateSlider from "@/components/new-dashboard/dashboard/resume-templates/templateSlider";

const Template = () => {
  const params = useSearchParams();
  const { resume } = useSelector((state: any) => state);
  const [openUpgradeModal, setOpenUpgradModal] = useState<boolean>(false);

  const templateId: number = parseInt(params.get("templateId") || "0");
  const componentRef = useRef(null);

  return (
    <div className="lg:ml-[234px] ml-0 px-[15px]">
      {/* <UpgradeModal
        openUpgradationModal={openUpgradeModal}
        setOpenUpgradationModal={setOpenUpgradModal}
      /> */}
      <RecentResumeCard componentRef={componentRef} templateId={templateId} />
      <div>
        <h2 className=" text-gray-900 dark:text-white font-bold uppercase text-sm">
          Templates Designs
        </h2>
        <TemplateSlider templates={ALL_TEMPLATES} />
      </div>
      <div className="my-10">
        {resume &&
          (resume?.name || resume?.contact?.email || resume?.summary) && (
            <div className="relative">
              {ALL_TEMPLATES[templateId - 1].category === "premium" && (
                <div className="absolute rounded-full right-1 top-1 h-10 w-10 grid place-content-center bg-yellow-600">
                  {crownIcon}
                </div>
              )}

              <div ref={componentRef} className=" bg-white">
                {ALL_TEMPLATES[templateId - 1].template({})}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Template;
