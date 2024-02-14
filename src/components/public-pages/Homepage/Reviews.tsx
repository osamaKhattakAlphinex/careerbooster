"use client";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import { Pagination, Autoplay } from "swiper/modules";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
const Reviews = () => {
  return (
    <section className="overflow-hidden  pb-10  md:pb-16 xs:pb-4   z-[2000000]  dark:bg-gray-950 bg-gray-100">
      <Fade duration={2000}>
        <div className="mx-auto w-full sm:container xs:max-w-full xs:px-2  ">
          <div className="flex justify-center mb-18">
            <div className="flex flex-col lg:w-9/12 md:w-9/12 xs:w-full">
              <div className="text-center">
                <h1 className="dark:text-gray-100 text-gray-950 md:text-3xl text-xl font-semibold lg:mb-20 md:mb-20 xs:mb-10">
                  <span className="text-[#6a4dff] dark:text-[#e6f85e]">
                    CareerBooster.AI{" "}
                  </span>
                  Received
                  <Image
                    width={48}
                    height={48}
                    src="/assets/images/icons/star.png"
                    alt=""
                    className="m-auto"
                  />{" "}
                  4.8/5 in Over 1,000+ Reviews.
                </h1>
              </div>
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          rewind={true}
          speed={1200}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="xs:!px-4"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1080: {
              slidesPerView: 3,
            },

            1440: {
              slidesPerView: 4,
            },
            1920: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            {" "}
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px]  bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/8.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">John Smith</h6>
                    <p className="mb-0 text-sm">Chief Executive Officer</p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    I was blown away by the results I achieved with
                    CareerBooster.AI. As a CEO, I knew the importance of a
                    strong professional image, but I didn{"'"}t have the time to
                    tailored resume and LinkedIn for each
                    opportunity.CareerBooster.AI
                    {"'"}s AI-powered tools did it effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px] bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/9.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">Sarah Johnson</h6>
                    <p className="mb-0 text-sm">Senior Financial Analyst</p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    CareerBooster.AI helped me optimize my LinkedIn profile with
                    targeted keywords, and I saw a significant increase in
                    recruiter views. The tailored cover letters and AI-generated
                    emails were also gamechangers. I secured my dream job thanks
                    to CareerBooster.AI.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px] bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/3.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">David Thompson</h6>
                    <p className="mb-0 text-sm">VP of Marketing</p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    As a senior marketing executive, I needed a standout resume.
                    CareerBooster.AI not only helped me create one but also
                    ensured it was ATS-compliant. The personalized emails to
                    recruiters saved me time and helped me connect with the
                    right opportunities.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px] bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/6.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">Lisa Martinez</h6>
                    <p className="mb-0 text-sm">Chief Technology Officer</p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    CareerBooster.AI{"'"}s resume review and ATS scanning
                    services were invaluable. It pointed out areas of
                    improvement in my resume that I had overlooked. I can
                    confidently say that CareerBooster.AI played a crucial role
                    in my successful career transition.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px] bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/1.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">Michael Anderson</h6>
                    <p className="mb-0 text-sm">Director of Operations</p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    I was skeptical about AI-powered tools, but CareerBooster.AI
                    exceeded my expectations. It helped me tailor my resume for
                    multiple job applications effortlessly. The personalized
                    cover letters and optimized LinkedIn profile were the icing
                    on the cake.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px] bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/7.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">Jennifer Lewis</h6>
                    <p className="mb-0 text-sm">Senior Legal Counsel</p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    CareerBooster.AI{"'"}s AI-generated emails were a
                    game-changer. They were professional, concise, and grabbed
                    the attention of recruiters. I landed interviews with top
                    law firms, and it was all thanks to CareerBooster.AI.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px] bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/2.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">Robert Turner</h6>
                    <p className="mb-0 text-sm">
                      Chief Human Resources Officer
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    CareerBooster.AI{"'"}s ATS scanning saved me from missing
                    out on opportunities. It ensured my resume got through the
                    initial screening process. This tool is a must-have for
                    senior executives serious about their careers.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px] bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/12.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">Emily Clark</h6>
                    <p className="mb-0 text-sm">Director of Sales</p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    I{"'"}m a firm believer in CareerBooster.AI. It helped me
                    tailor my resume and cover letters for each job, making my
                    applications stand out. If you{"'"}re a senior professional
                    looking to advance your career, CareerBooster.AI is your
                    secret weapon.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-auto">
              <div className=" rounded h-full p-6 border-[1px] bg-gray-100 text-gray-950 border-gray-500 dark:bg-transparent dark:text-gray-100 dark:border-gray-500 border-opacity-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src="/assets/images/review/4.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h6 className=" mb-1">Daniel White</h6>
                    <p className="mb-0 text-sm">Chief Financial Officer</p>
                  </div>
                </div>
                <div className="">
                  <div className=" flex items-center gap-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 14"
                      className="w-4 h-4 text-[#6a4dff] dark:text-[#e6f85e]"
                    >
                      <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
                    </svg>
                  </div>
                  <p className="lg:text-base md:text-base xs:text-sm mb-0">
                    CareerBooster.AI{"'"}s AI-powered services provided the
                    competitive edge I needed in today{"'"}s job market. From
                    personalized emails to resume optimization, It{"'"}s an
                    indispensable tool for senior-level executives.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="review-rolling-carousel-container">
          <div className="swiper review-rolling-carousel">
            <div className="swiper-wrapper rolling-carousel-wrapper"></div>
          </div>
        </div>
      </Fade>
    </section>
  );
};
export default Reviews;
