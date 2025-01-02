import { Montserrat } from "next/font/google";
import Link from "next/link";
import React from "react";
const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
function FinallySection() {
  return (
    <div className="dark:bg-gray-950 bg-gray-100 w-full mt-20">
      <div className="content text-center md:w-2/3 xs:w-full xs:px-2 md:px-0 mx-auto">
        <h1
          className={`md:text-[40px] xs:text-[28px] ${montserrat_r.className} !font-bold `}
        >
          Finally…A Quick & Easy Way For You To Find Your Next Big Opportunity!
        </h1>
        <p
          className={`md:text-[23px] xs:text-[16px] ${montserrat_r.className} pt-6 mb-10`}
        >
          Let{"'"}s see if we{"'"}re a fit. Get started by scheduling a
          complimentary consultation.
        </p>
        <Link
          target="_blank"
          href="https://api.leadconnectorhq.com/widget/booking/YWUhGhQTqpIH6XVQZBPu"
          className={`${montserrat_r.className} !font-bold md:text-[24px] text-gray-100 xs:text-[15px] bg-[#BD10E0] p-4  rounded-lg hover:bg-purple-700 transition duration-300`}
        >
          Schedule a Free Consultation
        </Link>
      </div>
    </div>
  );
}

export default FinallySection;
