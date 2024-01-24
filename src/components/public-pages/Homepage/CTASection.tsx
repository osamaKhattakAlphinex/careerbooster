import Image from "next/image";
import Link from "next/link";
const CTASection = () => {
  return (
    <section
      className="cta-section py-10 py-lg-15"
      data-aos="fade-up-sm"
      data-aos-offset="150"
    >
      <div className="container">
        <div className="rounded-5 border-[1px] position-relative z-1 cta">
          <div className="animate-scale position-absolute w-full h-full z-n1">
            <Image
              width={927}
              height={445}
              src="assets/images/shapes/blurry-shape-4.svg"
              alt=""
              className="bg-shape img-fluid"
            />
          </div>
          <div className="row justify-center">
            <div className="col-lg-10">
              <div className="text-center pt-6 px-6 pt-md-10 px-md-10 pt-lg-18 px-lg-18">
                <h5 className="theme-text">Revolutionize Your Job Hunt</h5>
                <h2 className="mb-6 theme-hero-heading md:text-[40px] text-[24px]">
                  Discover the Game-Changing
                  <span className="theme-text"> Resume Strategy </span>
                  You{"'"}ve Been Missing!
                </h2>
                <h5 className="theme-hero-heading mb-6 ">
                  Unlock Success: Tailor Resumes for Each Job in Mere Minutes
                </h5>

                <p>
                  Are you stuck in the resume rut of using a single generic
                  document for every job application? Break free from old-school
                  methods and learn the secret to crafting job-specific resumes
                  effortlessly - in just 2-3 minutes! Don{"'"}t miss out on your
                  dream job - embrace the future of job hunting now!
                </p>

                <Link href="/register" className="btn theme-btn">
                  Get Started Free
                </Link>
                <div className="cta-image-container mt-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 34 90"
                    className="theme-text arrow-shape"
                  >
                    <path
                      fill="currentColor"
                      d="M3.724 2.303c8.095 4.54 13.968 13.648 16.408 22.434 2.336 8.415 2.426 20.276-5.705 25.79-2.961 2.01-7.092 2.24-8.781-1.444-1.571-3.422.29-7.096 3.683-8.452 9.162-3.663 16.334 8.02 18.234 15.324a30.563 30.563 0 0 1 .279 14.195c-.952 4.334-2.866 9.283-6.298 12.254-.494.427-1.3-.29-.971-.84 1.77-2.928 3.677-5.571 4.79-8.851 1.155-3.405 1.62-7.048 1.44-10.626-.358-7.103-3.568-15.745-10.125-19.354-3.476-1.912-10.316-1.353-10.055 3.973.107 2.158 1.647 4.035 3.933 3.81 2.086-.209 4.001-1.766 5.333-3.279 5.427-6.16 4.857-15.89 2.67-23.215a39.21 39.21 0 0 0-5.682-11.577c-2.69-3.76-6.017-6.61-9.592-9.472-.35-.277.039-.896.44-.67Z"
                    />
                    <path
                      fill="currentColor"
                      d="M1.562.977c9.931 2.79 17.058 11.508 19.312 21.4 1.085 4.762 1.187 9.7.548 14.54-.653 4.937-1.854 10.549-4.949 14.589-2.156 2.82-7.305 5.961-10.266 2.388-2.608-3.142-2.18-9.094.45-12.093 2.945-3.356 8.048-2.969 11.491-.718 4.112 2.688 6.675 7.596 8.265 12.12 3.48 9.905 2.395 21.33-3.11 30.327-.527.858-1.947.203-1.423-.676 3.935-6.565 5.559-14.253 4.688-21.84-.443-3.864-1.552-7.677-3.306-11.147-2.011-3.973-5.078-8.396-9.854-8.994-5.273-.66-7.99 4.089-7.3 8.82.403 2.76 1.938 4.99 5.042 4.079 2.519-.74 4.35-3.051 5.51-5.296 3.708-7.194 4.563-16.802 3.066-24.658C17.848 13.969 11.217 4.92 1.373 1.995.736 1.812.917.797 1.563.977Z"
                    />
                    <path
                      fill="currentColor"
                      d="M21.218 73.052c.375 2.062.446 4.204.634 6.29.088.987.18 1.975.266 2.964.04.457-.025 2.873.383 3.085.21.11 2.177-1.456 2.452-1.64l2.452-1.641c1.595-1.065 3.329-2.678 5.205-3.148.671-.169 1.174.542.746 1.106-.792 1.05-1.99 1.644-3.08 2.36-1.23.812-2.464 1.62-3.695 2.432-1.142.748-3.43 3.037-4.974 2.3-1.476-.7-.955-3.793-1.042-5.105-.198-2.945-.602-5.957-.531-8.906a.595.595 0 0 1 1.184-.097Z"
                    />
                    <path
                      fill="currentColor"
                      d="M21.773 73.169c-.032 2.254-.679 4.55-.972 6.789-.338 2.597-.601 5.224-.564 7.844-.465-.225-.933-.454-1.398-.68a76.772 76.772 0 0 0 6.002-4.227c1.876-1.465 3.568-3.521 5.632-4.678.6-.336 1.581.26 1.137.983-1.181 1.924-3.415 3.456-5.165 4.844a64.808 64.808 0 0 1-6.607 4.574c-.694.421-1.465-.14-1.385-.91.27-2.565.462-5.128.849-7.683.348-2.297.616-4.895 1.59-7.019.19-.398.887-.308.88.163Z"
                    />
                    <path
                      fill="currentColor"
                      d="M22.85 71.546c-.873 5.764-1.778 11.525-2.588 17.298-.462-.304-.922-.605-1.384-.91 2.439-1.254 4.864-2.527 7.207-3.954 2.158-1.317 4.212-3.127 6.536-4.109.733-.31 1.331.688.841 1.25-1.713 1.972-4.396 3.318-6.619 4.634-2.326 1.378-4.712 2.663-7.172 3.78-.633.287-1.294-.395-1.174-1.015 1.098-5.725 2.104-11.464 3.137-17.2.137-.79 1.337-.563 1.215.226Z"
                    />
                  </svg>
                  <div className="cta-img rounded-top-4">
                    <Image
                      width={758}
                      height={712}
                      src="/assets/images/screens/cover-letter.png"
                      alt=""
                      className="img-fluid w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTASection;