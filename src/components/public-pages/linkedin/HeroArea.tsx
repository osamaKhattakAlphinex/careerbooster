"use client";
//v1.1 upadted
import linkedImage_1 from "@/../public/assets/images/linkedImage_1.png";
import linkedImage_2 from "@/../public/assets/images/linkedImage_2.png";

import Image from "next/image";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyInvisibleCaptcha } from "@/ServerActions";

const saveToLocalStorage = (text: any, fileName: any) => {
  localStorage.setItem("linkedin-content", text);
  localStorage.setItem("linkedin-fileName", fileName);
};
import { Fjalla_One, Roboto, Montserrat } from "next/font/google";
const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});
const fjalla_One = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const montserrat_thin = Montserrat({
  weight: "500",
  subsets: ["latin"],
});
const montserrat_p = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

const HeroArea = () => {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null); //main page
  const [fileName, setFileName] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      //  file exists and is PDF
      setFileError("");
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF or Word file is allowed");
    }
  }, [file]);
  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyInvisibleCaptcha(token)
      .then(() => {
        setIsverified(true);
      })
      .catch(() => setIsverified(false));
  }
  const handleFileChange: any = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (recaptchaRef.current) {
      recaptchaRef.current.execute();

      const fileInput = e.target;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        setFile(fileInput.files[0]);
        setFileName(fileInput.files[0].name);
      }
    }
  };
  useEffect(() => {
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFileUploading(true);
      setUploadComplete(true);
    }
  }, [file, fileName]);

  useEffect(() => {
    if (uploadComplete && fileUploading && text !== "") {
      saveToLocalStorage(text, fileName);
      // router.push(`/linkedin/result`);
    }
  }, [fileUploading, uploadComplete, text]);
  useEffect(() => {
    if (isVerified) {
      router.push("/linkedin/result");
    } else {
      console.log("Captha failed");
    }
  }, [isVerified]);
  return (
    <div className="w-full ">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r  from-[#01010D80] via-[#000A6380] to-purple-900 overflow-x-hidden md:px-0 pt-24  lg:pt-[100px] lg:npt-10">
        <div className=" text-center lg:pt-12 lg:pb-8 pt-15 ">
          <h2
            className={`xs:text-sm md:text-[20px] lg:text-[30px] text-gray-800 dark:text-gray-300  ${montserrat_thin.className}`}
          >
            Finally Revealed!
          </h2>
          <div>
            <h1
              className={`md:pt-2 text-center xs:text-[25px] md:text-[45px] lg:text-[65px]  mt-3 text-[#4f31f0]  dark:text-[#6350c8]`}
            >
              <strong className={`${fjalla_One.className} font-bold`}>
                How To Access Senior Level
              </strong>
            </h1>
            <p className="text-center text-[25px] md:text-[45px] lg:text-[65px]  relative  md:-top-4 text-[#4f31f0]  dark:text-[#6350c8] ">
              <strong className={`${fjalla_One.className} font-bold`}>
                Confidential Jobs on LinkedIn
              </strong>
            </p>
          </div>

          <h2
            className={` xs:text-[12px] md:text-[18px] lg:text-[30px] xs:pt-3 md:pt-0 text-gray-800 dark:text-gray-300 px-[8px] md:px-32 font-thin ${montserrat.className}`}
          >
            Little-known job search secrets on LinkedIn, crucial for
            senior-level job seekers.
          </h2>
        </div>
        <div className="px-[5px] md:px-[15px] lg:pb-8">
          <h2
            className={`xs:text-[16px] md:text-[27px] lg:text-[45px] px-[5px] xs:px-[10px] md:px-[25px] text-gray-800 dark:text-gray-300 xs:pt-3 md:pt-4 lg:px-28  text-center ${montserrat.className} `}
          >
            <strong>
              Why Top Jobs Stay Off the Radar? The Confidential Job Market
              Explained…
            </strong>
          </h2>
          <div className="xs:mt-5 md:mt-4 lg:mt-10 container mx-auto">
            <ul>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[32px] text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin.className}`}
                >
                  Chess Not Checkers:{" "}
                </h3>

                <ul
                  className={`xs:text-[10px] md:text-[13px] lg:text-[18px] flex flex-col xs:gap-2 lg:gap-2 my-2 md:my-4 text-gray-800 dark:text-gray-300 ${montserrat_p.className}`}
                >
                  <li>
                    Think of high-stakes job placements as strategic chess
                    moves.
                  </li>
                  <li>
                    Companies wait for the perfect moment to shout 'checkmate'
                    before revealing their next big move.
                  </li>
                  <li>
                    This hushhush approach keeps the market's prying eyes at bay
                    and the company's cards close to its chest.
                  </li>
                  <li>
                    The recent success of OpenAI is a great example; they hired
                    top engineers secretly and announced GPT, which was nothing
                    less than a checkmate to Google.
                  </li>
                </ul>
              </li>
              <li>
                <h3
                  className={`xs:text-[14px] md:text-[22px] lg:text-[32px] text-gray-800 dark:text-gray-300 font-semibold  ${montserrat_thin.className}`}
                >
                  Under the Radar:
                </h3>
                <ul
                  className={`text-[10px] md:text-[13px] lg:text-[18px] text-gray-800 dark:text-gray-300 flex flex-col xs:gap-2 md:gap-4 xs:my-2 md:my-4 ${montserrat_p.className}`}
                >
                  <li>
                    For those already in a top position, job searching is often
                    a covert operation.
                  </li>
                  <li>
                    Confidential job listings serve as a protective veil,
                    enabling you to explore new opportunities without
                    jeopardizing your current position.
                  </li>
                  <li>
                    In essence, the high-level job market is like an
                    iceberg—what you see on job boards is just the tip. The real
                    action happens below the surface, and this guide is your
                    Sonar to see it all.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="xs:mt-5 md:container md:mx-auto  md:mt-0">
          <h1
            className={`md:text-[27px] lg:text-[35px] text-center text-gray-800 dark:text-gray-300 ${montserrat.className}`}
          >
            The Art of Stealth Hiring:
          </h1>
          <h1
            className={`xs:text-[16px] md:text-[27px]  lg:text-[40px]  mx-[15px] md:mx-15 lg:mx-5 text-gray-800 dark:text-gray-300   text-center ${montserrat_thin.className}`}
          >
            <strong>How Elite Roles are Filled Behind the Scenes</strong>
          </h1>
          <ul
            className={`flex text-[10px] md:text-[13px] lg:text-[18px]  flex-col text-gray-800 dark:text-gray-300  gap-4 xs:px-5 md:px-3 lg:px-4 my-4 `}
          >
            <li className={`  ${roboto.className}`}>
              It's reported by <strong>Forbes</strong> that a whopping 90% of
              recruiters use LinkedIn not just to peek into a candidate’s career
              window, but to invite them into exclusive job opportunities.
            </li>
            <li className={` ${roboto.className}`}>
              The LinkedIn that headhunters navigate is not the one we know.
              It's turbocharged with features designed for the eagle-eyed
              recruiter:
            </li>
          </ul>
          <div className="text-center mx-auto  md:container">
            <h2
              className={`xs:text-[16px] md:text-[22px] lg:text-[30px] text-[#4f31f0] dark:text-[#6350c8]  ${montserrat.className}`}
            >
              <strong>1. The Precision Filter:</strong>
            </h2>
            <div
              className={`xs:text-[12px] md:text-[13px] lg:text-[18px] px-[10px] md:px-0 flex flex-col items-center  dark:text-gray-300 text-gray-800 gap-4 my-3 ${roboto.className}`}
            >
              <p className="">
                LinkedIn’s advanced search functions as a finely-tuned net,
                capturing only the most valuable prospects.
              </p>
              <p className="">
                This digital sieve allows headhunters to apply highly specific
                criteria, ensuring that only candidates who epitomize the
                essence of the role are considered for these coveted positions.
              </p>
              <Image
                src={linkedImage_1}
                width={800}
                alt="Not Found"
                className="border  border-gray-400 dark:border-gray-800 shadow-lg rounded-md"
              />
            </div>
          </div>
          <div className="text-center mx-auto md:container">
            <h2
              className={`xs:text-[16px] md:text-[22px] lg:text-[30px] dark:text-[#6350c8] text-[#4f31f0] ${montserrat.className}`}
            >
              <strong>2. Boolean Alchemy:</strong>
            </h2>
            <div
              className={`xs:text-[12px] md:text-[13px] lg:text-[18px]  text-gray-800 dark:text-gray-300 px-[10px] md:px-0 flex items-center  flex-col gap-4 my-3 ${roboto.className}`}
            >
              <p className="">
                Employing the art of Boolean search techniques, recruiters
                skillfully craft queries that are akin to casting spells.
              </p>
              <p className="">
                They blend keywords and phrases, creating search strings that
                magically unveil candidates possessing the precise combination
                of experience and skills needed for these prestigious roles.
              </p>
              <Image
                src={linkedImage_2}
                width={800}
                alt="Not Found"
                className="border border-gray-400 dark:border-gray-800  shadow-lg rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="py-8 ">
          <div className="bg-gray-950 py-5">
            <h1
              className={`xs:text-[17px] md:text-[27px] lg:text-[40px] text-center xs:px-[5px]   text-[#fdb34b] ${montserrat_thin.className}`}
            >
              <strong>Why Your LinkedIn Profile Isn't </strong>
            </h1>
            <h1
              className={`xs:text-[17px]  md:text-[27px] lg:text-[40px] text-center xs:px-[5px]  text-[#fdb34b] ${montserrat_thin.className}`}
            >
              <strong>Catching Recruiters' Attention?</strong>
            </h1>
          </div>
          <div
            className={`xs:text-[12px]  md:text-[13px] dark:text-gray-300 text-gray-800 lg:text-[18px] container mx-auto flex flex-col xs:gap-2 pt-5 md:pt-10 px-5 ${roboto.className}`}
          >
            <p className="xs:px-0 md:px-3 lg:px-4">
              You've climbed the career ladder, your LinkedIn profile chronicles
              a decade or more of success, yet the offers from headhunters are
              scarce—or they don't match the stature of the roles you aspire to.
            </p>
            <p className="xs:px-0 md:px-3 lg:px-4">
              If your digital presence isn't generating the right buzz, it boils
              down to two critical factors:
            </p>
          </div>
        </div>
        <div className="container mx-auto">
          <h2
            className={`xs:text-[16px] md:text-[22px] lg:text-[30px] text-center  dark:text-[#6350c8]  text-[#4f31f0] ${montserrat.className}`}
          >
            <strong>1. The Keyword Conundrum:</strong>
          </h2>
          <div
            className={`xs:text-[12px] md:text-[13px] lg:text-[18px] dark:text-gray-300 text-gray-800 flex flex-col gap-4 my-3 ${roboto.className}`}
          >
            <p className="xs:px-0 md:px-3 lg:px-4">
              Your profile might lack the keyword optimization that acts as a
              beacon for recruiters. Without this, you're similar to a stealth
              jet on LinkedIn— impressive, but undetectable.
            </p>
            <p className="xs:px-0 md:px-3 lg:px-4">
              Selecting the right keywords is akin to setting the right
              coordinates for your career journey, ensuring you’re heading
              towards more prestigious destinations.
            </p>
          </div>
        </div>
        <div className="container mx-auto">
          <h2
            className={`xs:text-[16px] md:text-[22px] lg:text-[30px] text-center  md:mx-[95px] lg:mx-[99px] xl:mx-[195px] dark:text-[#6350c8] text-[#4f31f0] ${montserrat.className}`}
          >
            <strong>
              2. Unintentionally Positioning Yourself for Lower-Level Jobs:
            </strong>
          </h2>

          <div
            className={`xs:text-[12px] md:text-[13px] dark:text-gray-300 text-gray-800 lg:text-[18px] flex flex-col gap-4 my-3 ${roboto.className}`}
          >
            <p className="xs:px-0 md:px-3 lg:px-4">
              A common pitfall for many professionals is relying on generic
              keywords — the very same ones employed by entry or mid-level
              professionals in your industry.
            </p>
            <strong className="dark:text-[#6350c8] xs:px-0 md:px-3 lg:px-4 text-[#4f31f0]">
              This often leads to receiving underpaid job offers, lower
              visibility, and increased competition.
            </strong>
            <p className="xs:px-0 md:px-3 lg:px-4">
              You become just another face in the crowd. To truly stand out,
              it's essential to dive deeper. The goal is to identify and
              incorporate unique, role-specific keywords that not only resonate
              with your personal brand but also align precisely with the
              positions you aspire to.
            </p>
            <p className="xs:px-0 md:px-3 lg:px-4">
              Adopting this strategy can greatly increase your chances of
              attracting recruiters' attention and distinctly position you for
              the roles you're seeking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroArea;
