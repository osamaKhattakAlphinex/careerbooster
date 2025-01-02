import Image from "next/image";
import React from "react";

function page() {
  return (
    <main className="mt-14 flex-grow-1 overflow-x-hidden bg-[#000c16] px-8">
      <div className=" min-h-[926px] bg-[#021220] rounded-[25px] mt-[7rem]  flex items-center w-full px-8 gap-10">
        <div className="w-5/12 bg-[#0e152e] rounded-2xl flex flex-col gap-4  pt-8">
          {/* <img
            src="/bg/logo.svg"
            alt="CareerBooster.ai Logo"
            className="h-10 my-6 text-center "
          /> */}
          <Image
            width={276}
            height={54}
            src="/bg/logo.svg"
            alt="CareerBooster.ai Logo"
            className="text-center mx-auto my-8"
          />
          <Image
            width={355}
            height={540}
            src="/bg/contact-bot.jpg"
            alt="contact"
            className="rounded-bl-2xl mt-8"
          />
        </div>
        <div className="flex flex-col items-center w-7/12 ">
          <h1 className="text-center text-white text-[22px] font-semibold font-['Outfit'] uppercase leading-tight tracking-wide pb-10">
            Love to hear from you!
          </h1>

          <form action="" className="flex flex-col gap-8 ">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="name"
                className="opacity-80 text-white text-base font-medium font-['Outfit'] leading-none"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="w-[530px] h-[58px] opacity-40 text-white text-base font-normal font-['Outfit'] leading-none rounded-lg border border-[#3d4d59] placeholder:opacity-40 placeholder:text-white placeholder:text-base placeholder:font-normal placeholder:font-['Outfit']  pl-4"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label
                htmlFor="email"
                className="opacity-80 text-white text-base font-medium font-['Outfit'] leading-none"
              >
                Email
              </label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="w-[530px] h-[58px] opacity-40 text-white text-base font-normal font-['Outfit'] leading-none rounded-lg border border-[#3d4d59] placeholder:opacity-40 placeholder:text-white placeholder:text-base placeholder:font-normal placeholder:font-['Outfit']  pl-4"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label
                htmlFor="phone"
                className="opacity-80 text-white text-base font-medium font-['Outfit'] leading-none"
              >
                Phone
              </label>
              <input
                name="phone"
                type="number"
                placeholder="Phone"
                className="w-[530px] h-[58px] opacity-40 text-white text-base font-normal font-['Outfit'] leading-none rounded-lg border border-[#3d4d59] placeholder:opacity-40 placeholder:text-white placeholder:text-base placeholder:font-normal placeholder:font-['Outfit']  px-4"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label
                htmlFor="phone"
                className="opacity-80 text-white text-base font-medium font-['Outfit'] leading-none"
              >
                Message
              </label>
              <textarea
                name="message"
                cols={4}
                placeholder="Your Message..."
                className="w-[530px] h-[120px] opacity-40 text-white text-base font-normal font-['Outfit'] leading-none rounded-lg border border-[#3d4d59] placeholder:opacity-40 placeholder:text-white placeholder:text-base placeholder:font-normal placeholder:font-['Outfit']  pl-4 pt-5"
              />
            </div>
            <div className="w-[530px] h-20 bg-white/10 rounded-lg shadow-[0px_0px_30px_0px_rgba(0,0,0,0.04)]  flex items-center justify-between px-8">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-[27px] h-[27px] rounded border border-[#3c5a74]"
                />
                <h3 className="text-white text-base font-normal font-['Outfit'] leading-none">
                  I am not a Robot
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <svg
                  width="36"
                  height="34"
                  viewBox="0 0 36 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 289600">
                    <path
                      id="Vector"
                      d="M35.57 17.8365L32.6925 21.3145L30.503 23.9606L29.4928 22.7345L27.7194 20.5858L27.538 20.3637L25.4486 17.8365H27.8883C27.8899 16.7858 27.7284 15.7412 27.4097 14.74C26.9136 13.2112 26.0623 11.8217 24.9255 10.6854C23.7886 9.54912 22.3987 8.69844 20.8696 8.20308C20.6851 8.14366 20.4943 8.09048 20.3066 8.04044L20.5256 7.85903L22.6743 6.08561L23.8973 5.07223L21.2544 2.88281C24.6306 3.66581 27.6417 5.57007 29.7964 8.28479C31.951 10.9995 33.1218 14.3644 33.1178 17.8302L35.57 17.8365Z"
                      fill="#145CB2"
                    />
                    <path
                      id="Vector_2"
                      d="M23.9063 5.07318L22.6834 6.08657L20.5346 7.85999L20.3157 8.0414L17.7853 10.1307V7.7255C16.7346 7.72388 15.69 7.88531 14.6889 8.20404C13.1606 8.70027 11.7716 9.5513 10.6354 10.6875C9.49919 11.8237 8.64817 13.2127 8.15193 14.741C8.09563 14.9193 8.04247 15.0944 7.99868 15.2758L7.82664 15.0694L6.04385 12.9113L5.05547 11.7134L2.82227 14.4188C3.02353 13.5449 3.2998 12.69 3.64799 11.8635C4.81848 9.08104 6.78457 6.7062 9.29963 5.03691C11.8147 3.36762 14.7667 2.47822 17.7853 2.48029V0L21.2634 2.87439L23.9063 5.07318Z"
                      fill="#158AE3"
                    />
                    <path
                      id="Vector_3"
                      d="M17.7843 27.947V33.1797C15.7685 33.1822 13.772 32.7869 11.9092 32.0167C10.0464 31.2464 8.35384 30.1162 6.92847 28.6908C5.50309 27.2655 4.37292 25.5729 3.60266 23.7101C2.83239 21.8473 2.43718 19.8508 2.43965 17.835H0L2.81496 14.4164L5.04816 11.7109L6.03654 12.9089L7.81933 15.067L7.99137 15.2734L10.1057 17.835H7.66921C7.66864 18.8859 7.83115 19.9305 8.15089 20.9315C8.64712 22.4598 9.49814 23.8488 10.6343 24.985C11.7705 26.1212 13.1596 26.9722 14.6878 27.4684C15.689 27.7872 16.7336 27.9486 17.7843 27.947Z"
                      fill="#C4C4C4"
                    />
                  </g>
                </svg>
                <h4 className="opacity-70 text-white text-[9px] font-normal font-['Outfit'] leading-[9px] tracking-tight">
                  ReCAPTCHA
                </h4>
              </div>
            </div>
            <button className="w-[292px] h-14 px-[35px] py-[18px] bg-[#2797f2] rounded-[32px] justify-center items-center gap-2.5 inline-flex text-center text-white text-lg  font-['Outfit'] leading-[18px] mx-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default page;
