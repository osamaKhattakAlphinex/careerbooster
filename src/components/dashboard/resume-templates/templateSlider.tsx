"use client";
import { crownIcon } from "@/helpers/iconsProvider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Template } from ".";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  templates: Template[];
  size?: number[];
};

const TemplateSlider = ({ templates, size }: Props) => {
  const params = useSearchParams();

  const [activeTemplate, setActiveTemplate] = useState<number>(0);

  const templateId: number = parseInt(params.get("templateId") || "0");
  useEffect(() => {
    if (templateId) {
      const activeIndex = templates.findIndex(
        (template) => template.id == templateId
      );

      if (activeIndex !== -1) {
        setActiveTemplate(activeIndex);
      }
    }
  }, [templateId]);

  return (
    <div className="box-border flex flex-row flex-wrap items-start justify-start gap-6 p-4 ">
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        rewind={true}
        speed={1200}
        navigation={true}
        autoplay={{ delay: 8500, disableOnInteraction: false }}
        modules={[Autoplay, Navigation]}
        className=""
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: size ? size[0] : 2,
          },
          425: {
            slidesPerView: size ? size[1] : 2,
          },
          640: {
            slidesPerView: size ? size[3] : 3,
          },
          768: {
            slidesPerView: size ? size[4] : 2,
          },
          1080: {
            slidesPerView: size ? size[5] : 6,
          },
          1280: {
            slidesPerView: size ? size[6] : 6,
          },
        }}
      >
        {templates.map((template, index) => (
          <SwiperSlide
            key={`template-${index}`}
            className={`${
              templateId === index + 1
                ? " border-2 rounded-md p-2 border-indigo-600"
                : " "
            } bg-transparent relative overflow-hidden group h-48 `}
          >
            <Link
              href={`/resume-builder/templates/template?templateId=${template.id}`}
              className="relative"
            >
              <Image
                src={template.preview}
                alt={`template-${index}`}
                width={281}
                height={150}
                className="bg-white "
                style={{ objectFit: "contain", aspectRatio: "auto" }}
              />
              {templateId === index + 1 ? (
                ""
              ) : (
                <div className="absolute top-0 left-0 hidden object-cover w-full h-full overflow-hidden text-white group-hover:grid bg-slate-600/60 place-content-center">
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
              )}

              <div className="text-center h-full w-full absolute inset-0 flex justify-center items-center text-[#000] text-sm font-medium">
                {index === activeTemplate && (
                  <span className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      className="w-8 h-8 text-[#fff]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TemplateSlider;
