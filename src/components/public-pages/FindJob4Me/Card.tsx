import { Montserrat } from "next/font/google";
import React from "react";
const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
function Card() {
  return (
    <>
      <div className="bg-[#E4ECF2] mt-20 rounded-l-3xl rounded-b-3xl md:p-6 xs:p-2 shadow-md flex md:w-[80%] xs:w-[95%] mx-auto dark:text-gray-400 text-gray-700">
        <div className="flex md:flex-row xs:flex-col items-center ">
          <div className="md:w-1/3 xs:w-full flex justify-center items-center">
            <img
              src="/assets/images/screens/image.webp"
              alt="Troy Erstling"
              className="w-[240px] h-[240px] rounded-full mr-4"
            />
          </div>

          <div className="md:text-left xs:text-center md:w-2/3 xs:w-full">
            <p
              className={`text-lg !font-semibold ${montserrat_r.className} md:text-[20px] xs:text-[16px]`}
            >
              {'"'}People often say “looking for a job is a full time job”, and
              that shouldn{"’"}t be the case. It doesn{"’"}t have to be this
              painful of a process.
            </p>
            <p
              className={`mt-4 ${montserrat_r.className} md:text-[20px] xs:text-[16px] `}
            >
              While businesses and solopreneurs often leverage outsourcing and
              Virtual Assistants, I rarely see an individual use a VA to make
              their life easier and free up their time.
            </p>
            <p
              className={`mt-4 ${montserrat_r.className} md:text-[20px] xs:text-[16px] `}
            >
              By outsourcing the work you don{"’"}t enjoy you can focus on doing
              what matters most to land a job. You also have a higher likelihood
              of generating several offers, that way you{"’"}re not only finding
              A job, but the RIGHT job. I think it{"’"}s worth the investment.
              {'"'}
            </p>
            <p
              className={`mt-4 text-blue-600 !font-semibold ${montserrat_r.className} md:text-[20px] xs:text-[16px]`}
            >
              - Troy Erstling, Entrepreneur and Founder of Braingain.
            </p>
          </div>
        </div>
      </div>
      <div className="dark:bg-gray-950 bg-gray-100 w-full mt-20">
        <div className="content text-center md:w-2/3 xs:w-full xs:px-1 md:px-0 mx-auto">
          <h1
            className={`text-[40px] ${montserrat_r.className} !font-bold text-[#188bf6]`}
          >
            Simply Let Us Manage Your Job Search & You Can Avoid Longer
            Unemployment
          </h1>
          <p
            className={`md:text-[20px] xs:px-[16px] ${montserrat_r.className} pt-6`}
          >
            Finding a senior level job can be much easier than you think. Many
            people simply do{"’"}t know the correct steps to take which makes
            them take far longer than they need to. We{"’"}ll do all the hard
            work and smart work for you, and you{"’"}ll find your next job in no
            time.
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
