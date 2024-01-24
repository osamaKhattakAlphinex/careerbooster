import Blog from "@/components/Blogs/blog";
import BlogPagination from "@/components/Blogs/blogpagination";
import AddressCard from "@/components/Contact/AddressCard";
import ContactForm from "@/components/Contact/ContactForm";
import MapCard from "@/components/Contact/MapCard";
import CTASection from "@/components/Homepage/CTASection";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import "@/app/plugins.css";
import "@/app/style.css";
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
