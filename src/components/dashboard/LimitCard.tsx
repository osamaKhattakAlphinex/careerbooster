"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

interface LimitCardProps {
  title: string;
  limit: number;
  used: number;
  setAvailablePercentage: React.Dispatch<React.SetStateAction<number>>;
  setPercentageCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  availablePercentage: number;
}
const LimitCard: React.FC<LimitCardProps> = ({
  title,
  limit,
  used,
  setAvailablePercentage,
  setPercentageCalculated,
  availablePercentage,
}) => {
  // Redux
  const userData = useSelector((state: any) => state.userData);

  // set availalbe percentage when userdata changes
  useEffect(() => {
    const availableLimit = limit - used;
    const percentage = (availableLimit / limit) * 100;

    setAvailablePercentage(percentage);
    setPercentageCalculated(true);
  }, [userData, limit, used]);

  if (used >= limit) {
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
        {/* <div className="bg-red-500 px-3 py-1 rounded-3xl border-gray-950"> */}
        <span className="text-sm text-red-500 ">Credit Limit Reached</span>
        {/* </div> */}
      </>
    );
  } else {
    return (
      <div className="w-1/3">
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
        <div className="w-full flex justify-between mb-1">
          <span className="text-base font-medium ">{title}</span>
          {!isNaN(limit) && !isNaN(used) && (
            <span className="text-sm font-medium ">
              {Number(limit) - Number(used)} out of {Number(limit)}
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className={`bg-${
              availablePercentage > 30 ? "green" : "red"
            }-600 h-2.5 rounded-full`}
            style={{
              width: `${availablePercentage}%`,
            }}
          ></div>
        </div>
      </div>
    );
  }
};
export default LimitCard;
