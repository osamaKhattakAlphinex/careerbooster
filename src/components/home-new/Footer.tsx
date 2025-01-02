import React from "react";

function Footer() {
  return (
    <div className=" w-full ">
      {/* Logo and Social Icons */}
      <div className="flex flex-col items-center md:flex-row md:justify-between bg-[url('/bg/footer-bg.png')] min-h-[320px]  bg-cover bg-center bg-no-repeat px-8">
        <div className="flex flex-col items-center mb-4 md:mb-0 w-1/4">
          <img
            src="/bg/logo.svg"
            alt="CareerBooster.ai Logo"
            className="h-10 mb-6"
          />
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                width="38"
                height="36"
                viewBox="0 0 38 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  opacity="0.16"
                  cx="18.9725"
                  cy="18"
                  rx="18.0575"
                  ry="18"
                  fill="white"
                />
                <path
                  d="M23.4 12H25.5636L20.8131 17.3918L26.3632 24.7059H22.0078L18.5978 20.2612L14.6939 24.7059H12.5303L17.563 18.939L12.248 12H16.7117L19.7924 16.0603L23.4 12ZM22.6428 23.44H23.8422L16.0814 13.219H14.7926L22.6428 23.44Z"
                  fill="white"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                width="37"
                height="36"
                viewBox="0 0 37 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  opacity="0.16"
                  cx="18.9413"
                  cy="18"
                  rx="18.0575"
                  ry="18"
                  fill="white"
                />
                <path
                  d="M15.2261 24.7067H12.4361V15.7525H15.2261V24.7067ZM13.8296 14.5311C12.9377 14.5311 12.2139 13.7947 12.2139 12.9055C12.2139 12.4784 12.3841 12.0687 12.6871 11.7667C12.9901 11.4646 13.4011 11.2949 13.8296 11.2949C14.2581 11.2949 14.6691 11.4646 14.9721 11.7667C15.2752 12.0687 15.4454 12.4784 15.4454 12.9055C15.4454 13.7947 14.7216 14.5311 13.8296 14.5311ZM25.6655 24.7067H22.8814V20.3479C22.8814 19.3091 22.8604 17.9769 21.4309 17.9769C19.9803 17.9769 19.7581 19.1055 19.7581 20.273V24.7067H16.9711V15.7525H19.6469V16.974H19.686C20.0584 16.2704 20.9684 15.528 22.3258 15.528C25.1489 15.528 25.6685 17.3811 25.6685 19.788V24.7067H25.6655Z"
                  fill="white"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                width="37"
                height="36"
                viewBox="0 0 37 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  opacity="0.16"
                  cx="18.0575"
                  cy="18"
                  rx="18.0575"
                  ry="18"
                  fill="white"
                />
                <path
                  d="M19.2016 25.4095V18.6483H21.4842L21.8267 16.0125H19.2016V14.33C19.2016 13.5671 19.4139 13.0472 20.5159 13.0472L21.9191 13.0466V10.6891C21.6764 10.6578 20.8434 10.5859 19.8739 10.5859C17.8494 10.5859 16.4634 11.814 16.4634 14.0689V16.0125H14.1738V18.6483H16.4634V25.4095H19.2016Z"
                  fill="white"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                width="38"
                height="36"
                viewBox="0 0 38 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  opacity="0.16"
                  cx="18.9969"
                  cy="18"
                  rx="18.0575"
                  ry="18"
                  fill="white"
                />
                <path
                  d="M26.9886 13.8739C26.7908 13.1364 26.208 12.5554 25.4681 12.3583C24.1271 12 18.7492 12 18.7492 12C18.7492 12 13.3713 12 12.0303 12.3583C11.2904 12.5554 10.7076 13.1364 10.5098 13.8739C10.1504 15.2107 10.1504 18 10.1504 18C10.1504 18 10.1504 20.7893 10.5098 22.1261C10.7076 22.8636 11.2904 23.4446 12.0303 23.6417C13.3713 24 18.7492 24 18.7492 24C18.7492 24 24.1271 24 25.4681 23.6417C26.208 23.4446 26.7908 22.8636 26.9886 22.1261C27.348 20.7893 27.348 18 27.348 18C27.348 18 27.348 15.2107 26.9886 13.8739ZM17.0294 20.5714V15.4286L21.4974 18L17.0294 20.5714Z"
                  fill="white"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                width="38"
                height="36"
                viewBox="0 0 38 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  opacity="0.16"
                  cx="19.0331"
                  cy="18"
                  rx="18.0575"
                  ry="18"
                  fill="white"
                />
                <path
                  d="M19.3875 15.7617C17.9542 15.7617 16.79 16.9222 16.79 18.3509C16.79 19.7796 17.9542 20.9429 19.3875 20.9429C20.8208 20.9429 21.9878 19.7796 21.9878 18.3509C21.9878 16.9222 20.8208 15.7617 19.3875 15.7617Z"
                  fill="white"
                />
                <path
                  d="M23.3073 11.293H15.4668C13.7248 11.293 12.3057 12.7076 12.3057 14.444V22.2596C12.3057 23.9988 13.7248 25.4106 15.4668 25.4106H23.3073C25.0521 25.4106 26.4684 23.9988 26.4684 22.2596V14.444C26.4684 12.7076 25.0521 11.293 23.3073 11.293ZM19.387 22.9259C16.8576 22.9259 14.7983 20.8732 14.7983 18.3518C14.7983 15.8304 16.8576 13.7805 19.387 13.7805C21.9165 13.7805 23.9758 15.8304 23.9758 18.3518C23.9758 20.8732 21.9165 22.9259 19.387 22.9259ZM24.0721 14.6106C23.5367 14.6106 23.1005 14.1786 23.1005 13.645C23.1005 13.1113 23.5367 12.6765 24.0721 12.6765C24.6074 12.6765 25.0436 13.1113 25.0436 13.645C25.0436 14.1786 24.6074 14.6106 24.0721 14.6106Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className=" ml-[150px] w-3/4 flex flex-col md:flex-row  text-center md:text-left">
          {/* Features */}
          <div className="w-1/3">
            <div className="opacity-80 text-white text-base font-medium font-['Outfit'] uppercase leading-none tracking-wider">
              Features
            </div>
            <ul>
              <li className="my-6">
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  Executive Jobs
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  Executive Recruitment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  Find JobMe
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="w-1/3">
            <div className="opacity-80 text-white text-base font-medium font-['Outfit'] uppercase leading-none tracking-wider">
              Company
            </div>
            <ul>
              <li className="my-6">
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  About
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-1/3">
            <div className="opacity-80 text-white text-base font-medium font-['Outfit'] uppercase leading-none tracking-wider">
              Support
            </div>
            <ul>
              <li className="my-6">
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  FAQs{" "}
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  Terms Of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[106px] opacity-80 text-white text-base font-light font-['Outfit'] leading-none tracking-tight "
                >
                  Privacy Policy{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="min-h-[60px] w-full flex bg-[#0d1823] justify-center items-center">
        <span className="text-white/60 text-base font-light font-['Outfit'] leading-none tracking-wide flex items-center">
          © 2025 All Rights Reserved |{" "}
          <span className="text-[#2797f2] text-base font-semibold font-['Outfit'] leading-none tracking-wide">
            CareerBooster.ai
          </span>
        </span>
      </div>
    </div>
  );
}

export default Footer;
