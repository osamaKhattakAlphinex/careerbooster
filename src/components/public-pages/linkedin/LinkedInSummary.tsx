const LinkedInSummary = ({
  fullName,
  FirstName,
}: {
  fullName: string;
  FirstName: string;
}) => {
  return (
    <div className="lg:mt-[40px] mt-[20px]">
      <div className="w-full lg:content-2 bg-black lg:pt-20 flex flex-col  pt-[40px] justify-center items-center font-sans px-10">
        <div className=" lg:w-5/6 text-center flex flex-col gap-2 pb-16">
          <h2 className=" text-white font-semibold lg:text-[35px] text-[24px]">
            How does the new summary make me a <br /> preferred candidate on
            LinkedIn?
          </h2>
          <p className="lg:text-[22px] text-[18px] lg:mb-16 font-thin text-gray-200">
            Most professionals miss out on valuable opportunities due to
            non-optimized profiles, lacking the vital keywords and engaging
            content that recruiters actively seek.
          </p>
          <h4 className="lg:text-[35px] text-[24px] font-bold  text-gray-200  bg-gradient-to-r from-indigo-500 to-purple-800 bg-clip-text text-transparent ">
            Understanding Your New LinkedIn Summary:
          </h4>
          <p className="lg:text-[20px] text-[18px] font-thin   text-gray-200 ">
            You might find the new summary extensive and consider opting for a
            shorter version. While you can click the button above for a more
            concise summary, we recommend the lengthier version for specific
            benefits. LinkedIn allows a generous 2,000-word limit for summaries,
            and this isn{"’"}t without reason. A comprehensive summary lets you
            include a greater number of keywords, enhancing your profile{"’"}s
            discoverability and reach on the platform.
          </p>

          <h4 className="lg:text-[35px] text-[24px] font-bold mt-5 text-gray-200  bg-gradient-to-r from-indigo-500 to-purple-800 bg-clip-text text-transparent ">
            Boosted Recommendations:
          </h4>
          <p className="lg:text-[20px] text-[18px] font-thin  text-gray-200 ">
            When you apply for jobs on LinkedIn, the platform your profile
            content in relation to the job{"'"}s requirements. A
            keyword-optimized summary increases the chances of LinkedIn
            recommending you as a top candidate to potential employers.
          </p>
          <h4 className="lg:text-[35px] text-[24px] font-bold mt-5 text-gray-200  bg-gradient-to-r from-indigo-500 to-purple-800 bg-clip-text text-transparent ">
            Enhanced Engagement
          </h4>
          <p className="lg:text-[20px] text-[18px] font-thin  text-gray-200 ">
            A captivating summary ensures that once a recruiter lands on your
            profile, they stay there. This longer engagement signals to Linkedin
            that your profile is valuable, which in turn boosts your profile
            {"'"}s ranking in search results.
          </p>
          <h4 className="lg:text-[35px] text-[24px] font-bold mt-5 text-gray-200  bg-gradient-to-r from-indigo-500 to-purple-800 bg-clip-text text-transparent ">
            Showcasing Achievements
          </h4>
          <p className="lg:text-[20px] text-[18px] font-thin  text-gray-200 ">
            Your summary isn{"'"}t just about the roles you{"'"}ve held- it{"'"}
            s about the impact you{"'"}ve made. A detailed summary allows you to
            highlight significant achievements, providing tangible evidence of
            your expertise and skills.
          </p>
          <h4 className="lg:text-[35px] text-[24px] font-bold mt-5 text-gray-200  bg-gradient-to-r from-indigo-500 to-purple-800 bg-clip-text text-transparent ">
            Personal Branding
          </h4>
          <p className="lg:text-[20px] text-[18px] font-thin  text-gray-200 ">
            Your LinkedIn summary is a reflection of your professional brand. A
            well-crafted, lengthy summary sets you apart and establishes your
            position as a thought leader or industry expert.
          </p>
        </div>
      </div>
      <div className="lg:content-3 lg:mt-3 mt-5 lg:py-16 pb-4 font-sans text-center lg:px-8 px-10">
        <h1 className="text-[24px] lg:text-[35px] text-bold text-gray-100 mb-6">
          <span className="text-yellow-600">
            Attention, {fullName ? fullName : "..."} !
          </span>{" "}
          To become a Linkedin pro and secure your ideal position ASAP, read the
          following carefully.
        </h1>
        <p className=" lg:text-[20px] text-[18px] font-normal italic  text-gray-200 mb-0">
          Don{"'"}t skim over this! You might miss critical insights and
          essential information that could cost you your dream job.
        </p>
      </div>
      <div className="lg:content-4  lg:mx-8 mx-8 px-4 border-2 mt-9 py-5 border-indigo-900 rounded-lg lg:px-8 lg:py-9 bg-transparent lg:backdrop-blur">
        <h3 className="font-semibold lg:text-[18px] text-[14px] text-gray-100">
          Dear{" "}
          <span className="text-yellow-500">
            {" "}
            {FirstName ? FirstName : "..."}{" "}
          </span>
          ,
        </h3>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 lg:text-gray-300 ">
          I{"'"}m curious are you someone who believes in pursuing excellence
          and ensuring no task is left halfway?
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          I am sure you don{"'"}t want to send the wrong message to employers
          and hiring managers, suggesting that you leave things incomplete. If
          so, consider the entirety of your LinkedIn profile.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Firstly, kudos on updating your LinkedIn headline and summary! Such an
          upgrade immediately boosts the impression you leave on profile
          visitors.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          The {"'"}experience{"'"} section, for instance, is paramount. After
          your captivating headline and summary draw visitors in, it{"'"}s your
          documented work history that convinces them of your capabilities.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Many professionals have commendable achievements from past roles, yet
          they often fail to present these feats effectively, leading to missed
          opportunities. If you{"'"}re keen on seizing every potential
          opportunity, it{"'"}s crucial to amplify your {"'"}experience{"'"}{" "}
          section.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Similarly, the next most important section, which significantly
          contributes to your search ranking when recruiter systems compare you
          to other candidates, is your Skills section.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          You can add up to 50 skills. Adding the top 50 keywords in this
          section means you will rank higher than other candidates.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          We encourage you to use our keyword research tool to find the top
          keywords to dominate the competition. When you upload your resume, our
          Al tool creates your persona; understand your career path, and the
          tool will suggest keywords that will position you for your next career
          move.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Once we have the top keywords for you, our tool will strategically
          insert them in the experience section for each job description. This
          approach 10Xs your chances of landing your dream job in no time.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Having collaborated with executive resume writers, we{"'"}ve
          fine-tuned our Al tool to craft resumes and LinkedIn profiles that
          attract opportunities like a magnet.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          I invite career you to experience the full scope of our tool and
          transform your tools into a beacon for potential employers.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          By upgrading to our premium version, you{"'"}ll also obtain an
          ATS-friendly, keyword-rich executive resume that{"'"}s as irresistible
          to recruitment systems as a cup of ice cream is to a teenager.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Our commitment isn{"'"}t just a one-time deal. We{"'"}ll accompany you
          throughout your job search journey until you find your dream job.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          With our Al tool, you can generate tailored cover letters for
          individual job roles, modify resumes in mere seconds, and maintain
          consistent communication post-application with our job application
          follow-up email sequence.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Imagine yourself and another equally qualified candidate, let{"'"}s
          call them Mr. X. Both of you apply for the same dream job. You,{" "}
          {fullName}, send a bespoke application, while Mr. X opts for a generic
          one-size-fits-all approach. Additionally, you dispatch a personalized
          follow-up email and a gracious thank-you note.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Who do you think leaves a lasting impression on the recruiter?
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          If you believe Mr. X stands an equal chance, you{"'"}re free to move
          on. But if you sense that your tailored approach would sway the
          recruiter in your favor, I urge you to explore our tool further.
          Should it not meet your expectations, we promise a full refund. We
          {"'"}re confident in delivering value and uphold a staunch money-back
          guarantee.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          You{"'"}ve already made a commendable start by utilizing our free
          summary and headline generator. It{"'"}s transformative, and your
          trust means the world to us. Yet, to truly dominate the LinkedIn
          landscape and leave an indelible mark, consider taking the next step
          with us.
        </p>
        <p className="lg:text-[18px] text-[14px] font-normal mt-6 text-gray-300 ">
          Warm regards,
          <br />
          <span className="font-extrabold">M. Hassan</span>
          <br />
          CEO & Co-Founder <br />
          CareerBooster.Al <br />
        </p>
      </div>
    </div>
  );
};

export default LinkedInSummary;
