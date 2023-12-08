import Image from "next/image";

const FeaturesCard = () => {
  return (
    <section className="py-10 py-lg-15">
      <div className="container">
        <div className="text-center mb-18">
          <h2
            className="text-white mb-0"
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            Generate Creative AI Copy On-The-Spot,
            <br className="d-none d-lg-block" />
            Across Your Favorite Tools
          </h2>
        </div>

        <div className="row row-cols-1 row-cols-lg-3 g-6 g-xl-14">
          <div className="col" data-aos="fade-up-sm" data-aos-delay="50">
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <g
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M30.167 10c-1.833 4.855-3.167 8.188-4 10m0 0c-3.132 6.813-6.188 10-10 10-4 0-8-4-8-10s4-10 8-10c3.778 0 6.892 3.31 10 10Zm0 0c.853 1.837 2.187 5.17 4 10" />
                  </g>
                </svg>
              </div>
              <div className="content">
                <h4 className="text-white mb-4">Generates quality contents</h4>
                <p>
                  This tool helps you find the right keywords to target for your
                  content. By using the Google Keyword Planner, you can see how
                  often people
                </p>
              </div>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="100">
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <g
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M3.333 20 20 32.37 36.666 20" />
                    <path d="M11.667 15 20 21.667 28.334 15m-10.001-5L20 11.333 21.666 10 20 8.666 18.333 10Z" />
                  </g>
                </svg>
              </div>
              <div className="content">
                <h4 className="text-white mb-4">Provides Useful Suggestions</h4>
                <p>
                  GenAI writing tools can analyze data and generate insights to
                  help writers create more compelling and informative content.
                </p>
              </div>
            </div>
          </div>
          <div className="col" data-aos="fade-up-sm" data-aos-delay="150">
            <div className="d-flex flex-column gap-6 flex-lg-row">
              <div className="icon w-14 h-14 flex-shrink-0 d-flex align-center justify-center rounded-3 p-2 border bg-gradient-3 text-primary-dark border-white border-opacity-10">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <g
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M10 29.334 6.667 27.5v-4.166m0-6.668V12.5L10 10.666m6.667-3.833L20 5l3.334 1.833M30 10.666l3.333 1.834v4.166m0 6.668V27.5L30 29.367m-6.666 3.799L20 35l-3.333-1.834M20 20l3.333-1.834M30 14.333l3.333-1.833M20 20v4.167m0 6.667V35m0-15-3.333-1.867M10 14.333 6.667 12.5" />
                  </g>
                </svg>
              </div>
              <div className="content">
                <h4 className="text-white mb-4">
                  Improves Products Productivity
                </h4>
                <p>
                  Emotions are a powerful tool in advertising. Use emotions that
                  resonate with your audience to create a connection.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="video-popup-container position-relative"
          data-aos="fade-up-sm"
          data-aos-delay="50"
        >
          <div className="ratio ratio-16x9 rounded-4 overflow-hidden mt-16">
            <Image
              src="assets/images/thumbnails/video-thumb.jpg"
              alt=""
              className="img-fluid w-full h-full object-cover"
            />
          </div>
          <a
            className="video-play-btn bg-primary-dark text-dark"
            href="https://youtu.be/OUFcCoTx8zM"
            data-vbtype="video"
            data-autoplay="true"
            data-maxwidth="1320px"
            data-overlay="rgba(23, 24, 37, 0.95)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="icon"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
export default FeaturesCard;
