import ViewPackage from "@/components/admin/linkedin-prompts/user-packages/ViewPackage";

const AdminUserPacakges = () => {
  return (
    <div className="mb-40 pt-16">
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
      ></Script>
      <Script>
        {`

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-NDN7TY5F2W');
        `}
      </Script>
      <ViewPackage />
    </div>
  );
};

export default AdminUserPacakges;
