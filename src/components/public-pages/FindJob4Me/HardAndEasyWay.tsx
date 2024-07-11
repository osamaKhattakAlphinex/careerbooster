import { Montserrat } from "next/font/google";
import React from "react";
const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
function HardAndEasyWay() {
  return (
    <div className="flex md:flex-row xs:flex-col justify-center md:p-4 w-full gap-4 md:px-14 xs:px-2 mt-20">
      {/* The Hard Work Way */}
      <div className="flex flex-col w-full">
        <div
          className={`p-4 text-center font-bold ${montserrat_r.className} md:text-[23px] xs:text-[18px] !font-extrabold`}
        >
          The Hard Work Way
        </div>
        <div className=" text-black">
          <div className="flex flex-col items-center">
            <div className="flex items-center xs:p-2 md:p-4 bg-white xs:rounded-3xl md:rounded-full">
              <span className="text-red-700">✘</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                <strong>Estimated Time to First Interview 6 months.</strong>
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>
            <div className="flex items-center xs:p-2 md:p-4 bg-[#E4ECF2] xs:rounded-3xl md:rounded-full">
              <span className="text-red-700">✘</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Spend <strong>33 hours</strong> finding 100 jobs a month. (20
                minutes each job)
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>

            <div className="flex items-center xs:p-2 md:p-4 bg-white xs:rounded-3xl md:rounded-full">
              <span className="text-red-700">✘</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Spend <strong>25 hours</strong> a month submitting 100 job
                applications
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>

            <div className="flex items-center xs:p-2 md:p-4 bg-[#E4ECF2] xs:rounded-3xl md:rounded-full">
              <span className="text-red-700">✘</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Spend <strong>44 hours</strong> sending network messages and new
                connections requests. (2 hours a day)
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>

            <div className="flex items-center xs:p-2 md:p-4 bg-white xs:rounded-3xl md:rounded-full">
              <span className="text-red-700">✘</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                No Access to Unadvertised & Confidential Opportunities
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>

            <div className="flex items-center xs:p-2 md:p-4 bg-[#E4ECF2] xs:rounded-3xl md:rounded-full">
              <span className="text-red-700">✘</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Not using the right search channels or tools
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>
            <span className="inline-block w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black dark:border-t-white"></span>
            <div className="flex items-center xs:p-2 md:p-4 bg-white xs:rounded-3xl md:rounded-full">
              <span className="text-red-700">✘</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Less likelihood of finding your dream job due to limited
                options. You might have to work for a company with a bad
                culture.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Easy Way */}
      <div className="flex flex-col w-full">
        <div
          className={` p-4 text-center font-bold ${montserrat_r.className} md:text-[23px] xs:text-[18px] !font-extrabold`}
        >
          The Easy Way
        </div>
        <div className=" text-black">
          <div className="flex flex-col items-center">
            <div className="flex items-center p-4 bg-yellow-300  xs:rounded-3xl md:rounded-full">
              <span className="text-green-700">✔</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                <strong>Estimated Time to First Interview 30-60 days.</strong>
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>
            <div className="flex items-center xs:p-2 md:p-4 bg-yellow-300  xs:rounded-3xl md:rounded-full">
              <span className="text-green-700">✔</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Spend <strong>0 hours</strong> finding 100 jobs a month. (We do
                it for you)
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>
            <div className="flex items-center xs:p-2 md:p-4 bg-yellow-300 xs:rounded-3xl md:rounded-full">
              <span className="text-green-700">✔</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Spend <strong>0 hours</strong> a month submitting 100 job
                applications. (We do it for you!)
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>
            <div className="flex items-center xs:p-2 md:p-4 bg-yellow-300  xs:rounded-3xl md:rounded-full">
              <span className="text-green-700">✔</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Spend <strong>0 hours</strong> sending network messages and new
                connections requests. (We do it)
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>
            <div className="flex items-center xs:p-2 md:p-4 bg-yellow-300 xs:rounded-3xl md:rounded-full">
              <span className="text-green-700">✔</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Access to Unadvertised & Confidential Opportunities
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>
            <div className="flex items-center xs:p-2 md:p-4 bg-yellow-300  xs:rounded-3xl md:rounded-full">
              <span className="text-green-700">✔</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Leverage the right search channels and tools
              </p>
            </div>
            <span className="w-1 h-8 bg-gray-950 dark:bg-gray-100 mx-4"></span>
            <span className="inline-block w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black dark:border-t-white"></span>
            <div className="flex items-center xs:p-2 md:p-4 bg-yellow-300 xs:rounded-3xl md:rounded-full">
              <span className="text-green-700">✔</span>
              <p
                className={`text-gray-950 ${montserrat_r.className} md:text-[20px] xs:text-[16px] text-center pl-4`}
              >
                Higher likelihood of generating several offers, that way you’re
                not only finding A job, but the RIGHT job.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HardAndEasyWay;
