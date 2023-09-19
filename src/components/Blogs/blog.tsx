import Link from "next/link";

export default function Blog(props: any) {
  return (
    <section className="pt-20 pb-10 pt-lg-30 pb-lg-15">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-6 gy-10 gy-lg-16">
          <div className="col-md-4" data-aos="fade-up-sm" data-aos-delay="50">
            <div className="blog-card card border-0">
              <div className="card-header border-0 bg-transparent ratio ratio-6x4 rounded overflow-hidden">
                <Link href="article.html" className="d-block">
                  <img
                    src={props.src}
                    alt=""
                    className="img-fluid post-thumbnail w-full h-full object-cover"
                  />
                </Link>
              </div>
              <div className="card-body p-0 mt-6">
                <ul className="list-unstyled d-flex flex-wrap align-center fs-sm meta-list">
                  <li>{props.category}</li>
                  <li>{props.date}</li>

                  <li>{props.minutesViewed}</li>
                </ul>

                <h4 className="post-title fw-medium mb-0">
                  <Link href="article.html">{props.title}</Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
