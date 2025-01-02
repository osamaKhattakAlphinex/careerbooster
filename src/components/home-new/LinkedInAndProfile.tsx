import Image from "next/image";
import React from "react";

function LinkedInAndProfile() {
  return (
    <div className="h-[625px] px-6 py-14  opacity-95 bg-[#0a1620]">
      <div className="w-full flex items-center gap-10">
        <div className="w-1/2">
          <Image
            width={550}
            height={505}
            src="/bg/linkedin-avatar.png"
            alt="linkedin avatar"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-6">
          <div className="w-[467px] text-white/90 text-[32px] font-medium font-['Outfit'] leading-[50px]">
            Free 1-on-1 Resume & LinkedIn Profile Review{" "}
          </div>
          <div className="w-[479px] opacity-80 text-white text-base  font-['Outfit'] leading-[30px] ">
            Receive personalized feedback to elevate your resume and unlock the
            full potential of your LinkedIn profile. Our experts provide direct,
            actionable advice to help you craft a standout profile that captures
            attention.
          </div>
          <div className="text-[#2797f2] text-lg  font-['Outfit'] leading-[18px] tracking-wide mt-2">
            Schedule a Free Zoom Consultation
          </div>
          <div className="h-14 w-fit px-[30px] py-[18px] bg-[#2797f2] rounded-[32px] justify-center items-center inline-flex mt-2">
            <div className="justify-start items-center gap-2.5 flex">
              <Image
                width={23}
                height={13}
                src="/bg/camera.svg"
                alt="linkedin avatar"
              />

              <div className="w-[85px]  text-center text-white text-lg font-['Outfit'] leading-[18px] ">
                Book Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedInAndProfile;
