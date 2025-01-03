import Link from "next/link";

interface Props {
  title?: string;
  secondTitle?: string;
  beta?: boolean; // Include beta badge for early adopters
}
const PageHeader: React.FC<Props> = ({ title, secondTitle, beta }) => {
  return (
    <div className="py-8 mt-[64.88px] mb-4 lg:mt-[140.06px] bg-[url('/assets/images/shapes/stripe-light.svg')] bg-no-repeat dark:bg-[url('/assets/images/shapes/stripe-dark.svg')] flex  justify-center items-center  bg-cover bg-start">
      <div className="flex flex-col gap-3 ">
        <h1 className="font-semibold flex items-center gap-2 text-[#000] dark:text-[#fff]  text-center leading-5 text-xl">
          {title}
          {beta && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              Beta
            </span>
          )}
        </h1>
        <nav>
          <ol className="flex justify-center gap-3 text-sm">
            <li>
              <Link
                href="/"
                className="no-underline text-sm dark:text-gray-400 dark:hover:text-[#6a4dff] text-[#000]"
              >
                Home
              </Link>
            </li>
            <li className="dark:text-gray-400 text-sm text-[#000]">
              <span className="mr-3">/</span>
              {secondTitle ? secondTitle : title}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};
export default PageHeader;
