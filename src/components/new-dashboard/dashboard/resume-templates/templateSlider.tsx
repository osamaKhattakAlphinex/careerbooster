"use client";
import { crownIcon } from "@/helpers/newIconsProviders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Template } from ".";

type Props = {
  templates: Template[];
};

const TemplateSlider = ({ templates }: Props) => {
  const router = useRouter();

  const handleViewTemplate = (template: Template) => {
    router.push(`/resume-builder/templates/template?templateId=${template.id}`);
  };

  return (
    <div className="p-4 flex flex-row items-start justify-start gap-6 flex-wrap box-border">
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        rewind={true}
        speed={1200}
        navigation={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
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
        {templates.map((template, index) => (
          <SwiperSlide key={`template-${index}`} className="h-48 w-48">
            <div className="box-border group relative rounded-lg overflow-hidden">
              {template.category === "premium" && (
                <div className="absolute rounded-full right-1 top-1 h-6 w-6 grid place-content-center bg-yellow-600">
                  {crownIcon}
                </div>
              )}
              <button className="" onClick={() => handleViewTemplate(template)}>
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
                  height={250}
                  width={150}
                  className="bg-white "
                />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TemplateSlider;
