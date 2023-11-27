import LinkedInToolMain from "@/components/new-layout/linkedin/LinkedInToolMain";
import { Metadata } from "next";
import Script from "next/script";
export const metadata: Metadata = {
  title: "CareerBooster.AI-linkedin",
  description:
    "Free AI LinkedIn Summary Generator To Achieve Top Rankings In Recruiter Searches And Secure More Interviews!",
  keywords: [
    "CareerBooster.AI",
    "AI-powered tools",
    "ATS-friendly resumes",
    "Executive resumes",
    "Professional image",
    "Competitive job market",
    "Job hunt transformation",
    "Career advancement",
    "20,000+ professionals",
    "Revolutionize job search",
    "CareerBooster About ",
    "About CareerBooster",
    "free ai linkedin summary generator",
    "free ai linkedin tool",
    "achieve top ranking in linkedin searches",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function LinkedInNewPage() {
  return (
    <div className="flex-grow-1 mb-20 w-full">
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
      {/* LinkedIn Tool Card */}
      <section className="mt-28 lg:mt-36">
        <div className="flex flex-col text-white">
          <LinkedInToolMain />
        </div>
      </section>
    </div>
  );
}
