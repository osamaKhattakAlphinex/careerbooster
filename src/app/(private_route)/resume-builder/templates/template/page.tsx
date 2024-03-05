"use client";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecentResumeCard";
import { useDispatch, useSelector } from "react-redux";
import TemplateSlider from "@/components/dashboard/resume-templates/templateSlider";
import { useSession } from "next-auth/react";
import { setUserData } from "@/store/userDataSlice";
import { setResume } from "@/store/resumeSlice";
import DownloadService from "@/helpers/downloadFile";
import Link from "next/link";

const Template = () => {
  const params = useSearchParams();
  const { resume } = useSelector((state: any) => state);
  const { data: session } = useSession();
  const [refTop, setRefTop] = useState<number | null>(null);
  const [refLeft, setRefLeft] = useState<number | null>(null);
  const [scaleHeight, setScaleHeight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const templateId: number = parseInt(params.get("templateId") || "0");
  const componentRef = useRef<any>(null);
  const dispatch = useDispatch();

  const fetchDefaultResume = async () => {
    const res = await fetch(
      `/api/users/getOneByEmail?email=${session?.user?.email}`
    );

    const { result, success } = await res.json();

    if (success) {
      dispatch(setUserData(result));
      dispatch(setResume(result.resumes[0]));
    }
  };

  useEffect(() => {
    if (!resume.id) {
      fetchDefaultResume();
    }
  }, []);

  useLayoutEffect(() => {
    if (componentRef.current && isMobile) {
      const height = Math.floor(componentRef.current.offsetHeight * 0.5 + 90);
      setScaleHeight(height);
      const refTop = Math.floor(
        (540 / 2275) * componentRef.current.offsetHeight
      );
      setRefTop(refTop);
      const width = Math.floor((175 / 390) * window.innerWidth);
      setRefLeft(width);
    }
  }, [componentRef.current, templateId]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="lg:ml-[234px] ml-0 px-[15px]">
      <RecentResumeCard componentRef={componentRef} templateId={templateId} />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-900 uppercase dark:text-white">
            Templates Designs
          </h2>
          <Link
            href="/resume-builder/templates"
            className="overflow-hidden text-white no-underline rounded-lg"
          >
            <div
              className={` font-bold bg-gradient-to-r w-fit from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] dark:border-gray-950 bg-transparent grid gap-2 text-center py-1 px-2`}
            >
              All Templates1111
            </div>
          </Link>
        </div>
        <TemplateSlider
          templates={ALL_TEMPLATES.filter((template) => template.active)}
        />
      </div>

      <div
        id="outerScaleDiv"
        className="my-10"
        style={{
          height: isMobile ? scaleHeight + "px" : undefined,
        }}
      >
        {resume &&
          (resume?.name || resume?.contact?.email || resume?.summary) && (
            <>
              <div className="flex items-center justify-end md:justify-end gap-3 xs:pb-0 md:pb-4 sticky top-4 z-[35]">
                {/* <Link
                  className="no-underline"
                  href={`/resume-edit?templateId=${templateId}&resumeId=${resume.id}`}
                  target="_blank"
                >
                  <div
                    className={`lg:text-[14px] text-[12px] lg:px-8 px-5 py-2 rounded-full dark:bg-[#18181b] bg-transparent text-green-500 border-[1px] border-green-500`}
                  >
                    Preview Resume
                  </div>
                </Link> */}
                <DownloadService
                  componentRef={componentRef}
                  fileName="ai-resume"
                  preview={true}
                />
                <DownloadService
                  componentRef={componentRef}
                  fileName="ai-resume"
                  preview={false}
                />
              </div>

              <div
                className="xs:relative"
                style={{
                  top: isMobile ? "-" + refTop + "px" : undefined,
                  left: isMobile ? "-" + refLeft + "px" : undefined,
                }}
              >
                <div
                  ref={componentRef}
                  className={` bg-white xs:scale-50 xs:w-[200%] xs:absolute md:relative  md:w-[100%]  w-[100%] md:top-[0px] md:left-[0px] md:scale-100 scale-100`}
                >
                  {ALL_TEMPLATES[templateId - 1].active ? (
                    ALL_TEMPLATES[templateId - 1].template({})
                  ) : (
                    <div className="grid w-full text-gray-700 place-content-center h-28">
                      <span className="block p-4 font-semibold uppercase border">
                        Template is In-Active
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="xs:hidden md:flex justify-end py-3">
                <Link
                  href="/resume-builder/templates"
                  className="overflow-hidden text-white no-underline rounded-lg"
                >
                  <div
                    className={` font-bold bg-gradient-to-r w-fit from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] dark:border-gray-950 bg-transparent grid gap-2 text-center py-1 px-2`}
                  >
                    All Templates
                  </div>
                </Link>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Template;
