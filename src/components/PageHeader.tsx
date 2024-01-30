import Link from "next/link";

interface Props {
  title?: string;
  secondTitle?: string;
}
const PageHeader: React.FC<Props> = ({ title, secondTitle }) => {
  return (
    <section
      className="pb-10 pb-lg-15  bg-[url('/assets/images/shapes/stripe-light.svg')] bg-no-repeat dark:bg-[url('/assets/images/shapes/stripe-dark.svg')] bg-bottom bg-contain pt-40"
      data-aos="fade-up-sm"
      data-aos-delay="50"
    >
      <div className="container">
        <div className="text-center">
          <h3 className="text-[#000] dark:text-[#fff] mb-2 ">{title}</h3>
          <nav>
            <ol className="flex gap-3 justify-center text-sm">
              <li className="">
                <Link
                  href="/"
                  className="no-underline dark:text-[#fff] text-[#000]"
                >
                  Home {""} /
                </Link>
              </li>
              <li className="dark:text-[#fff] text-[#000]">
                {""}
                {secondTitle ? secondTitle : title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};
export default PageHeader;
