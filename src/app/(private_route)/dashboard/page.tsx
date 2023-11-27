import ProfileCompletionAlert from "@/components/dashboard/ProfileCompletionAlert";
import ToolsCard from "@/components/dashboard/ToolsCard";
// import TrainBotCard from "@/components/dashboard/TrainBotCard";
import UploadedFilesCard from "@/components/dashboard/UploadedFilesCard";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecenResumesCard";
import Script from "next/script";
const Dashboard = () => {
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
      <section className="dashborad admin-dashboard flex flex-col gap-4  pb-30 pl-20">
        <div className="flex flex-col gap-4 py-30">
          <ProfileCompletionAlert />
          <WelcomeCard />

          <div className="flex gap-4">
            {/* <UploadedFilesCard /> */}
            <div className="w-full toolscard  border border-gray-200 rounded-lg shadow sm:p-6 mr-10 ">
              <RecentResumeCard source="dashboard" />
            </div>
          </div>
        </div>

        <div className="">
          <ToolsCard />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
