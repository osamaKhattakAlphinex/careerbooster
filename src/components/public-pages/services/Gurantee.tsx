import { Fjalla_One, Lato } from "next/font/google";
import Image from "next/image";
import React from "react";
const fjalla_One = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const lato_400 = Lato({
  weight: "400",
  subsets: ["latin"],
});

function Gurantee() {
  return (
    <div className="border border-gray-10 shadow-lg rounded-md md:mx-10 xs:mx-4 lg:px-40 lg:py-20 md:px-10 md:py-10 xs:py-6 flex flex-col  xs:px-2">
      <div className="flex md:flex-row xs:flex-col xs:text-center md:text-left lg:gap-8 md:gap-4">
        <div className="md:w-1/4 xs:w-full xs:hidden md:block">
          <Image
            src="/assets/images/services/gurantee.webp"
            width={140}
            height={224}
            alt="gurantee"
          />
        </div>

        <div className="flex flex-col md:w-3/4 xs:w-full">
          <h1
            className={`lg:text-[44px] md:text-[32px] xs:text-[22px] ${fjalla_One.className}`}
          >
            30-Day Money-Back Guarantee for{" "}
            <span className="w-fit">
              Complete Peace of Mind!
              {/* <hr className="w-1/2 mx-auto" /> */}
            </span>
          </h1>
          <p
            className={`${lato_400.className} lg:text-[20px]  xs:text-[16px] pt-2`}
          >
            We stand behind the quality and effectiveness of our LinkedIn
            Keyword Optimization service with utmost confidence. That's why
            we're offering you an unconditional 30-day satisfaction guarantee.
          </p>
        </div>
      </div>
      <div className="lg:mt-8 md:mt-4">
        <p
          className={`${lato_400.className} lg:text-[20px]  xs:text-[16px] xs:text-center md:text-left`}
        >
          If, for any reason, our service doesn't meet your expectations, simply
          reach out to us at support@careerbooster.ai within 30 days of your
          purchase and we'll process your refund promptly. Our goal is for you
          to feel fully assured and confident in your decision to enhance your
          LinkedIn profile with our expert services. We're committed to your
          satisfaction and back our services with a 100% guarantee.
        </p>
      </div>
    </div>
  );
}

export default Gurantee;
