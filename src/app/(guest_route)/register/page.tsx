import RegistrationForm from "@/components/new-layout/Register/RegistraionForm";
import Script from "next/script";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.AI-Register",
};
const RegisterNew = () => {
  return (
    <>
      <div className="wrapper d-flex flex-column justify-between min-h-[1155px]">
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
        <main className="flex-grow-1">
          <section className="account-section login-page pb-6 pt-40 h-full">
            <div className="container-fluid h-full">
              <div className="row h-full">
                <RegistrationForm />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default RegisterNew;
