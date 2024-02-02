import Link from "next/link";
import SVGProvider from "../../../helpers/SVGProvider";
import Image from "next/image";

const AboutCard = () => {
  return (
    <section className="pt-10 pb-16">
      <div className="container">
        <div className="flex items-center pb-8">
          <div className="flex flex-col w-6/12 px-[2rem]">
            <div className="text-center lg:text-start">
              <p className=" text-[#6a4dff] dark:text-[#e6f85e] mb-2">
                About CareerBooster.AI
              </p>
              <h2 className="dark:text-gray-100 text-gray-950 mb-4 font-semibold text-[2.5rem]">
                Welcome to CareerBooster.AI
              </h2>
              <p className="mb-8 dark:text-gray-100 text-gray-950 text-base">
                Your ultimate destination for revolutionizing your career
                journey with AI-powered tools that supercharge your professional
                image. In today{"'"}s fiercely competitive job market, where
                qualifications and experience are essential but not always
                enough, we understand the paramount importance of ensuring your
                resume stands out from the crowd.
              </p>
              <Link
                href="login.html"
                className=" items-center gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white p-4 rounded-lg w-auto px-[2rem] py-[1rem] text-[1.125rem] font-medium mt-4"
              >
                Upload Resume - It{"'"}s Free
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-6/12 ml-[8.3333%]">
            <div className="text-center">
              <Image
                width={530}
                height={491}
                className="dark:inline-block hidden"
                src="/assets/images/screens/screen-4.png"
                alt=""
              />
            </div>

            <div className="text-center">
              <Image
                width={530}
                height={491}
                className="dark:hidden inline-block"
                src="/assets/images/screens/screen-8.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <hr className="border-top border-dark-blue opacity-100" />
        <div className="dark:flex hidden gap-8 items-center justify-center mt-12 review-badges">
          <Image
            width={185}
            height={38}
            className="img-fluid "
            src="/assets/images/review-logos/trustpilot_reviews.svg"
            alt=""
          />
          <Image
            width={185}
            height={38}
            className="img-fluid "
            src="/assets/images/review-logos/capterra_reviews.svg"
            alt=""
          />
        </div>
        <div className="dark:hidden flex  gap-8 items-center justify-center mt-12 review-badges">
          <Image
            width={185}
            height={38}
            className="img-fluid "
            src="/assets/images/review-logos/trustpilot_reviews_2.svg"
            alt=""
          />
          <Image
            width={185}
            height={38}
            className="img-fluid "
            src="/assets/images/review-logos/capterra_reviews_2.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};
export default AboutCard;
