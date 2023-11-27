import React from "react";
import Script from "next/script";

type Props = {
  title?: string;
  list: any;
  Component: any;
};

const PreviouslyGeneratedList = ({ title, list, Component }: Props) => {
  if (!list) return;

  return (
    <div className="w-full ">
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
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {list &&
            list.map((item: any, key: number) => {
              return <Component key={key} {...item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default PreviouslyGeneratedList;
