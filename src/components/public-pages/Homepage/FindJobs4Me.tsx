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

const FindJobs4Me = () => {
  const faqs = [
    {
      question: "What Is CareerBooster's Find Job4Me?",
      answer:
        "Our Find Job4Me service was created to offer busy professionals a solution to job searching on their own. We assign a dedicated Virtual Job Search assistant who will be responsible for managing the time-consuming art of job searching.\n\nOur professional Virtual Job Search Assistants will be responsible for searching for jobs on your behalf, applying to the jobs you approve, and networking with key decision-makers to land you interviews.",
    },
    {
      question: "Can I Hire A Recruiter To Find Me A Job?",
      answer:
        "A recruiter’s main job is to help hiring companies fill open positions, not find jobs for individuals.\n\nRecruiters do not receive compensation from job seekers. They receive compensation from hiring companies.\n\nTherefore, you cannot hire a recruiter to find you a job.",
    },
    {
      question: "How Much Does The Managed Job Search Service Cost?",
      answer:
        "Our Managed Job Search service costs $2,000 per month. We also need executive-level resume design, Linkedin optimization and a personal website to find your dream job faster, which are included in the $2,000.",
    },
    {
      question: "Do You Guarantee A Job?",
      answer:
        "No. CareerBooster does not guarantee a job as a result of using our service. We provide significant results in order for you to find your dream job.",
    },
    {
      question: "What's Your Money-Back Guarantee?",
      answer:
        "We will deliver the services we promise, or we will refund your money.",
    },
    {
      question: "What Types Of Professionals Do You Work With?",
      answer:
        "The higher-up you climb the corporate ladder the more challenging it can be to find a suitable position. While we are more than equipped to help mid-career professionals, the majority of our clients are Directors, VPs, or C-Level candidates with salaries ranging from $150,000 - $500,000.",
    },
  ];
  return (
    <section className="md:pt-20 xs:pt-[0px] xs:pb-[50px] pb-10  md:pb-18  dark:bg-gray-950 bg-gray-100 dark:text-white text-black  justify-center items-center min-h-screen flex flex-col">
      <div className="text-center p-6 lg:w-2/3 xs:w-full flex flex-col gap-2 pb-20">
        <h1
          className={`md:text-[54px] xs:text-[30px] !font-extrabold mb-4 ${montserrat_r.className}`}
        >
          Give Us 30-60 Days & We{"'"}ll Find You a Dream Job!
        </h1>
        <p
          className={`mb-6 ${montserrat_r.className} md:text-[22px] xs:text-[16px] text-gray-200`}
        >
          Our team of dedicated Virtual Job Search Assistants can make your life
          easier by managing your entire job search. Save time and do what you
          love while we bring you the interviews.
        </p>
        <Link
          target="_blank"
          href="https://calendly.com/callofcareer/15min"
          className={`${montserrat_r.className} md:text-[20px] xs:text-[14px] bg-[#BD10E0] text-white  md:py-4 md:px-8 xs:py-3 xs:px-4 rounded-full hover:bg-purple-700 transition duration-300 !font-bold mt-4 w-fit mx-auto `}
        >
          Schedule a Free Consultation →
        </Link>
      </div>
      <div className="bg-[#E5EFF7] text-gray-900 py-10 md:px-6 w-full">
        <div className="mx-auto text-center md:px-10 xs:px-2">
          <h2
            className={`md:text-[40px] xs:text-[26px]  mb-4 !font-extrabold ${montserrat_r.className}`}
          >
            As A Senior-Level Candidate You Have Already Realized That Finding A
            Job Is Tricky And Complicated
          </h2>
          <ul
            className={`text-[#595757] text-left list-disc list-inside space-y-2 mb-6 md:text-[25px] xs:text-[16px] ${montserrat_r.className} xs:px-2`}
          >
            <li>
              Most senior-level jobs that pay at least $150k+ are rarely
              announced to the general public and are kept strictly
              confidential.
            </li>
            <li>
              Technology has actually made it harder than ever to get hired;
              recruiters see hundreds and hundreds of resumes every day.
            </li>
            <li>
              98% of Fortune 500 companies and at least 66% of large companies
              use recruitment software (ATS), you can{"’"}t always outsmart an
              algorithm or a bloated corporate hiring system.
            </li>
          </ul>
          <p
            className={`text-gray-950 space-y-2 mb-6 md:text-[30px] xs:text-[24px] !font-extrabold ${montserrat_r.className}`}
          >
            To overcome these challenges, here is what we can do to help you
            find your dream job faster.
          </p>
          <p
            className={`text-[#595757]mb-6 md:text-[25px] xs:text-[16px] ${montserrat_r.className}`}
          >
            We will assign you a dedicated virtual assistant for one to two
            months to help you with your job search using the latest tools and
            techniques that put you in front of the decision makers and give you
            access to confidential and unannounced opportunities.
          </p>
        </div>
      </div>
      <div className=" text-white py-10 md:px-6 xs:px-2">
        <div className="md:px-10 mx-auto">
          <h2
            className={`md:text-[50px] xs:text-[34px] !font-extrabold text-center mb-2 ${montserrat_r.className}`}
          >
            How do we do it?
          </h2>
          <p
            className={`text-center mb-10 md:text-[24px] xs:text-[18px] text-gray-400 ${montserrat_r.className} !font-extrabold`}
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
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  Your LinkedIn profile, résumé, and cover letter are your sales
                  team. And they are going to help your ideal employer find you.
                  Before we begin the job search, we{"'"}ll redesign your résumé
                  using an Executive Level Resume format and keyword optimize
                  your LinkedIn to attract your ideal prospects.
                </p>
                <br />
                <p
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  The modern-day job search is not like it used to be. Long gone
                  are the days of applying for jobs online and getting calls for
                  interviews. A job search is in essence a marketing campaign
                  with you as the product, and your executive job search
                  strategy equates to your marketing campaign.
                </p>{" "}
                <br />
                <p
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  So you really need to run your job search like a marketing
                  campaign.
                </p>
              </div>
            </div>
            <div className="flex md:flex-row xs:flex-col xs:text-center md:text-left">
              <div className="flex md:flex-row xs:flex-col xs:text-center md:text-left">
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
                    className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                  >
                    We{"'"}ll reach out to 500+ decision makers on your behalf
                    in your industry and desired location to find positions that
                    aren{"'"}t listed on job boards.
                  </p>
                  <br />
                  <p
                    className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                  >
                    When you{"'"}re looking for a job, it{"'"}s easy to become
                    focused on job boards and search engines and forget about
                    other ways to find open positions. This kind of tunnel
                    vision can mean missing out on the hidden job
                    market—unadvertised job openings that are accessible only to
                    those who look beyond what they can find online.
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
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  If you want to find a job fast, you need to apply for a large
                  number of jobs. But how can you send out a high volume of
                  applications quickly and easily? That{"'"}s where we come in.
                </p>
                <br />
                <p
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  We will find and apply to all new job openings in your area
                  daily for 60 days, so you do not miss any opportunities. We
                  will upload all jobs in a separate excel sheet for you so you
                  can review and track them yourself whenever you want.
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
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  You always hear that 80% of job opportunities are not posted –
                  this is what is called the hidden job market. The key to
                  tapping that is your network.
                </p>
                <br />
                <p
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  Your dedicated Virtual Assistant will add at least 500 new
                  connections to your network on LinkedIn with decision makers
                  in your industry, send networking messages to leverage your
                  job search using the world{"'"}s primary search engine and
                  social network.
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
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  A big part of the LinkedIn approach is to make sure that you
                  monitor who has added you back, and then send them messages
                  after they have connected with you. Once someone has added
                  you, you can also pull their email address from their profile
                  and email them your résumé/cover letter.
                </p>
                <br />
                <p
                  className={`text-gray-400 ${montserrat_r.className} md:text-[20px] xs:text-[15px]`}
                >
                  The typical job search involves applying to as many jobs as
                  you can. The real challenge becomes keeping track of all the
                  places you apply to. We will help you keep track of the jobs
                  you applied to, including your target companies, anyone you
                  have contact with there (including interviews and decision
                  makers), and dates and information about each contact. This
                  might not seem significant at first glance, but it can really
                  help as you apply to a few jobs at a few companies. Without
                  this order, it can get very confusing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#E4ECF2] mt-20 rounded-l-3xl rounded-b-3xl md:p-6 xs:p-2 shadow-md  flex   md:w-[80%] xs:w-[95%] mx-auto text-gray-400">
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
      <div className="bg-gray-950 w-full mt-20">
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
            people simply don’t know the correct steps to take which makes them
            take far longer than they need to. We’ll do all the hard work and
            smart work for you, and you’ll find your next job in no time.
          </p>
        </div>
      </div>
      <div className="flex md:flex-row xs:flex-col justify-center md:p-4 w-full gap-4 md:px-14 xs:px-2 mt-20">
        {/* Without Find Job4Me */}
        <div className="bg-gray-100 text-gray-950  shadow-md md:mx-2 xs:mx-0 md:w-1/2 xs:w-full">
          <div
            className={`bg-red-700 p-4  text-center font-bold ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] !font-extrabold`}
          >
            Without Find Job4Me
          </div>
          <div className="bg-white text-black ">
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center`}
            >
              <strong>Estimated Time to First Interview 6 months.</strong>
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center bg-[#E4ECF2]`}
            >
              Spend <strong>33 hours</strong> finding 100 jobs a month. (20
              minutes each job)
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center`}
            >
              Spend <strong>25 hours</strong> a month submitting 100 job
              applications
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center bg-[#E4ECF2]`}
            >
              Spend <strong>44 hours</strong> sending network messages and new
              connections requests. (2 hours a day)
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center`}
            >
              No Access to Unadvertised & Confidential Opportunities
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center bg-[#E4ECF2]`}
            >
              Not using the right search channels or tools
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center`}
            >
              Less likelihood of finding your dream job due to limited options.
              You might have to work for a company with a bad culture.
            </p>
          </div>
        </div>

        {/* With Find Job4Me */}
        <div className="bg-green-600 text-gray-950  shadow-md md:mx-2 xs:mx-0 md:w-1/2 xs:w-full">
          <div
            className={`bg-green-700 p-4  text-center font-bold ${montserrat_r.className} text-[23px] !font-extrabold`}
          >
            With Find Job4Me
          </div>
          <div className="bg-white text-black ">
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center`}
            >
              <strong>Estimated Time to First Interview 30-60 days.</strong>
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center bg-[#E4ECF2]`}
            >
              Spend <strong>0 hours</strong> finding 100 jobs a month. (We do it
              for you)
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center`}
            >
              Spend <strong>0 hours</strong> a month submitting 100 job
              applications. (We do it for you!)
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center bg-[#E4ECF2]`}
            >
              Spend <strong>0 hours</strong> sending network messages and new
              connections requests. (We do it)
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center`}
            >
              Access to Unadvertised & Confidential Opportunities
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center bg-[#E4ECF2]`}
            >
              Leverage the right search channels and tools
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center`}
            >
              Higher likelihood of generating several offers, that way you’re
              not only finding A job, but the RIGHT job.
            </p>
            <p
              className={`text-gray-950 ${montserrat_r.className} md:text-[23px] 
            xs:text-[18px] p-4 text-center bg-[#E4ECF2]`}
            >
              Cost: $2000
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-950 w-full mt-20">
        <div className="content text-center md:w-2/3 xs:w-full xs:px-2 md:px-0 mx-auto">
          <h1
            className={`md:text-[40px] xs:text-[28px] ${montserrat_r.className} !font-bold `}
          >
            Finally…A Quick & Easy Way For You To Find Your Next Big
            Opportunity!
          </h1>
          <p
            className={`md:text-[23px] xs:text-[16px] ${montserrat_r.className} pt-6 mb-10`}
          >
            Let{"'"}s see if we{"'"}re a fit. Get started by scheduling a
            complimentary consultation.
          </p>
          <Link
            target="_blank"
            href="https://calendly.com/callofcareer/15min"
            className={`${montserrat_r.className} !font-bold md:text-[24px] xs:text-[15px] bg-[#BD10E0] p-4  rounded-lg hover:bg-purple-700 transition duration-300`}
          >
            Schedule A free Consultation
          </Link>
        </div>
      </div>
      <div className="faqs flex flex-col md:w-[80%] xs:w-[95%] md:px-10 xs:px-4 mx-auto md:mt-20">
        <h1
          className={`${montserrat_r.className} md:text-[40px] xs:text-[28px] !font-bold text-center my-10`}
        >
          Frequently Asked Questions
        </h1>
        {faqs.map((faq: any) => {
          return (
            <>
              <div className="flex flex-col  xs:text-center md:text-left">
                <h1
                  className={`${montserrat_r.className} !font-bold md:text-[34px] xs:text-[24px] mb-8`}
                >
                  Q: {faq.question}
                </h1>
                <p
                  className={`${montserrat_r.className} !font-bold md:text-[23px] xs:text-[16px] mb-12`}
                >
                  A: {faq.answer}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default FindJobs4Me;
