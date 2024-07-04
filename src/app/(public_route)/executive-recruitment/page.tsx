import React from "react";
import { Fjalla_One, Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const heading_n = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

function page() {
  return (
    <>
      <main className="flex-grow-1 overflow-x-hidden md:pt-40 xs:pt-[120px] xs:pb-[50px] pb-10  md:pb-18 px-20 dark:bg-gray-950 bg-gray-100">
        <div className="conatiner">
          <div className="flex justify-center w-full gap-20">
            <div
              className={`w-2/3 content mx-auto text-center ${montserrat_r.className} text-lg`}
            >
              <p>
                At CareerBooster.ai, we specialize in identifying and connecting
                top-tier executive talent with organizations seeking
                transformative leaders. Our mission is to be your strategic
                partner, dedicated to elevating your organization through
                exceptional talent acquisition. We recognize the critical impact
                of effective leadership and are committed to delivering
                candidates who drive innovation and growth.
              </p>
              <br />
              <p>
                Our experienced team of recruiters leverages extensive industry
                knowledge and a vast network of professionals to provide
                comprehensive recruitment services. From middle management to
                C-suite roles, we ensure a precise match for your organizational
                needs.
              </p>
            </div>
          </div>
          <div className="flex w-full px-10 mt-20 gap-8">
            <div className="flex flex-col w-1/3 dark:bg-gray-500 bg-gray-100 shadow-xl rounded-md py-6 px-6 ">
              <h1
                className={`text-gray-950 dark:text-gray-100 text-2xl  pb-4 !font-bold ${montserrat_r.className}`}
              >
                Board and CEO Services
              </h1>
              <p
                className={`text-gray-950 dark:text-gray-100 text-base text-justify ${montserrat_r.className}`}
              >
                Successful board and CEO recruitment goes beyond filling
                positions, it involves strategic alignment and a deep
                understanding of governance. Our Board & CEO Services are
                designed to enhance your board{"’"}s effectiveness with seasoned
                experts who provide insights on best practices, succession
                planning, and strategic governance. We help you build a cohesive
                and high-performing leadership team that aligns with your
                organization's mission and values.
              </p>
            </div>
            <div className="flex flex-col w-1/3 dark:bg-gray-500 bg-gray-100 shadow-xl rounded-md py-6 px-6 ">
              <h1
                className={`text-gray-950 dark:text-gray-100 text-2xl  pb-4 !font-bold ${montserrat_r.className}`}
              >
                Senior Management Placement
              </h1>
              <p
                className={`text-gray-950 dark:text-gray-100 text-base text-justify ${montserrat_r.className}`}
              >
                We excel in placing Senior Managers, Directors, Vice Presidents,
                Senior Vice Presidents, and various C-level positions such as
                CMO, CFO, CTO, and CIO. Our rigorous vetting process ensures
                that we connect you with leaders who possess the strategic
                vision and operational expertise to drive your organization
                forward.
              </p>
            </div>
            <div className="flex flex-col w-1/3 dark:bg-gray-500 bg-gray-100 shadow-xl rounded-md py-6 px-6 ">
              <h1
                className={`text-gray-950 dark:text-gray-100 text-2xl  pb-4 !font-bold ${montserrat_r.className}`}
              >
                Acquisition Solutions
              </h1>
              <p
                className={`text-gray-950 dark:text-gray-100 text-base text-justify ${montserrat_r.className}`}
              >
                Our tailored acquisition solutions focus on sourcing and placing
                middle management and professional staff across various
                industries. Utilizing proprietary databases and targeted
                strategies, our core research team swiftly identifies top
                candidates, ensuring a seamless fit for your organization.
                Whether it’s a singular placement or an enterprise-wide project,
                our approach enhances collaboration and success.
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full mb-20">
            <h1
              className={`${montserrat_r.className} text-4xl text-center !font-bold mt-20`}
            >
              Additional Services:
            </h1>
            <div className="flex w-full px-10 mt-20 gap-8">
              <div className="flex flex-col w-1/3 dark:bg-gray-500 bg-gray-100 shadow-xl rounded-md py-6 px-6 ">
                <h1
                  className={`text-gray-950 dark:text-gray-100 text-2xl  pb-4 !font-bold ${montserrat_r.className}`}
                >
                  Leadership Development:
                </h1>
                <p
                  className={`text-gray-950 dark:text-gray-100 text-base text-justify ${montserrat_r.className}`}
                >
                  Invest in the growth of your leaders with our comprehensive
                  leadership development programs. We offer personalized
                  coaching, training, and development initiatives to nurture
                  future leaders within your organization, ensuring they are
                  equipped to meet evolving challenges
                </p>
              </div>
              <div className="flex flex-col w-1/3 dark:bg-gray-500 bg-gray-100 shadow-xl rounded-md py-6 px-6 ">
                <h1
                  className={`text-gray-950 dark:text-gray-100 text-2xl  pb-4 !font-bold ${montserrat_r.className}`}
                >
                  Diversity and Inclusion Recruitment
                </h1>
                <p
                  className={`text-gray-950 dark:text-gray-100 text-base text-justify ${montserrat_r.className}`}
                >
                  Promote a diverse and inclusive workplace with our specialized
                  recruitment services. We are committed to helping you build a
                  workforce that reflects diverse perspectives and fosters an
                  inclusive culture, driving innovation and better
                  decision-making.
                </p>
              </div>
              <div className="flex flex-col w-1/3 dark:bg-gray-500 bg-gray-100 shadow-xl rounded-md py-6 px-6 ">
                <h1
                  className={`text-gray-950 dark:text-gray-100 text-2xl  pb-4 !font-bold ${montserrat_r.className}`}
                >
                  Market Intelligence and Insights
                </h1>
                <p
                  className={`text-gray-950 dark:text-gray-100 text-base text-justify ${montserrat_r.className}`}
                >
                  Stay ahead of industry trends with our market intelligence
                  services. We provide actionable insights and analytics to
                  inform your talent acquisition strategies, helping you make
                  data-driven decisions that align with your organizational
                  goals.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`w-2/3 content mx-auto text-center ${montserrat_r.className} text-lg`}
          >
            <p>
              At CareerBooster.ai, we are more than just a recruitment firm. We
              are your partners in building a successful, dynamic, and
              forward-thinking organization. Let us help you find the leaders
              who will drive your business to new heights.
            </p>

            <Link
              href="/login"
              className="flex justify-center mt-8 items-center cursor-pointer gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white px-3 py-3 rounded-lg lg:w-[24%] sm:w-[50%] md:w-[17%] xs:w-full mx-auto hover:from-purple-800 hover:to-pink-600 transition-all duration-300 ease-in-out"
            >
              Get Started Today!
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default page;
