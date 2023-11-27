import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
export default function NotFound() {
  return (
    <>
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

      <main className="flex-grow-1 ">
        <section className="py-10 py-lg-26">
          <div className="container">
            <div className="row justify-center">
              <div className="col-lg-6">
                <div className="text-center">
                  <Image
                    width={530}
                    height={335}
                    src="assets/images/illustrations/error-yellow.svg"
                    alt=""
                    className="img-fluid mb-10"
                  />
                  <h2 className="text-white mb-4">Oops! Page Not Found.</h2>
                  <p className="mb-8">
                    The page you are looking for is not available or has been
                    moved. Try a different page or go to homepage with the
                    button below.
                  </p>
                  <Link href="/" className="btn btn-primary-dark">
                    Go to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
