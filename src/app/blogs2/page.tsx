import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
export default function Blogs() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      author: "John Doe",
      date: "October 10, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      id: 2,
      title: "State Management in React",
      author: "Jane Smith",
      date: "October 15, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content: "In React, state management can be achieved using...",
    },
    {
      id: 3,
      title: "React Hooks: A Comprehensive Guide",
      author: "James Johnson",
      date: "October 20, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content: "React introduced hooks to allow functional components...",
    },
    {
      id: 4,
      title: "The Power of Component Composition",
      author: "Sarah Brown",
      date: "October 25, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content: "In React, you can compose components to create more...",
    },
    {
      id: 5,
      title: "Best Practices for React Routing",
      author: "Michael Wilson",
      date: "October 30, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content:
        "Routing is an essential part of building single-page applications...",
    },
    {
      id: 6,
      title: "Styling in React with CSS Modules",
      author: "Emily Davis",
      date: "November 5, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content: "Learn how to style your React components using CSS Modules...",
    },
    {
      id: 7,
      title: "Server-Side Rendering with Next.js",
      author: "David Anderson",
      date: "November 10, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content: "Next.js allows you to implement server-side rendering...",
    },
    {
      id: 8,
      title: "Testing React Components with Jest and Enzyme",
      author: "Lisa Garcia",
      date: "November 15, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content:
        "Ensure the reliability of your React components by writing tests...",
    },
    {
      id: 9,
      title: "Optimizing Performance in React Apps",
      author: "Chris Martin",
      date: "November 20, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content: "Improve the performance of your React applications through...",
    },
    {
      id: 10,
      title: "Building a Real-Time Chat App with React and Firebase",
      author: "Daniel Clark",
      date: "November 25, 2023",
      src: "/assets/images/thumbnails/1.jpg",
      content: "Create a chat application with React and Firebase to enable...",
    },
  ];

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
      <section className="pt-40">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-6 gy-10 gy-lg-16">
            {blogPosts.map((item) => {
              return (
                <>
                  <div
                    className="col-md-4"
                    data-aos="fade-up-sm"
                    data-aos-delay="50"
                  >
                    <div className="blog-card card border-0">
                      <div className="card-header flex  border-0 bg-transparent ratio ratio-6x4 rounded overflow-hidden">
                        <Link
                          href={`/blogs2/${item.title}`}
                          className="d-block"
                        >
                          <Image
                            width={348}
                            height={227}
                            src={item.src}
                            alt=""
                            className="img-fluid post-thumbnail w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      <div className="card-body p-0 mt-6">
                        <ul className="list-unstyled d-flex flex-wrap align-center fs-sm meta-list">
                          <li>{item.date}</li>
                          <li>{item.author}</li>
                        </ul>

                        <h4 className="post-title fw-medium mb-0">
                          <Link href={`/blogs2/${item.title}`}>
                            {item.title}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
