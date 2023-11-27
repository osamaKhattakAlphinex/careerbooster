"use client";
import Script from "next/script";
import useTheme from "@/lib/useTheme";
import Image from "next/image";

export default function HeroImagesCard() {
  const [theme] = useTheme();

  let url = "/assets/images/review-logos/trustpilot_reviews_2.svg";
  let url2 = "/assets/images/review-logos/capterra_reviews_2.svg";

  if (theme === "dark") {
    url = "/assets/images/review-logos/trustpilot_reviews.svg";
    url2 = "/assets/images/review-logos/capterra_reviews.svg";
  }

  return (
    <div className="d-flex gap-8 align-center justify-center mt-12 review-badges">
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
      <Image width={185} height={38} className="img-fluid" src={url} alt="" />
      <Image width={185} height={38} className="img-fluid" src={url2} alt="" />
    </div>
  );
}
