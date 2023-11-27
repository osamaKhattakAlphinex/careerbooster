import Packages from "@/components/dashboard/checkout/Packages";
import Script from "next/script";
const PricingSection = () => {
  return (
    <section className="py-10 py-lg-15">
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
      <div className="container">
        <div className="row justify-center mb-18">
          <div className="col-lg-10">
            <div className="text-center">
              <h1
                className="theme-hero-heading mb-5 md:text-[40px] text-[24px]"
                data-aos="fade-up-sm"
                data-aos-delay="100"
              >
                All Plans Include a 30-Day Money Back Guarantee
              </h1>
              <p className="mb-0" data-aos="fade-up-sm" data-aos-delay="150">
                Your Path to More Interviews and Better Opportunities
              </p>
            </div>
          </div>
        </div>
        <div className="row g-6 pricing-table">
          <Packages viewOnly={true} />
        </div>
      </div>
    </section>
  );
};
export default PricingSection;
