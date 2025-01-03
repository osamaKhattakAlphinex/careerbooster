import Image from "next/image";
import Link from "next/link";

const TeamCard = () => {
  return (
    <section className="py-10 lg:py-20  dark:bg-gray-950 bg-gray-100">
      <div className="md:container xs:px-6">
        <div className="flex justify-center pb-16">
          <div className="flex flex-col w-9/12">
            <div>
              <h1 className="text-center md:text-[48px] text-[24px] dark:text-gray-100 text-gray-950 font-semibold">
                <span className="text-[#6a4dff] dark:text-[#e6f85e]">
                  CareerBooster.AI{" "}
                </span>{" "}
                is Powered by a <br className="xl:block hidden" />
                Dynamic Team.
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mx-auto  gap-y-10 md:gap-y-12 lg:gap-y-18">
          <div className="flex flex-col w-full md:w-4/12 xl:w-3/12">
            <div className="text-center">
              <Image
                width={200}
                height={200}
                src="/assets/images/team/team-1.jpg"
                alt=""
                className="w-[200px] h-[200px] object-cover rounded-full inline-block mb-6"
              />
              <h4 className="dark:text-gray-100 text-gray-950 font-semibold mb-1 text-[1.5rem]">
                Mubasher Hassan
              </h4>
              <p className="text-sm mb-2 dark:text-gray-100 text-gray-950">
                CEO & Co-Founder
              </p>
              <ul className="flex flex-wrap justify-center items-center gap-3  mb-0">
                <li>
                  <Link
                    href="https://www.facebook.com/mubasherhassan.k"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                      className="w-6 h-6 dark:text-gray-100 text-gray-950"
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
                      className="w-4 h-4    dark:text-gray-100 text-gray-950 "
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
          <div className="flex flex-col md:w-4/12 xl:w-3/12">
            <div className="text-center">
              <Image
                width={200}
                height={200}
                src="/assets/images/team/team-2.jpg"
                alt=""
                className="w-[200px] h-[200px] object-cover rounded-full inline-block mb-6"
              />
              <h4 className="text-gray-950 font-semibold dark:text-gray-100 mb-1 text-[1.5rem]">
                M. Suleman Ibrahim
              </h4>
              <p className="text-sm mb-2">CTO & Co-Founder</p>
              <ul className="flex flex-wrap justify-center items-center gap-3  mb-0">
                <li>
                  <Link
                    href="https://www.facebook.com/m.suleman.ibrahim.k"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18 "
                      className="w-6 h-6 dark:text-gray-100 text-gray-950"
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
                      className="w-4 h-4    dark:text-gray-100 text-gray-950"
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
          {/* <div className="col"  data-aos-delay="150">
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
          <div className="col"  data-aos-delay="200">
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
          <div className="col"  data-aos-delay="150">
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
          <div className="col"  data-aos-delay="200">
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
