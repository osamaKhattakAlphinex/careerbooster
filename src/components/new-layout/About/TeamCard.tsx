import Image from "next/image";
import Link from "next/link";

const TeamCard = () => {
  return (
    <section className="py-10 py-lg-15">
      <div className="container">
        <div className="row justify-center mb-18">
          <div className="col-lg-9">
            <div
              className="text-center"
              data-aos="fade-up-sm"
              data-aos-delay="50"
            >
              <h1 className="theme-text-2 md:text-[48px] text-[24px]">
                <span className="theme-text">CareerBooster.AI </span> is Powered
                by a <br className="d-none d-xl-block" />
                Dynamic Team.
              </h1>
            </div>
          </div>
        </div>

        <div className="row justify-center row-cols-1 row-cols-md-3 row-cols-xl-4 gy-10 gy-md-12 gy-lg-18">
          <div className="col" data-aos="fade-up-sm" data-aos-delay="50">
            <div className="team-card text-center">
              <Image
                width={200}
                height={200}
                src="/assets/images/team/team-1.jpg"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="theme-text-2 mb-1">Mubasher Hassan</h4>
              <p className="fs-sm mb-2">CEO & Co-Founder</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link
                    href="https://www.facebook.com/mubasherhassan.k"
                    target="_blank"
                  >
                    <svg
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
                    href="https://www.linkedin.com/in/mubasherhassan/"
                    target="_blank"
                  >
                    <svg
                      className="w-4 h-4    theme-text-2 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M3 5.012H0V15h3V5.012Z"></path>
                    </svg>
                  </Link>
                </li>
                {/* <li>
                  <Link href="#">
                  <svg className="theme-text-2 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z"></path><path stroke="currentColor" stroke-width="1.5" d="M2.25 12V6A3.75 3.75 0 0 1 6 2.25h6A3.75 3.75 0 0 1 15.75 6v6A3.75 3.75 0 0 1 12 15.75H6A3.75 3.75 0 0 1 2.25 12Z"></path></svg>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="100">
            <div className="team-card text-center">
              <Image
                width={200}
                height={200}
                src="/assets/images/team/team-2.jpg"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="theme-text-2 mb-1">M. Suleman Ibrahim</h4>
              <p className="fs-sm mb-2">CTO & Co-Founder</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link
                    href="https://www.facebook.com/m.suleman.ibrahim.k"
                    target="_blank"
                  >
                    <svg
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
                    href="https://www.linkedin.com/in/suleman-ibrahim/"
                    target="_blank"
                  >
                    <svg
                      className="w-4 h-4    theme-text-2 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M3 5.012H0V15h3V5.012Z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="col" data-aos="fade-up-sm" data-aos-delay="150">
            <div className="team-card text-center">
              <Image
                width={200}
                height={200}
                src="/assets/images/team/team-3.jpg"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="theme-text-2 mb-1">Usama Butt</h4>
              <p className="fs-sm mb-2">Team-Lead/Project Manager</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link
                    href="https://www.facebook.com/profile.php?id=100086943660873"
                    target="_blank"
                  >
                    <svg
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
                    href="https://www.linkedin.com/in/m-usama-butt-a9a536196/"
                    target="_blank"
                  >
                    <svg
                      className="w-4 h-4    theme-text-2 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M3 5.012H0V15h3V5.012Z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="200">
            <div className="team-card text-center">
              <Image
                width={200}
                height={200}
                src="/assets/images/team/team-4.jpg"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="theme-text-2 mb-1">M. Osama Ahmad</h4>
              <p className="fs-sm mb-2">Full Stack Developer</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link
                    href="https://www.facebook.com/profile.php?id=100082069802083"
                    target="_blank"
                  >
                    <svg
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
                    href="https://www.linkedin.com/in/muhammad-osama-a3210720b/"
                    target="_blank"
                  >
                    <svg
                      className="w-4 h-4    theme-text-2 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M3 5.012H0V15h3V5.012Z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="150">
            <div className="team-card text-center">
              <Image
                width={200}
                height={200}
                src="/assets/images/team/team-5.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="theme-text-2 mb-1">Rehmat Ullah</h4>
              <p className="fs-sm mb-2">Full Stack Developer</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link
                    href="https://www.facebook.com/rahmatullah.baheer.9"
                    target="_blank"
                  >
                    <svg
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
                    href="https://www.linkedin.com/in/rahmat-ullah-baheer-977986214/"
                    target="_blank"
                  >
                    <svg
                      className="w-4 h-4    theme-text-2 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M3 5.012H0V15h3V5.012Z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="200">
            <div className="team-card text-center">
              <Image
                width={200}
                height={200}
                src="/assets/images/team/team-6.jpeg"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="theme-text-2 mb-1">Muhammad Waqas</h4>
              <p className="fs-sm mb-2">Full Stack Developer</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link
                    href="https://www.facebook.com/raja.waqas.338"
                    target="_blank"
                  >
                    <svg
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
                    href="https://www.linkedin.com/in/muhammad-waqas-shaukat-39b270a7/"
                    target="_blank"
                  >
                    <svg
                      className="w-4 h-4    theme-text-2 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M3 5.012H0V15h3V5.012Z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};
export default TeamCard;
