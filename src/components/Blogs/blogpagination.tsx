import Link from "next/link";
import Script from "next/script";
export default function BlogPagination() {
  return (
    <div className="text-center mt-18">
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
      <ul className="pagination flex-wrap justify-center gap-4">
        <li className="page-item">
          <Link className="page-link disabled" href="#" aria-label="Previous">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M5 12h14M5 12l4 4m-4-4 4-4" />
            </svg>
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            1
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link active" href="#">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            ...
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            10
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#" aria-label="Next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M5 12h14m-4 4 4-4m-4-4 4 4" />
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
}
