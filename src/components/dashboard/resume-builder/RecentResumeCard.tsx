"use client";
import SingleRecentResumeCard from "./SingleRecentResumeCard";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper/core";
import { infoSmallIcon } from "@/helpers/iconsProvider";
SwiperCore.use([Pagination]);

const RecentResumeCard = ({
  source = "",
  componentRef,
  setFinished,
  templateId,
}: {
  source?: string;
  componentRef?: any;
  setFinished?: any;
  templateId?: number;
}) => {
  // redux
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;
  return (
    <>
      <div className="dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 rounded-[20px]  mb-4 px-4 md:px-[24px] pt-[20px] pb-[20px] ">
        <div className="flex justify-between items-center ">
          <h1 className=" flex gap-2 font-semibold text-[16px] md:text-sm">
            YOUR RESUMES
            <div className="group cursor-pointer relative inset-0">
              {infoSmallIcon}
              <div className="w-36 md:w-40  bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:left-1 md:left-3.5 xs:-top-12  md:-top-[60px]  hidden group-hover:block md:rounded-bl-none xs:rounded-bl-none  text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                The different resumes you create will be saved here.
              </div>
            </div>
          </h1>

          {/* <div className="relative lg:w-[213px] w-[120px]">
            <input
              className="w-full pl-4 lg:h-[38px] lg:py-[8px] py-[6px] placeholder:text-[#5B5B5B] rounded-full border-[1px] border-[#312E37] placeholder-gray-400 text-white lg:text-[14px] text-[10px] focus:outline-none focus:border-zinc-600 bg-transparent"
              type="text"
              placeholder="Search here"
            />
            <div className="absolute inset-y-0 right-3   items-center lg:flex hidden">
              {searchIcon}
            </div>
          </div> */}
        </div>
        {!resumes && <p>Loading Resumes...</p>}
        {/* <div className="flex flex-wrap lg:flex-row flex-col  gap-4"> */}
        <div className="flex flex-row ">
          <Swiper
            slidesPerView={3}
            spaceBetween={15}
            navigation={true}
            modules={[Navigation]}
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
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            {resumes &&
              resumes.map((resume: any) => (
                <SwiperSlide key={resume.id}>
                  <SingleRecentResumeCard
                    key={resume.id}
                    resume={resume}
                    source={source}
                    componentRef={componentRef}
                    setFinished={setFinished}
                    templateId={templateId}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default RecentResumeCard;
