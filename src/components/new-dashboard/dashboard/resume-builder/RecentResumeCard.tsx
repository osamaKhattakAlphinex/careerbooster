import { searchIcon } from "@/helpers/iconsProvider";
import SingleRecentResumeCard from "./SingleRecentResumeCard";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper/core";
SwiperCore.use([Pagination]);

const RecentResumeCard = ({
  source = "",
  componentRef,
}: {
  source?: string;
  componentRef?: any;
}) => {
  // redux
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;

  return (
    <>
      <div className="text-white bg-[#18181B] rounded-[20px]  mb-7 px-4 md:px-[24px] pt-[35px] pb-[25px] ">
        <div className="flex justify-between items-center  ">
          <h1 className="uppercase font-semibold text-[16px] md:text-sm">
            Your Resumes
          </h1>
          <div className="relative lg:w-[213px] w-[120px]">
            <input
              className="w-full pl-4 lg:h-[38px] lg:py-[8px] py-[6px] placeholder:text-[#5B5B5B] rounded-full border border-[#312E37] placeholder-gray-400 text-white lg:text-[14px] text-[10px] focus:outline-none focus:border-zinc-600 bg-transparent"
              type="text"
              placeholder="Search here"
            />
            <div className="absolute inset-y-0 right-3   items-center lg:flex hidden">
              {searchIcon}
            </div>
          </div>
        </div>
        {!resumes && <p>Loading Resumes...</p>}
        {/* <div className="flex flex-wrap lg:flex-row flex-col  gap-4"> */}
        <div className="flex flex-row">
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
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      {/* <GenerateResume /> */}
    </>
  );
};

export default RecentResumeCard;
