import { Montserrat } from "next/font/google";
import React from "react";
const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

function HowWeDoIt() {
  return (
    <div className=" dark:text-gray-100 text-gray-950 py-10 md:px-6 xs:px-2">
      <div className="md:px-10 mx-auto">
        <h2
          className={`md:text-[50px] xs:text-[34px] !font-extrabold text-center mb-2 ${montserrat_r.className}`}
        >
          How do we do it?
        </h2>
        <p
          className={`text-center mb-10 md:text-[24px] xs:text-[18px] dark:text-gray-400 text-gray-700 ${montserrat_r.className} !font-extrabold`}
        >
          Fast, inexpensive, effective!
        </p>
        <div className="space-y-8 ">
          <div className="flex md:flex-row xs:flex-col xs:text-center md:text-left">
            <div className="flex md:flex-col xs:flex-row xs:mx-auto xs:text-center">
              <div
                className={`flex-none md:w-12 md:h-12 xs:w-8 xs:h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold mr-8 ${montserrat_r.className} md:text-[36px] xs:text-[26px] md:mb-6 xs:mb-2`}
              >
                1
              </div>
              <div className="md:block xs:hidden h-[100%] border-l-2 border-gray-400 mx-auto"></div>
            </div>

            <div>
              <h3
                className={`mb-6 md:text-[36px] xs:text-[22px] !font-extrabold  ${montserrat_r.className}`}
              >
                Build Your Sales Team & Run Your Job Search Like a Marketing
                Campaign
              </h3>
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                Your LinkedIn profile, résumé, and cover letter are your sales
                team. And they are going to help your ideal employer find you.
                Before we begin the job search, we{"'"}ll redesign your résumé
                using an Executive Level Resume format and keyword optimize your
                LinkedIn to attract your ideal prospects.
              </p>
              <br />
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                The modern-day job search is not like it used to be. Long gone
                are the days of applying for jobs online and getting calls for
                interviews. A job search is in essence a marketing campaign with
                you as the product, and your executive job search strategy
                equates to your marketing campaign.
              </p>{" "}
              <br />
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                So you really need to run your job search like a marketing
                campaign.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row xs:flex-col xs:text-center md:text-left">
            <div className="flex md:flex-col xs:flex-row xs:text-center md:text-left xs:mx-auto ">
              <div
                className={`flex-none md:w-12 md:h-12 xs:w-8 xs:h-8 bg-orange-600 rounded-full flex items-center justify-center  font-bold mr-8 ${montserrat_r.className} md:text-[36px] xs:text-[26px] md:mb-6 xs:mb-2`}
              >
                2
              </div>
              <div className="md:block xs:hidden h-[100%] border-l-2 border-gray-400 mx-auto"></div>
            </div>

            <div>
              <h3
                className={`md:text-[36px] xs:text-[22px] !font-extrabold mb-2 ${montserrat_r.className} text-orange-400`}
              >
                Find Unadvertised & Confidential Opportunities
              </h3>
              <div className="border-orange-600 border-2 p-4">
                <p
                  className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  We{"'"}ll reach out to 500+ decision makers on your behalf in
                  your industry and desired location to find positions that aren
                  {"'"}t listed on job boards.
                </p>
                <br />
                <p
                  className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  When you{"'"}re looking for a job, it{"'"}s easy to become
                  focused on job boards and search engines and forget about
                  other ways to find open positions. This kind of tunnel vision
                  can mean missing out on the hidden job market—unadvertised job
                  openings that are accessible only to those who look beyond
                  what they can find online.
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row xs:flex-col xs:text-center md:text-left">
            <div className="flex md:flex-col xs:flex-row xs:mx-auto xs:text-center">
              <div
                className={`flex-none md:w-12 md:h-12 xs:w-8 xs:h-8 bg-red-600 rounded-full flex items-center justify-center  font-bold mr-8 ${montserrat_r.className} md:text-[36px] xs:text-[26px] md:mb-6 xs:mb-2`}
              >
                3
              </div>
              <div className="md:block xs:hidden h-[100%] border-l-2 border-gray-400 mx-auto"></div>
            </div>

            <div>
              <h3
                className={`mb-6 md:text-[36px] xs:text-[22px] !font-extrabold  ${montserrat_r.className}`}
              >
                Find Jobs & Submit Applications
              </h3>
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                If you want to find a job fast, you need to apply for a large
                number of jobs. But how can you send out a high volume of
                applications quickly and easily? That{"'"}s where we come in.
              </p>
              <br />
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                We will find and apply to all new job openings in your area
                daily for 60 days, so you do not miss any opportunities. We will
                upload all jobs in a separate excel sheet for you so you can
                review and track them yourself whenever you want.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row xs:flex-col xs:text-center md:text-left">
            <div className="flex md:flex-col xs:flex-row xs:mx-auto xs:text-center">
              <div
                className={`flex-none md:w-12 md:h-12 xs:w-8 xs:h-8 bg-green-600 rounded-full flex items-center justify-center  font-bold mr-8 ${montserrat_r.className} md:text-[36px] xs:text-[26px] md:mb-6 xs:mb-2`}
              >
                4
              </div>
              <div className="md:block xs:hidden h-[100%] border-l-2 border-gray-400 mx-auto"></div>
            </div>

            <div>
              <h3
                className={`mb-6 md:text-[36px] xs:text-[22px] !font-extrabold  ${montserrat_r.className}`}
              >
                Expand Your Network
              </h3>
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                You always hear that 80% of job opportunities are not posted –
                this is what is called the hidden job market. The key to tapping
                that is your network.
              </p>
              <br />
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                Your dedicated Virtual Assistant will add at least 500 new
                connections to your network on LinkedIn with decision makers in
                your industry, send networking messages to leverage your job
                search using the world{"'"}s primary search engine and social
                network.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row xs:flex-col xs:text-center md:text-left">
            <div className="flex md:flex-col xs:flex-row xs:mx-auto xs:text-center">
              <div
                className={`flex-none md:w-12 md:h-12 xs:w-8 xs:h-8 bg-purple-600 rounded-full flex items-center justify-center  mr-8 ${montserrat_r.className} md:text-[36px] xs:text-[26px] md:mb-6 xs:mb-2`}
              >
                5
              </div>
              <div className="md:block xs:hidden h-[100%] border-l-2 border-gray-400 mx-auto"></div>
            </div>

            <div>
              <h3
                className={`mb-6 md:text-[36px] xs:text-[22px] !font-extrabold  ${montserrat_r.className}`}
              >
                Monitoring LinkedIn & Track Jobs
              </h3>
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                A big part of the LinkedIn approach is to make sure that you
                monitor who has added you back, and then send them messages
                after they have connected with you. Once someone has added you,
                you can also pull their email address from their profile and
                email them your résumé/cover letter.
              </p>
              <br />
              <p
                className={`dark:text-gray-400 text-gray-700 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
              >
                The typical job search involves applying to as many jobs as you
                can. The real challenge becomes keeping track of all the places
                you apply to. We will help you keep track of the jobs you
                applied to, including your target companies, anyone you have
                contact with there (including interviews and decision makers),
                and dates and information about each contact. This might not
                seem significant at first glance, but it can really help as you
                apply to a few jobs at a few companies. Without this order, it
                can get very confusing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowWeDoIt;
