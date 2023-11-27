import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
export default function Blog(props: any) {
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
      <section className="pt-20 pb-10 pt-lg-30 pb-lg-15">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-6 gy-10 gy-lg-16">
            <div className="col-md-4" data-aos="fade-up-sm" data-aos-delay="50">
              <div className="blog-card card border-0">
                <div className="card-header border-0 bg-transparent ratio ratio-6x4 rounded overflow-hidden">
                  <Link href="article.html" className="d-block">
                    <Image
                      width={348}
                      height={227}
                      src={props.src}
                      alt=""
                      className="img-fluid post-thumbnail w-full h-full object-cover"
                    />
                  </Link>
                </div>
                <div className="card-body p-0 mt-6">
                  <ul className="list-unstyled d-flex flex-wrap align-center fs-sm meta-list">
                    <li>{props.category}</li>
                    <li>{props.date}</li>

                    <li>{props.minutesViewed}</li>
                  </ul>

                  <h4 className="post-title fw-medium mb-0">
                    <Link href="article.html">{props.title}</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
