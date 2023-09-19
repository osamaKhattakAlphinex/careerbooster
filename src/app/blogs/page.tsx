import Blog from "@/components/Blogs/blog";
import BlogPagination from "@/components/Blogs/blogpagination";
import AddressCard from "@/components/new-layout/Contact/AddressCard";
import ContactForm from "@/components/new-layout/Contact/ContactForm";
import MapCard from "@/components/new-layout/Contact/MapCard";
import CTASection from "@/components/new-layout/Homepage/CTASection";
import PageHeader from "@/components/new-layout/PageHeader";

export default function BlogsPage() {
  return (
    <main className="flex-grow-1 mb-20">
      {/* <!-- Page header --> */}
      <PageHeader title="Blog Posts" />
      <Blog
        src="assets/images/thumbnails/1.jpg"
        category="Design"
        date="2 - 4 - 2023"
        minutesViewed="5 Minutes Read"
        title=" Best free AI content generator & AI writers for 2023"
      />
      <BlogPagination />

      {/*<!-- CTA --> */}
      <CTASection />
    </main>
  );
}
