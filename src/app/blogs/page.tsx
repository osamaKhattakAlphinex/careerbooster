import Blog from "@/components/Blogs/blog";
import BlogPagination from "@/components/Blogs/blogpagination";
import AddressCard from "@/components/new-layout/Contact/AddressCard";
import ContactForm from "@/components/new-layout/Contact/ContactForm";
import MapCard from "@/components/new-layout/Contact/MapCard";
import CTASection from "@/components/new-layout/Homepage/CTASection";
import PageHeader from "@/components/new-layout/PageHeader";
import { Metadata } from "next";
import Script from "next/script";
export const metadata: Metadata = {
  title: "CareerBooster.AI-Blogs",
  description:
    "Explore insightful articles on career growth, job hunting, and resume optimization at CareerBooster's blog. Stay updated with expert tips and strategies to supercharge your professional journey. Unleash your potential with our informative blog posts",
  keywords: [
    "CareerBooster.AI",
    "AI-powered tools",
    "ATS-friendly resumes",
    "Executive resumes",
    "Professional image",
    "Competitive job market",
    "Job hunt transformation",
    "Career advancement",
    "20,000+ professionals",
    "Revolutionize job search",
    "CareerBooster.AI About ",
    "About CareerBooster.AI",
    "careerBooster.AI Blogs",
    "Blogs CareerBooster.AI",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function BlogsPage() {
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
      <main className="flex-grow-1 mb-20">
        {/* <!-- Page header --> */}
        <PageHeader title="Blog Posts" />
        <Blog
          src="/assets/images/thumbnails/1.jpg"
          category="Design"
          date="2 - 4 - 2023"
          minutesViewed="5 Minutes Read"
          title=" Best free AI content generator & AI writers for 2023"
        />
        <BlogPagination />

        {/*<!-- CTA --> */}
        <CTASection />
      </main>
    </>
  );
}
