"use client";
import { crownIcon } from "@/helpers/newIconsProviders";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Template } from ".";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  templates: Template[];
};

const TemplateSlider = ({ templates }: Props) => {
  const params = useSearchParams();
  const templateId: number = parseInt(params.get("templateId") || "0");

  return (
    <div className="p-4 flex flex-row items-start justify-start gap-6 flex-wrap box-border">
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
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          },
          1080: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {templates.map((template, index) => (
          <SwiperSlide
            key={`template-${index}`}
            className={`${
              templateId === index + 1
                ? " border-2 rounded-md p-2 border-indigo-600"
                : ""
            } bg-transparent relative overflow-hidden group h-48 `}
          >
            <Link
              href={`/resume-builder/templates/template?templateId=${template.id}`}
              className="relative"
            >
              <Image
                src={template.preview}
                alt={`template-${index}`}
                width={250}
                height={150}
                className="bg-white "
                style={{ objectFit: "contain", aspectRatio: "auto" }}
              />
              {templateId === index + 1 ? (
                ""
              ) : (
                <div className=" object-cover group-hover:grid hidden bg-slate-600/60 text-white  absolute top-0 left-0 h-full w-full  overflow-hidden  place-content-center">
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
              )}

              <div className="text-center h-full w-full border-2 absolute inset-0 flex justify-center items-center text-[#000] text-sm font-medium">
                {templateId === index + 1 && (
                  <span className="flex justify-center items-center w-12 h-12 bg-blue-600 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3.5"
                      stroke="currentColor"
                      className="w-8 h-8 text-[#fff]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
