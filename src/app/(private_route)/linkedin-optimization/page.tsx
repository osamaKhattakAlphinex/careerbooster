"use client";
import { useState } from "react";
import AboutGenerator from "@/components/dashboard/linkedin-optimization/About Generator";
import HeadlineGenerator from "@/components/dashboard/linkedin-optimization/HeadlineGenerator";
import JDGenerator from "@/components/dashboard/linkedin-optimization/JDGenerator";
import KeywordsGenerator from "@/components/dashboard/linkedin-optimization/KeywordsGenerator";
// import DownloadDocx from "@/components/dashboard/linkedin-optimization/DownloadDocx";
import Script from "next/script";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";

const ResumeCreator = () => {
  const [keywords, setKeywords] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");

  return (
    <div className="mb-40">
      <Script type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jum6bniqm4");
        `}
      </Script>
      {/* Google tag (gtag.js) --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NDN7TY5F2W"
      />
      <Script>
        {`

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-NDN7TY5F2W');
        `}
      </Script>
      <div className="my-5 ml-10 pt-30 ">
        <Link
          href="/dashboard"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>
      </div>
      <div className="flex m-10 mt-2 gap-4">
        <div className="w-full flex p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <h2 className="text-2xl mr-10">LinkedIn Optimization</h2>
          {/* <div className="">
            <DownloadDocx
              keywords={keywords}
              headline={headline}
              about={about}
              jobDesc={jobDesc}
            />
          </div> */}
        </div>
      </div>
      <div className="flex m-10 gap-4">
        <div className="w-1/2 p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <HeadlineGenerator setHeadline={setHeadline} />
        </div>
        <div className="w-1/2 p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <AboutGenerator setAbout={setAbout} />
        </div>
      </div>

      <div className="flex m-10 gap-4">
        <div className="w-1/2 xs:w-full p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <JDGenerator setJobDesc={setJobDesc} />
        </div>
        <div className="w-1/2 xs:w-full p-4  border border-gray-200 rounded-lg shadow sm:p-6">
          <KeywordsGenerator setKeywords={setKeywords} />
        </div>
      </div>
    </div>
  );
};
export default ResumeCreator;
