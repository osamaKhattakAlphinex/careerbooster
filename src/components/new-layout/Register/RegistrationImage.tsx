import Image from "next/image";
import Script from "next/script";
const RegistrationImage = () => {
  return (
    <div
      className="col-lg-6 d-none d-lg-block"
      data-aos="fade-up-sm"
      data-aos-delay="50"
    >
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
      <div className="bg-dark-blue-4 border rounded-4  p-6 p-md-20 text-center d-flex flex-column justify-center">
        <h2 className="text-white mb-12">
          Unlock the Power of <br className="d-none d-xl-block" />
          <span className="text-primary-dark">Career Booster</span>{" "}
        </h2>
        <Image
          width={622}
          height={450}
          src="assets/images/screens/screen-5.png"
          alt=""
          className="img-fluid w-full"
        />
      </div>
    </div>
  );
};
export default RegistrationImage;
