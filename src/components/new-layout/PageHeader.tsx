import Script from "next/script";
import Link from "next/link";

interface Props {
  title?: string;
  secondTitle?: string;
}
const PageHeader: React.FC<Props> = ({ title, secondTitle }) => {
  return (
    <section
      className="pb-10 pb-lg-15 bg-striped pt-40"
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
      <div className="container">
        <div className="text-center">
          <h3 className="theme-text-2 mb-2">{title}</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-center fs-sm">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {secondTitle ? secondTitle : title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};
export default PageHeader;
