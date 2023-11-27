"use client";
import Link from "next/link";
import Script from "next/script";
const FileCard = ({
  file,
  email,
}: {
  file: string;
  email?: string | null | undefined;
}) => {
  const url = `/files/userResumes/${email}/${file}`;
  return (
    <div className="">
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
      <div className="w-full   ">
        <p className="text-gray-400">
          {file.substring(file.lastIndexOf("/") + 1)}
        </p>

        <div className="">
          <Link
            href={`${url.replace(/^\/public/, "")}`}
            target="_blank"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 "
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FileCard;
