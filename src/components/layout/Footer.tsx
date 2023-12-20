import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-striped pt-10 pt-lg-15">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
             (function(c,l,a,r,i,t,y){
                 c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
                 t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                 y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
             })(window, document, "clarity", "script", "jum6bniqm4");
            `,
            }}
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-NDN7TY5F2W"
          ></script>
        </Head>
        <div className="container">
          <div className="row g-10">
            <div className="col-lg-9 col-xl-8 order-lg-2">
              <div className="row g-6">
                <div className="col-md-4 col-lg-4">
                  <div className="footer-widget text-center text-md-start">
                    <h6 className="theme-text-2 mb-2">CareerBooster.AI</h6>
                    <ul className="link-list list-unstyled mb-0">
                      <li>
                        <Link href="/about">About</Link>
                      </li>
                      {/* <li>
                      <Link href="/blog">Blog</Link>
                    </li> */}
                      <li>
                        <Link href="/login">Sign in</Link>
                      </li>
                      <li>
                        <Link href="/register">Register</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="footer-widget text-center text-md-start">
                    <h6 className="theme-text-2 mb-2">Use Cases</h6>
                    <ul className="link-list list-unstyled mb-0">
                      <li>
                        <Link href="/use-cases">Generate Resumes</Link>
                      </li>
                      <li>
                        <Link href="/use-cases">Generate Cover Letters</Link>
                      </li>
                      <li>
                        <Link href="/use-cases">Generate Follow up Emails</Link>
                      </li>
                      <li>
                        <Link href="/use-cases">LinkedIn Optimization</Link>
                      </li>
                      <li>
                        <Link href="/use-cases">Generate Consulting Bids</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="footer-widget text-center text-md-start">
                    <h6 className="theme-text-2 mb-4">Get connected</h6>
                    {/* <form>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control form-control-2"
                        placeholder="Enter your email"
                      />
                      <button
                        className="btn btn-primary-dark px-4"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m4.031 8.917 15.477-4.334a.5.5 0 0 1 .616.617l-4.333 15.476a.5.5 0 0 1-.94.067l-3.248-7.382a.5.5 0 0 0-.256-.257L3.965 9.856a.5.5 0 0 1 .066-.94v0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </form> */}
                    <ul className="list-unstyled d-flex flex-wrap align-center justify-center justify-md-start gap-3 social-list mb-0 mt-5">
                      <li>
                        <Link
                          href="https://www.facebook.com/careerboosterai"
                          target="_blank"
                        >
                          <svg
                            className="theme-text-2 "
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M15.75 6v6A3.75 3.75 0 0 1 12 15.75H6A3.75 3.75 0 0 1 2.25 12V6A3.75 3.75 0 0 1 6 2.25h6A3.75 3.75 0 0 1 15.75 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M8.25 15.75V9c0-1.641.375-3 3-3m-4.5 3.75h4.5"
                            />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.linkedin.com/company/careerboosterai/"
                          target="_blank"
                        >
                          <svg
                            className="w-4 h-4 
                          theme-text-2 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 15 15"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                              clipRule="evenodd"
                            />
                            <path d="M3 5.012H0V15h3V5.012Z" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.instagram.com/careerboosterai/"
                          target="_blank"
                        >
                          <svg
                            className="theme-text-2 "
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeWidth="1.5"
                              d="M2.25 12V6A3.75 3.75 0 0 1 6 2.25h6A3.75 3.75 0 0 1 15.75 6v6A3.75 3.75 0 0 1 12 15.75H6A3.75 3.75 0 0 1 2.25 12Z"
                            />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 order-lg-1 me-auto mt-4">
              <div className="footer-widget text-center text-lg-start">
                <div className="flex  items-center">
                  <Image
                    width={80}
                    height={74}
                    src="/trans-icon1.png"
                    alt="icon"
                    className="w-20 m-0"
                  />
                  <span className="ml-[-15px] logo-text font-semibold">
                    CareerBooster
                  </span>
                </div>
                <p className="fs-sm mb-0 mt-4">
                  We specialize in turbocharging your career by harnessing the
                  power of cutting-edge AI-infused tools, ensuring you achieve
                  peak professional excellence. Our innovative solutions are
                  designed to elevate your skills, enhance your professional
                  profile, and propel your career to unprecedented success.
                </p>
              </div>
            </div>
          </div>

          <div className="py-6 mt-8 mx-auto ">
            <p className="text-center text-xs ">
              Copyright <span> &copy; CareerBooster 2023</span>.{" "}
              <Link href="/privacy-policy" className="theme-text-2">
                Privacy Policy
              </Link>{" "}
              &nbsp;
              <Link href="/terms-and-conditions" className="theme-text-2">
                Terms And Conditions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
