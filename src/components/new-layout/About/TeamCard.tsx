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
              <h1 className="text-white md:text-[48px] text-[24px]">
                <span className="text-primary-dark">Career Booster.</span> is
                Powered by a <br className="d-none d-xl-block" />
                Dynamic Team.
              </h1>
            </div>
          </div>
        </div>

        <div className="row justify-center row-cols-1 row-cols-md-3 row-cols-xl-4 gy-10 gy-md-12 gy-lg-18">
          <div className="col" data-aos="fade-up-sm" data-aos-delay="50">
            <div className="team-card text-center">
              <img
                src="assets/images/team/1.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="text-white mb-1">Annette Black</h4>
              <p className="fs-sm mb-2">Digital Marketer</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link href="#">
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
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
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
                        d="M17.25 2.258s-1.514.894-2.355 1.147A3.36 3.36 0 0 0 9 5.655v.75a7.995 7.995 0 0 1-6.75-3.397s-3 6.75 3.75 9.75a8.73 8.73 0 0 1-5.25 1.5c6.75 3.75 15 0 15-8.625a3.34 3.34 0 0 0-.06-.623c.765-.754 1.56-2.752 1.56-2.752Z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="100">
            <div className="team-card text-center">
              <img
                src="assets/images/team/2.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="text-white mb-1">Jenny Wilson</h4>
              <p className="fs-sm mb-2">Product Designer</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link href="#">
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
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
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
                        d="M17.25 2.258s-1.514.894-2.355 1.147A3.36 3.36 0 0 0 9 5.655v.75a7.995 7.995 0 0 1-6.75-3.397s-3 6.75 3.75 9.75a8.73 8.73 0 0 1-5.25 1.5c6.75 3.75 15 0 15-8.625a3.34 3.34 0 0 0-.06-.623c.765-.754 1.56-2.752 1.56-2.752Z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="150">
            <div className="team-card text-center">
              <img
                src="assets/images/team/3.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="text-white mb-1">Guy Hawkins</h4>
              <p className="fs-sm mb-2">Marketing Coordinator</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link href="#">
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
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
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
                        d="M17.25 2.258s-1.514.894-2.355 1.147A3.36 3.36 0 0 0 9 5.655v.75a7.995 7.995 0 0 1-6.75-3.397s-3 6.75 3.75 9.75a8.73 8.73 0 0 1-5.25 1.5c6.75 3.75 15 0 15-8.625a3.34 3.34 0 0 0-.06-.623c.765-.754 1.56-2.752 1.56-2.752Z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="200">
            <div className="team-card text-center">
              <img
                src="assets/images/team/4.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="text-white mb-1">Jane Cooper</h4>
              <p className="fs-sm mb-2">Digital Creator</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link href="#">
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
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
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
                        d="M17.25 2.258s-1.514.894-2.355 1.147A3.36 3.36 0 0 0 9 5.655v.75a7.995 7.995 0 0 1-6.75-3.397s-3 6.75 3.75 9.75a8.73 8.73 0 0 1-5.25 1.5c6.75 3.75 15 0 15-8.625a3.34 3.34 0 0 0-.06-.623c.765-.754 1.56-2.752 1.56-2.752Z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="50">
            <div className="team-card text-center">
              <img
                src="assets/images/team/5.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="text-white mb-1">Courtney Henry</h4>
              <p className="fs-sm mb-2">Web Designer</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link href="#">
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
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
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
                        d="M17.25 2.258s-1.514.894-2.355 1.147A3.36 3.36 0 0 0 9 5.655v.75a7.995 7.995 0 0 1-6.75-3.397s-3 6.75 3.75 9.75a8.73 8.73 0 0 1-5.25 1.5c6.75 3.75 15 0 15-8.625a3.34 3.34 0 0 0-.06-.623c.765-.754 1.56-2.752 1.56-2.752Z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="100">
            <div className="team-card text-center">
              <img
                src="assets/images/team/6.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="text-white mb-1">Ralph Edwards</h4>
              <p className="fs-sm mb-2">Software Engineer</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link href="#">
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
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
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
                        d="M17.25 2.258s-1.514.894-2.355 1.147A3.36 3.36 0 0 0 9 5.655v.75a7.995 7.995 0 0 1-6.75-3.397s-3 6.75 3.75 9.75a8.73 8.73 0 0 1-5.25 1.5c6.75 3.75 15 0 15-8.625a3.34 3.34 0 0 0-.06-.623c.765-.754 1.56-2.752 1.56-2.752Z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="150">
            <div className="team-card text-center">
              <img
                src="assets/images/team/7.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="text-white mb-1">Arlene McCoy</h4>
              <p className="fs-sm mb-2">Lead Developer</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link href="#">
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
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
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
                        d="M17.25 2.258s-1.514.894-2.355 1.147A3.36 3.36 0 0 0 9 5.655v.75a7.995 7.995 0 0 1-6.75-3.397s-3 6.75 3.75 9.75a8.73 8.73 0 0 1-5.25 1.5c6.75 3.75 15 0 15-8.625a3.34 3.34 0 0 0-.06-.623c.765-.754 1.56-2.752 1.56-2.752Z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="200">
            <div className="team-card text-center">
              <img
                src="assets/images/team/8.png"
                alt=""
                className="img-fluid team-member-img mb-6"
              />
              <h4 className="text-white mb-1">Devon Lane</h4>
              <p className="fs-sm mb-2">President of Sales</p>
              <ul className="list-unstyled d-flex flex-wrap justify-center align-center gap-3 social-list mb-0">
                <li>
                  <Link href="#">
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
                  <Link href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
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
                        d="M17.25 2.258s-1.514.894-2.355 1.147A3.36 3.36 0 0 0 9 5.655v.75a7.995 7.995 0 0 1-6.75-3.397s-3 6.75 3.75 9.75a8.73 8.73 0 0 1-5.25 1.5c6.75 3.75 15 0 15-8.625a3.34 3.34 0 0 0-.06-.623c.765-.754 1.56-2.752 1.56-2.752Z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TeamCard;
