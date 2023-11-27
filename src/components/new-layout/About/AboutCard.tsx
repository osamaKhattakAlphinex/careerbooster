import Link from "next/link";
import SVGProvider from "../SVGProvider";
import Script from "next/script";
const AboutCard = () => {
  return (
    <section className="py-15">
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
        <div className="row align-center">
          <div
            className="col-lg-6 col-xl-5"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            <div className="text-center text-lg-start">
              <p className="theme-text fs-sm">About CareerBooster.AI</p>
              <h2 className="theme-tex-2 mb-4">Welcome to CareerBooster.AI</h2>
              <p className="mb-8">
                Your ultimate destination for revolutionizing your career
                journey with AI-powered tools that supercharge your professional
                image. In today{"'"}s fiercely competitive job market, where
                qualifications and experience are essential but not always
                enough, we understand the paramount importance of ensuring your
                resume stands out from the crowd.
              </p>
              <Link href="login.html" className="btn btn-lg btn-gradient-1">
                Upload Resume - It{"'"}s Free
              </Link>
            </div>
          </div>
          <div
            className="col-lg-6 offset-xl-1"
            data-aos="fade-up-sm"
            data-aos-delay="100"
          >
            <SVGProvider type="aboutimage" />
          </div>
        </div>
        <hr className="border-top border-dark-blue opacity-100" />
        <SVGProvider type="aboutimage1" />
      </div>
    </section>
  );
};
export default AboutCard;
