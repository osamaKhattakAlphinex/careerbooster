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

      <section className="pt-20 pb-10 pt-lg-30 pb-lg-15">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-6 gy-10 gy-lg-16">
            <div className="col" data-aos="fade-up-sm" data-aos-delay="50">
              <div className="blog-card card border-0">
                <div className="card-header border-0 bg-transparent ratio ratio-6x4 rounded overflow-hidden">
                  <a href="article.html" className="d-block">
                    <img
                      src="assets/images/thumbnails/1.jpg"
                      alt=""
                      className="img-fluid post-thumbnail w-full h-full object-cover"
                    />
                  </a>
                </div>
                <div className="card-body p-0 mt-6">
                  <ul className="list-unstyled d-flex flex-wrap align-center fs-sm meta-list">
                    <li>Design</li>
                    <li>14 March 2023</li>
                    <li>5 Min. Read</li>
                  </ul>

                  <h4 className="post-title fw-medium mb-0">
                    <a href="article.html">
                      Best free AI content generator & AI writers for 2023
                    </a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col" data-aos="fade-up-sm" data-aos-delay="100">
              <div className="blog-card card border-0">
                <div className="card-header border-0 bg-transparent ratio ratio-6x4 rounded overflow-hidden">
                  <a href="article.html" className="d-block">
                    <img
                      src="assets/images/thumbnails/2.jpg"
                      alt=""
                      className="img-fluid post-thumbnail w-full h-full object-cover"
                    />
                  </a>
                </div>
                <div className="card-body p-0 mt-6">
                  <ul className="list-unstyled d-flex flex-wrap align-center fs-sm meta-list">
                    <li>ChatGPT</li>
                    <li>14 March 2023</li>
                    <li>5 Min. Read</li>
                  </ul>

                  <h4 className="post-title fw-medium mb-0">
                    <a href="article.html">
                      Using AI to Write Articles: how I churn out 2000 words
                    </a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col" data-aos="fade-up-sm" data-aos-delay="150">
              <div className="blog-card card border-0">
                <div className="card-header border-0 bg-transparent ratio ratio-6x4 rounded overflow-hidden">
                  <a href="article.html" className="d-block">
                    <img
                      src="assets/images/thumbnails/3.jpg"
                      alt=""
                      className="img-fluid post-thumbnail w-full h-full object-cover"
                    />
                  </a>
                </div>
                <div className="card-body p-0 mt-6">
                  <ul className="list-unstyled d-flex flex-wrap align-center fs-sm meta-list">
                    <li>AI Tool</li>
                    <li>14 March 2023</li>
                    <li>5 Min. Read</li>
                  </ul>

                  <h4 className="post-title fw-medium mb-0">
                    <a href="article.html">
                      Free AI content generator tools and free-forever AI
                      writers in 2023
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-18">
            <ul className="pagination flex-wrap justify-center gap-4">
              <li className="page-item">
                <a
                  className="page-link disabled"
                  href="#"
                  aria-label="Previous"
                >
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
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link active" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  10
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
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
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/*<!-- CTA --> */}
      <CTASection />
    </main>
  );
}
