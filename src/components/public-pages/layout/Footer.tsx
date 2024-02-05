import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="bg-[url('/assets/images/shapes/stripe-light.svg')] bg-[#fff] dark:bg-[#171825] bg-no-repeat dark:bg-[url('/assets/images/shapes/stripe-dark.svg')] bg-cover bg-center ">
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
        <div className="">
          <div className=" flex lg:flex-row xs:flex-col justify-between md:px-20 xs:px-10 xs:text-center  md:gap-8 gap-4 py-8 md:text-left">
            <div className="lg:w-4/12 xs:w-full">
              <div className="flex  items-center xs:text-center md:text-left xs:justify-center md:justify-start">
                <Image
                  width={80}
                  height={74}
                  src="/trans-icon1.png"
                  alt="icon"
                  className="w-20 m-0"
                />
                <span className=" text-gray-950 dark:text-[#e6f85e] font-semibold">
                  CareerBooster
                </span>
              </div>
              <p className="mb-0 text-gray-950 text-sm lg:pr-4 dark:text-gray-300">
                We specialize in turbocharging your career by harnessing the
                power of cutting-edge AI-infused tools, ensuring you achieve
                peak professional excellence. Our innovative solutions are
                designed to elevate your skills, enhance your professional
                profile, and propel your career to unprecedented success.
              </p>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-4 lg:py-6 w-full">
              <div className="lg:px-5  text-gray-950 mb-2 dark:text-gray-100">
                <h6 className="text-gray-950 mb-2 text-xl font-semibold dark:text-gray-100 ">
                  CareerBooster.AI
                </h6>
                <ul className="link-list-t mb-0 pl-0 list-none ">
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
              <div className="lg:px-5 ">
                <h6 className=" mb-2 text-gray-950 dark:text-gray-100 text-xl font-semibold">
                  Use Cases
                </h6>
                <ul className="link-list-t mb-0 pl-0 list-none">
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
              <div className="lg:px-5">
                <h6 className="text-gray-950 text-xl font-semibold dark:text-gray-100 mb-4">
                  Contact Us
                </h6>
                <ul className=" flex flex-col mb-0 pl-0">
                  <li className="hover:pl-[5px] hover:text-[#6a4dff]  dark:hover:text-[#e6f85e] text-[#11121c] dark:text-gray-300 inline-block text-[0.875rem] pl-0 py-2 no-underline">
                    <Link href="">
                      23 The Atria 219 Bath Road <br /> Slough SL1 4BF, United
                      Kingdom
                    </Link>
                  </li>
                  <li className="hover:pl-[5px] hover:text-[#6a4dff] dark:hover:text-[#e6f85e] text-[#11121c] dark:text-gray-300 inline-block text-[0.875rem] py-2 no-underline">
                    <Link href="">+44 7933 951034</Link>
                  </li>
                  <li className="hover:pl-[5px] hover:text-[#6a4dff] dark:hover:text-[#e6f85e] text-[#11121c] dark:text-gray-300 inline-block text-[0.875rem] py-2 no-underline">
                    <Link href="">support@careerbooster.ai</Link>
                  </li>
                </ul>
                <ul className="flex flex-wrap align-center justify-center justify-md-start gap-3 mb-0 mt-5">
                  <li>
                    <Link
                      href="https://www.facebook.com/careerboosterai"
                      target="_blank"
                    >
                      <svg
                        className="text-[#000] dark:text-gray-300 w-4 h-4 "
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
                        className=" 
                          text-[#000] dark:text-gray-300 w-4 h-4 "
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
                        className="text-[#000] dark:text-gray-300 w-4 h-4"
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

          <div className="py-6 lg:mt-8 mx-auto xs:container ">
            <p className="text-center text-xs text-gray-950 dark:text-gray-100 ">
              Copyright <span> &copy; CareerBooster 2023</span>.{" "}
              <Link
                href="/privacy-policy"
                className="text-[#6a4dff] dark:text-[#e6f85e] mx-4 no-underline hover:text-blue-400 dark:hover:text-blue-400"
              >
                Privacy Policy
              </Link>{" "}
              &nbsp;
              <Link
                href="/terms-and-conditions"
                className="text-[#6a4dff] dark:text-[#e6f85e] mx-4 no-underline hover:text-blue-400 dark:hover:text-blue-400"
              >
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
