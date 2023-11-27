import UploadPDFResume from "@/components/UploadPDFResume";
import Script from "next/script";
import RegistrationForm from "@/components/new-layout/Register/RegistraionForm";
import RegistrationImage from "@/components/new-layout/Register/RegistrationImage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.AI-Register",
};
const UploadResumePage = () => {
  return (
    <>
      <div className="wrapper d-flex flex-column justify-between min-h-full">
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
        <main className="flex-grow-1 pt-40">
          <div className="flex justify-center items-center">
            <div className="inline">
              <UploadPDFResume />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UploadResumePage;
